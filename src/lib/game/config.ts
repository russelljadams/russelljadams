import { GRAVITY, INTERNAL_WIDTH, INTERNAL_HEIGHT } from "./constants";

export function createGameConfig(parent: HTMLElement): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent,
    width: INTERNAL_WIDTH,
    height: INTERNAL_HEIGHT,
    pixelArt: true,
    backgroundColor: "#1a1a2e",
    physics: {
      default: "arcade",
      arcade: {
        gravity: { x: 0, y: GRAVITY },
        debug: false,
      },
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    input: {
      activePointers: 3,
    },
    scene: [], // scenes added dynamically after import
  };
}
