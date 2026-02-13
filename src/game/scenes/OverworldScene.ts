import Phaser from 'phaser';
import {
  SCENES, TILE_SIZE, MAP_WIDTH_TILES, MAP_HEIGHT_TILES,
  MAP_WIDTH, MAP_HEIGHT, TILES, CAMERA,
} from '../constants';
import { Car } from '../../objects/Car';

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
}

const BUILDINGS: BuildingDef[] = [
  {
    x: 5, y: 5, width: 8, height: 6,
    doorX: 8, doorY: 10,
    label: 'GARAGE', subtitle: 'About Me',
    scene: SCENES.GARAGE,
  },
  {
    x: 17, y: 5, width: 8, height: 6,
    doorX: 20, doorY: 10,
    label: 'OFFICE', subtitle: 'Experience',
    scene: SCENES.OFFICE,
  },
  {
    x: 5, y: 15, width: 8, height: 6,
    doorX: 8, doorY: 15,
    label: 'MAILROOM', subtitle: 'Contact',
    scene: SCENES.MAILROOM,
  },
  {
    x: 17, y: 15, width: 8, height: 6,
    doorX: 20, doorY: 15,
    label: 'ARCADE', subtitle: 'Projects',
    scene: SCENES.ARCADE,
  },
];

const DOOR_RANGE = TILE_SIZE * 2.5;

export class OverworldScene extends Phaser.Scene {
  private car!: Car;
  private spaceKey!: Phaser.Input.Keyboard.Key;

  constructor() {
    super(SCENES.OVERWORLD);
  }

  create(data?: { returnX?: number; returnY?: number }) {
    const mapData = this.generateMap();
    const map = this.make.tilemap({
      data: mapData,
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE,
    });
    const tileset = map.addTilesetImage('placeholder-tileset')!;
    const layer = map.createLayer(0, tileset, 0, 0)!;
    layer.setCollision([TILES.BUILDING_WALL, TILES.BUILDING_ROOF]);

    this.physics.world.setBounds(0, 0, MAP_WIDTH, MAP_HEIGHT);

    const startX = data?.returnX ?? 15 * TILE_SIZE;
    const startY = data?.returnY ?? 13 * TILE_SIZE;
    this.car = new Car(this, startX, startY);
    this.physics.add.collider(this.car, layer);

    this.cameras.main.setBounds(0, 0, MAP_WIDTH, MAP_HEIGHT);
    this.cameras.main.startFollow(this.car, true, CAMERA.LERP, CAMERA.LERP);
    this.cameras.main.setDeadzone(CAMERA.DEADZONE_WIDTH, CAMERA.DEADZONE_HEIGHT);

    this.addBuildingLabels();

    if (this.input.keyboard) {
      this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    this.scene.launch(SCENES.HUD);
  }

  update(time: number, delta: number) {
    this.car.update(time, delta);

    // Check proximity to doors
    let nearDoor: BuildingDef | null = null;
    for (const b of BUILDINGS) {
      const doorCenterX = (b.doorX + 1) * TILE_SIZE;
      const doorCenterY = (b.doorY + 0.5) * TILE_SIZE;
      const dist = Phaser.Math.Distance.Between(
        this.car.x, this.car.y, doorCenterX, doorCenterY,
      );
      if (dist < DOOR_RANGE) {
        nearDoor = b;
        break;
      }
    }

    if (nearDoor && Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      this.scene.stop(SCENES.HUD);
      this.scene.start(nearDoor.scene, {
        returnX: this.car.x,
        returnY: this.car.y,
      });
      return;
    }

    const hud = this.scene.get(SCENES.HUD);
    if (hud) {
      hud.events.emit('updateSpeed', this.car.getSpeed());
      hud.events.emit(
        'updatePrompt',
        nearDoor ? `SPACE to enter ${nearDoor.label}` : '',
      );
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

    // Center cross roads
    drawHRoad(12, 2, W - 3);
    drawVRoad(14, 2, H - 4);

    // Place buildings
    for (const b of BUILDINGS) {
      for (let dy = 0; dy < b.height; dy++) {
        for (let dx = 0; dx < b.width; dx++) {
          map[b.y + dy][b.x + dx] = TILES.BUILDING_WALL;
        }
      }
      map[b.doorY][b.doorX] = TILES.DOOR;
      map[b.doorY][b.doorX + 1] = TILES.DOOR;
    }

    return map;
  }

  private addBuildingLabels() {
    for (const b of BUILDINGS) {
      const cx = (b.x + b.width / 2) * TILE_SIZE;
      const isTopDoor = b.doorY === b.y;
      const labelY = isTopDoor
        ? (b.y - 1.5) * TILE_SIZE
        : (b.y + b.height + 0.5) * TILE_SIZE;

      this.add.text(cx, labelY, `${b.label}\n${b.subtitle}`, {
        fontSize: '14px',
        fontFamily: 'monospace',
        color: '#ffffff',
        align: 'center',
        backgroundColor: '#00000088',
        padding: { x: 6, y: 3 },
      }).setOrigin(0.5, 0.5);
    }
  }
}
