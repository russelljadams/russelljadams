import Phaser from "phaser";
import { INTERNAL_WIDTH, INTERNAL_HEIGHT } from "../constants";
import SaveManager from "../systems/SaveManager";

interface LevelCompleteData {
  levelKey: string;
  hearts: number;
  fragments: number;
  time: number;
}

export default class LevelCompleteScene extends Phaser.Scene {
  constructor() {
    super({ key: "LevelCompleteScene" });
  }

  create(data: LevelCompleteData): void {
    const cx = INTERNAL_WIDTH / 2;

    // Calculate rank
    let rank = "C";
    if (data.fragments >= 3 && data.hearts >= 12) rank = "S";
    else if (data.fragments >= 2 && data.hearts >= 8) rank = "A";
    else if (data.fragments >= 1 && data.hearts >= 4) rank = "B";

    // Save progress
    SaveManager.completeLevel(data.levelKey, rank, data.hearts, data.fragments);

    // Background overlay
    this.add.rectangle(cx, INTERNAL_HEIGHT / 2, INTERNAL_WIDTH, INTERNAL_HEIGHT, 0x1a1a2e, 0.92);

    this.add.text(cx, 24, "Level Complete\!", {
      fontFamily: "monospace", fontSize: "16px", color: "#ffaacc",
    }).setOrigin(0.5);

    const rankColor = rank === "S" ? "#ffdd44" : rank === "A" ? "#44ff88" : rank === "B" ? "#44aaff" : "#aaaaaa";

    this.add.text(cx, 60, rank, {
      fontFamily: "monospace", fontSize: "32px", color: rankColor,
    }).setOrigin(0.5);

    const timeStr = `${Math.floor(data.time / 60)}:${String(data.time % 60).padStart(2, "0")}`;
    this.add.text(cx, 95, `Hearts: ${data.hearts}  |  Fragments: ${data.fragments}/3  |  ${timeStr}`, {
      fontFamily: "monospace", fontSize: "8px", color: "#ccbbdd",
    }).setOrigin(0.5);

    const btnY = INTERNAL_HEIGHT - 50;

    this.createButton(cx - 60, btnY, "Replay", () => {
      this.scene.start(data.levelKey);
    });

    this.createButton(cx + 60, btnY, "World Map", () => {
      this.scene.start("WorldMapScene");
    });
  }

  private createButton(x: number, y: number, label: string, callback: () => void): void {
    const bg = this.add.rectangle(0, 0, 100, 40, 0x3a2a5e, 1);
    const text = this.add.text(0, 0, label, {
      fontFamily: "monospace", fontSize: "13px", color: "#ddccff",
    }).setOrigin(0.5);

    const container = this.add.container(x, y, [bg, text]);
    container.setSize(100, 40);
    container.setInteractive(
      new Phaser.Geom.Rectangle(-50, -20, 100, 40),
      Phaser.Geom.Rectangle.Contains
    );

    container.on("pointerdown", () => {
      bg.setFillStyle(0x5a4a8e, 1);
      this.time.delayedCall(100, callback);
    });
  }
}
