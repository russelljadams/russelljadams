import Phaser from 'phaser';
import {
  SCENES, TILE_SIZE, MAP_WIDTH_TILES, MAP_HEIGHT_TILES,
  MAP_WIDTH, MAP_HEIGHT, TILES, CAMERA, BUILDING_STYLES,
  VehicleType, BuildingStyle,
} from '../constants';

import { Car } from '../../objects/Car';
import { VirtualPad } from '../../ui/VirtualPad';

export interface BuildingDef {
  x: number;
  y: number;
  width: number;
  height: number;
  doorX: number;
  doorY: number;
  label: string;
  subtitle: string;
  scene: string;
  style?: BuildingStyle;
  locked?: boolean;
}

const BUILDINGS: BuildingDef[] = [
  // --- Original 4 portfolio buildings (each a unique style) ---
  {
    x: 5, y: 5, width: 8, height: 6,
    doorX: 8, doorY: 10,
    label: 'GARAGE', subtitle: 'About Me',
    scene: SCENES.GARAGE, style: 'standard',
  },
  {
    x: 17, y: 5, width: 8, height: 6,
    doorX: 20, doorY: 10,
    label: 'OFFICE', subtitle: 'Experience',
    scene: SCENES.OFFICE, style: 'red',
  },
  {
    x: 5, y: 15, width: 8, height: 6,
    doorX: 8, doorY: 20,
    label: 'MAILROOM', subtitle: 'Contact',
    scene: SCENES.MAILROOM, style: 'green',
  },
  {
    x: 17, y: 15, width: 8, height: 6,
    doorX: 20, doorY: 20,
    label: 'ARCADE', subtitle: 'Projects',
    scene: SCENES.ARCADE, style: 'tan',
  },
  // --- Amazon Depot ---
  {
    x: 33, y: 5, width: 10, height: 6,
    doorX: 37, doorY: 10,
    label: 'DEPOT', subtitle: 'Go to Work',
    scene: SCENES.DEPOT, style: 'depot',
  },
  // --- Racetrack gate building ---
  {
    x: 33, y: 35, width: 4, height: 3,
    doorX: 34, doorY: 37,
    label: 'TRACK', subtitle: 'Race!',
    scene: SCENES.RACETRACK, style: 'dark',
  },
  // --- 6 Locked buildings ---
  {
    x: 47, y: 5, width: 7, height: 5,
    doorX: 50, doorY: 9,
    label: 'MUSEUM', subtitle: 'Coming Soon',
    scene: '', style: 'red', locked: true,
  },
  {
    x: 47, y: 15, width: 7, height: 5,
    doorX: 50, doorY: 19,
    label: 'LIBRARY', subtitle: 'Coming Soon',
    scene: '', style: 'green', locked: true,
  },
  {
    x: 5, y: 27, width: 7, height: 5,
    doorX: 8, doorY: 31,
    label: 'WORKSHOP', subtitle: 'Coming Soon',
    scene: '', style: 'tan', locked: true,
  },
  {
    x: 17, y: 27, width: 7, height: 5,
    doorX: 20, doorY: 31,
    label: 'LAB', subtitle: 'Coming Soon',
    scene: '', style: 'dark', locked: true,
  },
  {
    x: 47, y: 27, width: 7, height: 5,
    doorX: 50, doorY: 31,
    label: 'CAFE', subtitle: 'Coming Soon',
    scene: '', style: 'standard', locked: true,
  },
  {
    x: 33, y: 15, width: 7, height: 5,
    doorX: 36, doorY: 19,
    label: 'STUDIO', subtitle: 'Coming Soon',
    scene: '', style: 'red', locked: true,
  },
];

const DOOR_RANGE = TILE_SIZE * 2.5;
const PACKAGE_THROW_SPEED = 200;
const PACKAGE_COOLDOWN = 400; // ms between throws
const PACKAGE_DELIVERY_RANGE = TILE_SIZE * 3;

// Racetrack zone bounds (bottom-right area)
const TRACK_ZONE = { x: 34, y: 38, w: 24, h: 10 };

export class OverworldScene extends Phaser.Scene {
  private car!: Car;
  private spaceKey!: Phaser.Input.Keyboard.Key;
  private sKey!: Phaser.Input.Keyboard.Key;
  private vehicleType: VehicleType = 'car';
  private deliveryCount = 0;
  private lastThrowTime = 0;
  private packages!: Phaser.GameObjects.Group;
  private tileLayer!: Phaser.Tilemaps.TilemapLayer;
  private vpad!: VirtualPad;

  constructor() {
    super(SCENES.OVERWORLD);
  }

  create(data?: { returnX?: number; returnY?: number; vehicleType?: VehicleType; deliveries?: number }) {
    if (data?.vehicleType) {
      this.vehicleType = data.vehicleType;
    }
    if (data?.deliveries !== undefined) {
      this.deliveryCount = data.deliveries;
    }

    const mapData = this.generateMap();
    const map = this.make.tilemap({
      data: mapData,
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE,
    });
    const tileset = map.addTilesetImage('placeholder-tileset')!;
    const layer = map.createLayer(0, tileset, 0, 0)!;
    this.tileLayer = layer;

    // All wall/roof types + fence + track tiles block movement
    const collisionTiles = [
      TILES.BUILDING_WALL, TILES.BUILDING_ROOF,
      TILES.RED_WALL, TILES.RED_ROOF,
      TILES.GREEN_WALL, TILES.GREEN_ROOF,
      TILES.TAN_WALL, TILES.TAN_ROOF,
      TILES.DARK_WALL, TILES.DARK_ROOF,
      TILES.DEPOT_WALL, TILES.DEPOT_ROOF,
      TILES.LOCKED_DOOR,
      TILES.TRACK_FENCE,
      TILES.TRACK_ASPHALT,
      TILES.TRACK_RUMBLE,
    ];
    layer.setCollision(collisionTiles);

    this.physics.world.setBounds(0, 0, MAP_WIDTH, MAP_HEIGHT);

    const startX = data?.returnX ?? 15 * TILE_SIZE;
    const startY = data?.returnY ?? 13 * TILE_SIZE;
    this.car = new Car(this, startX, startY, this.vehicleType);
    this.physics.add.collider(this.car, layer);

    // Package group for thrown packages
    this.packages = this.add.group();

    this.cameras.main.setBounds(0, 0, MAP_WIDTH, MAP_HEIGHT);
    this.cameras.main.startFollow(this.car, true, CAMERA.LERP, CAMERA.LERP);
    this.cameras.main.setDeadzone(CAMERA.DEADZONE_WIDTH, CAMERA.DEADZONE_HEIGHT);

    this.addBuildingLabels();

    if (this.input.keyboard) {
      this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    this.vpad = new VirtualPad(this, { dpad: true, buttonA: true, buttonS: true });
    this.car.setVirtualPad(this.vpad);

    this.scene.launch(SCENES.HUD);
  }

  update(time: number, delta: number) {
    this.vpad.update();
    this.car.update(time, delta);

    // Check proximity to doors
    let nearDoor: BuildingDef | null = null;
    let nearDepot = false;
    for (const b of BUILDINGS) {
      const doorCenterX = (b.doorX + 1) * TILE_SIZE;
      const doorCenterY = (b.doorY + 0.5) * TILE_SIZE;
      const dist = Phaser.Math.Distance.Between(
        this.car.x, this.car.y, doorCenterX, doorCenterY,
      );
      if (dist < DOOR_RANGE) {
        nearDoor = b;
        if (b.label === 'DEPOT') nearDepot = true;
        break;
      }
    }

    const spacePressed = Phaser.Input.Keyboard.JustDown(this.spaceKey) || this.vpad.justDown('a');
    if (spacePressed) {
      if (nearDoor) {
        if (nearDoor.locked) {
          // Do nothing — prompt shows COMING SOON
        } else if (nearDoor.label === 'DEPOT') {
          if (this.vehicleType === 'van') {
            // Already in van — start delivery route
            this.scene.stop(SCENES.HUD);
            this.scene.start(SCENES.DELIVERY, {
              returnX: this.car.x,
              returnY: this.car.y,
              vehicleType: this.vehicleType,
              deliveries: this.deliveryCount,
            });
            return;
          }
          // In car — enter depot interior
          this.scene.stop(SCENES.HUD);
          this.scene.start(SCENES.DEPOT, {
            returnX: this.car.x,
            returnY: this.car.y,
            vehicleType: this.vehicleType,
            deliveries: this.deliveryCount,
          });
          return;
        } else if (nearDoor.scene === SCENES.RACETRACK) {
          this.scene.stop(SCENES.HUD);
          this.scene.start(SCENES.RACETRACK, {
            returnX: this.car.x,
            returnY: this.car.y,
            vehicleType: this.vehicleType,
          });
          return;
        } else if (nearDoor.scene) {
          this.scene.stop(SCENES.HUD);
          this.scene.start(nearDoor.scene, {
            returnX: this.car.x,
            returnY: this.car.y,
            vehicleType: this.vehicleType,
            deliveries: this.deliveryCount,
          });
          return;
        }
      } else if (this.vehicleType === 'van') {
        // PaperBoy-style: throw a package when driving the van
        this.throwPackage(time);
      } else if (this.vehicleType === 'car') {
        // DRS boost for F1 car
        this.car.activateDrs();
      }
    }

    // S key swaps vehicle at depot
    const sPressed = Phaser.Input.Keyboard.JustDown(this.sKey) || this.vpad.justDown('s');
    if (nearDepot && sPressed) {
      this.vehicleType = this.vehicleType === 'car' ? 'van' : 'car';
      this.car.setVehicleType(this.vehicleType);
    }

    // Update flying packages
    this.updatePackages();

    // Build prompt text
    let promptText = '';
    let promptColor = '#ffcc00';
    if (nearDoor) {
      if (nearDoor.locked) {
        promptText = 'COMING SOON';
        promptColor = '#ff4444';
      } else if (nearDepot) {
        if (this.vehicleType === 'van') {
          promptText = 'SPACE=deliver  S=swap to CAR';
          promptColor = '#ff9900';
        } else {
          promptText = 'SPACE=enter  S=swap to VAN';
        }
      } else {
        promptText = `SPACE to enter ${nearDoor.label}`;
      }
    } else if (this.vehicleType === 'van' && this.car.getSpeed() > 5) {
      promptText = 'SPACE to throw package';
      promptColor = '#ff9900';
    } else if (this.vehicleType === 'car' && this.car.isDrsActive()) {
      promptText = 'DRS ACTIVE';
      promptColor = '#00ff00';
    } else if (this.vehicleType === 'car' && this.car.isDrsReady()) {
      promptText = 'SPACE for DRS boost';
      promptColor = '#00ccff';
    }

    const hud = this.scene.get(SCENES.HUD);
    if (hud) {
      hud.events.emit('updateSpeed', this.car.getSpeed());
      hud.events.emit('updatePrompt', promptText, promptColor);
      hud.events.emit('updateVehicle', this.vehicleType);
      hud.events.emit('updateDeliveries', this.deliveryCount);
      hud.events.emit('updateDrs', this.car.isDrsActive(), this.car.getDrsCooldownPercent());
    }
  }

  private throwPackage(time: number) {
    if (time - this.lastThrowTime < PACKAGE_COOLDOWN) return;
    if (this.car.getSpeed() < 5) return;
    this.lastThrowTime = time;

    // Get car's current heading (rotation minus the sprite offset)
    const heading = this.car.rotation - Math.PI / 2;

    // Throw perpendicular to the right of the car's heading
    const throwAngle = heading + Math.PI / 2;

    // Spawn slightly offset from car center
    const offsetDist = 20;
    const spawnX = this.car.x + Math.cos(throwAngle) * offsetDist;
    const spawnY = this.car.y + Math.sin(throwAngle) * offsetDist;

    const pkg = this.physics.add.sprite(spawnX, spawnY, 'package');
    pkg.setDepth(5);
    pkg.setData('alive', true);
    pkg.setData('spawnTime', time);

    // Velocity: forward momentum + sideways throw
    const forwardVx = Math.cos(heading) * this.car.getSpeed() * 0.5;
    const forwardVy = Math.sin(heading) * this.car.getSpeed() * 0.5;
    const throwVx = Math.cos(throwAngle) * PACKAGE_THROW_SPEED;
    const throwVy = Math.sin(throwAngle) * PACKAGE_THROW_SPEED;

    (pkg.body as Phaser.Physics.Arcade.Body).setVelocity(
      forwardVx + throwVx,
      forwardVy + throwVy,
    );

    // Spin the package
    (pkg.body as Phaser.Physics.Arcade.Body).setAngularVelocity(400);

    // Collide with tile layer — stop on impact
    this.physics.add.collider(pkg, this.tileLayer, () => {
      (pkg.body as Phaser.Physics.Arcade.Body).setVelocity(0, 0);
      (pkg.body as Phaser.Physics.Arcade.Body).setAngularVelocity(0);
      pkg.setData('landed', true);
    });

    // Drag to slow down
    (pkg.body as Phaser.Physics.Arcade.Body).setDrag(150, 150);
    (pkg.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);

    this.packages.add(pkg);
  }

  private updatePackages() {
    const toRemove: Phaser.GameObjects.Sprite[] = [];
    const now = this.time.now;

    this.packages.getChildren().forEach((obj) => {
      const pkg = obj as Phaser.GameObjects.Sprite;
      const body = pkg.body as Phaser.Physics.Arcade.Body;
      const spawnTime = pkg.getData('spawnTime') as number;
      const speed = Math.sqrt(body.velocity.x ** 2 + body.velocity.y ** 2);

      // Check if package came to rest or hit a wall
      if (speed < 5 || pkg.getData('landed')) {
        if (!pkg.getData('scored')) {
          pkg.setData('scored', true);
          // Check if it landed near a building door
          for (const b of BUILDINGS) {
            const doorCX = (b.doorX + 1) * TILE_SIZE;
            const doorCY = (b.doorY + 0.5) * TILE_SIZE;
            const dist = Phaser.Math.Distance.Between(pkg.x, pkg.y, doorCX, doorCY);
            if (dist < PACKAGE_DELIVERY_RANGE) {
              this.deliveryCount++;
              // Flash delivery text
              const delivered = this.add.text(pkg.x, pkg.y - 20, 'DELIVERED!', {
                fontSize: '12px',
                fontFamily: 'monospace',
                color: '#00ff00',
                fontStyle: 'bold',
              }).setOrigin(0.5).setDepth(10);
              this.tweens.add({
                targets: delivered,
                y: delivered.y - 30,
                alpha: 0,
                duration: 1000,
                onComplete: () => delivered.destroy(),
              });
              break;
            }
          }
        }
        body.setVelocity(0, 0);
        (pkg.body as Phaser.Physics.Arcade.Body).setAngularVelocity(0);
      }

      // Remove old packages after 4 seconds
      if (now - spawnTime > 4000) {
        toRemove.push(pkg);
      }
    });

    for (const pkg of toRemove) {
      // Fade out
      this.tweens.add({
        targets: pkg,
        alpha: 0,
        duration: 300,
        onComplete: () => {
          this.packages.remove(pkg, true, true);
        },
      });
    }
  }

  private generateMap(): number[][] {
    const W = MAP_WIDTH_TILES;
    const H = MAP_HEIGHT_TILES;
    const map: number[][] = [];

    for (let y = 0; y < H; y++) {
      map[y] = new Array(W).fill(TILES.GRASS);
    }

    const drawHRoad = (ry: number, x1: number, x2: number) => {
      for (let x = x1; x <= x2; x++) {
        map[ry][x] = TILES.ROAD;
        map[ry + 1][x] = TILES.ROAD;
        if (ry > 0 && map[ry - 1][x] === TILES.GRASS)
          map[ry - 1][x] = TILES.SIDEWALK;
        if (ry + 2 < H && map[ry + 2][x] === TILES.GRASS)
          map[ry + 2][x] = TILES.SIDEWALK;
      }
    };

    const drawVRoad = (rx: number, y1: number, y2: number) => {
      for (let y = y1; y <= y2; y++) {
        map[y][rx] = TILES.ROAD;
        map[y][rx + 1] = TILES.ROAD;
        if (rx > 0 && map[y][rx - 1] === TILES.GRASS)
          map[y][rx - 1] = TILES.SIDEWALK;
        if (rx + 2 < W && map[y][rx + 2] === TILES.GRASS)
          map[y][rx + 2] = TILES.SIDEWALK;
      }
    };

    // Perimeter roads
    drawHRoad(2, 2, W - 3);
    drawHRoad(H - 4, 2, W - 3);
    drawVRoad(2, 2, H - 4);
    drawVRoad(W - 4, 2, H - 4);

    // 3 horizontal interior roads
    drawHRoad(12, 2, W - 3);
    drawHRoad(23, 2, W - 3);
    drawHRoad(35, 2, W - 3);

    // 3 vertical interior roads
    drawVRoad(14, 2, H - 4);
    drawVRoad(30, 2, H - 4);
    drawVRoad(44, 2, H - 4);

    // Place buildings with styles
    for (const b of BUILDINGS) {
      const style = BUILDING_STYLES[b.style ?? 'standard'];
      // Fill roof (top row)
      for (let dx = 0; dx < b.width; dx++) {
        map[b.y][b.x + dx] = style.roof;
      }
      // Fill walls (rest of building)
      for (let dy = 1; dy < b.height; dy++) {
        for (let dx = 0; dx < b.width; dx++) {
          map[b.y + dy][b.x + dx] = style.wall;
        }
      }
      // Place door
      if (b.locked) {
        map[b.doorY][b.doorX] = TILES.LOCKED_DOOR;
        map[b.doorY][b.doorX + 1] = TILES.LOCKED_DOOR;
      } else {
        map[b.doorY][b.doorX] = TILES.DOOR;
        map[b.doorY][b.doorX + 1] = TILES.DOOR;
      }
    }

    // Racetrack zone (bottom-right)
    const tz = TRACK_ZONE;
    // Outer fence border
    for (let x = tz.x; x < tz.x + tz.w; x++) {
      map[tz.y][x] = TILES.TRACK_FENCE;
      map[tz.y + tz.h - 1][x] = TILES.TRACK_FENCE;
    }
    for (let y = tz.y; y < tz.y + tz.h; y++) {
      map[y][tz.x] = TILES.TRACK_FENCE;
      map[y][tz.x + tz.w - 1] = TILES.TRACK_FENCE;
    }
    // Interior: asphalt + rumble strip oval
    for (let y = tz.y + 1; y < tz.y + tz.h - 1; y++) {
      for (let x = tz.x + 1; x < tz.x + tz.w - 1; x++) {
        const atEdge = (y === tz.y + 1 || y === tz.y + tz.h - 2 ||
                        x === tz.x + 1 || x === tz.x + tz.w - 2);
        map[y][x] = atEdge ? TILES.TRACK_RUMBLE : TILES.TRACK_ASPHALT;
      }
    }

    return map;
  }

  private addBuildingLabels() {
    for (const b of BUILDINGS) {
      const cx = (b.x + b.width / 2) * TILE_SIZE;
      const labelY = (b.doorY + 1.5) * TILE_SIZE;

      const color = b.locked ? '#ff6666' : '#ffffff';

      this.add.text(cx, labelY, `${b.label}\n${b.subtitle}`, {
        fontSize: '14px',
        fontFamily: 'monospace',
        color,
        align: 'center',
        backgroundColor: '#00000088',
        padding: { x: 6, y: 3 },
      }).setOrigin(0.5, 0.5);
    }
  }
}
