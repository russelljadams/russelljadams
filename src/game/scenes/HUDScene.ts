import Phaser from 'phaser';
import { SCENES, VehicleType } from '../constants';

export class HUDScene extends Phaser.Scene {
  private speedText!: Phaser.GameObjects.Text;
  private promptText!: Phaser.GameObjects.Text;
  private vehicleText!: Phaser.GameObjects.Text;
  private deliveryText!: Phaser.GameObjects.Text;
  private drsText!: Phaser.GameObjects.Text;
  private navButton!: Phaser.GameObjects.Text;
  private navOpen = false;

  constructor() {
    super(SCENES.HUD);
  }

  create() {
    this.speedText = this.add.text(10, 10, 'Speed: 0', {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: '#ffffff',
      backgroundColor: '#000000aa',
      padding: { x: 6, y: 3 },
    });

    this.vehicleText = this.add.text(10, 35, '', {
      fontSize: '12px',
      fontFamily: 'monospace',
      color: '#aaaaaa',
      backgroundColor: '#000000aa',
      padding: { x: 6, y: 3 },
    }).setVisible(false);

    this.deliveryText = this.add.text(10, 57, '', {
      fontSize: '12px',
      fontFamily: 'monospace',
      color: '#ff9900',
      backgroundColor: '#000000aa',
      padding: { x: 6, y: 3 },
    }).setVisible(false);

    this.promptText = this.add.text(400, 575, '', {
      fontSize: '16px',
      fontFamily: 'monospace',
      color: '#ffcc00',
      backgroundColor: '#000000cc',
      padding: { x: 10, y: 5 },
    }).setOrigin(0.5);

    this.events.on('updateSpeed', (speed: number) => {
      this.speedText.setText(`Speed: ${Math.floor(speed)}`);
    });

    this.events.on('updatePrompt', (text: string, color?: string) => {
      this.promptText.setText(text);
      this.promptText.setVisible(text.length > 0);
      if (color) {
        this.promptText.setColor(color);
      } else {
        this.promptText.setColor('#ffcc00');
      }
    });

    this.events.on('updateVehicle', (type: VehicleType) => {
      const label = type === 'van' ? 'DELIVERY VAN' : 'F1 CAR';
      this.vehicleText.setText(label);
      this.vehicleText.setVisible(true);
      // Show delivery counter only when in van, DRS only when in car
      this.deliveryText.setVisible(type === 'van');
      this.drsText.setVisible(type === 'car');
    });

    this.drsText = this.add.text(10, 57, '', {
      fontSize: '12px',
      fontFamily: 'monospace',
      color: '#00ccff',
      backgroundColor: '#000000aa',
      padding: { x: 6, y: 3 },
    }).setVisible(false);

    this.events.on('updateDeliveries', (count: number) => {
      this.deliveryText.setText(`Deliveries: ${count}`);
    });

    this.events.on('updateDrs', (active: boolean, cooldownPercent: number) => {
      if (active) {
        this.drsText.setText('DRS ACTIVE');
        this.drsText.setColor('#00ff00');
        this.drsText.setVisible(true);
      } else if (cooldownPercent < 1) {
        const pct = Math.floor(cooldownPercent * 100);
        this.drsText.setText(`DRS ${pct}%`);
        this.drsText.setColor('#ffaa00');
        this.drsText.setVisible(true);
      } else {
        this.drsText.setText('DRS READY');
        this.drsText.setColor('#00ccff');
        this.drsText.setVisible(true);
      }
    });

    // [NAV] button top-right
    this.navButton = this.add.text(790, 10, '[NAV]', {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: '#ffffff',
      backgroundColor: '#000000aa',
      padding: { x: 6, y: 3 },
    }).setOrigin(1, 0).setInteractive({ useHandCursor: true });

    this.navButton.on('pointerdown', () => this.openNav());

    // TAB key to open nav
    this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.TAB)
      .on('down', (event: KeyboardEvent) => {
        event.preventDefault();
        this.openNav();
      });

    // Re-enable button when nav closes
    this.events.on('navClosed', () => {
      this.navOpen = false;
      this.navButton.setColor('#ffffff');
    });
  }

  private openNav() {
    if (this.navOpen) return;
    this.navOpen = true;
    this.navButton.setColor('#555555');
    // Notify overworld to pause
    const overworld = this.scene.get(SCENES.OVERWORLD);
    if (overworld?.scene.isActive()) {
      overworld.events.emit('navOpened');
    }
    this.scene.launch(SCENES.NAV_OVERLAY);
  }
}
