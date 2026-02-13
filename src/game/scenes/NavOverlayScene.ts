import Phaser from 'phaser';
import { SCENES, NAV_TARGETS } from '../constants';

export class NavOverlayScene extends Phaser.Scene {
  constructor() {
    super(SCENES.NAV_OVERLAY);
  }

  create() {
    const { width, height } = this.scale;

    // Semi-transparent backdrop — click to close
    const backdrop = this.add.rectangle(0, 0, width, height, 0x000000, 0.75)
      .setOrigin(0, 0)
      .setInteractive();
    backdrop.on('pointerdown', () => this.closeNav());

    // Title
    this.add.text(width / 2, height * 0.18, 'NAVIGATE', {
      fontSize: '24px',
      fontFamily: 'monospace',
      color: '#ffffff',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Divider
    this.add.text(width / 2, height * 0.25, '────────────────', {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: '#dd2222',
    }).setOrigin(0.5);

    // Nav items
    const startY = height * 0.34;
    const spacing = 50;

    NAV_TARGETS.forEach((target, i) => {
      const y = startY + i * spacing;
      const isHighlight = target.highlight;

      const label = isHighlight ? `${target.label}  NEW` : target.label;
      const color = isHighlight ? '#00ff88' : '#cccccc';

      const item = this.add.text(width / 2, y, label, {
        fontSize: '18px',
        fontFamily: 'monospace',
        color,
        backgroundColor: '#ffffff11',
        padding: { x: 40, y: 10 },
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });

      item.on('pointerover', () => {
        item.setColor('#ffffff');
        item.setBackgroundColor('#ffffff33');
      });
      item.on('pointerout', () => {
        item.setColor(color);
        item.setBackgroundColor('#ffffff11');
      });

      item.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
        pointer.event.stopPropagation();
        if (target.url) {
          window.open(target.url, '_blank');
        } else if (target.scene) {
          this.navigateToScene(target.scene);
        }
      });
    });

    // Close hint
    this.add.text(width / 2, height * 0.88, 'ESC or click backdrop to close', {
      fontSize: '11px',
      fontFamily: 'monospace',
      color: '#555555',
    }).setOrigin(0.5);

    // ESC to close
    this.input.keyboard?.on('keydown-ESC', () => this.closeNav());
  }

  private closeNav() {
    this.scene.get(SCENES.HUD)?.events.emit('navClosed');
    const overworld = this.scene.get(SCENES.OVERWORLD);
    if (overworld?.scene.isActive()) {
      overworld.events.emit('navClosed');
    }
    this.scene.stop();
  }

  private navigateToScene(sceneKey: string) {
    // Stop overlay
    this.scene.get(SCENES.HUD)?.events.emit('navClosed');

    // If overworld is running, stop it and HUD
    const overworld = this.scene.get(SCENES.OVERWORLD);
    if (overworld?.scene.isActive()) {
      overworld.events.emit('navClosed');
      this.scene.stop(SCENES.HUD);
      this.scene.stop(SCENES.OVERWORLD);
    }

    // If we're on the title screen, stop it
    const title = this.scene.get(SCENES.TITLE);
    if (title?.scene.isActive()) {
      this.scene.stop(SCENES.TITLE);
    }

    this.scene.stop();

    // Start the target interior scene with default spawn
    this.scene.start(sceneKey, {
      returnX: 15 * 32,
      returnY: 13 * 32,
      vehicleType: 'car',
      deliveries: 0,
    });
  }
}
