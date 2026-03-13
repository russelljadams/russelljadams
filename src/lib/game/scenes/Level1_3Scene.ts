import Phaser from "phaser";
import Player from "../entities/Player";
import {
  TILE_SIZE, INTERNAL_WIDTH, INTERNAL_HEIGHT,
  SHAKE_PLAYER_DAMAGE_DURATION, SHAKE_PLAYER_DAMAGE_INTENSITY,
  MAX_HP, INVINCIBILITY_DURATION,
  CART_HITS_BEFORE_CRASH,
} from "../constants";

/**
 * Level 1-3: "Mine Cart" — Auto-scrolling cart runner.
 * Player moves right automatically. Only jump and duck are available.
 * No left/right movement, no attack.
 */

interface Obstacle {
  sprite: Phaser.GameObjects.GameObject;
  type: "low_barrier" | "high_barrier" | "gap";
  tileX: number;
  hit: boolean;
}

interface CartCheckpoint {
  tileX: number;
  activated: boolean;
}

export default class Level1_3Scene extends Phaser.Scene {
  public player!: Player;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private hearts!: Phaser.Physics.Arcade.StaticGroup;
  private spiritFragments!: Phaser.Physics.Arcade.StaticGroup;
  private obstacles: Obstacle[] = [];
  private cartCheckpoints: CartCheckpoint[] = [];

  private heartsCollected: number = 0;
  private fragmentsCollected: number = 0;
  private levelStartTime: number = 0;
  private cartHP: number = CART_HITS_BEFORE_CRASH;
  private iFrameTimer: number = 0;

  // Cart state
  private cartSpeed: number = 300;
  private cartRect!: Phaser.GameObjects.Rectangle;
  private scrollX: number = 0;
  private trackGround!: Phaser.Physics.Arcade.StaticGroup;
  private isLevelComplete: boolean = false;
  private levelLength: number = 0; // total pixel width

  // Duck state
  private isDucking: boolean = false;
  private duckKey: Phaser.Input.Keyboard.Key | null = null;
  public touchDuck: boolean = false;

  // Keyboard
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;

  // Checkpoint respawn
  private lastCheckpointScrollX: number = 0;
  private lastCheckpointSpeed: number = 300;

  // Speed zones
  private speedZones: { startTile: number; speed: number }[] = [];

  constructor() {
    super({ key: "Level1_3" });
  }

  create(): void {
    console.log("[GGsHeart] Level1_3Scene.create() — Mine Cart");
    this.heartsCollected = 0;
    this.fragmentsCollected = 0;
    this.obstacles = [];
    this.cartCheckpoints = [];
    this.speedZones = [];
    this.cartHP = CART_HITS_BEFORE_CRASH;
    this.iFrameTimer = 0;
    this.cartSpeed = 300;
    this.scrollX = 0;
    this.isLevelComplete = false;
    this.lastCheckpointScrollX = 0;
    this.lastCheckpointSpeed = 300;
    this.levelStartTime = this.time.now;
    this.isDucking = false;
    this.touchDuck = false;

    // ~90 seconds of track at avg ~333 px/s = ~30000px = ~940 tiles
    // We will use 950 tiles of track
    const trackTiles = 950;
    this.levelLength = trackTiles * TILE_SIZE;
    const levelWidth = this.levelLength + INTERNAL_WIDTH; // extra buffer
    const levelHeight = 12 * TILE_SIZE;
    this.physics.world.setBounds(0, 0, levelWidth, levelHeight);

    this.createParallaxBackground(levelWidth);

    this.platforms = this.physics.add.staticGroup();
    this.trackGround = this.physics.add.staticGroup();
    this.hearts = this.physics.add.staticGroup();
    this.spiritFragments = this.physics.add.staticGroup();

    // Input
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.duckKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    this.buildTrack(trackTiles);

    // Player — positioned on the track
    const GY = 9;
    this.player = new Player(this, 5 * TILE_SIZE, (GY - 2) * TILE_SIZE);
    this.player.setDepth(10);

    // Disable player horizontal movement by overriding velocity each frame
    // The player entity still handles jump physics

    // Cart visual — a rectangle under the player
    this.cartRect = this.add.rectangle(
      this.player.x, GY * TILE_SIZE - 2, 40, 16, 0x886644
    ).setDepth(9);
    // Cart wheels
    this.add.circle(this.player.x - 12, GY * TILE_SIZE + 6, 5, 0x555555).setDepth(9);
    this.add.circle(this.player.x + 12, GY * TILE_SIZE + 6, 5, 0x555555).setDepth(9);

    // Camera — leads ahead of player
    this.cameras.main.setBounds(0, 0, levelWidth, levelHeight);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.15);
    this.cameras.main.setFollowOffset(-100, 0); // lead ahead by 100px

    // Collisions
    this.physics.add.collider(this.player, this.trackGround);
    this.physics.add.collider(this.player, this.platforms);

    this.physics.add.overlap(this.player, this.hearts, (_p, heart) => {
      this.collectHeart(heart as Phaser.Physics.Arcade.Sprite);
    });

    this.physics.add.overlap(this.player, this.spiritFragments, (_p, frag) => {
      this.collectFragment(frag as Phaser.Physics.Arcade.Sprite);
    });

    // Launch UI
    if (!this.scene.isActive("UIScene")) {
      this.scene.launch("UIScene", { levelKey: "Level1_3" });
    }
    this.events.emit("player-damaged", this.cartHP);
    this.events.emit("hearts-updated", this.heartsCollected);

    // Landing dust
    this.events.on("player-landed", (x: number, y: number, velY: number) => {
      const count = Math.min(Math.floor(velY / 100), 6);
      for (let i = 0; i < count; i++) {
        const dust = this.add.circle(
          x + Phaser.Math.Between(-12, 12),
          y + 14,
          Phaser.Math.Between(2, 4),
          0x9a8a6a, 0.6
        ).setDepth(9);
        this.tweens.add({
          targets: dust,
          x: dust.x + Phaser.Math.Between(-18, 18),
          y: dust.y - Phaser.Math.Between(4, 12),
          alpha: 0, scale: 0,
          duration: Phaser.Math.Between(250, 400),
          onComplete: () => dust.destroy(),
        });
      }
    });

    console.log("[GGsHeart] Level1_3Scene ready. Track length:", trackTiles, "tiles");
  }

  private createParallaxBackground(levelWidth: number): void {
    // Dark mine shaft background
    this.add.rectangle(0, 0, levelWidth, INTERNAL_HEIGHT, 0x0d0d1a)
      .setOrigin(0).setScrollFactor(0).setDepth(-4);

    // Mine support beams in background
    for (let x = 0; x < levelWidth; x += 200) {
      // Vertical beam
      this.add.rectangle(x, 0, 8, INTERNAL_HEIGHT, 0x3a2a1a)
        .setOrigin(0).setScrollFactor(0.2, 0).setDepth(-3).setAlpha(0.4);
      // Horizontal beam at top
      this.add.rectangle(x - 20, 20, 48, 6, 0x3a2a1a)
        .setOrigin(0).setScrollFactor(0.2, 0).setDepth(-3).setAlpha(0.3);
    }

    // Dim particles — mine dust
    this.add.particles(0, 0, "particle", {
      x: { min: 0, max: levelWidth },
      y: { min: 0, max: INTERNAL_HEIGHT },
      lifespan: 3000,
      speed: { min: 2, max: 8 },
      scale: { start: 0.3, end: 0 },
      alpha: { start: 0.3, end: 0 },
      tint: [0x554433, 0x665544, 0x443322],
      frequency: 400,
      quantity: 1,
    }).setScrollFactor(0.5).setDepth(-1);
  }

  private buildTrack(trackTiles: number): void {
    const T = TILE_SIZE;
    const GY = 9; // Ground row for the track

    // Lay continuous track ground with gaps for obstacles
    const gapTiles = new Set<number>(); // tiles that are gaps (no ground)

    // Define speed zones: section -> speed
    this.speedZones = [
      { startTile: 0, speed: 300 },
      { startTile: 350, speed: 350 },
      { startTile: 650, speed: 400 },
    ];

    // ═══ Define obstacle patterns ═══
    // Format: [tileX, type]
    // Breather sections between intense parts
    const obstacleList: { tileX: number; type: "low_barrier" | "high_barrier" | "gap" }[] = [];

    // ── SECTION 1: Learning (tiles 30-200, speed 300) ──
    // Gentle intro — widely spaced, single obstacles

    // First low barrier — just jump over it
    obstacleList.push({ tileX: 40, type: "low_barrier" });
    // Breather...
    obstacleList.push({ tileX: 70, type: "low_barrier" });
    // Introduce high barrier — must duck
    obstacleList.push({ tileX: 100, type: "high_barrier" });
    // Breather...
    obstacleList.push({ tileX: 130, type: "low_barrier" });
    obstacleList.push({ tileX: 145, type: "high_barrier" });
    // First gap — must jump
    obstacleList.push({ tileX: 175, type: "gap" });
    // Breather...
    obstacleList.push({ tileX: 200, type: "low_barrier" });

    // ── Checkpoint 1 at tile ~230 ──

    // ── SECTION 2: Mixing It Up (tiles 230-500, speed 300→350) ──
    obstacleList.push({ tileX: 250, type: "high_barrier" });
    obstacleList.push({ tileX: 270, type: "gap" });
    // Breather...
    obstacleList.push({ tileX: 300, type: "low_barrier" });
    obstacleList.push({ tileX: 315, type: "low_barrier" });
    obstacleList.push({ tileX: 340, type: "high_barrier" });
    // Speed increases to 350 at tile 350
    obstacleList.push({ tileX: 370, type: "gap" });
    obstacleList.push({ tileX: 395, type: "low_barrier" });
    obstacleList.push({ tileX: 410, type: "high_barrier" });
    obstacleList.push({ tileX: 430, type: "low_barrier" });
    // Combo: jump then immediately duck
    obstacleList.push({ tileX: 455, type: "low_barrier" });
    obstacleList.push({ tileX: 463, type: "high_barrier" });
    // Breather...
    obstacleList.push({ tileX: 500, type: "gap" });

    // ── Checkpoint 2 at tile ~530 ──

    // ── SECTION 3: Escalation (tiles 530-900, speed 350→400) ──
    obstacleList.push({ tileX: 550, type: "low_barrier" });
    obstacleList.push({ tileX: 565, type: "gap" });
    obstacleList.push({ tileX: 590, type: "high_barrier" });
    obstacleList.push({ tileX: 605, type: "low_barrier" });
    // Rapid combo
    obstacleList.push({ tileX: 630, type: "low_barrier" });
    obstacleList.push({ tileX: 638, type: "high_barrier" });
    obstacleList.push({ tileX: 646, type: "low_barrier" });
    // Speed to 400 at tile 650
    // Breather...
    obstacleList.push({ tileX: 680, type: "gap" });
    obstacleList.push({ tileX: 700, type: "high_barrier" });
    obstacleList.push({ tileX: 715, type: "low_barrier" });
    obstacleList.push({ tileX: 725, type: "gap" });
    // Dense section
    obstacleList.push({ tileX: 755, type: "low_barrier" });
    obstacleList.push({ tileX: 763, type: "high_barrier" });
    obstacleList.push({ tileX: 775, type: "gap" });
    obstacleList.push({ tileX: 790, type: "low_barrier" });
    obstacleList.push({ tileX: 800, type: "high_barrier" });
    obstacleList.push({ tileX: 815, type: "gap" });
    // Final push
    obstacleList.push({ tileX: 840, type: "low_barrier" });
    obstacleList.push({ tileX: 848, type: "high_barrier" });
    obstacleList.push({ tileX: 856, type: "low_barrier" });
    obstacleList.push({ tileX: 870, type: "gap" });
    obstacleList.push({ tileX: 890, type: "high_barrier" });
    // Breather before end...

    // Mark gap tiles
    for (const obs of obstacleList) {
      if (obs.type === "gap") {
        for (let g = 0; g < 4; g++) {
          gapTiles.add(obs.tileX + g);
        }
      }
    }

    // Lay the track ground
    for (let i = 0; i < trackTiles; i++) {
      if (gapTiles.has(i)) continue;
      const x = i * T + T / 2;
      const y = GY * T + T / 2;
      const tile = this.trackGround.create(x, y, "tile_surface") as Phaser.Physics.Arcade.Sprite;
      tile.refreshBody();
      // Fill below
      for (let j = GY + 1; j < 12; j++) {
        this.add.image(i * T + T / 2, j * T + T / 2, "tile_ground");
      }
    }

    // Track rails visual (two thin lines on the ground)
    for (let i = 0; i < trackTiles; i += 3) {
      if (gapTiles.has(i)) continue;
      const x = i * T + T / 2;
      const y = GY * T;
      this.add.rectangle(x, y - 1, T * 3, 2, 0x888888, 0.4).setDepth(1);
    }

    // Place obstacles
    for (const obs of obstacleList) {
      this.placeObstacle(obs.tileX, GY, obs.type);
    }

    // Place checkpoints
    this.cartCheckpoints.push({ tileX: 230, activated: false });
    this.cartCheckpoints.push({ tileX: 530, activated: false });

    // Checkpoint visuals
    for (const cp of this.cartCheckpoints) {
      const cpSprite = this.add.image(cp.tileX * T + T / 2, (GY - 1) * T + T / 2, "checkpoint").setDepth(5);
      (cp as any).sprite = cpSprite;
    }

    // ═══ Hearts — floating above obstacles as risk/reward ═══
    const heartPositions = [
      35, 65, 95, 125, 160, 195, 240, 285, 330, 380, 425, 475, 545, 620, 690, 750, 830, 880
    ];
    for (const hx of heartPositions) {
      this.placeCartHeart(hx, GY - 3);
    }

    // ═══ Spirit Fragments — tricky spots requiring well-timed jumps ═══
    // Fragment 1: right after a gap, must jump early and high
    this.placeCartFragment(178, GY - 4);
    // Fragment 2: between two rapid obstacles
    this.placeCartFragment(460, GY - 4);
    // Fragment 3: during the fast final section, above a gap
    this.placeCartFragment(777, GY - 4);
  }

  private placeObstacle(tileX: number, groundRow: number, type: "low_barrier" | "high_barrier" | "gap"): void {
    const T = TILE_SIZE;

    if (type === "low_barrier") {
      // Short wall on the ground — must jump over
      const barrier = this.platforms.create(
        tileX * T + T / 2, (groundRow - 1) * T + T / 2, "tile_surface"
      ) as Phaser.Physics.Arcade.Sprite;
      barrier.refreshBody();
      // Visual: add a second tile on top for height
      const barrierTop = this.platforms.create(
        tileX * T + T / 2, (groundRow - 2) * T + T / 2, "tile_surface"
      ) as Phaser.Physics.Arcade.Sprite;
      barrierTop.refreshBody();
      // Mark as obstacle for collision detection
      this.obstacles.push({ sprite: barrier, type, tileX, hit: false });

    } else if (type === "high_barrier") {
      // Overhead barrier — must duck under
      // Place solid tiles at head height (rows groundRow-2 and groundRow-3)
      // Player can pass under if ducking (reduced hitbox)
      const hb1 = this.add.rectangle(
        tileX * T + T / 2, (groundRow - 2) * T + T / 2,
        T, T, 0x664422
      ).setDepth(5);
      const hb2 = this.add.rectangle(
        (tileX + 1) * T + T / 2, (groundRow - 2) * T + T / 2,
        T, T, 0x664422
      ).setDepth(5);
      // Chains hanging down visual
      this.add.rectangle(tileX * T + T / 2, (groundRow - 3) * T + T / 2, T, T, 0x554433).setDepth(5);
      this.add.rectangle((tileX + 1) * T + T / 2, (groundRow - 3) * T + T / 2, T, T, 0x554433).setDepth(5);

      // The actual hitbox for the high barrier — covers 2 tiles wide at head height
      const hitzone = this.add.rectangle(
        tileX * T + T, (groundRow - 2) * T + T / 2,
        T * 2, T, 0xff0000, 0
      ).setDepth(5);
      this.physics.add.existing(hitzone, true);
      this.obstacles.push({ sprite: hitzone, type, tileX, hit: false });

    } else if (type === "gap") {
      // Gap in the track — tiles already excluded from ground placement
      // Just record it for collision checking (fall detection)
      const gapZone = this.add.rectangle(
        (tileX + 2) * T, groundRow * T + T, T * 4, T * 2, 0xff0000, 0
      );
      this.physics.add.existing(gapZone, true);
      this.obstacles.push({ sprite: gapZone, type, tileX, hit: false });
    }
  }

  private placeCartHeart(tileX: number, tileY: number): void {
    const T = TILE_SIZE;
    const h = this.hearts.create(tileX * T + T / 2, tileY * T + T / 2, "heart") as Phaser.Physics.Arcade.Sprite;
    h.refreshBody();
    this.tweens.add({
      targets: h, y: h.y - 6, duration: 1200,
      yoyo: true, repeat: -1, ease: "Sine.easeInOut",
    });
  }

  private placeCartFragment(tileX: number, tileY: number): void {
    const T = TILE_SIZE;
    const f = this.spiritFragments.create(
      tileX * T + T / 2, tileY * T + T / 2, "spirit_fragment"
    ) as Phaser.Physics.Arcade.Sprite;
    f.refreshBody();
    this.tweens.add({
      targets: f, y: f.y - 4, alpha: { from: 0.7, to: 1 },
      duration: 1500, yoyo: true, repeat: -1, ease: "Sine.easeInOut",
    });
  }

  private collectHeart(heart: Phaser.Physics.Arcade.Sprite): void {
    if (!heart.active) return;
    const x = heart.x, y = heart.y;

    const hBody = heart.body as Phaser.Physics.Arcade.Body;
    if (hBody) hBody.enable = false;

    this.tweens.add({
      targets: heart,
      scaleX: 1.8, scaleY: 1.8, alpha: 0,
      duration: 250, ease: "Back.easeIn",
      onComplete: () => heart.destroy(),
    });

    const flash = this.add.rectangle(
      this.cameras.main.scrollX + INTERNAL_WIDTH / 2,
      this.cameras.main.scrollY + INTERNAL_HEIGHT / 2,
      INTERNAL_WIDTH, INTERNAL_HEIGHT,
      0xffffff, 0.3
    ).setScrollFactor(0).setDepth(50);
    this.tweens.add({
      targets: flash, alpha: 0, duration: 150,
      onComplete: () => flash.destroy(),
    });

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const p = this.add.circle(x, y, 3, 0xff6699).setDepth(11);
      this.tweens.add({
        targets: p,
        x: x + Math.cos(angle) * 25,
        y: y + Math.sin(angle) * 25,
        alpha: 0, scale: 0, duration: 350,
        ease: "Quad.easeOut",
        onComplete: () => p.destroy(),
      });
    }

    this.heartsCollected++;
    if (this.cartHP < 3) { this.cartHP++; this.events.emit("player-damaged", this.cartHP); }
    this.events.emit("hearts-updated", this.heartsCollected);
  }

  private collectFragment(frag: Phaser.Physics.Arcade.Sprite): void {
    frag.destroy();
    this.fragmentsCollected++;
    const x = frag.x, y = frag.y;
    for (let i = 0; i < 8; i++) {
      const p = this.add.circle(x, y, 3, 0x44aaff);
      this.tweens.add({
        targets: p,
        x: x + Phaser.Math.Between(-30, 30),
        y: y + Phaser.Math.Between(-30, 30),
        alpha: 0, duration: 600,
        onComplete: () => p.destroy(),
      });
    }
  }

  private cartDamage(): void {
    if (this.iFrameTimer > 0) return;
    this.cartHP--;
    this.iFrameTimer = INVINCIBILITY_DURATION;
    this.cameras.main.shake(SHAKE_PLAYER_DAMAGE_DURATION, SHAKE_PLAYER_DAMAGE_INTENSITY);
    this.events.emit("player-damaged", this.cartHP);

    // Flash the cart red
    this.cartRect.setFillStyle(0xff2222);
    this.time.delayedCall(200, () => {
      if (this.cartRect) this.cartRect.setFillStyle(0x886644);
    });

    if (this.cartHP <= 0) {
      this.cartCrash();
    }
  }

  private cartCrash(): void {
    // Reset to last checkpoint
    this.cartHP = CART_HITS_BEFORE_CRASH;
    this.iFrameTimer = 0;
    this.scrollX = this.lastCheckpointScrollX;
    this.cartSpeed = this.lastCheckpointSpeed;
    this.player.setPosition(5 * TILE_SIZE + this.scrollX, 7 * TILE_SIZE);
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    body.velocity.x = 0;
    body.velocity.y = 0;

    // Reset obstacle hit flags
    for (const obs of this.obstacles) {
      obs.hit = false;
    }

    this.events.emit("player-damaged", this.cartHP);

    // Crash effect
    const flash = this.add.rectangle(
      this.cameras.main.scrollX + INTERNAL_WIDTH / 2,
      this.cameras.main.scrollY + INTERNAL_HEIGHT / 2,
      INTERNAL_WIDTH, INTERNAL_HEIGHT,
      0xff0000, 0.4
    ).setScrollFactor(0).setDepth(50);
    this.tweens.add({
      targets: flash, alpha: 0, duration: 500,
      onComplete: () => flash.destroy(),
    });
  }

  private levelComplete(): void {
    if (this.isLevelComplete) return;
    this.isLevelComplete = true;
    const elapsed = Math.floor((this.time.now - this.levelStartTime) / 1000);
    this.scene.stop("UIScene");
    this.scene.start("LevelCompleteScene", {
      levelKey: "Level1_3", hearts: this.heartsCollected,
      fragments: this.fragmentsCollected,
      time: elapsed,
    });
  }

  update(time: number, delta: number): void {
    if (!this.player || !this.player.active || this.isLevelComplete) return;

    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const T = TILE_SIZE;
    const dt = delta / 1000;

    // ═══ DUCK INPUT ═══
    const duckInput = (this.duckKey?.isDown ?? false) ||
                      (this.cursors?.down?.isDown ?? false) ||
                      this.touchDuck;

    if (duckInput && !this.isDucking) {
      this.isDucking = true;
      // Reduce player hitbox height by half, shift down
      body.setSize(20, 14);
      body.setOffset(6, 18);
      this.player.setScale(1, 0.5);
    } else if (!duckInput && this.isDucking) {
      this.isDucking = false;
      // Restore player hitbox
      body.setSize(20, 28);
      body.setOffset(6, 4);
      this.player.setScale(1, 1);
    }

    // ═══ AUTO-SCROLL ═══
    // Determine current speed based on speed zones
    const playerTile = Math.floor(this.player.x / T);
    for (const zone of this.speedZones) {
      if (playerTile >= zone.startTile) {
        this.cartSpeed = zone.speed;
      }
    }

    // Move player forward automatically
    body.velocity.x = this.cartSpeed;
    // Override any player horizontal input — cart controls
    // The Player.update() will try to set velocity, so we override after
    this.player.update(time, delta);
    body.velocity.x = this.cartSpeed; // re-enforce after player update

    // Update cart visual position
    this.cartRect.setPosition(this.player.x, 9 * T - 2);

    // ═══ I-FRAMES ═══
    if (this.iFrameTimer > 0) {
      this.iFrameTimer -= delta;
      this.player.setAlpha(Math.sin(Date.now() * 0.02) > 0 ? 1 : 0.3);
      if (this.iFrameTimer <= 0) this.player.setAlpha(1);
    }

    // ═══ CHECKPOINT ACTIVATION ═══
    for (const cp of this.cartCheckpoints) {
      if (!cp.activated && this.player.x > cp.tileX * T) {
        cp.activated = true;
        this.lastCheckpointScrollX = this.player.x - 5 * T;
        this.lastCheckpointSpeed = this.cartSpeed;
        // Visual feedback
        const cpSprite = (cp as any).sprite as Phaser.GameObjects.Image;
        if (cpSprite) cpSprite.setTexture("checkpoint_active");

        const glow = this.add.circle(cp.tileX * T, 8 * T, 8, 0x44ff44, 0.5).setDepth(11);
        this.tweens.add({
          targets: glow, scaleX: 4, scaleY: 4, alpha: 0,
          duration: 500, ease: "Quad.easeOut",
          onComplete: () => glow.destroy(),
        });
      }
    }

    // ═══ OBSTACLE COLLISION CHECK ═══
    const playerLeft = this.player.x - 10;
    const playerRight = this.player.x + 10;
    const playerTop = this.player.y - (this.isDucking ? 7 : 14);
    const playerBottom = this.player.y + 14;
    const GY = 9;

    for (const obs of this.obstacles) {
      if (obs.hit) continue;
      const obsLeft = obs.tileX * T;
      const obsRight = obsLeft + (obs.type === "gap" ? T * 4 : T * 2);

      // Check if player is within obstacle X range
      if (playerRight < obsLeft || playerLeft > obsRight) continue;

      if (obs.type === "low_barrier") {
        // Low barrier: 2 tiles high from ground. Player must jump over.
        const barrierTop = (GY - 2) * T;
        if (playerBottom > barrierTop + T / 2 && playerBottom < GY * T + T) {
          obs.hit = true;
          this.cartDamage();
        }
      } else if (obs.type === "high_barrier") {
        // High barrier at head height. Player must duck.
        const hbTop = (GY - 3) * T;
        const hbBottom = (GY - 1) * T;
        if (playerTop < hbBottom && playerBottom > hbTop + T) {
          // Only hit if NOT ducking
          if (!this.isDucking) {
            obs.hit = true;
            this.cartDamage();
          }
        }
      } else if (obs.type === "gap") {
        // Gap: if player falls into it
        if (this.player.y > GY * T + T) {
          obs.hit = true;
          this.cartDamage();
        }
      }
    }

    // ═══ FALL DEATH (below level) ═══
    if (this.player.y > 12 * T + 50) {
      this.cartDamage();
      // Teleport back up onto track
      this.player.setPosition(this.player.x + 3 * T, (GY - 2) * T);
      body.velocity.y = 0;
    }

    // ═══ LEVEL END CHECK ═══
    if (this.player.x > this.levelLength - 2 * T) {
      this.levelComplete();
    }
  }
}
