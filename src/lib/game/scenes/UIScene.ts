import Phaser from "phaser";
import { MAX_HP, INTERNAL_WIDTH } from "../constants";

export default class UIScene extends Phaser.Scene {
  private heartIcons: Phaser.GameObjects.Image[] = [];
  private heartsText!: Phaser.GameObjects.Text;
  private currentHP: number = MAX_HP;

  // Touch controls
  private leftZone!: Phaser.GameObjects.Rectangle;
  private rightZone!: Phaser.GameObjects.Rectangle;
  private jumpBtn!: Phaser.GameObjects.Arc;
  private attackBtn!: Phaser.GameObjects.Arc;

  constructor() {
    super({ key: "UIScene" });
  }

  create(): void {
    // HP Hearts
    for (let i = 0; i < MAX_HP; i++) {
      const icon = this.add.image(8 + i * 14, 8, "heart_icon").setOrigin(0, 0).setScrollFactor(0);
      this.heartIcons.push(icon);
    }

    // Hearts collected counter
    this.heartsText = this.add.text(INTERNAL_WIDTH - 8, 8, "0", {
      fontFamily: "monospace",
      fontSize: "10px",
      color: "#ff6699",
    }).setOrigin(1, 0).setScrollFactor(0);

    // Listen to game scene events
    const level = this.scene.get("Level1Scene");
    level.events.on("player-damaged", (hp: number) => {
      this.currentHP = hp;
      this.updateHearts();
    });
    level.events.on("hearts-updated", (count: number) => {
      this.heartsText.setText(String(count));
    });

    // Touch controls
    this.createTouchControls();
  }

  private updateHearts(): void {
    for (let i = 0; i < this.heartIcons.length; i++) {
      this.heartIcons[i].setTexture(i < this.currentHP ? "heart_icon" : "heart_icon_empty");
    }
  }

  private createTouchControls(): void {
    const W = INTERNAL_WIDTH;
    const H = 270;

    // Left button — bottom-left
    this.leftZone = this.add.rectangle(40, H - 30, 50, 40, 0xffffff, 0.08)
      .setInteractive()
      .setScrollFactor(0)
      .setDepth(100);

    // Right button — next to left
    this.rightZone = this.add.rectangle(100, H - 30, 50, 40, 0xffffff, 0.08)
      .setInteractive()
      .setScrollFactor(0)
      .setDepth(100);

    // Jump button — bottom-right (large)
    this.jumpBtn = this.add.circle(W - 50, H - 35, 24, 0xffffff, 0.1)
      .setInteractive()
      .setScrollFactor(0)
      .setDepth(100);

    // Attack button — above jump
    this.attackBtn = this.add.circle(W - 100, H - 55, 18, 0xff6699, 0.1)
      .setInteractive()
      .setScrollFactor(0)
      .setDepth(100);

    // Labels
    this.add.text(40, H - 30, "◀", { fontSize: "12px", color: "#ffffff" })
      .setOrigin(0.5).setScrollFactor(0).setDepth(101).setAlpha(0.4);
    this.add.text(100, H - 30, "▶", { fontSize: "12px", color: "#ffffff" })
      .setOrigin(0.5).setScrollFactor(0).setDepth(101).setAlpha(0.4);
    this.add.text(W - 50, H - 35, "⬆", { fontSize: "14px", color: "#ffffff" })
      .setOrigin(0.5).setScrollFactor(0).setDepth(101).setAlpha(0.4);
    this.add.text(W - 100, H - 55, "⚡", { fontSize: "10px", color: "#ff6699" })
      .setOrigin(0.5).setScrollFactor(0).setDepth(101).setAlpha(0.4);

    // Touch input handling
    const level = this.scene.get("Level1Scene");

    // Left
    this.leftZone.on("pointerdown", () => {
      const player = (level as any).player;
      if (player) player.touchLeft = true;
      this.leftZone.setFillStyle(0xffffff, 0.2);
    });
    this.leftZone.on("pointerup", () => {
      const player = (level as any).player;
      if (player) player.touchLeft = false;
      this.leftZone.setFillStyle(0xffffff, 0.08);
    });
    this.leftZone.on("pointerout", () => {
      const player = (level as any).player;
      if (player) player.touchLeft = false;
      this.leftZone.setFillStyle(0xffffff, 0.08);
    });

    // Right
    this.rightZone.on("pointerdown", () => {
      const player = (level as any).player;
      if (player) player.touchRight = true;
      this.rightZone.setFillStyle(0xffffff, 0.2);
    });
    this.rightZone.on("pointerup", () => {
      const player = (level as any).player;
      if (player) player.touchRight = false;
      this.rightZone.setFillStyle(0xffffff, 0.08);
    });
    this.rightZone.on("pointerout", () => {
      const player = (level as any).player;
      if (player) player.touchRight = false;
      this.rightZone.setFillStyle(0xffffff, 0.08);
    });

    // Jump
    this.jumpBtn.on("pointerdown", () => {
      const player = (level as any).player;
      if (player) {
        player.touchJump = true;
        player.touchJumpJustPressed = true;
      }
      this.jumpBtn.setFillStyle(0xffffff, 0.25);
    });
    this.jumpBtn.on("pointerup", () => {
      const player = (level as any).player;
      if (player) player.touchJump = false;
      this.jumpBtn.setFillStyle(0xffffff, 0.1);
    });
    this.jumpBtn.on("pointerout", () => {
      const player = (level as any).player;
      if (player) player.touchJump = false;
      this.jumpBtn.setFillStyle(0xffffff, 0.1);
    });

    // Attack
    this.attackBtn.on("pointerdown", () => {
      const player = (level as any).player;
      if (player) player.touchAttack = true;
      this.attackBtn.setFillStyle(0xff6699, 0.25);
    });
    this.attackBtn.on("pointerup", () => {
      this.attackBtn.setFillStyle(0xff6699, 0.1);
    });
  }
}
