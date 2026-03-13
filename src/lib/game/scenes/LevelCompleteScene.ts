import Phaser from "phaser";
import { INTERNAL_WIDTH, INTERNAL_HEIGHT } from "../constants";

export default class LevelCompleteScene extends Phaser.Scene {
  constructor() {
    super({ key: "LevelCompleteScene" });
  }

  create(data: { hearts: number; fragments: number; time: number }): void {
    const cx = INTERNAL_WIDTH / 2;
    const cy = INTERNAL_HEIGHT / 2;

    // Background overlay
    this.add.rectangle(cx, cy, INTERNAL_WIDTH, INTERNAL_HEIGHT, 0x1a1a2e, 0.9);

    // Title
    this.add.text(cx, 30, "Level Complete!", {
      fontFamily: "monospace",
      fontSize: "18px",
      color: "#ffaacc",
    }).setOrigin(0.5);

    // Stats
    const stats = [
      `Hearts: ${data.hearts}`,
      `Spirit Fragments: ${data.fragments}/3`,
      `Time: ${Math.floor(data.time / 60)}:${String(data.time % 60).padStart(2, "0")}`,
    ];

    // Rank
    let rank = "C";
    if (data.fragments >= 3 && data.hearts >= 12) rank = "S";
    else if (data.fragments >= 2 && data.hearts >= 8) rank = "A";
    else if (data.fragments >= 1 && data.hearts >= 4) rank = "B";

    stats.push(`Rank: ${rank}`);

    stats.forEach((line, i) => {
      const text = this.add.text(cx, 65 + i * 22, line, {
        fontFamily: "monospace",
        fontSize: "11px",
        color: "#ccbbdd",
      }).setOrigin(0.5).setAlpha(0);

      this.tweens.add({
        targets: text,
        alpha: 1,
        y: text.y - 5,
        duration: 400,
        delay: 200 + i * 150,
      });
    });

    // Rank display (big)
    const rankText = this.add.text(cx, cy + 40, rank, {
      fontFamily: "monospace",
      fontSize: "36px",
      color: rank === "S" ? "#ffdd44" : rank === "A" ? "#44ff88" : rank === "B" ? "#44aaff" : "#aaaaaa",
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: rankText,
      alpha: 1,
      scale: { from: 2, to: 1 },
      duration: 600,
      delay: 800,
    });

    // Replay button
    const replayBtn = this.add.text(cx - 50, INTERNAL_HEIGHT - 35, "Replay", {
      fontFamily: "monospace",
      fontSize: "12px",
      color: "#aaaacc",
      backgroundColor: "#2a2a4e",
      padding: { x: 8, y: 4 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    replayBtn.on("pointerdown", () => {
      this.scene.start("Level1Scene");
    });

    // Back button
    const backBtn = this.add.text(cx + 50, INTERNAL_HEIGHT - 35, "Back", {
      fontFamily: "monospace",
      fontSize: "12px",
      color: "#aaaacc",
      backgroundColor: "#2a2a4e",
      padding: { x: 8, y: 4 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    backBtn.on("pointerdown", () => {
      // Emit event for React wrapper to catch
      this.game.events.emit("back-to-dashboard");
    });
  }
}
