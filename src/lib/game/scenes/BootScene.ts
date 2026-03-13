import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  preload(): void {
    this.generatePlaceholderAssets();
  }

  create(): void {
    // Quick sanity test - show text then proceed
    console.log("[GGsHeart] BootScene created, assets generated");
    this.scene.start("PreloadScene");
  }

  private generatePlaceholderAssets(): void {
    const g = this.make.graphics({ x: 0, y: 0 });

    // Ghost Boy — 32x32
    g.clear();
    g.fillStyle(0xccddff);
    g.fillRoundedRect(4, 2, 24, 22, 8);
    g.fillTriangle(4, 22, 10, 30, 16, 22);
    g.fillTriangle(16, 22, 22, 30, 28, 22);
    g.fillStyle(0x3344aa);
    g.fillCircle(12, 12, 3);
    g.fillCircle(20, 12, 3);
    g.generateTexture("ghostboy", 32, 32);

    // Shade Wisp — 24x24
    g.clear();
    g.fillStyle(0x9944cc);
    g.fillCircle(12, 12, 10);
    g.fillStyle(0xff44ff, 0.5);
    g.fillCircle(10, 9, 3);
    g.generateTexture("shade_wisp", 24, 24);

    // Heart — 16x16
    g.clear();
    g.fillStyle(0xff6699);
    g.fillCircle(5, 5, 4);
    g.fillCircle(11, 5, 4);
    g.fillTriangle(1, 7, 8, 15, 15, 7);
    g.generateTexture("heart", 16, 16);

    // Checkpoint
    g.clear();
    g.fillStyle(0x888888);
    g.fillRect(2, 0, 2, 32);
    g.fillStyle(0xff4444);
    g.fillTriangle(4, 0, 14, 6, 4, 12);
    g.generateTexture("checkpoint", 16, 32);

    // Checkpoint active
    g.clear();
    g.fillStyle(0xaaaaaa);
    g.fillRect(2, 0, 2, 32);
    g.fillStyle(0x44ff44);
    g.fillTriangle(4, 0, 14, 6, 4, 12);
    g.generateTexture("checkpoint_active", 16, 32);

    // Shrine
    g.clear();
    g.fillStyle(0xffaacc);
    g.fillTriangle(16, 2, 4, 30, 28, 30);
    g.fillStyle(0xffffff, 0.4);
    g.fillTriangle(16, 8, 10, 26, 22, 26);
    g.generateTexture("shrine", 32, 32);

    // Spirit Fragment
    g.clear();
    g.fillStyle(0x44aaff);
    g.fillTriangle(6, 0, 0, 12, 12, 12);
    g.generateTexture("spirit_fragment", 12, 12);

    // Heart icons
    g.clear();
    g.fillStyle(0xff3366);
    g.fillCircle(4, 4, 3);
    g.fillCircle(8, 4, 3);
    g.fillTriangle(1, 5, 6, 11, 11, 5);
    g.generateTexture("heart_icon", 12, 12);

    g.clear();
    g.lineStyle(1, 0xff3366, 0.5);
    g.strokeCircle(4, 4, 3);
    g.strokeCircle(8, 4, 3);
    g.generateTexture("heart_icon_empty", 12, 12);

    // Ground tile
    g.clear();
    g.fillStyle(0x5a4a3a);
    g.fillRect(0, 0, 32, 32);
    g.fillStyle(0x6b5b4b);
    g.fillRect(1, 1, 30, 4);
    g.generateTexture("tile_ground", 32, 32);

    // Surface tile
    g.clear();
    g.fillStyle(0x5a4a3a);
    g.fillRect(0, 4, 32, 28);
    g.fillStyle(0x44aa55);
    g.fillRect(0, 0, 32, 6);
    g.generateTexture("tile_surface", 32, 32);

    // Spikes
    g.clear();
    g.fillStyle(0xcc4444);
    g.fillTriangle(0, 32, 8, 4, 16, 32);
    g.fillTriangle(16, 32, 24, 4, 32, 32);
    g.generateTexture("tile_spikes", 32, 32);

    // Particle
    g.clear();
    g.fillStyle(0xffffff);
    g.fillCircle(2, 2, 2);
    g.generateTexture("particle", 4, 4);

    g.destroy();
  }
}
