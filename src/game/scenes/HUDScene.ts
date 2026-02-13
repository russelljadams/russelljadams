import Phaser from 'phaser';
import { SCENES } from '../constants';

export class HUDScene extends Phaser.Scene {
  private speedText!: Phaser.GameObjects.Text;
  private promptText!: Phaser.GameObjects.Text;

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

    this.events.on('updatePrompt', (text: string) => {
      this.promptText.setText(text);
      this.promptText.setVisible(text.length > 0);
    });
  }
}
