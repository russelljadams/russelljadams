import Phaser from 'phaser';

export interface VirtualPadConfig {
  dpad?: boolean;
  buttonA?: boolean;   // action (SPACE)
  buttonB?: boolean;   // back (ESC)
  buttonS?: boolean;   // swap (S key)
}

const BTN_ALPHA = 0.35;
const BTN_ALPHA_PRESSED = 0.7;
const DEPTH = 100;

// D-pad sizing
const DPAD_BTN = 60;       // each direction button size
const DPAD_GAP = 6;        // gap between buttons
const DPAD_MARGIN = 20;    // margin from screen edges

// Action button sizing
const ACTION_RADIUS = 36;
const ACTION_MARGIN = 25;

export class VirtualPad {
  private scene: Phaser.Scene;
  private state: Record<string, boolean> = {};
  private prevState: Record<string, boolean> = {};
  private elements: Phaser.GameObjects.GameObject[] = [];
  private active = false;

  constructor(scene: Phaser.Scene, config: VirtualPadConfig = {}) {
    this.scene = scene;

    // Only show on touch devices
    if (!VirtualPad.isTouchDevice()) return;
    this.active = true;

    // Enable multi-touch (3 extra pointers = 4 total)
    scene.input.addPointer(3);

    const H = scene.scale.height;
    const W = scene.scale.width;

    // D-pad: bottom-left, with generous margin
    if (config.dpad !== false) {
      const dpadCx = DPAD_MARGIN + DPAD_BTN + DPAD_GAP;
      const dpadCy = H - DPAD_MARGIN - DPAD_BTN - DPAD_GAP;
      this.createDPad(dpadCx, dpadCy);
    }

    // Action buttons: bottom-right
    // Stack vertically: A on top, B below, S to the left of A
    const btnX = W - ACTION_MARGIN - ACTION_RADIUS;
    const btnAY = H - ACTION_MARGIN - ACTION_RADIUS * 3 - 10;
    const btnBY = H - ACTION_MARGIN - ACTION_RADIUS;

    if (config.buttonA) {
      this.createButton(btnX, btnAY, ACTION_RADIUS, 0x22aa22, 'A', 'a');
    }
    if (config.buttonB) {
      this.createButton(btnX, btnBY, ACTION_RADIUS - 4, 0xaa2222, 'B', 'b');
    }
    if (config.buttonS) {
      this.createButton(btnX - ACTION_RADIUS * 2 - 10, btnAY, ACTION_RADIUS - 4, 0x2266cc, 'S', 's');
    }
  }

  static isTouchDevice(): boolean {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  isDown(key: string): boolean {
    return this.state[key] ?? false;
  }

  justDown(key: string): boolean {
    const curr = this.state[key] ?? false;
    const prev = this.prevState[key] ?? false;
    return curr && !prev;
  }

  update() {
    for (const key of Object.keys(this.state)) {
      this.prevState[key] = this.state[key];
    }
  }

  destroy() {
    for (const el of this.elements) {
      el.destroy();
    }
    this.elements = [];
    this.state = {};
    this.prevState = {};
  }

  isActive(): boolean {
    return this.active;
  }

  private createDPad(cx: number, cy: number) {
    const s = DPAD_BTN;
    const g = DPAD_GAP;
    const halfS = s / 2;
    const offset = halfS + g + halfS; // center of adjacent button

    // Background rounded rect
    const bgSize = s * 3 + g * 2 + 16;
    const bg = this.scene.add.rectangle(cx, cy, bgSize, bgSize, 0x000000, 0.2)
      .setDepth(DEPTH - 1).setScrollFactor(0);
    this.elements.push(bg);

    // Up
    this.createDPadButton(cx, cy - offset, s, s, 'up', '\u25B2');
    // Down
    this.createDPadButton(cx, cy + offset, s, s, 'down', '\u25BC');
    // Left
    this.createDPadButton(cx - offset, cy, s, s, 'left', '\u25C0');
    // Right
    this.createDPadButton(cx + offset, cy, s, s, 'right', '\u25B6');
  }

  private createDPadButton(x: number, y: number, w: number, h: number, key: string, label: string) {
    const btn = this.scene.add.rectangle(x, y, w, h, 0xffffff, BTN_ALPHA)
      .setDepth(DEPTH)
      .setInteractive()
      .setScrollFactor(0);

    const text = this.scene.add.text(x, y, label, {
      fontSize: '22px', fontFamily: 'monospace', color: '#ffffff',
    }).setOrigin(0.5).setDepth(DEPTH + 1).setAlpha(0.6).setScrollFactor(0);

    btn.on('pointerdown', () => {
      this.state[key] = true;
      btn.setAlpha(BTN_ALPHA_PRESSED);
    });
    btn.on('pointerup', () => {
      this.state[key] = false;
      btn.setAlpha(BTN_ALPHA);
    });
    btn.on('pointerout', () => {
      this.state[key] = false;
      btn.setAlpha(BTN_ALPHA);
    });

    this.elements.push(btn, text);
  }

  private createButton(x: number, y: number, radius: number, color: number, label: string, key: string) {
    const btn = this.scene.add.circle(x, y, radius, color, BTN_ALPHA)
      .setDepth(DEPTH)
      .setInteractive(
        new Phaser.Geom.Circle(0, 0, radius),
        Phaser.Geom.Circle.Contains,
      )
      .setScrollFactor(0);

    const text = this.scene.add.text(x, y, label, {
      fontSize: '20px', fontFamily: 'monospace', color: '#ffffff',
      fontStyle: 'bold',
    }).setOrigin(0.5).setDepth(DEPTH + 1).setAlpha(0.7).setScrollFactor(0);

    btn.on('pointerdown', () => {
      this.state[key] = true;
      btn.setAlpha(BTN_ALPHA_PRESSED);
    });
    btn.on('pointerup', () => {
      this.state[key] = false;
      btn.setAlpha(BTN_ALPHA);
    });
    btn.on('pointerout', () => {
      this.state[key] = false;
      btn.setAlpha(BTN_ALPHA);
    });

    this.elements.push(btn, text);
  }
}
