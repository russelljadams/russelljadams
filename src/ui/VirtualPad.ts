import Phaser from 'phaser';

export interface VirtualPadConfig {
  dpad?: boolean;
  buttonA?: boolean;   // action (SPACE)
  buttonB?: boolean;   // back (ESC)
  buttonS?: boolean;   // swap (S key)
}

const BTN_ALPHA = 0.3;
const BTN_ALPHA_PRESSED = 0.6;
const DEPTH = 100;

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

    // Enable multi-touch
    scene.input.addPointer(2);

    const H = scene.scale.height;
    const W = scene.scale.width;

    if (config.dpad !== false) {
      this.createDPad(90, H - 100);
    }
    if (config.buttonA) {
      this.createButton(W - 80, H - 120, 30, 0x22aa22, 'A', 'a');
    }
    if (config.buttonB) {
      this.createButton(W - 80, H - 50, 24, 0xaa2222, 'B', 'b');
    }
    if (config.buttonS) {
      this.createButton(W - 160, H - 85, 22, 0x2266cc, 'S', 's');
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
    // Snapshot previous state for justDown detection
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
    const size = 40;
    const gap = 4;

    // Background circle
    const bg = this.scene.add.circle(cx, cy, 70, 0x000000, 0.15)
      .setDepth(DEPTH - 1);
    this.elements.push(bg);

    // Up
    this.createDPadButton(cx, cy - size - gap, size, size, 'up', '\u25B2');
    // Down
    this.createDPadButton(cx, cy + size + gap, size, size, 'down', '\u25BC');
    // Left
    this.createDPadButton(cx - size - gap, cy, size, size, 'left', '\u25C0');
    // Right
    this.createDPadButton(cx + size + gap, cy, size, size, 'right', '\u25B6');
  }

  private createDPadButton(x: number, y: number, w: number, h: number, key: string, label: string) {
    const btn = this.scene.add.rectangle(x, y, w, h, 0xffffff, BTN_ALPHA)
      .setDepth(DEPTH)
      .setInteractive()
      .setScrollFactor(0);

    const text = this.scene.add.text(x, y, label, {
      fontSize: '18px', fontFamily: 'monospace', color: '#ffffff',
    }).setOrigin(0.5).setDepth(DEPTH + 1).setAlpha(0.5).setScrollFactor(0);

    btn.setScrollFactor(0);

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
      fontSize: '16px', fontFamily: 'monospace', color: '#ffffff',
      fontStyle: 'bold',
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
}
