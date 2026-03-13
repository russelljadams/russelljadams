import Phaser from "phaser";
import Player from "../entities/Player";
import {
  TILE_SIZE, INTERNAL_WIDTH, INTERNAL_HEIGHT,
  SHAKE_PLAYER_DAMAGE_DURATION, SHAKE_PLAYER_DAMAGE_INTENSITY,
  INVINCIBILITY_DURATION,
} from "../constants";

/**
 * Level 1-6: "The Rush" — Second cart runner, harder and faster.
 * 4 speed zones escalating from 280 to 500 px/s.
 * Falling obstacles, speed lines, screen shake. The last level before the boss.
 */

type ObstacleType = "low_barrier" | "high_barrier" | "gap" | "spikes" | "falling";

interface Obstacle {
  type: ObstacleType;
  worldX: number;
  width: number;
  hit: boolean;
  sprites: Phaser.GameObjects.GameObject[];
  warningSprite?: Phaser.GameObjects.GameObject;
  fallTriggered?: boolean;
  fallY?: number;
}

interface PatternEntry {
  offset: number;
  type: ObstacleType;
}

interface CartCheckpoint {
  worldX: number;
  activated: boolean;
  sprite: Phaser.GameObjects.Image;
}

export default class Level1_6Scene extends Phaser.Scene {
  public player!: Player;
  public touchDuck: boolean = false;

  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private hearts!: Phaser.Physics.Arcade.StaticGroup;
  private spiritFragments!: Phaser.Physics.Arcade.StaticGroup;
  private obstacles: Obstacle[] = [];
  private checkpoints: CartCheckpoint[] = [];

  private heartsCollected: number = 0;
  private fragmentsCollected: number = 0;
  private levelStartTime: number = 0;
  private cartHP: number = 3;
  private iFrameTimer: number = 0;
  private isLevelComplete: boolean = false;

  // Cart state
  private scrollSpeed: number = 280;
  private cartRect!: Phaser.GameObjects.Rectangle;
  private wheelL!: Phaser.GameObjects.Arc;
  private wheelR!: Phaser.GameObjects.Arc;
  private trackGround!: Phaser.Physics.Arcade.StaticGroup;

  // Duck state
  private isDucking: boolean = false;
  private duckKey: Phaser.Input.Keyboard.Key | null = null;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;

  // Checkpoint respawn
  private lastCheckpointX: number = 0;
  private lastCheckpointSpeed: number = 280;

  // Level geometry
  private readonly GROUND_ROW: number = 9;
  private readonly TRACK_TILES: number = 1200;
  private levelLength: number = 0;
  private gapTiles: Set<number> = new Set();

  // Speed zones
  private readonly speedZones = [
    { startTile: 0, speed: 280 },
    { startTile: 300, speed: 350 },
    { startTile: 600, speed: 420 },
    { startTile: 900, speed: 500 },
  ];

  // Pattern generation
  private nextPatternX: number = 0;
  private patternIndex: number = 0;
  private generatedUpTo: number = 0;

  // Speed lines
  private speedLines: Phaser.GameObjects.Rectangle[] = [];

  // Particle trail
  private trailTimer: number = 0;

  // Pattern pools per zone
  private readonly zone1Patterns: PatternEntry[][] = [
    [{ offset: 0, type: "low_barrier" }],
    [{ offset: 0, type: "gap" }],
    [{ offset: 0, type: "high_barrier" }],
    [{ offset: 0, type: "spikes" }],
    [{ offset: 0, type: "low_barrier" }, { offset: 12, type: "high_barrier" }],
  ];

  private readonly zone2Patterns: PatternEntry[][] = [
    [{ offset: 0, type: "low_barrier" }, { offset: 8, type: "low_barrier" }],
    [{ offset: 0, type: "gap" }, { offset: 10, type: "spikes" }],
    [{ offset: 0, type: "high_barrier" }, { offset: 10, type: "low_barrier" }],
    [{ offset: 0, type: "spikes" }, { offset: 8, type: "gap" }],
    [{ offset: 0, type: "low_barrier" }, { offset: 6, type: "high_barrier" }, { offset: 14, type: "spikes" }],
    [{ offset: 0, type: "falling" }, { offset: 10, type: "low_barrier" }],
  ];

  private readonly zone3Patterns: PatternEntry[][] = [
    [{ offset: 0, type: "low_barrier" }, { offset: 6, type: "high_barrier" }, { offset: 12, type: "gap" }],
    [{ offset: 0, type: "gap" }, { offset: 8, type: "low_barrier" }, { offset: 14, type: "falling" }],
    [{ offset: 0, type: "spikes" }, { offset: 6, type: "spikes" }, { offset: 12, type: "high_barrier" }],
    [{ offset: 0, type: "falling" }, { offset: 8, type: "gap" }, { offset: 16, type: "low_barrier" }],
    [{ offset: 0, type: "high_barrier" }, { offset: 5, type: "low_barrier" }, { offset: 10, type: "spikes" }, { offset: 16, type: "gap" }],
    [{ offset: 0, type: "low_barrier" }, { offset: 4, type: "high_barrier" }, { offset: 8, type: "low_barrier" }, { offset: 12, type: "high_barrier" }],
  ];

  private readonly zone4Patterns: PatternEntry[][] = [
    [{ offset: 0, type: "falling" }, { offset: 5, type: "low_barrier" }, { offset: 9, type: "high_barrier" }, { offset: 13, type: "gap" }],
    [{ offset: 0, type: "gap" }, { offset: 7, type: "falling" }, { offset: 12, type: "spikes" }, { offset: 16, type: "low_barrier" }],
    [{ offset: 0, type: "spikes" }, { offset: 4, type: "low_barrier" }, { offset: 7, type: "high_barrier" }, { offset: 11, type: "falling" }, { offset: 16, type: "gap" }],
    [{ offset: 0, type: "low_barrier" }, { offset: 3, type: "high_barrier" }, { offset: 6, type: "low_barrier" }, { offset: 9, type: "high_barrier" }, { offset: 14, type: "spikes" }],
    [{ offset: 0, type: "falling" }, { offset: 6, type: "falling" }, { offset: 12, type: "gap" }, { offset: 18, type: "low_barrier" }],
    [{ offset: 0, type: "gap" }, { offset: 6, type: "spikes" }, { offset: 10, type: "falling" }, { offset: 15, type: "high_barrier" }, { offset: 19, type: "low_barrier" }],
  ];

  constructor() {
    super({ key: "Level1_6" });
  }

  create(): void {
    console.log("[GGsHeart] Level1_6Scene.create() — The Rush");

    // Reset state
    this.heartsCollected = 0;
    this.fragmentsCollected = 0;
    this.obstacles = [];
    this.checkpoints = [];
    this.speedLines = [];
    this.gapTiles = new Set();
    this.cartHP = 3;
    this.iFrameTimer = 0;
    this.scrollSpeed = 280;
    this.isLevelComplete = false;
    this.lastCheckpointX = 0;
    this.lastCheckpointSpeed = 280;
    this.levelStartTime = this.time.now;
    this.isDucking = false;
    this.touchDuck = false;
    this.nextPatternX = 40;
    this.patternIndex = 0;
    this.generatedUpTo = 0;
    this.trailTimer = 0;

    const T = TILE_SIZE;
    this.levelLength = this.TRACK_TILES * T;
    const levelWidth = this.levelLength + INTERNAL_WIDTH;
    const levelHeight = 12 * T;
    this.physics.world.setBounds(0, 0, levelWidth, levelHeight);

    this.createBackground(levelWidth);

    this.platforms = this.physics.add.staticGroup();
    this.trackGround = this.physics.add.staticGroup();
    this.hearts = this.physics.add.staticGroup();
    this.spiritFragments = this.physics.add.staticGroup();

    // Input
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.duckKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    // Generate initial track and obstacles
    this.generateTrackChunk(0, Math.min(60, this.TRACK_TILES));
    this.generateObstaclesUpTo(60 * T);

    // Player
    const GY = this.GROUND_ROW;
    this.player = new Player(this, 5 * T, (GY - 2) * T);
    this.player.setDepth(10);

    // Cart visual
    this.cartRect = this.add.rectangle(
      this.player.x, GY * T - 2, 42, 16, 0x995533
    ).setDepth(9);
    this.wheelL = this.add.circle(this.player.x - 13, GY * T + 6, 5, 0x444444).setDepth(9);
    this.wheelR = this.add.circle(this.player.x + 13, GY * T + 6, 5, 0x444444).setDepth(9);

    // Camera
    this.cameras.main.setBounds(0, 0, levelWidth, levelHeight);
    this.cameras.main.startFollow(this.player, true, 0.12, 0.15);
    this.cameras.main.setFollowOffset(-120, 0);

    // Collisions
    this.physics.add.collider(this.player, this.trackGround);
    this.physics.add.collider(this.player, this.platforms);

    this.physics.add.overlap(this.player, this.hearts, (_p, heart) => {
      this.collectHeart(heart as Phaser.Physics.Arcade.Sprite);
    });
    this.physics.add.overlap(this.player, this.spiritFragments, (_p, frag) => {
      this.collectFragment(frag as Phaser.Physics.Arcade.Sprite);
    });

    // Place checkpoints at speed transitions
    this.placeCheckpoint(300 * T);
    this.placeCheckpoint(600 * T);
    this.placeCheckpoint(900 * T);

    // Place hearts and fragments
    this.placeCollectibles();

    // Shrine at end
    this.add.image((this.TRACK_TILES - 5) * T, (GY - 2) * T, "shrine").setDepth(5);

    // Speed lines (HUD layer, scroll factor 0)
    for (let i = 0; i < 12; i++) {
      const line = this.add.rectangle(
        Phaser.Math.Between(0, INTERNAL_WIDTH),
        Phaser.Math.Between(0, INTERNAL_HEIGHT),
        Phaser.Math.Between(30, 80), 1, 0xffffff, 0
      ).setScrollFactor(0).setDepth(20);
      this.speedLines.push(line);
    }

    // Launch UI
    if (!this.scene.isActive("UIScene")) {
      this.scene.launch("UIScene", { levelKey: "Level1_6" });
    }
    this.events.emit("player-damaged", this.cartHP);
    this.events.emit("hearts-updated", this.heartsCollected);

    // Landing dust
    this.events.on("player-landed", (x: number, y: number, velY: number) => {
      const count = Math.min(Math.floor(velY / 80), 8);
      for (let i = 0; i < count; i++) {
        const dust = this.add.circle(
          x + Phaser.Math.Between(-14, 14), y + 14,
          Phaser.Math.Between(2, 5), 0xaa9977, 0.7
        ).setDepth(9);
        this.tweens.add({
          targets: dust,
          x: dust.x + Phaser.Math.Between(-20, 20),
          y: dust.y - Phaser.Math.Between(4, 14),
          alpha: 0, scale: 0,
          duration: Phaser.Math.Between(200, 400),
          onComplete: () => dust.destroy(),
        });
      }
    });

    console.log("[GGsHeart] Level1_6 ready. Track:", this.TRACK_TILES, "tiles, length:", this.levelLength, "px");
  }

  // ═══════════════════════════════════════════════════════════
  //  BACKGROUND
  // ═══════════════════════════════════════════════════════════

  private createBackground(levelWidth: number): void {
    // Deep cavern gradient
    this.add.rectangle(0, 0, levelWidth, INTERNAL_HEIGHT, 0x0a0a14)
      .setOrigin(0).setScrollFactor(0).setDepth(-4);

    // Stalactites and rock formations
    for (let x = 0; x < levelWidth; x += 150) {
      const h = Phaser.Math.Between(20, 60);
      this.add.rectangle(x, 0, Phaser.Math.Between(6, 14), h, 0x2a1a0e)
        .setOrigin(0.5, 0).setScrollFactor(0.15, 0).setDepth(-3).setAlpha(0.5);
    }

    // Glowing crystals scattered in background
    for (let x = 0; x < levelWidth; x += Phaser.Math.Between(200, 400)) {
      const cy = Phaser.Math.Between(30, 200);
      const color = Phaser.Math.RND.pick([0x44aaff, 0xff6644, 0x66ff88]);
      const crystal = this.add.circle(x, cy, Phaser.Math.Between(2, 5), color, 0.4)
        .setScrollFactor(0.1, 0).setDepth(-2);
      this.tweens.add({
        targets: crystal, alpha: { from: 0.2, to: 0.6 },
        duration: Phaser.Math.Between(1500, 3000),
        yoyo: true, repeat: -1, ease: "Sine.easeInOut",
      });
    }

    // Ambient dust particles
    this.add.particles(0, 0, "particle", {
      x: { min: 0, max: levelWidth },
      y: { min: 0, max: INTERNAL_HEIGHT },
      lifespan: 4000,
      speed: { min: 1, max: 6 },
      scale: { start: 0.2, end: 0 },
      alpha: { start: 0.25, end: 0 },
      tint: [0x665544, 0x776655, 0x887766],
      frequency: 350,
      quantity: 1,
    }).setScrollFactor(0.4).setDepth(-1);
  }

  // ═══════════════════════════════════════════════════════════
  //  TRACK GENERATION (streaming)
  // ═══════════════════════════════════════════════════════════

  private generateTrackChunk(startTile: number, endTile: number): void {
    const T = TILE_SIZE;
    const GY = this.GROUND_ROW;
    const end = Math.min(endTile, this.TRACK_TILES);

    for (let i = startTile; i < end; i++) {
      if (this.gapTiles.has(i)) continue;
      const x = i * T + T / 2;
      const y = GY * T + T / 2;
      const tile = this.trackGround.create(x, y, "tile_surface") as Phaser.Physics.Arcade.Sprite;
      tile.refreshBody();
      // Fill below
      for (let j = GY + 1; j < 12; j++) {
        this.add.image(i * T + T / 2, j * T + T / 2, "tile_ground");
      }
    }

    // Track rail visuals
    for (let i = startTile; i < end; i += 3) {
      if (this.gapTiles.has(i)) continue;
      this.add.rectangle(i * T + T / 2, GY * T - 1, T * 3, 2, 0x888888, 0.35).setDepth(1);
    }
  }

  // ═══════════════════════════════════════════════════════════
  //  OBSTACLE PATTERN GENERATION
  // ═══════════════════════════════════════════════════════════

  private getCurrentZone(tileX: number): number {
    if (tileX >= 900) return 3;
    if (tileX >= 600) return 2;
    if (tileX >= 300) return 1;
    return 0;
  }

  private getPatternPool(zone: number): PatternEntry[][] {
    switch (zone) {
      case 0: return this.zone1Patterns;
      case 1: return this.zone2Patterns;
      case 2: return this.zone3Patterns;
      case 3: return this.zone4Patterns;
      default: return this.zone4Patterns;
    }
  }

  private getSpacingForZone(zone: number): number {
    // Gap between patterns decreases with zone
    switch (zone) {
      case 0: return Phaser.Math.Between(18, 28);
      case 1: return Phaser.Math.Between(14, 22);
      case 2: return Phaser.Math.Between(12, 18);
      case 3: return Phaser.Math.Between(10, 16);
      default: return 12;
    }
  }

  private generateObstaclesUpTo(worldX: number): void {
    const T = TILE_SIZE;
    const endTile = this.TRACK_TILES - 20; // stop generating near end

    while (this.nextPatternX < endTile && this.nextPatternX * T < worldX) {
      const zone = this.getCurrentZone(this.nextPatternX);
      const pool = this.getPatternPool(zone);
      const pattern = pool[this.patternIndex % pool.length];
      this.patternIndex++;

      // Pseudo-random pattern selection using a simple shuffle
      const chosen = pool[Phaser.Math.Between(0, pool.length - 1)];

      let maxOffset = 0;
      for (const entry of chosen) {
        this.placeObstacle(this.nextPatternX + entry.offset, entry.type);
        if (entry.offset > maxOffset) maxOffset = entry.offset;
      }

      const spacing = this.getSpacingForZone(zone);
      this.nextPatternX += maxOffset + spacing;
    }

    this.generatedUpTo = worldX;
  }

  private placeObstacle(tileX: number, type: ObstacleType): void {
    const T = TILE_SIZE;
    const GY = this.GROUND_ROW;
    const sprites: Phaser.GameObjects.GameObject[] = [];
    let width = T * 2;

    if (type === "low_barrier") {
      const b1 = this.platforms.create(
        tileX * T + T / 2, (GY - 1) * T + T / 2, "tile_surface"
      ) as Phaser.Physics.Arcade.Sprite;
      b1.refreshBody();
      const b2 = this.platforms.create(
        tileX * T + T / 2, (GY - 2) * T + T / 2, "tile_surface"
      ) as Phaser.Physics.Arcade.Sprite;
      b2.refreshBody();
      sprites.push(b1, b2);
      width = T;

    } else if (type === "high_barrier") {
      const hb1 = this.add.rectangle(
        tileX * T + T / 2, (GY - 2) * T + T / 2, T, T, 0x664422
      ).setDepth(5);
      const hb2 = this.add.rectangle(
        (tileX + 1) * T + T / 2, (GY - 2) * T + T / 2, T, T, 0x664422
      ).setDepth(5);
      this.add.rectangle(tileX * T + T / 2, (GY - 3) * T + T / 2, T, T, 0x554433).setDepth(5);
      this.add.rectangle((tileX + 1) * T + T / 2, (GY - 3) * T + T / 2, T, T, 0x554433).setDepth(5);
      sprites.push(hb1, hb2);
      width = T * 2;

    } else if (type === "gap") {
      for (let g = 0; g < 4; g++) {
        this.gapTiles.add(tileX + g);
      }
      width = T * 4;

    } else if (type === "spikes") {
      for (let s = 0; s < 3; s++) {
        const spike = this.add.image(
          (tileX + s) * T + T / 2, (GY) * T - T / 2 + 2, "tile_spikes"
        ).setDepth(5);
        sprites.push(spike);
      }
      width = T * 3;

    } else if (type === "falling") {
      // Warning shadow on the ground
      const shadowX = tileX * T + T;
      const shadow = this.add.ellipse(
        shadowX, GY * T - 2, T * 2, 8, 0xff0000, 0.3
      ).setDepth(4);
      this.tweens.add({
        targets: shadow, alpha: { from: 0.1, to: 0.5 },
        duration: 400, yoyo: true, repeat: -1,
      });

      // The falling block starts above screen
      const block = this.add.rectangle(
        shadowX, -T * 2, T * 1.5, T * 1.5, 0x884422
      ).setDepth(8);
      sprites.push(block);

      this.obstacles.push({
        type, worldX: shadowX, width: T * 2, hit: false,
        sprites, warningSprite: shadow,
        fallTriggered: false, fallY: -T * 2,
      });
      return; // early return — falling obstacles handled differently
    }

    this.obstacles.push({
      type, worldX: tileX * T, width, hit: false, sprites,
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  CHECKPOINTS
  // ═══════════════════════════════════════════════════════════

  private placeCheckpoint(worldX: number): void {
    const T = TILE_SIZE;
    const GY = this.GROUND_ROW;
    const sprite = this.add.image(worldX, (GY - 1) * T + T / 2, "checkpoint").setDepth(5);
    this.checkpoints.push({ worldX, activated: false, sprite });
  }

  // ═══════════════════════════════════════════════════════════
  //  COLLECTIBLES
  // ═══════════════════════════════════════════════════════════

  private placeCollectibles(): void {
    const T = TILE_SIZE;
    const GY = this.GROUND_ROW;

    // 15 hearts spread across the level
    const heartTiles = [
      30, 60, 95, 140, 190, 250, 320, 400, 480, 560, 650, 740, 830, 920, 1050
    ];
    for (const hx of heartTiles) {
      const yOff = Phaser.Math.Between(3, 5);
      this.placeHeart(hx, GY - yOff);
    }

    // 3 spirit fragments in tricky positions
    // Fragment 1: right over a gap area (zone 1 transition)
    this.placeFragment(285, GY - 5);
    // Fragment 2: in the middle of a duck section (zone 2-3 transition)
    this.placeFragment(590, GY - 2);
    // Fragment 3: during the fastest section, high in the air
    this.placeFragment(950, GY - 5);
  }

  private placeHeart(tileX: number, tileY: number): void {
    const T = TILE_SIZE;
    const h = this.hearts.create(
      tileX * T + T / 2, tileY * T + T / 2, "heart"
    ) as Phaser.Physics.Arcade.Sprite;
    h.refreshBody();
    this.tweens.add({
      targets: h, y: h.y - 6, duration: 1100,
      yoyo: true, repeat: -1, ease: "Sine.easeInOut",
    });
  }

  private placeFragment(tileX: number, tileY: number): void {
    const T = TILE_SIZE;
    const f = this.spiritFragments.create(
      tileX * T + T / 2, tileY * T + T / 2, "spirit_fragment"
    ) as Phaser.Physics.Arcade.Sprite;
    f.refreshBody();
    this.tweens.add({
      targets: f, y: f.y - 5, alpha: { from: 0.6, to: 1 },
      duration: 1400, yoyo: true, repeat: -1, ease: "Sine.easeInOut",
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  COLLECTION EFFECTS
  // ═══════════════════════════════════════════════════════════

  private collectHeart(heart: Phaser.Physics.Arcade.Sprite): void {
    if (!heart.active) return;
    const x = heart.x, y = heart.y;
    const hBody = heart.body as Phaser.Physics.Arcade.Body;
    if (hBody) hBody.enable = false;

    this.tweens.add({
      targets: heart,
      scaleX: 2, scaleY: 2, alpha: 0,
      duration: 200, ease: "Back.easeIn",
      onComplete: () => heart.destroy(),
    });

    // Screen flash
    const flash = this.add.rectangle(
      this.cameras.main.scrollX + INTERNAL_WIDTH / 2,
      this.cameras.main.scrollY + INTERNAL_HEIGHT / 2,
      INTERNAL_WIDTH, INTERNAL_HEIGHT, 0xffffff, 0.25
    ).setScrollFactor(0).setDepth(50);
    this.tweens.add({
      targets: flash, alpha: 0, duration: 120,
      onComplete: () => flash.destroy(),
    });

    // Burst particles
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2;
      const p = this.add.circle(x, y, 3, 0xff6699).setDepth(11);
      this.tweens.add({
        targets: p,
        x: x + Math.cos(angle) * 28,
        y: y + Math.sin(angle) * 28,
        alpha: 0, scale: 0, duration: 300,
        ease: "Quad.easeOut",
        onComplete: () => p.destroy(),
      });
    }

    this.heartsCollected++;
    if (this.cartHP < 3) { this.cartHP++; this.events.emit("player-damaged", this.cartHP); }
    this.events.emit("hearts-updated", this.heartsCollected);
  }

  private collectFragment(frag: Phaser.Physics.Arcade.Sprite): void {
    const x = frag.x, y = frag.y;
    frag.destroy();
    this.fragmentsCollected++;

    for (let i = 0; i < 12; i++) {
      const p = this.add.circle(x, y, 3, 0x44aaff).setDepth(11);
      this.tweens.add({
        targets: p,
        x: x + Phaser.Math.Between(-35, 35),
        y: y + Phaser.Math.Between(-35, 35),
        alpha: 0, scale: 0, duration: 500,
        onComplete: () => p.destroy(),
      });
    }

    // Brief time slow effect
    this.cameras.main.flash(200, 68, 170, 255, false);
  }

  // ═══════════════════════════════════════════════════════════
  //  DAMAGE AND CRASH
  // ═══════════════════════════════════════════════════════════

  private cartDamage(): void {
    if (this.iFrameTimer > 0) return;
    this.cartHP--;
    this.iFrameTimer = INVINCIBILITY_DURATION;
    this.cameras.main.shake(SHAKE_PLAYER_DAMAGE_DURATION, SHAKE_PLAYER_DAMAGE_INTENSITY);
    this.events.emit("player-damaged", this.cartHP);

    // Flash cart red
    this.cartRect.setFillStyle(0xff2222);
    this.time.delayedCall(250, () => {
      if (this.cartRect && this.cartRect.active) this.cartRect.setFillStyle(0x995533);
    });

    // Hit sparks
    for (let i = 0; i < 6; i++) {
      const spark = this.add.circle(
        this.player.x + Phaser.Math.Between(-10, 10),
        this.player.y + Phaser.Math.Between(-10, 10),
        2, 0xffaa00
      ).setDepth(15);
      this.tweens.add({
        targets: spark,
        x: spark.x + Phaser.Math.Between(-25, 25),
        y: spark.y + Phaser.Math.Between(-30, 5),
        alpha: 0, duration: 300,
        onComplete: () => spark.destroy(),
      });
    }

    if (this.cartHP <= 0) {
      this.cartCrash();
    }
  }

  private cartCrash(): void {
    this.cartHP = 3;
    this.iFrameTimer = INVINCIBILITY_DURATION;

    // Determine respawn position
    const respawnX = this.lastCheckpointX > 0
      ? this.lastCheckpointX + 3 * TILE_SIZE
      : 5 * TILE_SIZE;
    this.scrollSpeed = this.lastCheckpointSpeed;

    this.player.setPosition(respawnX, (this.GROUND_ROW - 2) * TILE_SIZE);
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    body.velocity.x = 0;
    body.velocity.y = 0;

    // Reset obstacle hit flags
    for (const obs of this.obstacles) {
      obs.hit = false;
      if (obs.type === "falling") {
        obs.fallTriggered = false;
        // Reset falling block position
        if (obs.sprites[0] && (obs.sprites[0] as Phaser.GameObjects.Rectangle).active) {
          (obs.sprites[0] as Phaser.GameObjects.Rectangle).setPosition(obs.worldX, -TILE_SIZE * 2);
        }
      }
    }

    this.events.emit("player-damaged", this.cartHP);

    // Crash flash
    const flash = this.add.rectangle(
      this.cameras.main.scrollX + INTERNAL_WIDTH / 2,
      this.cameras.main.scrollY + INTERNAL_HEIGHT / 2,
      INTERNAL_WIDTH, INTERNAL_HEIGHT, 0xff0000, 0.5
    ).setScrollFactor(0).setDepth(50);
    this.tweens.add({
      targets: flash, alpha: 0, duration: 600,
      onComplete: () => flash.destroy(),
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  SPEED LINES EFFECT
  // ═══════════════════════════════════════════════════════════

  private updateSpeedLines(dt: number): void {
    // Intensity scales with speed
    const intensity = Phaser.Math.Clamp((this.scrollSpeed - 250) / 300, 0, 1);

    for (const line of this.speedLines) {
      if (!line.active) continue;
      line.x -= this.scrollSpeed * dt * 1.5;
      line.setAlpha(intensity * Phaser.Math.Between(2, 6) / 10);

      // Reset when off screen
      if (line.x < -100) {
        line.x = INTERNAL_WIDTH + Phaser.Math.Between(0, 100);
        line.y = Phaser.Math.Between(10, INTERNAL_HEIGHT - 10);
        line.setSize(Phaser.Math.Between(20 + intensity * 60, 50 + intensity * 80), 1);
      }
    }
  }

  // ═══════════════════════════════════════════════════════════
  //  PARTICLE TRAIL
  // ═══════════════════════════════════════════════════════════

  private updateTrail(dt: number): void {
    this.trailTimer -= dt;
    if (this.trailTimer > 0) return;
    this.trailTimer = 0.04; // every 40ms

    const GY = this.GROUND_ROW;
    const T = TILE_SIZE;
    const p = this.add.circle(
      this.player.x - 20 + Phaser.Math.Between(-4, 4),
      GY * T - 4 + Phaser.Math.Between(-3, 3),
      Phaser.Math.Between(1, 3),
      0xffaa44, 0.6
    ).setDepth(8);

    this.tweens.add({
      targets: p,
      x: p.x - Phaser.Math.Between(15, 35),
      alpha: 0, scale: 0,
      duration: Phaser.Math.Between(200, 400),
      onComplete: () => p.destroy(),
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  LEVEL COMPLETE
  // ═══════════════════════════════════════════════════════════

  private levelComplete(): void {
    if (this.isLevelComplete) return;
    this.isLevelComplete = true;
    const elapsed = Math.floor((this.time.now - this.levelStartTime) / 1000);
    this.scene.stop("UIScene");
    this.scene.start("LevelCompleteScene", {
      levelKey: "Level1_6",
      hearts: this.heartsCollected,
      fragments: this.fragmentsCollected,
      time: elapsed,
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  MAIN UPDATE LOOP
  // ═══════════════════════════════════════════════════════════

  update(time: number, delta: number): void {
    if (!this.player || !this.player.active || this.isLevelComplete) return;

    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const T = TILE_SIZE;
    const dt = delta / 1000;
    const GY = this.GROUND_ROW;

    // ═══ DUCK INPUT ═══
    const duckInput = (this.duckKey?.isDown ?? false) ||
                      (this.cursors?.down?.isDown ?? false) ||
                      this.touchDuck;

    if (duckInput && !this.isDucking) {
      this.isDucking = true;
      body.setSize(20, 14);
      body.setOffset(6, 18);
      this.player.setScale(1, 0.5);
    } else if (!duckInput && this.isDucking) {
      this.isDucking = false;
      body.setSize(20, 28);
      body.setOffset(6, 4);
      this.player.setScale(1, 1);
    }

    // ═══ SPEED ZONE ═══
    const playerTile = Math.floor(this.player.x / T);
    for (const zone of this.speedZones) {
      if (playerTile >= zone.startTile) {
        this.scrollSpeed = zone.speed;
      }
    }

    // ═══ AUTO-SCROLL ═══
    body.velocity.x = this.scrollSpeed;
    this.player.update(time, delta);
    body.velocity.x = this.scrollSpeed; // re-enforce after Player.update

    // ═══ CART VISUAL ═══
    this.cartRect.setPosition(this.player.x, GY * T - 2);
    this.wheelL.setPosition(this.player.x - 13, GY * T + 6);
    this.wheelR.setPosition(this.player.x + 13, GY * T + 6);
    // Wheel spin visual — oscillate tint
    const spinTint = Math.sin(time * 0.02) > 0 ? 0x555555 : 0x333333;
    this.wheelL.setFillStyle(spinTint);
    this.wheelR.setFillStyle(spinTint);

    // ═══ STREAMING GENERATION ═══
    const aheadX = this.player.x + INTERNAL_WIDTH * 2;
    const aheadTile = Math.ceil(aheadX / T);
    if (aheadX > this.generatedUpTo) {
      const chunkStart = Math.floor(this.generatedUpTo / T);
      this.generateTrackChunk(chunkStart, aheadTile);
      this.generateObstaclesUpTo(aheadX);
    }

    // ═══ I-FRAMES ═══
    if (this.iFrameTimer > 0) {
      this.iFrameTimer -= delta;
      this.player.setAlpha(Math.sin(Date.now() * 0.025) > 0 ? 1 : 0.25);
      if (this.iFrameTimer <= 0) {
        this.iFrameTimer = 0;
        this.player.setAlpha(1);
      }
    }

    // ═══ CHECKPOINT ACTIVATION ═══
    for (const cp of this.checkpoints) {
      if (!cp.activated && this.player.x > cp.worldX) {
        cp.activated = true;
        this.lastCheckpointX = cp.worldX;
        // Find current speed for this checkpoint
        for (const zone of this.speedZones) {
          if (Math.floor(cp.worldX / T) >= zone.startTile) {
            this.lastCheckpointSpeed = zone.speed;
          }
        }
        cp.sprite.setTexture("checkpoint_active");

        const glow = this.add.circle(cp.worldX, (GY - 1) * T, 10, 0x44ff44, 0.6).setDepth(11);
        this.tweens.add({
          targets: glow, scaleX: 5, scaleY: 5, alpha: 0,
          duration: 500, ease: "Quad.easeOut",
          onComplete: () => glow.destroy(),
        });
      }
    }

    // ═══ OBSTACLE COLLISION ═══
    const playerLeft = this.player.x - 10;
    const playerRight = this.player.x + 10;
    const playerTop = this.player.y - (this.isDucking ? 7 : 14);
    const playerBottom = this.player.y + 14;

    for (const obs of this.obstacles) {
      if (obs.hit) continue;

      // Skip obstacles far behind or ahead
      if (obs.worldX < this.player.x - INTERNAL_WIDTH) continue;
      if (obs.worldX > this.player.x + INTERNAL_WIDTH) continue;

      if (obs.type === "falling") {
        // Trigger fall when player approaches
        const triggerDist = 120 + (this.scrollSpeed * 0.2);
        if (!obs.fallTriggered && Math.abs(this.player.x - obs.worldX) < triggerDist) {
          obs.fallTriggered = true;
          const block = obs.sprites[0] as Phaser.GameObjects.Rectangle;
          if (block && block.active) {
            // Animate the fall
            this.tweens.add({
              targets: block,
              y: GY * T - T * 0.75,
              duration: 450,
              ease: "Quad.easeIn",
              onComplete: () => {
                // Screen shake on impact
                this.cameras.main.shake(80, 0.005);
                // Destroy after a moment
                this.time.delayedCall(800, () => {
                  if (block.active) block.setAlpha(0.3);
                });
              },
            });
          }
        }

        // Collision check for falling obstacles
        if (obs.fallTriggered) {
          const block = obs.sprites[0] as Phaser.GameObjects.Rectangle;
          if (block && block.active) {
            const bx = block.x, by = block.y;
            const bw = T * 0.75, bh = T * 0.75;
            if (playerRight > bx - bw && playerLeft < bx + bw &&
                playerBottom > by - bh && playerTop < by + bh) {
              obs.hit = true;
              this.cartDamage();
            }
          }
        }
        continue;
      }

      const obsLeft = obs.worldX;
      const obsRight = obsLeft + obs.width;

      if (playerRight < obsLeft || playerLeft > obsRight) continue;

      if (obs.type === "low_barrier") {
        const barrierTop = (GY - 2) * T;
        if (playerBottom > barrierTop + T / 2 && playerBottom < GY * T + T) {
          obs.hit = true;
          this.cartDamage();
        }
      } else if (obs.type === "high_barrier") {
        const hbTop = (GY - 3) * T;
        const hbBottom = (GY - 1) * T;
        if (playerTop < hbBottom && playerBottom > hbTop + T) {
          if (!this.isDucking) {
            obs.hit = true;
            this.cartDamage();
          }
        }
      } else if (obs.type === "gap") {
        if (this.player.y > GY * T + T) {
          obs.hit = true;
          this.cartDamage();
        }
      } else if (obs.type === "spikes") {
        const spikeTop = GY * T - T + 2;
        if (playerBottom > spikeTop && playerBottom < GY * T + T / 2) {
          obs.hit = true;
          this.cartDamage();
        }
      }
    }

    // ═══ FALL DEATH ═══
    if (this.player.y > 12 * T + 50) {
      this.cartDamage();
      this.player.setPosition(this.player.x + 3 * T, (GY - 2) * T);
      body.velocity.y = 0;
    }

    // ═══ SPEED LINES ═══
    this.updateSpeedLines(dt);

    // ═══ PARTICLE TRAIL ═══
    this.updateTrail(dt);

    // ═══ LEVEL END ═══
    if (this.player.x > this.levelLength - 3 * T) {
      // Slow down the cart for dramatic finish
      this.scrollSpeed = Math.max(this.scrollSpeed - 400 * dt, 0);
      body.velocity.x = this.scrollSpeed;
      if (this.scrollSpeed <= 10) {
        this.levelComplete();
      }
    }
  }
}
