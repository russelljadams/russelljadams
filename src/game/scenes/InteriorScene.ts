import Phaser from 'phaser';
import { SCENES, TILE_SIZE, TILES, VehicleType } from '../constants';
import { Car } from '../../objects/Car';
import { VirtualPad } from '../../ui/VirtualPad';

export interface ContentPanel {
  x: number;
  y: number;
  width: number;
  title: string;
  lines: string[];
}

export abstract class InteriorScene extends Phaser.Scene {
  protected car!: Car;
  private returnX = 0;
  private returnY = 0;
  private vehicleType: VehicleType = 'car';
  private deliveries = 0;
  private spaceKey!: Phaser.Input.Keyboard.Key;
  private escKey!: Phaser.Input.Keyboard.Key;
  private vpad!: VirtualPad;

  protected abstract roomWidth: number;
  protected abstract roomHeight: number;
  protected abstract roomLabel: string;
  protected abstract getContent(): ContentPanel[];

  create(data: { returnX: number; returnY: number; vehicleType?: VehicleType; deliveries?: number }) {
    this.returnX = data.returnX;
    this.returnY = data.returnY;
    if (data.vehicleType) {
      this.vehicleType = data.vehicleType;
    }
    if (data.deliveries !== undefined) {
      this.deliveries = data.deliveries;
    }

    const rw = this.roomWidth;
    const rh = this.roomHeight;
    const mapData = this.generateRoom(rw, rh);

    const map = this.make.tilemap({
      data: mapData,
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE,
    });
    const tileset = map.addTilesetImage('placeholder-tileset')!;
    const layer = map.createLayer(0, tileset, 0, 0)!;
    layer.setCollision([TILES.BUILDING_WALL]);

    const worldW = rw * TILE_SIZE;
    const worldH = rh * TILE_SIZE;
    this.physics.world.setBounds(0, 0, worldW, worldH);

    // Car spawns near the exit door
    const doorX = Math.floor(rw / 2) * TILE_SIZE;
    const doorY = (rh - 3) * TILE_SIZE;
    this.car = new Car(this, doorX, doorY, this.vehicleType);
    this.physics.add.collider(this.car, layer);

    this.cameras.main.setBounds(0, 0, worldW, worldH);
    this.cameras.main.startFollow(this.car, true, 0.1, 0.1);

    // Room title
    this.add.text(worldW / 2, 1.5 * TILE_SIZE, this.roomLabel, {
      fontSize: '20px',
      fontFamily: 'monospace',
      color: '#ffffff',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Content panels
    for (const panel of this.getContent()) {
      this.addPanel(panel);
    }

    // Exit label
    const exitX = Math.floor(rw / 2) * TILE_SIZE;
    const exitY = (rh - 1.5) * TILE_SIZE;
    this.add.text(exitX, exitY, 'EXIT', {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: '#ffcc00',
      backgroundColor: '#00000088',
      padding: { x: 4, y: 2 },
    }).setOrigin(0.5);

    if (this.input.keyboard) {
      this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    this.vpad = new VirtualPad(this, { dpad: true, buttonA: true, buttonB: true });
    this.car.setVirtualPad(this.vpad);

    this.scene.launch(SCENES.HUD);
  }

  update(time: number, delta: number) {
    this.vpad.update();
    this.car.update(time, delta);

    // Check if near exit door
    const rw = this.roomWidth;
    const rh = this.roomHeight;
    const exitX = Math.floor(rw / 2) * TILE_SIZE;
    const exitY = (rh - 1) * TILE_SIZE;
    const dist = Phaser.Math.Distance.Between(
      this.car.x, this.car.y, exitX, exitY,
    );
    const nearExit = dist < TILE_SIZE * 3;

    const shouldExit =
      (nearExit && (Phaser.Input.Keyboard.JustDown(this.spaceKey) || this.vpad.justDown('a'))) ||
      Phaser.Input.Keyboard.JustDown(this.escKey) || this.vpad.justDown('b');

    if (shouldExit) {
      this.scene.stop(SCENES.HUD);
      this.scene.start(SCENES.OVERWORLD, {
        returnX: this.returnX,
        returnY: this.returnY,
        vehicleType: this.vehicleType,
        deliveries: this.deliveries,
      });
      return;
    }

    const hud = this.scene.get(SCENES.HUD);
    if (hud) {
      hud.events.emit('updateSpeed', this.car.getSpeed());
      hud.events.emit(
        'updatePrompt',
        nearExit ? 'SPACE to exit  |  ESC anytime' : 'ESC to exit',
      );
      hud.events.emit('updateVehicle', this.vehicleType);
    }
  }

  private generateRoom(w: number, h: number): number[][] {
    const room: number[][] = [];
    for (let y = 0; y < h; y++) {
      room[y] = [];
      for (let x = 0; x < w; x++) {
        if (y === 0 || y === h - 1 || x === 0 || x === w - 1) {
          room[y][x] = TILES.BUILDING_WALL;
        } else {
          room[y][x] = TILES.FLOOR;
        }
      }
    }
    // Door opening in bottom wall
    const doorStart = Math.floor(w / 2) - 1;
    room[h - 1][doorStart] = TILES.DOOR;
    room[h - 1][doorStart + 1] = TILES.DOOR;
    return room;
  }

  private addPanel(panel: ContentPanel) {
    const px = panel.x * TILE_SIZE;
    const py = panel.y * TILE_SIZE;
    const pw = panel.width;

    // Title
    const titleObj = this.add.text(px, py, panel.title, {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: '#ffcc00',
      fontStyle: 'bold',
      wordWrap: { width: pw },
    });

    // Content lines
    let offsetY = titleObj.height + 8;
    for (const line of panel.lines) {
      const t = this.add.text(px, py + offsetY, line, {
        fontSize: '11px',
        fontFamily: 'monospace',
        color: '#cccccc',
        wordWrap: { width: pw },
        lineSpacing: 3,
      });
      offsetY += t.height + 5;
    }

    // Background
    const bg = this.add.rectangle(
      px - 4, py - 4,
      pw + 8, offsetY + 4,
      0x222233, 0.85,
    ).setOrigin(0, 0);
    bg.setDepth(-1);
  }
}
