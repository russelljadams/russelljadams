import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { TitleScene } from './scenes/TitleScene';
import { OverworldScene } from './scenes/OverworldScene';
import { HUDScene } from './scenes/HUDScene';
import { GarageScene } from './scenes/GarageScene';
import { OfficeScene } from './scenes/OfficeScene';
import { MailroomScene } from './scenes/MailroomScene';
import { ArcadeScene } from './scenes/ArcadeScene';
import { DepotScene } from './scenes/DepotScene';
import { RacetrackScene } from './scenes/RacetrackScene';
import { DeliveryScene } from './scenes/DeliveryScene';

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 800,
  height: 600,
  pixelArt: true,
  backgroundColor: '#1a1a2e',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [
    BootScene,
    TitleScene,
    OverworldScene,
    HUDScene,
    GarageScene,
    OfficeScene,
    MailroomScene,
    ArcadeScene,
    DepotScene,
    RacetrackScene,
    DeliveryScene,
  ],
};
