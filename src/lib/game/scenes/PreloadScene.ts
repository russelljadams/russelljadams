import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  create(): void {
    // All placeholder assets are generated in BootScene
    // In future phases, this scene will load real sprite sheets and tilemaps
    const text = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "GG's Heart",
      { fontFamily: "monospace", fontSize: "24px", color: "#ffaacc" }
    ).setOrigin(0.5);

    this.tweens.add({
      targets: text,
      alpha: { from: 0.3, to: 1 },
      duration: 800,
      yoyo: true,
      onComplete: () => {
        this.scene.start("Level1Scene");
      },
    });
  }
}
