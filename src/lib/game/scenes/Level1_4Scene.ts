import Phaser from "phaser";
import Player from "../entities/Player";
import { TILE_SIZE, INTERNAL_WIDTH, INTERNAL_HEIGHT, SHAKE_ENEMY_KILL_DURATION, SHAKE_ENEMY_KILL_INTENSITY } from "../constants";

interface EnemyData {
  sprite: Phaser.Physics.Arcade.Sprite;
  startX: number;
  range: number;
  speed: number;
  hp: number;
  direction: number;
}

interface CrumblingPlatform {
  tiles: Phaser.Physics.Arcade.Sprite[];
  triggered: boolean;
  timer: number;
  originTileX: number;
  originTileY: number;
  width: number;
  destroyed: boolean;
  respawnTimer: number;
}

export default class Level1_4Scene extends Phaser.Scene {
  public player!: Player;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private spikes!: Phaser.Physics.Arcade.StaticGroup;
  private hearts!: Phaser.Physics.Arcade.StaticGroup;
  private checkpoints!: Phaser.Physics.Arcade.StaticGroup;
  private enemies: EnemyData[] = [];
  private shrine!: Phaser.Physics.Arcade.Sprite;
  private spiritFragments!: Phaser.Physics.Arcade.StaticGroup;
  private heartsCollected: number = 0;
  private fragmentsCollected: number = 0;
  private levelStartTime: number = 0;
  private activeCheckpoints: Set<string> = new Set();
  private crumblingPlatforms: CrumblingPlatform[] = [];

  constructor() {
    super({ key: "Level1_4" });
  }

  create(): void {
    console.log("[GGsHeart] Level1_4Scene.create() — Deep Hollow");
    this.heartsCollected = 0;
    this.fragmentsCollected = 0;
    this.enemies = [];
    this.activeCheckpoints = new Set();
    this.crumblingPlatforms = [];
    this.levelStartTime = this.time.now;

    const levelWidth = 300 * TILE_SIZE;
    const levelHeight = 16 * TILE_SIZE;
    this.physics.world.setBounds(0, 0, levelWidth, levelHeight);

    this.createParallaxBackground(levelWidth, levelHeight);

    this.platforms = this.physics.add.staticGroup();
    this.spikes = this.physics.add.staticGroup();
    this.hearts = this.physics.add.staticGroup();
    this.checkpoints = this.physics.add.staticGroup();
    this.spiritFragments = this.physics.add.staticGroup();

    this.buildLevel();

    // Player starts on the left ledge
    this.player = new Player(this, 3 * TILE_SIZE, 4 * TILE_SIZE);
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
          x + Phaser.Math.Between(-12, 12),
          y + 14,
          Phaser.Math.Between(2, 4),
          0x9a8a6a, 0.6
        ).setDepth(9);
        this.tweens.add({
          targets: dust,
          x: dust.x + Phaser.Math.Between(-18, 18),
          y: dust.y - Phaser.Math.Between(4, 12),
          alpha: 0,
          scale: 0,
          duration: Phaser.Math.Between(250, 400),
          onComplete: () => dust.destroy(),
        });
      }
    });

    // Collisions
    this.physics.add.collider(this.player, this.platforms);

    this.physics.add.overlap(this.player, this.hearts, (_p, heart) => {
      this.collectHeart(heart as Phaser.Physics.Arcade.Sprite);
    });

    this.physics.add.overlap(this.player, this.checkpoints, (_p, cp) => {
      this.activateCheckpoint(cp as Phaser.Physics.Arcade.Sprite);
    });

    this.physics.add.overlap(this.player, this.spiritFragments, (_p, frag) => {
      this.collectFragment(frag as Phaser.Physics.Arcade.Sprite);
    });

    // Spike damage
    this.physics.add.overlap(this.player, this.spikes, () => {
      this.player.takeDamage(1);
    });

    // Shrine overlap
    if (this.shrine) {
      this.physics.add.overlap(this.player, this.shrine, () => {
        this.levelComplete();
      });
    }

    // Enemy collisions
    for (const enemy of this.enemies) {
      this.physics.add.collider(enemy.sprite, this.platforms);
      this.physics.add.overlap(this.player, enemy.sprite, () => {
        this.playerHitEnemy(enemy);
      });
    }

    // Launch UI
    if (!this.scene.isActive("UIScene")) {
      this.scene.launch("UIScene", { levelKey: "Level1_4" });
    }
    this.events.emit("player-damaged", this.player.hp);
    this.events.emit("hearts-updated", this.heartsCollected);

    console.log("[GGsHeart] Level1_4Scene ready. Player at", this.player.x, this.player.y);
    console.log("[GGsHeart] Platforms count:", this.platforms.getLength());
  }

  private createParallaxBackground(levelWidth: number, levelHeight: number): void {
    // Deep cavern — dark blue-black void
    this.add.rectangle(0, 0, levelWidth, levelHeight, 0x080810)
      .setOrigin(0).setScrollFactor(0).setDepth(-4);

    // Distant cavern walls — faint rocky silhouettes
    for (let x = 0; x < levelWidth; x += 90) {
      // Stalactites hanging from above
      const stalH = Phaser.Math.Between(30, 70);
      this.add.rectangle(x, 0, Phaser.Math.Between(12, 24), stalH, 0x121220)
        .setOrigin(0, 0).setScrollFactor(0.2, 0.2).setDepth(-3).setAlpha(0.5);
    }

    // Mid-ground rocky formations
    for (let x = 0; x < levelWidth; x += 150) {
      const h = Phaser.Math.Between(20, 50);
      this.add.rectangle(x, levelHeight - h, Phaser.Math.Between(40, 80), h, 0x161628)
        .setOrigin(0, 0).setScrollFactor(0.4, 0.4).setDepth(-3).setAlpha(0.4);
    }

    // Sparse, slow floating particles — echoes in the dark
    this.add.particles(0, 0, "particle", {
      x: { min: 0, max: levelWidth },
      y: { min: 0, max: levelHeight },
      lifespan: 6000,
      speed: { min: 3, max: 10 },
      scale: { start: 0.4, end: 0 },
      alpha: { start: 0.3, end: 0 },
      tint: [0x334466, 0x223355, 0x445577],
      frequency: 400,
      quantity: 1,
    }).setScrollFactor(0.5).setDepth(-1);

    // Occasional brighter mote — hints of ghostly presence
    this.add.particles(0, 0, "particle", {
      x: { min: 0, max: levelWidth },
      y: { min: 0, max: levelHeight },
      lifespan: 5000,
      speed: { min: 2, max: 8 },
      scale: { start: 0.6, end: 0 },
      alpha: { start: 0.5, end: 0 },
      tint: [0x6688aa],
      frequency: 1200,
      quantity: 1,
    }).setScrollFactor(0.3).setDepth(-1);
  }

  private buildLevel(): void {
    const T = TILE_SIZE;

    // Helper functions
    const placeGround = (startTile: number, widthTiles: number, row: number = 14) => {
      for (let i = 0; i < widthTiles; i++) {
        const x = (startTile + i) * T + T / 2;
        const y = row * T + T / 2;
        const tile = this.platforms.create(x, y, "tile_surface") as Phaser.Physics.Arcade.Sprite;
        tile.refreshBody();
        for (let j = row + 1; j < 16; j++) {
          this.add.image((startTile + i) * T + T / 2, j * T + T / 2, "tile_ground");
        }
      }
    };

    const placePlatform = (tileX: number, tileY: number, width: number = 3) => {
      for (let i = 0; i < width; i++) {
        const p = this.platforms.create(
          (tileX + i) * T + T / 2, tileY * T + T / 2, "tile_surface"
        ) as Phaser.Physics.Arcade.Sprite;
        p.refreshBody();
      }
    };

    const placeCrumblingPlatform = (tileX: number, tileY: number, width: number = 3) => {
      const tiles: Phaser.Physics.Arcade.Sprite[] = [];
      for (let i = 0; i < width; i++) {
        const p = this.platforms.create(
          (tileX + i) * T + T / 2, tileY * T + T / 2, "tile_surface"
        ) as Phaser.Physics.Arcade.Sprite;
        p.refreshBody();
        p.setTint(0x887766);
        tiles.push(p);
      }
      this.crumblingPlatforms.push({ tiles, triggered: false, timer: 0, originTileX: tileX, originTileY: tileY, width, destroyed: false, respawnTimer: 0 });
    };

    const placeSpikes = (startTile: number, widthTiles: number, row: number = 14) => {
      for (let i = 0; i < widthTiles; i++) {
        const s = this.spikes.create(
          (startTile + i) * T + T / 2, row * T + T / 2, "tile_spikes"
        ) as Phaser.Physics.Arcade.Sprite;
        s.refreshBody();
      }
    };

    const placeHeart = (tileX: number, tileY: number) => {
      const h = this.hearts.create(tileX * T + T / 2, tileY * T + T / 2, "heart") as Phaser.Physics.Arcade.Sprite;
      h.refreshBody();
      this.tweens.add({
        targets: h, y: h.y - 6, duration: 1200,
        yoyo: true, repeat: -1, ease: "Sine.easeInOut",
      });
    };

    const placeEnemy = (tileX: number, tileY: number, rangeTiles: number = 3, speed: number = 50) => {
      const e = this.physics.add.sprite(tileX * T + T / 2, tileY * T + T / 2, "shade_wisp");
      const body = e.body as Phaser.Physics.Arcade.Body;
      body.setAllowGravity(false);
      body.setImmovable(true);
      this.enemies.push({
        sprite: e, startX: tileX * T + T / 2,
        range: rangeTiles * T, speed, hp: 1, direction: 1,
      });
    };

    const placeCheckpoint = (tileX: number, row: number = 14) => {
      const cp = this.checkpoints.create(
        tileX * T + T / 2, (row - 1) * T + T / 2, "checkpoint"
      ) as Phaser.Physics.Arcade.Sprite;
      cp.refreshBody();
    };

    const placeFragment = (tileX: number, tileY: number) => {
      const f = this.spiritFragments.create(
        tileX * T + T / 2, tileY * T + T / 2, "spirit_fragment"
      ) as Phaser.Physics.Arcade.Sprite;
      f.refreshBody();
      this.tweens.add({
        targets: f, y: f.y - 4, alpha: { from: 0.7, to: 1 },
        duration: 1500, yoyo: true, repeat: -1, ease: "Sine.easeInOut",
      });
    };

    // ═══════════════════════════════════════════════════════════════
    // BEAT 1: The Ledge — Start high, look down into the hollow
    // Tiles 0-25
    // ═══════════════════════════════════════════════════════════════
    // Starting ledge high up
    placePlatform(0, 5, 10);
    placeGround(0, 10, 5);
    placeHeart(5, 4);
    placeHeart(7, 4);

    // Descent platforms — stepping down into the cavern
    placePlatform(10, 7, 4);
    placePlatform(15, 9, 3);
    placeHeart(16, 8);
    placePlatform(20, 11, 3);

    // Landing ground at cavern floor
    placeGround(18, 10);
    placeCheckpoint(22);

    // ═══════════════════════════════════════════════════════════════
    // BEAT 2: First Cavern Stretch — Spikes and careful jumping
    // Tiles 28-60
    // ═══════════════════════════════════════════════════════════════
    // Spike pit between grounds
    placeGround(28, 4);
    placeSpikes(32, 5, 15);
    placeGround(32, 5, 15); // Ground under spikes for visual
    placeGround(37, 6);
    placeHeart(34, 12);  // Heart above spikes — risky grab
    placeEnemy(39, 13, 3);
    placeHeart(40, 13);

    // Gap then more ground
    placeGround(46, 8);
    placeHeart(48, 13);
    placeHeart(50, 13);
    placeCheckpoint(49);

    // Rising platforms with crumbling
    placePlatform(56, 12, 3);
    placeCrumblingPlatform(60, 11, 3);
    placeHeart(61, 10);
    placePlatform(65, 11, 3);
    placeFragment(66, 10);  // Fragment 1 — requires crumble platform or precise jump

    // ═══════════════════════════════════════════════════════════════
    // BEAT 3: The Hollow Echo — Wide open space, floating platforms
    // Tiles 70-140 — The emotional core of the level
    // ═══════════════════════════════════════════════════════════════
    placeGround(70, 6);

    // Floating platforms across a vast gap — lonely, spacious
    placePlatform(76, 12, 3);
    placeEnemy(77, 11, 2, 35);  // Slow patrol — eerie
    placeHeart(77, 11);

    placeCrumblingPlatform(82, 11, 3);

    placePlatform(88, 11, 3);
    placeHeart(89, 10);

    placePlatform(94, 11, 3);
    placeEnemy(95, 10, 2, 40);

    placeCrumblingPlatform(100, 11, 3);
    placeHeart(101, 10);

    // Mid-hollow checkpoint on a solid island
    placeGround(110, 8);
    placeCheckpoint(113, 14);
    placeGround(110, 8, 14);
    placeHeart(112, 13);

    // Second half of the hollow — higher floating platforms
    placePlatform(118, 12, 3);
    placeEnemy(119, 11, 2, 45);

    placePlatform(124, 12, 3);
    placeHeart(125, 11);

    placeCrumblingPlatform(130, 12, 3);
    placeFragment(131, 11);  // Fragment 2 — on crumbling platform, high up

    placePlatform(136, 12, 3);

    // ═══════════════════════════════════════════════════════════════
    // BEAT 4: The Deep Floor — Descent back to solid ground
    // Tiles 142-185
    // ═══════════════════════════════════════════════════════════════
    placeGround(145, 12);
    placeCheckpoint(148);
    placeHeart(150, 13);
    placeEnemy(153, 13, 4);

    // Spike gauntlet
    placeGround(158, 3);
    placeSpikes(161, 3, 15);
    placeGround(161, 3, 15);
    placePlatform(162, 12, 2); // Platform above spikes for safe crossing
    placeSpikes(164, 4, 15);
    placeGround(164, 4, 15);
    placeGround(168, 5);
    placeHeart(163, 11);
    placeHeart(170, 13);

    // Vertical challenge — climb up with platforms
    placePlatform(175, 12, 3);
    placePlatform(179, 10, 2);
    placeCrumblingPlatform(183, 8, 2);
    placePlatform(187, 6, 3);
    placeHeart(188, 5);
    placeHeart(180, 9);

    // ═══════════════════════════════════════════════════════════════
    // BEAT 5: The Ascent — Rising back up toward the shrine
    // Tiles 190-240
    // ═══════════════════════════════════════════════════════════════
    placeGround(192, 10);
    placeCheckpoint(196);
    placeEnemy(198, 13, 3, 55);
    placeHeart(200, 13);

    // Staircase platforms with enemies
    placePlatform(205, 12, 3);
    placePlatform(210, 10, 3);
    placeEnemy(211, 9, 2, 50);
    placePlatform(216, 8, 3);
    placeHeart(217, 7);

    // Crumbling bridge over spike pit
    placeSpikes(220, 8, 15);
    placeGround(220, 8, 15);
    placeCrumblingPlatform(221, 12, 2);
    placeCrumblingPlatform(224, 12, 2);
    placeCrumblingPlatform(227, 12, 2);
    placeHeart(225, 11);

    placeGround(229, 8);
    placeFragment(232, 13);  // Fragment 3 — tucked at floor level past the bridge

    // ═══════════════════════════════════════════════════════════════
    // BEAT 6: Final Approach — Shrine and level complete
    // Tiles 240-290
    // ═══════════════════════════════════════════════════════════════
    placeGround(240, 6);
    placeEnemy(243, 13, 3, 55);
    placeHeart(244, 13);

    // Final platforming
    placePlatform(250, 12, 3);
    placePlatform(255, 10, 3);
    placePlatform(260, 12, 3);
    placeHeart(261, 11);

    // Shrine platform — wide, safe
    placeGround(268, 20);
    placeCheckpoint(272);

    // Shrine
    this.shrine = this.physics.add.staticSprite(280 * T + T / 2, 14 * T - T / 2, "shrine");
  }

  // ═══════════════════════════════════════════════════════════════
  // Collectibles and interactions
  // ═══════════════════════════════════════════════════════════════

  private collectHeart(heart: Phaser.Physics.Arcade.Sprite): void {
    if (!heart.active) return;
    const x = heart.x, y = heart.y;

    const hBody = heart.body as Phaser.Physics.Arcade.Body;
    if (hBody) hBody.enable = false;

    this.tweens.add({
      targets: heart,
      scaleX: 1.8,
      scaleY: 1.8,
      alpha: 0,
      duration: 250,
      ease: "Back.easeIn",
      onComplete: () => heart.destroy(),
    });

    // Brief white screen flash
    const flash = this.add.rectangle(
      this.cameras.main.scrollX + INTERNAL_WIDTH / 2,
      this.cameras.main.scrollY + INTERNAL_HEIGHT / 2,
      INTERNAL_WIDTH, INTERNAL_HEIGHT,
      0xffffff, 0.3
    ).setScrollFactor(0).setDepth(50);
    this.tweens.add({
      targets: flash,
      alpha: 0,
      duration: 150,
      onComplete: () => flash.destroy(),
    });

    // Burst of heart-colored particles
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

    // Ghostly shimmer on fragment collect
    const shimmer = this.add.circle(x, y, 10, 0x6688ff, 0.4).setDepth(11);
    this.tweens.add({
      targets: shimmer,
      scaleX: 5,
      scaleY: 5,
      alpha: 0,
      duration: 600,
      ease: "Quad.easeOut",
      onComplete: () => shimmer.destroy(),
    });
  }

  private activateCheckpoint(cp: Phaser.Physics.Arcade.Sprite): void {
    const key = `${cp.x},${cp.y}`;
    if (this.activeCheckpoints.has(key)) return;
    this.activeCheckpoints.add(key);
    cp.setTexture("checkpoint_active");
    this.player.setCheckpoint(cp.x, cp.y - TILE_SIZE);

    // Activation glow
    const glow = this.add.circle(cp.x, cp.y, 8, 0x44ff44, 0.5).setDepth(11);
    this.tweens.add({
      targets: glow,
      scaleX: 4,
      scaleY: 4,
      alpha: 0,
      duration: 500,
      ease: "Quad.easeOut",
      onComplete: () => glow.destroy(),
    });

    // Upward sparkle particles
    for (let i = 0; i < 10; i++) {
      const spark = this.add.circle(
        cp.x + Phaser.Math.Between(-8, 8),
        cp.y,
        2,
        0x44ff88, 0.8
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

  // ═══════════════════════════════════════════════════════════════
  // Combat
  // ═══════════════════════════════════════════════════════════════

  private playerHitEnemy(enemyData: EnemyData): void {
    if (!enemyData.sprite.active) return;
    const hitbox = this.player.getAttackHitbox();
    if (hitbox) {
      this.killEnemy(enemyData);
      return;
    }
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    if (body.velocity.y > 0 && this.player.y < enemyData.sprite.y - 8) {
      body.velocity.y = -300;
      this.killEnemy(enemyData);
      return;
    }
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
        scaleX: 1.6,
        scaleY: 1.6,
        alpha: 0,
        duration: 200,
        ease: "Quad.easeOut",
        onComplete: () => {
          spr.destroy();
          for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const dist = Phaser.Math.Between(15, 35);
            const p = this.add.circle(x, y, Phaser.Math.Between(2, 4), 0x9944cc, 0.9)
              .setDepth(11);
            this.tweens.add({
              targets: p,
              x: x + Math.cos(angle) * dist,
              y: y + Math.sin(angle) * dist,
              alpha: 0,
              scale: 0,
              duration: Phaser.Math.Between(300, 500),
              ease: "Quad.easeOut",
              onComplete: () => p.destroy(),
            });
          }
          const flash = this.add.circle(x, y, 6, 0xff44ff, 0.6).setDepth(11);
          this.tweens.add({
            targets: flash,
            scaleX: 3,
            scaleY: 3,
            alpha: 0,
            duration: 300,
            onComplete: () => flash.destroy(),
          });
        },
      });

      this.enemies = this.enemies.filter(e => e !== enemyData);
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // Level complete
  // ═══════════════════════════════════════════════════════════════

  private levelComplete(): void {
    const elapsed = Math.floor((this.time.now - this.levelStartTime) / 1000);
    this.scene.stop("UIScene");
    this.scene.start("LevelCompleteScene", {
      levelKey: "Level1_4",
      hearts: this.heartsCollected,
      fragments: this.fragmentsCollected,
      time: elapsed,
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // Update loop
  // ═══════════════════════════════════════════════════════════════

  update(time: number, delta: number): void {
    if (!this.player || !this.player.active) return;

    this.player.update(time, delta);

    // Enemy patrol
    for (const e of this.enemies) {
      if (!e.sprite.active) continue;
      e.sprite.x += e.direction * e.speed * (delta / 1000);
      if (e.sprite.x > e.startX + e.range) e.direction = -1;
      if (e.sprite.x < e.startX - e.range) e.direction = 1;
      e.sprite.setFlipX(e.direction < 0);
    }

    // Crumbling platform logic
    const T = TILE_SIZE;
    for (const cp of this.crumblingPlatforms) {
      // Respawn destroyed platforms after 3 seconds
      if (cp.destroyed) {
        cp.respawnTimer += delta;
        if (cp.respawnTimer >= 3000) {
          const newTiles: Phaser.Physics.Arcade.Sprite[] = [];
          for (let i = 0; i < cp.width; i++) {
            const p = this.platforms.create(
              (cp.originTileX + i) * T + T / 2, cp.originTileY * T + T / 2, "tile_surface"
            ) as Phaser.Physics.Arcade.Sprite;
            p.refreshBody();
            p.setTint(0x887766);
            p.setAlpha(0);
            this.tweens.add({ targets: p, alpha: 1, duration: 400 });
            newTiles.push(p);
          }
          cp.tiles = newTiles;
          cp.triggered = false;
          cp.timer = 0;
          cp.destroyed = false;
          cp.respawnTimer = 0;
        }
        continue;
      }

      if (cp.triggered) {
        cp.timer += delta;

        // Shake while waiting to fall (0-1000ms)
        if (cp.timer < 1000) {
          const shakeAmount = (cp.timer / 1000) * 3;
          for (const tile of cp.tiles) {
            if (tile.active) {
              tile.x += Phaser.Math.Between(-shakeAmount, shakeAmount) * 0.3;
            }
          }
        }

        // Fall and destroy after 1 second
        if (cp.timer >= 1000 && !cp.destroyed) {
          for (const tile of cp.tiles) {
            if (tile.active) {
              tile.destroy();
            }
          }
          cp.tiles = [];
          cp.destroyed = true;
          cp.respawnTimer = 0;
        }
      } else {
        // Check if player is standing on any tile of this platform
        for (const tile of cp.tiles) {
          if (!tile.active) continue;
          const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
          if (
            playerBody.blocked.down &&
            Math.abs(this.player.x - tile.x) < TILE_SIZE &&
            Math.abs((this.player.y + playerBody.halfHeight) - (tile.y - TILE_SIZE / 2)) < 4
          ) {
            cp.triggered = true;
            // Tint tiles to warn player
            for (const t of cp.tiles) {
              if (t.active) t.setTint(0xff6644);
            }
            break;
          }
        }
      }
    }

    // Pit death — bottom of the level
    if (this.player.y > 16 * TILE_SIZE + 50) {
      this.player.die();
    }

    // Attack hitbox check against enemies
    const hitbox = this.player.getAttackHitbox();
    if (hitbox) {
      for (const enemy of this.enemies) {
        if (!enemy.sprite.active) continue;
        const dist = Phaser.Math.Distance.Between(hitbox.x, hitbox.y, enemy.sprite.x, enemy.sprite.y);
        if (dist < 30) this.killEnemy(enemy);
      }
    }
  }
}
