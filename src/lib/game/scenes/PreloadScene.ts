import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  create(): void {
    console.log("[GGsHeart] PreloadScene — starting Level1Scene");
    
    // Skip the fancy title, go straight to game
    this.scene.start("Level1Scene");
  }
}
