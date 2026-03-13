import Phaser from "phaser";
import { INTERNAL_WIDTH, INTERNAL_HEIGHT } from "../constants";

export default class LevelCompleteScene extends Phaser.Scene {
  constructor() {
    super({ key: "LevelCompleteScene" });
  }

  create(data: { hearts: number; fragments: number; time: number }): void {
    const cx = INTERNAL_WIDTH / 2;

    this.add.rectangle(cx, INTERNAL_HEIGHT / 2, INTERNAL_WIDTH, INTERNAL_HEIGHT, 0x1a1a2e, 0.92);

    this.add.text(cx, 24, "Level Complete!", {
      fontFamily: "monospace", fontSize: "16px", color: "#ffaacc",
    }).setOrigin(0.5);

    let rank = "C";
    if (data.fragments >= 3 && data.hearts >= 12) rank = "S";
    else if (data.fragments >= 2 && data.hearts >= 8) rank = "A";
    else if (data.fragments >= 1 && data.hearts >= 4) rank = "B";

    const rankColor = rank === "S" ? "#ffdd44" : rank === "A" ? "#44ff88" : rank === "B" ? "#44aaff" : "#aaaaaa";

    this.add.text(cx, 60, rank, {
      fontFamily: "monospace", fontSize: "32px", color: rankColor,
    }).setOrigin(0.5);

    const timeStr = `${Math.floor(data.time / 60)}:${String(data.time % 60).padStart(2, "0")}`;
    this.add.text(cx, 95, `Hearts: ${data.hearts}  |  Fragments: ${data.fragments}/3  |  ${timeStr}`, {
      fontFamily: "monospace", fontSize: "8px", color: "#ccbbdd",
    }).setOrigin(0.5);

    // Buttons — use pointerdown (not pointerup) for reliable mobile touch
    // No animations that move position — keeps hitbox aligned
    const btnY = INTERNAL_HEIGHT - 50;

    this.createButton(cx - 60, btnY, "Replay", () => {
      this.scene.start("Level1Scene");
    });

    this.createButton(cx + 60, btnY, "Back", () => {
      this.game.events.emit("back-to-dashboard");
    });
  }

  private createButton(x: number, y: number, label: string, callback: () => void): void {
    // Container approach — everything moves together, single hitbox
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

    // Use pointerdown — fires immediately on touch, no lift required
    container.on("pointerdown", () => {
      bg.setFillStyle(0x5a4a8e, 1);
      // Small delay so user sees the press feedback
      this.time.delayedCall(100, callback);
    });
  }
}
