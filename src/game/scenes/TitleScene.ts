import Phaser from 'phaser';
import { SCENES, EXPERIMENT_URL, NAV_TARGETS } from '../constants';

export class TitleScene extends Phaser.Scene {
  constructor() {
    super(SCENES.TITLE);
  }

  create() {
    const { width, height } = this.scale;

    this.cameras.main.setBackgroundColor('#0f0f23');

    // Title
    this.add.text(width / 2, height * 0.15, 'RUSSELL J ADAMS', {
      fontSize: '36px',
      fontFamily: 'monospace',
      color: '#ffffff',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Divider
    this.add.text(width / 2, height * 0.22, '─────────────────────', {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: '#dd2222',
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(width / 2, height * 0.28, 'INTERACTIVE PORTFOLIO', {
      fontSize: '16px',
      fontFamily: 'monospace',
      color: '#aaaaaa',
    }).setOrigin(0.5);

    // NOW OPEN banner
    const banner = this.add.text(
      width / 2, height * 0.38,
      '>>> THE EXPERIMENT \u2014 NOW OPEN! <<<',
      {
        fontSize: '15px',
        fontFamily: 'monospace',
        color: '#00ff88',
        fontStyle: 'bold',
      },
    ).setOrigin(0.5).setInteractive({ useHandCursor: true });

    banner.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      pointer.event.stopPropagation();
      window.open(EXPERIMENT_URL, '_blank');
    });

    // Pulse/glow tween on the banner
    this.tweens.add({
      targets: banner,
      alpha: 0.4,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Controls
    this.add.text(width / 2, height * 0.52, [
      'Arrow Keys ........ Drive',
      'SPACE .. Enter / DRS / Throw',
      'ESC .............. Exit Room',
    ], {
      fontSize: '13px',
      fontFamily: 'monospace',
      color: '#555555',
      lineSpacing: 4,
    }).setOrigin(0.5);

    // Inline nav links
    const navItems = NAV_TARGETS.filter(t => !t.highlight); // skip "The Experiment" (already in banner)
    const navLabels = navItems.map(t => t.label);
    const navStr = navLabels.join('  \u00b7  ');

    // We need individual hit areas, so render each separately
    const totalWidth = navStr.length * 7.8; // approximate monospace char width at 13px
    let curX = width / 2 - totalWidth / 2;
    const navY = height * 0.67;

    navItems.forEach((target, i) => {
      const label = target.label;
      const item = this.add.text(curX, navY, label, {
        fontSize: '13px',
        fontFamily: 'monospace',
        color: '#888888',
      }).setInteractive({ useHandCursor: true });

      item.on('pointerover', () => item.setColor('#ffffff'));
      item.on('pointerout', () => item.setColor('#888888'));
      item.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
        pointer.event.stopPropagation();
        if (target.scene) {
          this.scene.start(target.scene, {
            returnX: 15 * 32,
            returnY: 13 * 32,
            vehicleType: 'car',
            deliveries: 0,
          });
        }
      });

      curX += label.length * 7.8;

      // Add separator dot after all but last
      if (i < navItems.length - 1) {
        this.add.text(curX, navY, '  \u00b7  ', {
          fontSize: '13px',
          fontFamily: 'monospace',
          color: '#444444',
        });
        curX += 5 * 7.8; // "  ·  " is 5 chars
      }
    });

    // "Drive to buildings and explore inside"
    this.add.text(width / 2, height * 0.75, 'Drive to buildings and explore inside', {
      fontSize: '13px',
      fontFamily: 'monospace',
      color: '#666666',
    }).setOrigin(0.5);

    // Press Enter / Tap to start
    const isMobile = ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    const startLabel = isMobile ? '[ TAP TO START ]' : '[ PRESS ENTER TO START ]';

    const start = this.add.text(width / 2, height * 0.87, startLabel, {
      fontSize: '16px',
      fontFamily: 'monospace',
      color: '#ffcc00',
    }).setOrigin(0.5);

    this.tweens.add({
      targets: start,
      alpha: 0.2,
      duration: 700,
      yoyo: true,
      repeat: -1,
    });

    // ENTER to start
    this.input.keyboard?.on('keydown-ENTER', () => {
      this.scene.start(SCENES.OVERWORLD);
    });

    // Tap-to-start on mobile (background only — nav items stop propagation)
    this.input.on('pointerdown', () => {
      this.scene.start(SCENES.OVERWORLD);
    });
  }
}
