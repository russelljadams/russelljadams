import Phaser from 'phaser';
import { SCENES } from '../constants';

export class TitleScene extends Phaser.Scene {
  constructor() {
    super(SCENES.TITLE);
  }

  create() {
    const { width, height } = this.scale;

    this.cameras.main.setBackgroundColor('#0f0f23');

    this.add.text(width / 2, height * 0.28, 'RUSSELL J ADAMS', {
      fontSize: '36px',
      fontFamily: 'monospace',
      color: '#ffffff',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(width / 2, height * 0.37, '─────────────────────', {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: '#dd2222',
    }).setOrigin(0.5);

    this.add.text(width / 2, height * 0.44, 'INTERACTIVE PORTFOLIO', {
      fontSize: '16px',
      fontFamily: 'monospace',
      color: '#aaaaaa',
    }).setOrigin(0.5);

    this.add.text(width / 2, height * 0.56, 'Drive to buildings and explore inside', {
      fontSize: '13px',
      fontFamily: 'monospace',
      color: '#666666',
    }).setOrigin(0.5);

    this.add.text(width / 2, height * 0.67, [
      'Arrow Keys ........ Drive',
      'SPACE ............ Enter',
    ], {
      fontSize: '13px',
      fontFamily: 'monospace',
      color: '#555555',
      lineSpacing: 4,
    }).setOrigin(0.5);

    const start = this.add.text(width / 2, height * 0.82, '[ PRESS ENTER TO START ]', {
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

    this.input.keyboard?.on('keydown-ENTER', () => {
      this.scene.start(SCENES.OVERWORLD);
    });
  }
}
