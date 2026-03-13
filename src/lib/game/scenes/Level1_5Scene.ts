import Phaser from "phaser";
import Player from "../entities/Player";
import {
  TILE_SIZE, INTERNAL_WIDTH, INTERNAL_HEIGHT,
  SHAKE_ENEMY_KILL_DURATION, SHAKE_ENEMY_KILL_INTENSITY,
} from "../constants";

interface EnemyData {
  sprite: Phaser.Physics.Arcade.Sprite;
  startX: number;
  range: number;
  speed: number;
  hp: number;
  direction: number;
}

export default class Level1_5Scene extends Phaser.Scene {
  public player!: Player;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private spikes!: Phaser.Physics.Arcade.StaticGroup;
  private hearts!: Phaser.Physics.Arcade.StaticGroup;
  private checkpoints!: Phaser.Physics.Arcade.StaticGroup;
  private enemies: EnemyData[] = [];
  private shrine!: Phaser.Physics.Arcade.Sprite;
  private spiritFragments!: Phaser.Physics.Arcade.StaticGroup;
  private movingPlatforms: Phaser.Physics.Arcade.Sprite[] = [];
  private heartsCollected: number = 0;
  private fragmentsCollected: number = 0;
  private levelStartTime: number = 0;
  private activeCheckpoints: Set<string> = new Set();
  private spikeIFrameTimer: number = 0;

  constructor() {
    super({ key: "Level1_5" });
  }

  create(): void {
    console.log("[GGsHeart] Level1_5Scene.create() — Thorns");
    this.heartsCollected = 0;
    this.fragmentsCollected = 0;
    this.enemies = [];
    this.movingPlatforms = [];
    this.activeCheckpoints = new Set();
    this.spikeIFrameTimer = 0;
    this.levelStartTime = this.time.now;

    const levelWidth = 280 * TILE_SIZE;  // 4480px
    const levelHeight = 14 * TILE_SIZE;  // 224px
    this.physics.world.setBounds(0, 0, levelWidth, levelHeight);

    this.createParallaxBackground(levelWidth, levelHeight);

    this.platforms = this.physics.add.staticGroup();
    this.spikes = this.physics.add.staticGroup();
    this.hearts = this.physics.add.staticGroup();
    this.checkpoints = this.physics.add.staticGroup();
    this.spiritFragments = this.physics.add.staticGroup();

    this.buildLevel();

    // Player
    this.player = new Player(this, 3 * TILE_SIZE, 10 * TILE_SIZE);
    this.player.setDepth(10);

    // Camera
    this.cameras.main.setBounds(0, 0, levelWidth, levelHeight);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.15);
    this.cameras.main.setDeadzone(40, 20);

    // Landing dust particles
    this.events.on("player-landed", (x: number, y: number, velY: number) => {
      const count = Math.min(Math.floor(velY / 100), 6);
      for (let i = 0; i < count; i++) {
        const dust = this.add.circle(
          x + Phaser.Math.Between(-12, 12), y + 14,
          Phaser.Math.Between(2, 4), 0x9a8a6a, 0.6
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

    // Collisions
    this.physics.add.collider(this.player, this.platforms);
    for (const mp of this.movingPlatforms) {
      this.physics.add.collider(this.player, mp);
    }

    // Spike overlap — damages player on contact with brief invincibility
    this.physics.add.overlap(this.player, this.spikes, () => {
      if (this.spikeIFrameTimer > 0) return;
      this.player.takeDamage(1);
      this.spikeIFrameTimer = 800;
      this.player.setTint(0xff3333);
      this.time.delayedCall(200, () => {
        if (this.player.active) this.player.clearTint();
      });
    });

    this.physics.add.overlap(this.player, this.hearts, (_p, h) => {
      this.collectHeart(h as Phaser.Physics.Arcade.Sprite);
    });
    this.physics.add.overlap(this.player, this.checkpoints, (_p, cp) => {
      this.activateCheckpoint(cp as Phaser.Physics.Arcade.Sprite);
    });
    this.physics.add.overlap(this.player, this.spiritFragments, (_p, f) => {
      this.collectFragment(f as Phaser.Physics.Arcade.Sprite);
    });

    if (this.shrine) {
      this.physics.add.overlap(this.player, this.shrine, () => this.levelComplete());
    }

    for (const enemy of this.enemies) {
      this.physics.add.collider(enemy.sprite, this.platforms);
      this.physics.add.overlap(this.player, enemy.sprite, () => {
        this.playerHitEnemy(enemy);
      });
    }

    // Launch UI
    if (!this.scene.isActive("UIScene")) {
      this.scene.launch("UIScene", { levelKey: "Level1_5" });
    }
    this.events.emit("player-damaged", this.player.hp);
    this.events.emit("hearts-updated", this.heartsCollected);
  }

  /* ────────────────────────────────────────
     PARALLAX BACKGROUND — Thorny bramble cavern
     ──────────────────────────────────────── */
  private createParallaxBackground(levelWidth: number, levelHeight: number): void {
    // Bruise-purple sky
    this.add.rectangle(0, 0, levelWidth, levelHeight, 0x100818)
      .setOrigin(0).setScrollFactor(0).setDepth(-4);

    // Hanging thorn vines in background
    for (let x = 0; x < levelWidth; x += 120) {
      const h = Phaser.Math.Between(40, 90);
      this.add.rectangle(x, 0, 3, h, 0x2a0e1a)
        .setOrigin(0).setScrollFactor(0.15, 0).setDepth(-3).setAlpha(0.5);
      for (let j = 10; j < h; j += 15) {
        const s = (j % 30 < 15) ? -1 : 1;
        this.add.triangle(x + s * 2, j, 0, 0, s * 8, -4, s * 2, -8, 0x3a1222)
          .setOrigin(0).setScrollFactor(0.15, 0).setDepth(-3).setAlpha(0.4);
      }
    }

    // Ground-level bramble shapes
    for (let x = 0; x < levelWidth; x += 180) {
      this.add.rectangle(x, levelHeight - 20, Phaser.Math.Between(30, 60), 15, 0x1a0a12)
        .setOrigin(0).setScrollFactor(0.25, 0.3).setDepth(-3).setAlpha(0.4);
    }

    // Floating spore particles
    this.add.particles(0, 0, "particle", {
      x: { min: 0, max: levelWidth },
      y: { min: 0, max: levelHeight },
      lifespan: 4000,
      speed: { min: 2, max: 6 },
      scale: { start: 0.3, end: 0 },
      alpha: { start: 0.25, end: 0 },
      tint: [0x662244, 0x883355, 0x441133],
      frequency: 350,
      quantity: 1,
    }).setScrollFactor(0.5).setDepth(-1);
  }

  /* ────────────────────────────────────────
     LEVEL CONSTRUCTION
     ──────────────────────────────────────── */
  private buildLevel(): void {
    const T = TILE_SIZE;
    const GR = 12; // main ground row

    // ── Placement helpers ──

    const placeGround = (sx: number, w: number, row: number) => {
      for (let i = 0; i < w; i++) {
        (this.platforms.create((sx + i) * T + T / 2, row * T + T / 2, "tile_surface") as Phaser.Physics.Arcade.Sprite).refreshBody();
        for (let j = row + 1; j < 14; j++) {
          this.add.image((sx + i) * T + T / 2, j * T + T / 2, "tile_ground");
        }
      }
    };

    const placePlat = (tx: number, ty: number, w: number = 3) => {
      for (let i = 0; i < w; i++) {
        (this.platforms.create((tx + i) * T + T / 2, ty * T + T / 2, "tile_surface") as Phaser.Physics.Arcade.Sprite).refreshBody();
      }
    };

    const placeSpike = (tx: number, ty: number) => {
      const s = this.spikes.create(tx * T + T / 2, ty * T + T / 2, "tile_spikes") as Phaser.Physics.Arcade.Sprite;
      s.refreshBody();
      (s.body as Phaser.Physics.Arcade.Body).setSize(12, 12).setOffset(2, 2);
    };

    const spikeRow = (sx: number, n: number, row: number) => {
      for (let i = 0; i < n; i++) placeSpike(sx + i, row);
    };

    const ceilSpike = (tx: number, ty: number) => {
      const s = this.spikes.create(tx * T + T / 2, ty * T + T / 2, "tile_spikes") as Phaser.Physics.Arcade.Sprite;
      s.setFlipY(true);
      s.refreshBody();
      (s.body as Phaser.Physics.Arcade.Body).setSize(12, 12).setOffset(2, 2);
    };

    const ceilRow = (sx: number, n: number, row: number) => {
      for (let i = 0; i < n; i++) ceilSpike(sx + i, row);
    };

    const placeCeiling = (sx: number, n: number, row: number) => {
      for (let i = 0; i < n; i++) {
        (this.platforms.create((sx + i) * T + T / 2, row * T + T / 2, "tile_ground") as Phaser.Physics.Arcade.Sprite).refreshBody();
      }
    };

    const placeHeart = (tx: number, ty: number) => {
      const h = this.hearts.create(tx * T + T / 2, ty * T + T / 2, "heart") as Phaser.Physics.Arcade.Sprite;
      h.refreshBody();
      this.tweens.add({
        targets: h, y: h.y - 6, duration: 1200,
        yoyo: true, repeat: -1, ease: "Sine.easeInOut",
      });
    };

    const placeEnemy = (tx: number, ty: number, range: number = 3, spd: number = 50) => {
      const e = this.physics.add.sprite(tx * T + T / 2, ty * T + T / 2, "shade_wisp");
      (e.body as Phaser.Physics.Arcade.Body).setAllowGravity(false).setImmovable(true);
      this.enemies.push({
        sprite: e, startX: tx * T + T / 2,
        range: range * T, speed: spd, hp: 1, direction: 1,
      });
    };

    const placeCP = (tx: number, row: number) => {
      const cp = this.checkpoints.create(
        tx * T + T / 2, (row - 1) * T + T / 2, "checkpoint"
      ) as Phaser.Physics.Arcade.Sprite;
      cp.refreshBody();
    };

    const placeFrag = (tx: number, ty: number) => {
      const f = this.spiritFragments.create(
        tx * T + T / 2, ty * T + T / 2, "spirit_fragment"
      ) as Phaser.Physics.Arcade.Sprite;
      f.refreshBody();
      this.tweens.add({
        targets: f, y: f.y - 4, alpha: { from: 0.7, to: 1 },
        duration: 1500, yoyo: true, repeat: -1, ease: "Sine.easeInOut",
      });
    };

    const placeMovPlat = (tx: number, ty: number, w: number, mx: number, my: number, dur: number) => {
      const mp = this.physics.add.sprite(
        tx * T + T / 2 + ((w - 1) * T) / 2, ty * T + T / 2, "tile_surface"
      );
      mp.setDisplaySize(w * T, T).setDepth(5);
      const b = mp.body as Phaser.Physics.Arcade.Body;
      b.setImmovable(true).setAllowGravity(false).setSize(w * T, T);
      this.tweens.add({
        targets: mp, x: mp.x + mx * T, y: mp.y + my * T,
        duration: dur, yoyo: true, repeat: -1, ease: "Sine.easeInOut",
      });
      this.movingPlatforms.push(mp);
    };

    const placeWall = (tx: number, sr: number, h: number) => {
      for (let j = 0; j < h; j++) {
        (this.platforms.create(tx * T + T / 2, (sr + j) * T + T / 2, "tile_ground") as Phaser.Physics.Arcade.Sprite).refreshBody();
      }
    };

    // ═══════════════════════════════════════════════════
    // SECTION 1: Entrance — Calm Before the Storm (0-30)
    // ═══════════════════════════════════════════════════
    placeGround(0, 25, GR);
    placeHeart(6, 11);
    placeHeart(10, 11);
    placeCP(4, GR);
    // Warning spikes — a taste of what's ahead
    spikeRow(20, 3, GR - 1);
    placeHeart(21, 10); // temptation above the first spikes

    // ═══════════════════════════════════════════════════
    // SECTION 2: Spike Fields (25-70)
    // Floor spikes with narrow safe lanes between them
    // ═══════════════════════════════════════════════════
    placeGround(25, 45, GR);

    // Field 1: alternating spike/safe strips
    spikeRow(28, 2, GR - 1);
    spikeRow(31, 3, GR - 1);
    spikeRow(35, 2, GR - 1);
    placeHeart(30, 10);
    placeHeart(34, 10);
    placePlat(32, 9, 2);
    placeEnemy(33, 8, 2, 40);

    // Field 2: denser — must jump between gaps
    spikeRow(40, 4, GR - 1);
    spikeRow(45, 3, GR - 1);
    spikeRow(49, 5, GR - 1);
    placeHeart(44, 10);
    placePlat(42, 8, 3);
    placePlat(47, 7, 2);
    placeEnemy(43, 7, 2, 55);
    placeHeart(48, 6); // reward for upper route

    // Field 3: long run with one safe spot
    spikeRow(55, 3, GR - 1);
    spikeRow(59, 5, GR - 1);
    placeEnemy(61, 10, 2, 45);

    placeCP(65, GR);

    // ═══════════════════════════════════════════════════
    // SECTION 3: The Spike Gauntlet (70-110)
    // Floor AND ceiling spikes — mid-height platforming
    // ═══════════════════════════════════════════════════
    placeWall(70, 1, 5);
    placeWall(70, GR, 2);
    placeGround(71, 40, GR);

    // Floor spikes across the gauntlet
    spikeRow(72, 8, GR - 1);
    spikeRow(82, 6, GR - 1);
    spikeRow(90, 10, GR - 1);
    spikeRow(102, 6, GR - 1);

    // Solid ceiling + hanging spikes
    placeCeiling(71, 40, 2);
    ceilRow(72, 8, 3);
    ceilRow(83, 5, 3);
    ceilRow(92, 8, 3);
    ceilRow(103, 5, 3);

    // Mid-height safe platforms — the only safe path
    placePlat(73, 8, 3);
    placePlat(78, 7, 2);
    placePlat(82, 9, 3);
    placePlat(87, 7, 2);
    placePlat(91, 8, 3);
    placePlat(96, 6, 2);
    placePlat(100, 8, 3);
    placePlat(105, 7, 3);

    // Hearts scattered through gauntlet
    placeHeart(74, 7);
    placeHeart(83, 8);
    placeHeart(92, 7);
    placeHeart(101, 7);

    // Enemies in tight quarters
    placeEnemy(79, 6, 2, 35);
    placeEnemy(96, 5, 2, 40);

    // Fragment 1: between ceiling and floor spikes — brutal
    placeFrag(88, 5);

    placeCP(109, GR);

    // ═══════════════════════════════════════════════════
    // SECTION 4: Vertical Corridors (112-155)
    // Tight shafts — precision jumping between close walls
    // ═══════════════════════════════════════════════════
    placeGround(112, 12, GR);

    // Shaft 1: climb up through narrow gap
    placeWall(117, 5, 8);
    placeWall(114, 1, 8);
    placePlat(115, 10, 2);
    placePlat(115, 7, 2);
    placePlat(115, 4, 2);
    placeHeart(115, 9);
    placeHeart(116, 6);
    placeEnemy(115, 3, 1, 30);

    // Bridge between shafts
    placePlat(118, 3, 4);
    placeHeart(120, 2);

    // Shaft 2: descend with wall spikes
    placeWall(122, 5, 8);
    placeWall(126, 1, 9);
    placeSpike(123, 5);
    placeSpike(125, 7);
    placeSpike(123, 9);
    placePlat(123, 3, 3);
    placePlat(124, 6, 2);
    placePlat(123, 8, 2);
    placePlat(124, 10, 2);
    placeGround(123, 3, GR);
    placeGround(127, 15, GR);

    placeEnemy(130, 11, 3, 50);
    placeHeart(132, 11);

    // Shaft 3: spikes on BOTH walls — the nasty one
    placeWall(140, 1, 9);
    placeWall(145, 1, 9);
    placeSpike(141, 4);
    placeSpike(144, 3);
    placeSpike(141, 6);
    placeSpike(144, 7);
    placeSpike(141, 9);
    placeSpike(144, 10);
    placePlat(142, 3, 2);
    placePlat(142, 5, 2);
    placePlat(142, 8, 2);
    placePlat(142, 11, 2);

    // Fragment 2: deep in the spike corridor
    placeFrag(143, 6);

    placeGround(141, 5, GR);
    placeGround(146, 10, GR);
    placeCP(148, GR);

    // ═══════════════════════════════════════════════════
    // SECTION 5: Moving Platform Gauntlet (156-205)
    // Timed jumps over spike pits
    // ═══════════════════════════════════════════════════
    placeGround(156, 6, GR);
    placeEnemy(158, 11, 3, 50);

    // Spike pit 1: horizontal moving platform
    placeGround(162, 8, GR);
    spikeRow(162, 8, GR - 1);
    placeMovPlat(163, 8, 3, 4, 0, 2500);
    placeHeart(166, 6);

    // Safe landing
    placeGround(170, 4, GR);
    placeEnemy(172, 11, 2, 55);

    // Spike pit 2: vertical moving platform — ride up
    placeGround(174, 3, GR);
    placeGround(177, 6, GR);
    spikeRow(177, 6, GR - 1);
    placeMovPlat(178, 10, 2, 0, -5, 3000);
    placePlat(182, 5, 3);
    placeHeart(179, 7);

    // Spike pit 3: two moving platforms in sequence
    placeGround(185, 12, GR);
    spikeRow(185, 12, GR - 1);
    placeMovPlat(186, 8, 2, 3, 0, 2000);
    placeMovPlat(192, 7, 2, 3, 0, 2200);
    placeHeart(189, 6);
    placeHeart(195, 5);

    // Landing zone
    placeGround(197, 8, GR);
    placeCP(199, GR);
    placeEnemy(201, 11, 3, 60);

    // ═══════════════════════════════════════════════════
    // SECTION 6: The Bramble Run (205-250)
    // Dense spikes, tiny safe islands, upper bypass route
    // ═══════════════════════════════════════════════════
    placeGround(205, 50, GR);

    // Dense spike patches with single-tile safe gaps
    spikeRow(208, 3, GR - 1);
    spikeRow(212, 2, GR - 1);
    spikeRow(215, 4, GR - 1);
    spikeRow(220, 3, GR - 1);
    spikeRow(224, 5, GR - 1);

    // Enemies patrolling the narrow gaps
    placeEnemy(213, 10, 1, 40);
    placeEnemy(221, 10, 1, 45);
    placeEnemy(227, 10, 2, 50);

    // Hearts in the danger zones
    placeHeart(211, 10);
    placeHeart(219, 10);
    placeHeart(223, 10);

    // Upper bypass platforms — faster but ceiling spikes punish mistakes
    placePlat(210, 7, 2);
    placePlat(215, 6, 2);
    placePlat(220, 7, 2);
    placePlat(225, 5, 2);
    ceilRow(211, 2, 4);
    ceilRow(216, 2, 3);
    ceilRow(221, 2, 4);

    // Second half of the bramble run
    spikeRow(230, 2, GR - 1);
    spikeRow(233, 6, GR - 1);
    spikeRow(240, 4, GR - 1);
    placeMovPlat(234, 9, 3, 4, 0, 2800);
    placeHeart(236, 7);
    placeEnemy(242, 10, 2, 55);

    // Fragment 3: above the densest spike section — terrifying
    placePlat(237, 4, 2);
    placeFrag(238, 3);
    ceilRow(237, 2, 1); // ceiling spikes right above it

    placeGround(245, 5, GR);
    placeHeart(247, 11);

    // ═══════════════════════════════════════════════════
    // SECTION 7: Final Gauntlet + Shrine (250-278)
    // Everything at once — the crescendo of World 1
    // ═══════════════════════════════════════════════════
    placeGround(250, 28, GR);
    placeCP(252, GR);

    // Ceiling for the final corridor
    placeCeiling(255, 15, 2);

    // Floor and ceiling spikes with narrow safe bands
    spikeRow(256, 4, GR - 1);
    ceilRow(256, 3, 3);
    spikeRow(261, 3, GR - 1);
    ceilRow(262, 2, 3);
    spikeRow(265, 4, GR - 1);
    ceilRow(265, 3, 3);

    // Mid-level stepping stones
    placePlat(257, 7, 2);
    placePlat(260, 8, 2);
    placePlat(263, 6, 2);
    placePlat(266, 8, 2);

    placeHeart(258, 6);
    placeHeart(264, 5);

    // Final enemies guarding the shrine approach
    placeEnemy(261, 7, 2, 50);
    placeEnemy(267, 7, 2, 55);

    // Clear ground before shrine
    placeGround(270, 8, GR);

    // Shrine — the end of Thorns
    this.shrine = this.physics.add.staticSprite(
      275 * T + T / 2, GR * T - T / 2, "shrine"
    );
  }

  /* ────────────────────────────────────────
     COLLECTIBLES & INTERACTIONS
     ──────────────────────────────────────── */

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

    // Brief white flash
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

    // Burst particles
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
    this.events.emit("hearts-updated", this.heartsCollected);
  }

  private collectFragment(frag: Phaser.Physics.Arcade.Sprite): void {
    if (!frag.active) return;
    const x = frag.x, y = frag.y;
    frag.destroy();
    this.fragmentsCollected++;

    for (let i = 0; i < 10; i++) {
      const p = this.add.circle(x, y, 3, 0x44aaff).setDepth(11);
      this.tweens.add({
        targets: p,
        x: x + Phaser.Math.Between(-30, 30),
        y: y + Phaser.Math.Between(-30, 30),
        alpha: 0, duration: 600,
        onComplete: () => p.destroy(),
      });
    }
  }

  private activateCheckpoint(cp: Phaser.Physics.Arcade.Sprite): void {
    const key = `${cp.x},${cp.y}`;
    if (this.activeCheckpoints.has(key)) return;
    this.activeCheckpoints.add(key);
    cp.setTexture("checkpoint_active");
    this.player.setCheckpoint(cp.x, cp.y - TILE_SIZE);

    // Glow ring expansion
    const glow = this.add.circle(cp.x, cp.y, 8, 0x44ff44, 0.5).setDepth(11);
    this.tweens.add({
      targets: glow, scaleX: 4, scaleY: 4, alpha: 0,
      duration: 500, ease: "Quad.easeOut",
      onComplete: () => glow.destroy(),
    });

    // Rising sparkle particles
    for (let i = 0; i < 10; i++) {
      const spark = this.add.circle(
        cp.x + Phaser.Math.Between(-8, 8), cp.y,
        2, 0x44ff88, 0.8
      ).setDepth(11);
      this.tweens.add({
        targets: spark,
        y: cp.y - Phaser.Math.Between(20, 50),
        x: spark.x + Phaser.Math.Between(-10, 10),
        alpha: 0,
        duration: Phaser.Math.Between(400, 700),
        ease: "Quad.easeOut",
        onComplete: () => spark.destroy(),
      });
    }
  }

  /* ────────────────────────────────────────
     ENEMY COMBAT
     ──────────────────────────────────────── */

  private playerHitEnemy(enemyData: EnemyData): void {
    if (!enemyData.sprite.active) return;

    // Attack hitbox check
    const hitbox = this.player.getAttackHitbox();
    if (hitbox) {
      this.killEnemy(enemyData);
      return;
    }

    // Stomp check
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    if (body.velocity.y > 0 && this.player.y < enemyData.sprite.y - 8) {
      body.velocity.y = -300;
      this.killEnemy(enemyData);
      return;
    }

    // Player takes damage
    this.player.takeDamage(1);
  }

  private killEnemy(enemyData: EnemyData): void {
    enemyData.hp--;
    if (enemyData.hp <= 0) {
      const x = enemyData.sprite.x, y = enemyData.sprite.y;
      const spr = enemyData.sprite;

      this.cameras.main.shake(SHAKE_ENEMY_KILL_DURATION, SHAKE_ENEMY_KILL_INTENSITY);

      spr.setTint(0xffffff);
      this.tweens.add({
        targets: spr,
        scaleX: 1.6, scaleY: 1.6, alpha: 0,
        duration: 200, ease: "Quad.easeOut",
        onComplete: () => {
          spr.destroy();
          // Death burst particles
          for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const dist = Phaser.Math.Between(15, 35);
            const p = this.add.circle(
              x, y, Phaser.Math.Between(2, 4), 0x9944cc, 0.9
            ).setDepth(11);
            this.tweens.add({
              targets: p,
              x: x + Math.cos(angle) * dist,
              y: y + Math.sin(angle) * dist,
              alpha: 0, scale: 0,
              duration: Phaser.Math.Between(300, 500),
              ease: "Quad.easeOut",
              onComplete: () => p.destroy(),
            });
          }
          // Flash ring
          const fl = this.add.circle(x, y, 6, 0xff44ff, 0.6).setDepth(11);
          this.tweens.add({
            targets: fl, scaleX: 3, scaleY: 3, alpha: 0,
            duration: 300,
            onComplete: () => fl.destroy(),
          });
        },
      });

      this.enemies = this.enemies.filter(e => e !== enemyData);
    }
  }

  /* ────────────────────────────────────────
     LEVEL COMPLETE
     ──────────────────────────────────────── */

  private levelComplete(): void {
    const elapsed = Math.floor((this.time.now - this.levelStartTime) / 1000);
    this.scene.stop("UIScene");
    this.scene.start("LevelCompleteScene", {
      levelKey: "Level1_5",
      hearts: this.heartsCollected,
      fragments: this.fragmentsCollected,
      time: elapsed,
    });
  }

  /* ────────────────────────────────────────
     UPDATE LOOP
     ──────────────────────────────────────── */

  update(time: number, delta: number): void {
    if (!this.player || !this.player.active) return;

    this.player.update(time, delta);

    // Spike invincibility cooldown
    if (this.spikeIFrameTimer > 0) {
      this.spikeIFrameTimer -= delta;
    }

    // Enemy patrol
    for (const e of this.enemies) {
      if (!e.sprite.active) continue;
      e.sprite.x += e.direction * e.speed * (delta / 1000);
      if (e.sprite.x > e.startX + e.range) e.direction = -1;
      if (e.sprite.x < e.startX - e.range) e.direction = 1;
      e.sprite.setFlipX(e.direction < 0);
    }

    // Moving platform passenger sync
    for (const mp of this.movingPlatforms) {
      if (!mp.active) continue;
      const mpBody = mp.body as Phaser.Physics.Arcade.Body;
      const pBody = this.player.body as Phaser.Physics.Arcade.Body;
      if (
        pBody.touching.down &&
        Math.abs(this.player.x - mp.x) < (mp.displayWidth / 2 + 8) &&
        Math.abs((this.player.y + pBody.halfHeight) - (mp.y - mp.displayHeight / 2)) < 6
      ) {
        this.player.x += mpBody.velocity.x * (delta / 1000);
        this.player.y += mpBody.velocity.y * (delta / 1000);
      }
    }

    // Pit death
    if (this.player.y > 14 * TILE_SIZE + 50) {
      this.player.die();
    }

    // Attack hitbox check against all enemies
    const hitbox = this.player.getAttackHitbox();
    if (hitbox) {
      for (const enemy of this.enemies) {
        if (!enemy.sprite.active) continue;
        const dist = Phaser.Math.Distance.Between(
          hitbox.x, hitbox.y, enemy.sprite.x, enemy.sprite.y
        );
        if (dist < 30) this.killEnemy(enemy);
      }
    }
  }
}
