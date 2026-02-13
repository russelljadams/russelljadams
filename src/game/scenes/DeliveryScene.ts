import Phaser from 'phaser';
import { SCENES, VehicleType } from '../constants';
import { VirtualPad } from '../../ui/VirtualPad';

// Auto-scrolling PaperBoy-style delivery game
const SCROLL_SPEED = 100;        // pixels per second (world scroll rate)
const VAN_SPEED = 160;           // up/down movement speed
const THROW_SPEED = 300;         // package horizontal speed
const THROW_COOLDOWN = 350;      // ms
const ROAD_LEFT = 260;           // left edge of road
const ROAD_RIGHT = 540;          // right edge of road
const VAN_X = 400;               // fixed X position of van
const HOUSE_SPACING = 160;       // vertical spacing between houses
const DELIVERY_RADIUS = 65;      // how close a package needs to land

interface House {
  worldY: number;
  side: 'left' | 'right';
  needsDelivery: boolean;
  delivered: boolean;
  color: number;
  sprite: Phaser.GameObjects.Rectangle;
  roof: Phaser.GameObjects.Rectangle;
  door: Phaser.GameObjects.Rectangle;
  marker?: Phaser.GameObjects.Text;
}

interface FlyingPackage {
  rect: Phaser.GameObjects.Rectangle;
  worldY: number;   // fixed world Y where it was thrown
  screenX: number;   // current screen X
  vx: number;        // horizontal velocity
  spawnTime: number;
}

export class DeliveryScene extends Phaser.Scene {
  private returnX = 0;
  private returnY = 0;
  private vehicleType: VehicleType = 'van';
  private existingDeliveries = 0;

  private van!: Phaser.GameObjects.Rectangle;
  private vanBody!: Phaser.GameObjects.Rectangle;
  private vanWindshield!: Phaser.GameObjects.Rectangle;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private spaceKey!: Phaser.Input.Keyboard.Key;
  private escKey!: Phaser.Input.Keyboard.Key;

  private scrollY = 0;
  private houses: House[] = [];
  private packages: FlyingPackage[] = [];
  private lastThrow = 0;
  private totalHouses = 0;
  private gameLength = 0;

  private score = 0;
  private missed = 0;
  private totalTargets = 0;
  private gameOver = false;
  private gameOverTime = 0;

  private scoreText!: Phaser.GameObjects.Text;
  private missedText!: Phaser.GameObjects.Text;
  private progressText!: Phaser.GameObjects.Text;

  private gfx!: Phaser.GameObjects.Graphics;
  private vpad!: VirtualPad;

  constructor() {
    super(SCENES.DELIVERY);
  }

  create(data?: { returnX?: number; returnY?: number; vehicleType?: VehicleType; deliveries?: number }) {
    this.returnX = data?.returnX ?? 0;
    this.returnY = data?.returnY ?? 0;
    this.vehicleType = data?.vehicleType ?? 'van';
    this.existingDeliveries = data?.deliveries ?? 0;

    this.scrollY = 0;
    this.score = 0;
    this.missed = 0;
    this.totalTargets = 0;
    this.gameOver = false;
    this.gameOverTime = 0;
    this.houses = [];
    this.packages = [];
    this.lastThrow = 0;

    const { width, height } = this.scale;

    this.gfx = this.add.graphics();

    this.buildRoute(height);

    // Van (simple rectangle representation)
    const vanY = height * 0.75;
    this.vanBody = this.add.rectangle(VAN_X, vanY, 24, 36, 0x232f3e).setDepth(5);
    this.van = this.add.rectangle(VAN_X, vanY, 20, 32, 0x2a3a50).setDepth(6);
    this.vanWindshield = this.add.rectangle(VAN_X, vanY - 14, 14, 6, 0x88bbee).setDepth(7);

    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }
    this.vpad = new VirtualPad(this, { dpad: true, buttonA: true, buttonB: true });

    const hs: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '14px', fontFamily: 'monospace', color: '#ffffff',
      backgroundColor: '#000000aa', padding: { x: 6, y: 3 },
    };
    this.scoreText = this.add.text(10, 10, 'Delivered: 0', hs).setDepth(10);
    this.missedText = this.add.text(10, 35, 'Missed: 0', hs).setDepth(10);
    this.progressText = this.add.text(10, 60, '', hs).setDepth(10);

    this.add.text(width / 2, 10,
      'UP/DOWN=move  SPACE=throw  LEFT=left  RIGHT=right  ESC=quit', {
        fontSize: '11px', fontFamily: 'monospace', color: '#666666',
        backgroundColor: '#000000aa', padding: { x: 6, y: 3 },
      }).setOrigin(0.5, 0).setDepth(10);
  }

  /** Convert world Y to screen Y. Houses ahead (larger worldY) appear at top. */
  private worldToScreenY(worldY: number, height: number): number {
    // Van is at scrollY in world space, at height*0.75 on screen.
    // Things ahead (worldY > scrollY) should be above the van (smaller screenY).
    return height * 0.75 - (worldY - this.scrollY);
  }

  update(_time: number, delta: number) {
    this.vpad.update();

    if (Phaser.Input.Keyboard.JustDown(this.escKey) || this.vpad.justDown('b')) {
      this.exitScene();
      return;
    }

    if (this.gameOver) {
      if (_time - this.gameOverTime > 3000) {
        this.exitScene();
      }
      return;
    }

    const dt = delta / 1000;
    const { width, height } = this.scale;

    // Auto-scroll forward
    this.scrollY += SCROLL_SPEED * dt;

    // Check for game end
    if (this.scrollY >= this.gameLength) {
      this.endGame(width, height);
      return;
    }

    // Move van up/down (screen position, affects where packages are thrown)
    const up = (this.cursors?.up?.isDown ?? false) || this.vpad.isDown('up');
    const down = (this.cursors?.down?.isDown ?? false) || this.vpad.isDown('down');

    if (up) this.van.y -= VAN_SPEED * dt;
    if (down) this.van.y += VAN_SPEED * dt;
    this.van.y = Phaser.Math.Clamp(this.van.y, 80, height - 40);
    this.vanBody.y = this.van.y;
    this.vanWindshield.y = this.van.y - 14;

    // Throw package
    const left = (this.cursors?.left?.isDown ?? false) || this.vpad.isDown('left');
    const right = (this.cursors?.right?.isDown ?? false) || this.vpad.isDown('right');

    const throwPressed = Phaser.Input.Keyboard.JustDown(this.spaceKey) || this.vpad.justDown('a');
    if (throwPressed && _time - this.lastThrow > THROW_COOLDOWN) {
      this.lastThrow = _time;
      const throwDir = right ? 1 : -1;
      const rect = this.add.rectangle(
        this.van.x + throwDir * 16, this.van.y,
        8, 8, 0xaa7744,
      ).setDepth(4);

      // Compute the world Y corresponding to the van's current screen position
      const vanWorldY = this.scrollY + (this.van.y - height * 0.75);

      this.packages.push({
        rect,
        worldY: vanWorldY,
        screenX: this.van.x + throwDir * 16,
        vx: throwDir * THROW_SPEED,
        spawnTime: _time,
      });
    }

    // Update packages
    const pkgToRemove: number[] = [];
    for (let i = 0; i < this.packages.length; i++) {
      const pkg = this.packages[i];

      // Move horizontally in screen space
      pkg.screenX += pkg.vx * dt;
      pkg.rect.x = pkg.screenX;

      // Compute screen Y from fixed world Y
      pkg.rect.y = this.worldToScreenY(pkg.worldY, height);

      // Check if off screen
      if (pkg.screenX < -20 || pkg.screenX > width + 20 ||
          pkg.rect.y < -50 || pkg.rect.y > height + 50) {
        pkgToRemove.push(i);
        pkg.rect.destroy();
        continue;
      }

      // Check delivery to houses
      for (const house of this.houses) {
        if (!house.needsDelivery || house.delivered) continue;
        const houseScreenY = this.worldToScreenY(house.worldY, height);
        const houseX = house.side === 'left' ? 150 : 650;
        const dist = Phaser.Math.Distance.Between(pkg.screenX, pkg.rect.y, houseX, houseScreenY);
        if (dist < DELIVERY_RADIUS) {
          house.delivered = true;
          this.score++;
          pkgToRemove.push(i);
          pkg.rect.destroy();
          // Feedback
          const fb = this.add.text(houseX, houseScreenY - 20, '+1 DELIVERED!', {
            fontSize: '14px', fontFamily: 'monospace',
            color: '#00ff00', fontStyle: 'bold',
          }).setOrigin(0.5).setDepth(10);
          this.tweens.add({
            targets: fb, y: fb.y - 40, alpha: 0,
            duration: 800, onComplete: () => fb.destroy(),
          });
          break;
        }
      }
    }
    for (let i = pkgToRemove.length - 1; i >= 0; i--) {
      this.packages.splice(pkgToRemove[i], 1);
    }

    // Check for missed houses (scrolled off bottom of screen)
    for (const house of this.houses) {
      if (!house.needsDelivery || house.delivered) continue;
      const houseScreenY = this.worldToScreenY(house.worldY, height);
      if (houseScreenY > height + 80) {
        house.delivered = true;
        this.missed++;
      }
    }

    // Render
    this.renderScene(width, height);

    // Update HUD
    this.scoreText.setText(`Delivered: ${this.score}`);
    this.missedText.setText(`Missed: ${this.missed}`);
    const progress = Math.floor((this.scrollY / this.gameLength) * 100);
    this.progressText.setText(`Route: ${progress}%`);
  }

  private buildRoute(height: number) {
    this.totalHouses = 15;
    // Houses start ahead of the player in world space
    // At scrollY=0, the first house at worldY = height*0.75 would be at screen center
    // We want houses to start above the screen, so offset them further ahead
    const startOffset = height;

    for (let i = 0; i < this.totalHouses; i++) {
      const worldY = startOffset + i * HOUSE_SPACING;
      // Alternate sides, sometimes both
      let side: 'left' | 'right';
      if (i % 3 === 0) side = 'left';
      else if (i % 3 === 1) side = 'right';
      else side = Math.random() < 0.5 ? 'left' : 'right';

      const needsDelivery = Math.random() < 0.65;
      if (needsDelivery) this.totalTargets++;

      const color = this.randomHouseColor();
      const sprite = this.add.rectangle(0, 0, 60, 40, color).setDepth(2);
      const roof = this.add.rectangle(0, 0, 66, 12, 0x664433).setDepth(3);
      const door = this.add.rectangle(0, 0, 10, 16, 0x553322).setDepth(3);
      let marker: Phaser.GameObjects.Text | undefined;
      if (needsDelivery) {
        marker = this.add.text(0, 0, 'PKG', {
          fontSize: '10px', fontFamily: 'monospace',
          color: '#ff9900', fontStyle: 'bold',
          backgroundColor: '#000000aa', padding: { x: 2, y: 1 },
        }).setOrigin(0.5).setDepth(4);
      }

      this.houses.push({ worldY, side, needsDelivery, delivered: false, color, sprite, roof, door, marker });
    }

    // Game ends after the last house has passed
    const lastHouseY = startOffset + (this.totalHouses - 1) * HOUSE_SPACING;
    this.gameLength = lastHouseY + height;
  }

  private randomHouseColor(): number {
    const colors = [0x887766, 0x998877, 0x776655, 0x889988, 0x887788, 0xaa9988];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  private renderScene(W: number, H: number) {
    const g = this.gfx;
    g.clear();

    // Background - grass
    g.fillStyle(0x4a7c3f);
    g.fillRect(0, 0, W, H);

    // Sidewalks
    g.fillStyle(0x999999);
    g.fillRect(ROAD_LEFT - 30, 0, 30, H);
    g.fillRect(ROAD_RIGHT, 0, 30, H);

    // Road
    g.fillStyle(0x555555);
    g.fillRect(ROAD_LEFT, 0, ROAD_RIGHT - ROAD_LEFT, H);

    // Road center line (dashed) - scroll with world
    g.fillStyle(0xdddddd);
    const center = (ROAD_LEFT + ROAD_RIGHT) / 2;
    for (let y = -30; y < H + 30; y += 30) {
      const lineY = y + (this.scrollY * 2) % 30;
      if (lineY >= 0 && lineY < H) {
        g.fillRect(center - 1, lineY, 2, 15);
      }
    }

    // Lane lines
    g.fillStyle(0x777777);
    const laneW = (ROAD_RIGHT - ROAD_LEFT) / 4;
    for (let i = 1; i < 4; i++) {
      if (i === 2) continue;
      const lx = ROAD_LEFT + laneW * i;
      for (let y = -40; y < H + 40; y += 40) {
        const lineY = y + (this.scrollY * 2) % 40;
        if (lineY >= 0 && lineY < H) {
          g.fillRect(lx - 1, lineY, 1, 10);
        }
      }
    }

    // Position houses on screen
    for (const house of this.houses) {
      const screenY = this.worldToScreenY(house.worldY, H);

      const visible = screenY > -60 && screenY < H + 60;
      house.sprite.setVisible(visible);
      house.roof.setVisible(visible);
      house.door.setVisible(visible);
      if (house.marker) {
        house.marker.setVisible(visible && house.needsDelivery && !house.delivered);
      }

      if (!visible) continue;

      const houseX = house.side === 'left' ? 150 : 650;

      house.sprite.setPosition(houseX, screenY);
      house.roof.setPosition(houseX, screenY - 22);
      house.door.setPosition(houseX, screenY + 12);

      if (house.marker && house.needsDelivery && !house.delivered) {
        house.marker.setPosition(houseX, screenY - 35);
      }

      if (house.delivered && house.needsDelivery) {
        house.sprite.setAlpha(0.4);
      }
    }
  }

  private endGame(width: number, height: number) {
    this.gameOver = true;
    this.gameOverTime = this.time.now;

    const grade = this.totalTargets > 0
      ? Math.floor((this.score / this.totalTargets) * 100)
      : 0;

    let rating = 'F';
    if (grade >= 90) rating = 'A+';
    else if (grade >= 80) rating = 'A';
    else if (grade >= 70) rating = 'B';
    else if (grade >= 60) rating = 'C';
    else if (grade >= 50) rating = 'D';

    this.add.text(width / 2, height / 2 - 40, 'ROUTE COMPLETE!', {
      fontSize: '28px', fontFamily: 'monospace', color: '#ffffff',
      fontStyle: 'bold', backgroundColor: '#000000cc', padding: { x: 12, y: 8 },
    }).setOrigin(0.5).setDepth(20);

    this.add.text(width / 2, height / 2 + 10, [
      `Delivered: ${this.score} / ${this.totalTargets}`,
      `Missed: ${this.missed}`,
      `Rating: ${rating} (${grade}%)`,
    ], {
      fontSize: '16px', fontFamily: 'monospace', color: '#cccccc',
      backgroundColor: '#000000cc', padding: { x: 12, y: 8 },
      lineSpacing: 4,
    }).setOrigin(0.5).setDepth(20);

    this.add.text(width / 2, height / 2 + 80, 'Returning in 3s...', {
      fontSize: '12px', fontFamily: 'monospace', color: '#888888',
    }).setOrigin(0.5).setDepth(20);
  }

  private exitScene() {
    this.scene.start(SCENES.OVERWORLD, {
      returnX: this.returnX,
      returnY: this.returnY,
      vehicleType: this.vehicleType,
      deliveries: this.existingDeliveries + this.score,
    });
  }
}
