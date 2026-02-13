import Phaser from 'phaser';

export interface VirtualPadConfig {
  dpad?: boolean;
  buttonA?: boolean;   // action (SPACE)
  buttonB?: boolean;   // back (ESC)
  buttonS?: boolean;   // swap (S key)
}

const ALPHA = 0.3;
const ALPHA_PRESSED = 0.65;
const DEPTH = 100;

export class VirtualPad {
  private scene: Phaser.Scene;
  private state: Record<string, boolean> = {};
  private justDownFlags: Record<string, boolean> = {};
  private prevState: Record<string, boolean> = {};
  private elements: Phaser.GameObjects.GameObject[] = [];
  private active = false;

  constructor(scene: Phaser.Scene, config: VirtualPadConfig = {}) {
    this.scene = scene;

    if (!VirtualPad.isTouchDevice()) return;
    this.active = true;

    scene.input.addPointer(3);

    const H = scene.scale.height;
    const W = scene.scale.width;

    if (config.dpad !== false) {
      // LEFT SIDE: steering (left / right)
      this.makeRect(60, H - 65, 100, 90, 'left', '\u25C0');
      this.makeRect(170, H - 65, 100, 90, 'right', '\u25B6');

      // RIGHT SIDE: gas / brake
      this.makeRect(W - 100, H - 115, 160, 80, 'up', 'GAS', 0x228822);
      this.makeRect(W - 100, H - 30, 160, 60, 'down', 'BRK', 0x882222);
    }

    // Action buttons — placed above gas/brake on right side
    if (config.buttonA) {
      this.makeCircle(W - 140, H - 190, 34, 0x22aa44, 'A', 'a');
    }
    if (config.buttonB) {
      this.makeCircle(W - 60, H - 190, 28, 0xcc3333, 'B', 'b');
    }
    if (config.buttonS) {
      this.makeCircle(W - 140, H - 260, 28, 0x3366cc, 'S', 's');
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
    return this.justDownFlags[key] ?? false;
  }

  /** Call once per frame BEFORE reading input. Computes justDown then snapshots state. */
  update() {
    for (const key of Object.keys(this.state)) {
      // justDown = currently pressed AND was NOT pressed last frame
      this.justDownFlags[key] = this.state[key] && !this.prevState[key];
      this.prevState[key] = this.state[key];
    }
  }

  destroy() {
    for (const el of this.elements) el.destroy();
    this.elements = [];
    this.state = {};
    this.prevState = {};
    this.justDownFlags = {};
  }

  isActive(): boolean {
    return this.active;
  }

  private makeRect(
    cx: number, cy: number, w: number, h: number,
    key: string, label: string, color = 0xffffff,
  ) {
    const btn = this.scene.add.rectangle(cx, cy, w, h, color, ALPHA)
      .setDepth(DEPTH).setScrollFactor(0).setInteractive();

    const text = this.scene.add.text(cx, cy, label, {
      fontSize: '20px', fontFamily: 'monospace', color: '#ffffff', fontStyle: 'bold',
    }).setOrigin(0.5).setDepth(DEPTH + 1).setAlpha(0.6).setScrollFactor(0);

    this.wire(btn, key);
    this.elements.push(btn, text);
  }

  private makeCircle(
    cx: number, cy: number, r: number,
    color: number, label: string, key: string,
  ) {
    const btn = this.scene.add.circle(cx, cy, r, color, ALPHA)
      .setDepth(DEPTH).setScrollFactor(0)
      .setInteractive(new Phaser.Geom.Circle(0, 0, r), Phaser.Geom.Circle.Contains);

    const text = this.scene.add.text(cx, cy, label, {
      fontSize: '18px', fontFamily: 'monospace', color: '#ffffff', fontStyle: 'bold',
    }).setOrigin(0.5).setDepth(DEPTH + 1).setAlpha(0.7).setScrollFactor(0);

    this.wire(btn, key);
    this.elements.push(btn, text);
  }

  private wire(btn: Phaser.GameObjects.Shape, key: string) {
    // Initialize state so update() sees the key
    this.state[key] = false;
    this.prevState[key] = false;
    this.justDownFlags[key] = false;

    btn.on('pointerdown', () => {
      this.state[key] = true;
      btn.setAlpha(ALPHA_PRESSED);
    });
    btn.on('pointerup', () => {
      this.state[key] = false;
      btn.setAlpha(ALPHA);
    });
    btn.on('pointerout', () => {
      this.state[key] = false;
      btn.setAlpha(ALPHA);
    });
  }
}
