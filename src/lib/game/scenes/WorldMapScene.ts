import Phaser from "phaser";
import { INTERNAL_WIDTH, INTERNAL_HEIGHT } from "../constants";
import SaveManager from "../systems/SaveManager";

interface LevelNode {
  key: string;        // scene key, e.g. "Level1_1"
  label: string;      // display name, e.g. "1-1 Waking"
  x: number;
  y: number;
}

const ROSE    = 0xe8788a;
const LAVENDER = 0xb590d4;
const DARK_BG = 0x1a1a2e;
const LOCKED_COLOR = 0x444466;
const NODE_RADIUS = 12;

const WORLD_1_LEVELS: LevelNode[] = [
  { key: "Level1_1", label: "1-1 Waking",        x: 60,  y: 80  },
  { key: "Level1_2", label: "1-2 Descent",       x: 130, y: 110 },
  { key: "Level1_3", label: "1-3 Mine Cart",     x: 210, y: 80  },
  { key: "Level1_4", label: "1-4 Deep Hollow",   x: 290, y: 120 },
  { key: "Level1_5", label: "1-5 Thorns",        x: 360, y: 90  },
  { key: "Level1_6", label: "1-6 The Rush",      x: 130, y: 190 },
  { key: "Level1_B", label: "1-B Hollow Knight", x: 290, y: 200 },
];

export default class WorldMapScene extends Phaser.Scene {
  private nodeGraphics: Phaser.GameObjects.Graphics | null = null;
  private pulsingNodes: Phaser.GameObjects.Arc[] = [];

  constructor() {
    super({ key: "WorldMapScene" });
  }

  create(): void {
    this.pulsingNodes = [];

    // Background
    this.add.rectangle(
      INTERNAL_WIDTH / 2, INTERNAL_HEIGHT / 2,
      INTERNAL_WIDTH, INTERNAL_HEIGHT, DARK_BG,
    ).setOrigin(0.5);

    // Ambient particles
    for (let i = 0; i < 15; i++) {
      const dot = this.add.circle(
        Phaser.Math.Between(10, INTERNAL_WIDTH - 10),
        Phaser.Math.Between(10, INTERNAL_HEIGHT - 10),
        1, LAVENDER, 0.25,
      );
      this.tweens.add({
        targets: dot,
        alpha: { from: 0.1, to: 0.35 },
        y: dot.y - Phaser.Math.Between(5, 15),
        duration: Phaser.Math.Between(3000, 6000),
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      });
    }

    // Title
    this.add.text(INTERNAL_WIDTH / 2, 14, "World 1 — The Hollow", {
      fontFamily: "monospace",
      fontSize: "10px",
      color: "#B590D4",
    }).setOrigin(0.5);

    // HUD: hearts + fragments
    const totalHearts = SaveManager.getTotalHearts();
    const totalFragments = SaveManager.getTotalFragments();

    this.add.text(12, 6, `Hearts: ${totalHearts}`, {
      fontFamily: "monospace", fontSize: "8px", color: "#E8788A",
    });

    this.add.text(INTERNAL_WIDTH - 12, 6, `Fragments: ${totalFragments}`, {
      fontFamily: "monospace", fontSize: "8px", color: "#44aaff",
    }).setOrigin(1, 0);

    // Draw winding path
    this.drawPath();

    // Draw level nodes
    this.drawNodes();

    // "Coming Soon" for World 2
    const data = SaveManager.load();
    const bossBeaten = !!data.levels["Level1_B"]?.completed;
    if (bossBeaten) {
      this.add.text(INTERNAL_WIDTH / 2, INTERNAL_HEIGHT - 20, "World 2 — Coming Soon", {
        fontFamily: "monospace", fontSize: "8px", color: "#666688",
      }).setOrigin(0.5);
    }

    // Back button
    this.createButton(46, INTERNAL_HEIGHT - 20, "Back", () => {
      this.game.events.emit("back-to-dashboard");
    });
  }

  private drawPath(): void {
    const gfx = this.add.graphics();
    gfx.lineStyle(2, LAVENDER, 0.25);

    gfx.beginPath();
    gfx.moveTo(WORLD_1_LEVELS[0].x, WORLD_1_LEVELS[0].y);
    for (let i = 1; i < WORLD_1_LEVELS.length; i++) {
      const prev = WORLD_1_LEVELS[i - 1];
      const curr = WORLD_1_LEVELS[i];
      // Quadratic curve for gentle winding effect
      const cpx = (prev.x + curr.x) / 2;
      const cpy = (prev.y + curr.y) / 2 - 20;
      // Phaser graphics doesn't have quadraticCurveTo, so use lineTo with a midpoint
      gfx.lineTo(cpx, cpy);
      gfx.lineTo(curr.x, curr.y);
    }
    gfx.strokePath();
  }

  private drawNodes(): void {
    const data = SaveManager.load();

    // Find which level is the "current" (first unlocked but not completed)
    let currentKey: string | null = null;
    for (const node of WORLD_1_LEVELS) {
      const unlocked = SaveManager.isLevelUnlocked(node.key);
      const completed = !!data.levels[node.key]?.completed;
      if (unlocked && !completed) {
        currentKey = node.key;
        break;
      }
    }

    for (const node of WORLD_1_LEVELS) {
      const unlocked = SaveManager.isLevelUnlocked(node.key);
      const levelData = data.levels[node.key];
      const completed = !!levelData?.completed;
      const isCurrent = node.key === currentKey;

      // Node fill color
      let fillColor = LOCKED_COLOR;
      let fillAlpha = 0.4;
      if (completed) {
        fillColor = LAVENDER;
        fillAlpha = 1;
      } else if (unlocked) {
        fillColor = ROSE;
        fillAlpha = 0.9;
      }

      // Outer ring for completed levels
      if (completed) {
        this.add.circle(node.x, node.y, NODE_RADIUS + 2, ROSE, 0.3);
      }

      // Main node circle
      const circle = this.add.circle(node.x, node.y, NODE_RADIUS, fillColor, fillAlpha);

      // Rank badge on completed
      if (completed && levelData?.bestRank) {
        const rankColor =
          levelData.bestRank === "S" ? "#ffdd44" :
          levelData.bestRank === "A" ? "#44ff88" :
          levelData.bestRank === "B" ? "#44aaff" : "#aaaaaa";
        this.add.text(node.x, node.y, levelData.bestRank, {
          fontFamily: "monospace", fontSize: "9px", color: rankColor,
        }).setOrigin(0.5);
      }

      // Pulsing animation for current/next level
      if (isCurrent) {
        this.pulsingNodes.push(circle);
        this.tweens.add({
          targets: circle,
          scaleX: 1.2,
          scaleY: 1.2,
          alpha: 0.6,
          duration: 800,
          yoyo: true,
          repeat: -1,
          ease: "Sine.easeInOut",
        });
      }

      // Label below node
      const labelColor = unlocked ? "#ccbbdd" : "#555566";
      this.add.text(node.x, node.y + NODE_RADIUS + 6, node.label, {
        fontFamily: "monospace", fontSize: "6px", color: labelColor,
      }).setOrigin(0.5, 0);

      // Fragment dots (up to 3) — tiny dots above the node
      if (levelData && levelData.spiritFragments > 0) {
        for (let f = 0; f < levelData.spiritFragments; f++) {
          this.add.circle(
            node.x - 6 + f * 6, node.y - NODE_RADIUS - 5,
            2, 0x44aaff, 0.8,
          );
        }
      }

      // Touch / click interaction
      if (unlocked) {
        // Create an invisible interactive zone for reliable touch
        const hitZone = this.add.zone(node.x, node.y, 32, 32).setInteractive();
        hitZone.on("pointerdown", () => {
          this.selectLevel(node.key);
        });
      }
    }
  }

  private selectLevel(levelKey: string): void {
    // Brief flash feedback
    const flash = this.add.rectangle(
      INTERNAL_WIDTH / 2, INTERNAL_HEIGHT / 2,
      INTERNAL_WIDTH, INTERNAL_HEIGHT,
      0xffffff, 0.15,
    ).setDepth(50);
    this.tweens.add({
      targets: flash,
      alpha: 0,
      duration: 200,
      onComplete: () => {
        flash.destroy();
        this.scene.start(levelKey);
      },
    });
  }

  private createButton(x: number, y: number, label: string, callback: () => void): void {
    const bg = this.add.rectangle(0, 0, 72, 24, 0x3a2a5e, 1);
    const text = this.add.text(0, 0, label, {
      fontFamily: "monospace", fontSize: "9px", color: "#ddccff",
    }).setOrigin(0.5);

    const container = this.add.container(x, y, [bg, text]);
    container.setSize(72, 24);
    container.setInteractive(
      new Phaser.Geom.Rectangle(-36, -12, 72, 24),
      Phaser.Geom.Rectangle.Contains,
    );

    container.on("pointerdown", () => {
      bg.setFillStyle(0x5a4a8e, 1);
      this.time.delayedCall(100, callback);
    });
  }
}
