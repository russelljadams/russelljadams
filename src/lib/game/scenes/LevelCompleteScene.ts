import Phaser from "phaser";
import { INTERNAL_WIDTH, INTERNAL_HEIGHT } from "../constants";

export default class LevelCompleteScene extends Phaser.Scene {
  constructor() {
    super({ key: "LevelCompleteScene" });
  }

  create(data: { hearts: number; fragments: number; time: number }): void {
    const cx = INTERNAL_WIDTH / 2;

    // Background
    this.add.rectangle(cx, INTERNAL_HEIGHT / 2, INTERNAL_WIDTH, INTERNAL_HEIGHT, 0x1a1a2e, 0.92);

    // Title
    this.add.text(cx, 24, "Level Complete!", {
      fontFamily: "monospace", fontSize: "16px", color: "#ffaacc",
    }).setOrigin(0.5);

    // Rank
    let rank = "C";
    if (data.fragments >= 3 && data.hearts >= 12) rank = "S";
    else if (data.fragments >= 2 && data.hearts >= 8) rank = "A";
    else if (data.fragments >= 1 && data.hearts >= 4) rank = "B";

    const rankColor = rank === "S" ? "#ffdd44" : rank === "A" ? "#44ff88" : rank === "B" ? "#44aaff" : "#aaaaaa";

    // Big rank
    const rankText = this.add.text(cx, 60, rank, {
      fontFamily: "monospace", fontSize: "32px", color: rankColor,
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: rankText, alpha: 1, scale: { from: 2, to: 1 },
      duration: 500, delay: 300,
    });

    // Stats
    const timeStr = `${Math.floor(data.time / 60)}:${String(data.time % 60).padStart(2, "0")}`;
    const statsText = `Hearts: ${data.hearts}  |  Fragments: ${data.fragments}/3  |  ${timeStr}`;
    this.add.text(cx, 95, statsText, {
      fontFamily: "monospace", fontSize: "8px", color: "#ccbbdd",
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: this.children.list[this.children.list.length - 1],
      alpha: 1, duration: 400, delay: 600,
    });

    // Buttons — big, tappable, with visible hit areas
    const btnY = INTERNAL_HEIGHT - 55;
    const btnW = 100;
    const btnH = 36;

    // Replay button
    const replayBg = this.add.rectangle(cx - 60, btnY, btnW, btnH, 0x3a2a5e, 1)
      .setInteractive({ useHandCursor: true })
      .setOrigin(0.5);
    this.add.text(cx - 60, btnY, "Replay", {
      fontFamily: "monospace", fontSize: "13px", color: "#ddccff",
    }).setOrigin(0.5);

    replayBg.on("pointerdown", () => {
      replayBg.setFillStyle(0x5a4a8e, 1);
    });
    replayBg.on("pointerup", () => {
      this.scene.start("Level1Scene");
    });

    // Back button
    const backBg = this.add.rectangle(cx + 60, btnY, btnW, btnH, 0x3a2a5e, 1)
      .setInteractive({ useHandCursor: true })
      .setOrigin(0.5);
    this.add.text(cx + 60, btnY, "Back", {
      fontFamily: "monospace", fontSize: "13px", color: "#ddccff",
    }).setOrigin(0.5);

    backBg.on("pointerdown", () => {
      backBg.setFillStyle(0x5a4a8e, 1);
    });
    backBg.on("pointerup", () => {
      this.game.events.emit("back-to-dashboard");
    });

    // Button fade in
    [replayBg, backBg].forEach((btn, i) => {
      btn.setAlpha(0);
      btn.parentContainer;
      this.tweens.add({
        targets: btn, alpha: 1, y: btn.y - 5,
        duration: 400, delay: 800 + i * 100,
      });
    });
  }
}
