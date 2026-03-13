import Phaser from "phaser";
import { MAX_HP, INTERNAL_WIDTH } from "../constants";

export default class UIScene extends Phaser.Scene {
  private heartIcons: Phaser.GameObjects.Image[] = [];
  private heartsText!: Phaser.GameObjects.Text;
  private currentHP: number = MAX_HP;
  private levelSceneKey: string = "Level1_1";

  // Touch controls
  private leftZone!: Phaser.GameObjects.Rectangle;
  private rightZone!: Phaser.GameObjects.Rectangle;
  private jumpBtn!: Phaser.GameObjects.Arc;
  private attackBtn!: Phaser.GameObjects.Arc;

  constructor() {
    super({ key: "UIScene" });
  }

  init(data: { levelKey?: string }): void {
    this.levelSceneKey = data?.levelKey || "Level1_1";
  }

  create(): void {
    this.heartIcons = [];
    this.currentHP = MAX_HP;

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
    const level = this.scene.get(this.levelSceneKey);
    if (level) {
      level.events.on("player-damaged", (hp: number) => {
        this.currentHP = hp;
        this.updateHearts();
      });
      level.events.on("hearts-updated", (count: number) => {
        this.heartsText.setText(String(count));
      });
    }

    // Touch controls
    this.createTouchControls();
  }

  private updateHearts(): void {
    for (let i = 0; i < this.heartIcons.length; i++) {
      this.heartIcons[i].setTexture(i < this.currentHP ? "heart_icon" : "heart_icon_empty");
    }
  }

  private getPlayer(): any {
    const level = this.scene.get(this.levelSceneKey);
    return level ? (level as any).player : null;
  }

  private createTouchControls(): void {
    const W = INTERNAL_WIDTH;
    const H = 270;

    // Left button
    this.leftZone = this.add.rectangle(40, H - 30, 50, 40, 0xffffff, 0.08)
      .setInteractive().setScrollFactor(0).setDepth(100);

    // Right button
    this.rightZone = this.add.rectangle(100, H - 30, 50, 40, 0xffffff, 0.08)
      .setInteractive().setScrollFactor(0).setDepth(100);

    // Jump button (large)
    this.jumpBtn = this.add.circle(W - 50, H - 35, 24, 0xffffff, 0.1)
      .setInteractive().setScrollFactor(0).setDepth(100);

    // Attack button
    this.attackBtn = this.add.circle(W - 100, H - 55, 18, 0xff6699, 0.1)
      .setInteractive().setScrollFactor(0).setDepth(100);

    // Duck button (cart runner levels) — replaces attack position
    if (this.levelSceneKey === "Level1_3" || this.levelSceneKey === "Level1_6") {
      this.attackBtn.setVisible(false);
      const duckBtn = this.add.circle(W - 100, H - 55, 18, 0x44aaff, 0.1)
        .setInteractive().setScrollFactor(0).setDepth(100);
      this.add.text(W - 100, H - 55, "\u2B07", { fontSize: "10px", color: "#44aaff" })
        .setOrigin(0.5).setScrollFactor(0).setDepth(101).setAlpha(0.4);
      duckBtn.on("pointerdown", () => {
        const lvl = this.scene.get(this.levelSceneKey);
        if (lvl) (lvl as any).touchDuck = true;
        duckBtn.setFillStyle(0x44aaff, 0.25);
      });
      duckBtn.on("pointerup", () => {
        const lvl = this.scene.get(this.levelSceneKey);
        if (lvl) (lvl as any).touchDuck = false;
        duckBtn.setFillStyle(0x44aaff, 0.1);
      });
      duckBtn.on("pointerout", () => {
        const lvl = this.scene.get(this.levelSceneKey);
        if (lvl) (lvl as any).touchDuck = false;
        duckBtn.setFillStyle(0x44aaff, 0.1);
      });
    }

    // Labels
    this.add.text(40, H - 30, "\u25C0", { fontSize: "12px", color: "#ffffff" })
      .setOrigin(0.5).setScrollFactor(0).setDepth(101).setAlpha(0.4);
    this.add.text(100, H - 30, "\u25B6", { fontSize: "12px", color: "#ffffff" })
      .setOrigin(0.5).setScrollFactor(0).setDepth(101).setAlpha(0.4);
    this.add.text(W - 50, H - 35, "\u2B06", { fontSize: "14px", color: "#ffffff" })
      .setOrigin(0.5).setScrollFactor(0).setDepth(101).setAlpha(0.4);
    this.add.text(W - 100, H - 55, "\u26A1", { fontSize: "10px", color: "#ff6699" })
      .setOrigin(0.5).setScrollFactor(0).setDepth(101).setAlpha(0.4);

    // Left
    this.leftZone.on("pointerdown", () => {
      const p = this.getPlayer(); if (p) p.touchLeft = true;
      this.leftZone.setFillStyle(0xffffff, 0.2);
    });
    this.leftZone.on("pointerup", () => {
      const p = this.getPlayer(); if (p) p.touchLeft = false;
      this.leftZone.setFillStyle(0xffffff, 0.08);
    });
    this.leftZone.on("pointerout", () => {
      const p = this.getPlayer(); if (p) p.touchLeft = false;
      this.leftZone.setFillStyle(0xffffff, 0.08);
    });

    // Right
    this.rightZone.on("pointerdown", () => {
      const p = this.getPlayer(); if (p) p.touchRight = true;
      this.rightZone.setFillStyle(0xffffff, 0.2);
    });
    this.rightZone.on("pointerup", () => {
      const p = this.getPlayer(); if (p) p.touchRight = false;
      this.rightZone.setFillStyle(0xffffff, 0.08);
    });
    this.rightZone.on("pointerout", () => {
      const p = this.getPlayer(); if (p) p.touchRight = false;
      this.rightZone.setFillStyle(0xffffff, 0.08);
    });

    // Jump
    this.jumpBtn.on("pointerdown", () => {
      const p = this.getPlayer();
      if (p) { p.touchJump = true; p.touchJumpJustPressed = true; }
      this.jumpBtn.setFillStyle(0xffffff, 0.25);
    });
    this.jumpBtn.on("pointerup", () => {
      const p = this.getPlayer(); if (p) p.touchJump = false;
      this.jumpBtn.setFillStyle(0xffffff, 0.1);
    });
    this.jumpBtn.on("pointerout", () => {
      const p = this.getPlayer(); if (p) p.touchJump = false;
      this.jumpBtn.setFillStyle(0xffffff, 0.1);
    });

    // Attack
    this.attackBtn.on("pointerdown", () => {
      const p = this.getPlayer(); if (p) p.touchAttack = true;
      this.attackBtn.setFillStyle(0xff6699, 0.25);
    });
    this.attackBtn.on("pointerup", () => {
      this.attackBtn.setFillStyle(0xff6699, 0.1);
    });
  }
}
