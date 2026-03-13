import Phaser from "phaser";
import Player from "../entities/Player";
import { TILE_SIZE, INTERNAL_WIDTH, INTERNAL_HEIGHT } from "../constants";

interface EnemyData {
  sprite: Phaser.Physics.Arcade.Sprite;
  startX: number;
  range: number;
  speed: number;
  hp: number;
  direction: number;
}

export default class Level1Scene extends Phaser.Scene {
  private player!: Player;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private hearts!: Phaser.Physics.Arcade.StaticGroup;
  private checkpoints!: Phaser.Physics.Arcade.StaticGroup;
  private enemies: EnemyData[] = [];
  private shrine!: Phaser.Physics.Arcade.Sprite;
  private spiritFragments!: Phaser.Physics.Arcade.StaticGroup;
  private heartsCollected: number = 0;
  private fragmentsCollected: number = 0;
  private levelStartTime: number = 0;
  private activeCheckpoints: Set<string> = new Set();

  constructor() {
    super({ key: "Level1Scene" });
  }

  create(): void {
    this.heartsCollected = 0;
    this.fragmentsCollected = 0;
    this.enemies = [];
    this.activeCheckpoints = new Set();
    this.levelStartTime = this.time.now;

    // World bounds — level is ~200 tiles wide
    const levelWidth = 220 * TILE_SIZE;
    const levelHeight = 12 * TILE_SIZE; // 12 tiles tall
    this.physics.world.setBounds(0, 0, levelWidth, levelHeight);

    // Background layers (parallax)
    this.createParallaxBackground(levelWidth);

    // Build level from code (Phase 1 — switch to Tiled JSON later)
    this.platforms = this.physics.add.staticGroup();
    this.hearts = this.physics.add.staticGroup();
    this.checkpoints = this.physics.add.staticGroup();
    this.spiritFragments = this.physics.add.staticGroup();

    this.buildLevel();

    // Player
    this.player = new Player(this, 3 * TILE_SIZE, 8 * TILE_SIZE);
    this.player.setDepth(10);

    // Camera
    this.cameras.main.setBounds(0, 0, levelWidth, levelHeight);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.15);
    this.cameras.main.setDeadzone(40, 20);

    // Collisions
    this.physics.add.collider(this.player, this.platforms);

    // Heart collection
    this.physics.add.overlap(this.player, this.hearts, (_p, heart) => {
      const h = heart as Phaser.Physics.Arcade.Sprite;
      this.collectHeart(h);
    });

    // Checkpoint activation
    this.physics.add.overlap(this.player, this.checkpoints, (_p, cp) => {
      const c = cp as Phaser.Physics.Arcade.Sprite;
      this.activateCheckpoint(c);
    });

    // Spirit Fragment collection
    this.physics.add.overlap(this.player, this.spiritFragments, (_p, frag) => {
      const f = frag as Phaser.Physics.Arcade.Sprite;
      this.collectFragment(f);
    });

    // Enemy collisions
    for (const enemy of this.enemies) {
      this.physics.add.collider(enemy.sprite, this.platforms);
      this.physics.add.overlap(this.player, enemy.sprite, () => {
        this.playerHitEnemy(enemy);
      });
    }

    // Launch UI scene
    if (!this.scene.isActive("UIScene")) {
      this.scene.launch("UIScene");
    }
    this.events.emit("player-damaged", this.player.hp);
    this.events.emit("hearts-updated", this.heartsCollected);
  }

  private createParallaxBackground(levelWidth: number): void {
    // Layer 1 — far mountains (slowest scroll)
    const bg1 = this.add.tileSprite(0, 0, levelWidth, INTERNAL_HEIGHT, "").setOrigin(0);
    bg1.setTint(0x111122);
    bg1.setAlpha(1);
    bg1.setScrollFactor(0.1, 0);
    bg1.setDepth(-4);

    // Layer 2 — mid forest
    for (let x = 0; x < levelWidth; x += 120) {
      const h = Phaser.Math.Between(40, 80);
      const tree = this.add.rectangle(x, INTERNAL_HEIGHT - h, 30, h, 0x1a2a1a);
      tree.setOrigin(0, 0);
      tree.setScrollFactor(0.3, 0.3);
      tree.setDepth(-3);
      tree.setAlpha(0.6);
    }

    // Layer 3 — near foliage
    for (let x = 0; x < levelWidth; x += 80) {
      const h = Phaser.Math.Between(20, 50);
      const bush = this.add.rectangle(x + 20, INTERNAL_HEIGHT - h, 40, h, 0x223322);
      bush.setOrigin(0, 0);
      bush.setScrollFactor(0.6, 0.6);
      bush.setDepth(-2);
      bush.setAlpha(0.4);
    }

    // Bioluminescent particles
    const particles = this.add.particles(0, 0, "particle", {
      x: { min: 0, max: levelWidth },
      y: { min: 0, max: INTERNAL_HEIGHT },
      lifespan: 4000,
      speed: { min: 5, max: 15 },
      scale: { start: 0.5, end: 0 },
      alpha: { start: 0.6, end: 0 },
      tint: [0x44ffaa, 0x44aaff, 0xaaff44],
      frequency: 200,
      quantity: 1,
    });
    particles.setScrollFactor(0.5);
    particles.setDepth(-1);
  }

  private buildLevel(): void {
    const T = TILE_SIZE;
    const groundY = 10; // Ground at row 10 (of 12)

    // Helper: place ground tiles
    const ground = (startX: number, width: number, y: number = groundY) => {
      for (let i = 0; i < width; i++) {
        const isTop = true;
        const tile = this.platforms.create(
          (startX + i) * T + T / 2, y * T + T / 2,
          isTop ? "tile_surface" : "tile_ground"
        ) as Phaser.Physics.Arcade.Sprite;
        tile.setDisplaySize(T, T);
        tile.refreshBody();
        // Fill below
        for (let j = y + 1; j < 12; j++) {
          const fill = this.add.image((startX + i) * T + T / 2, j * T + T / 2, "tile_ground");
          fill.setDisplaySize(T, T);
        }
      }
    };

    // Helper: place floating platform
    const platform = (x: number, y: number, width: number = 3) => {
      for (let i = 0; i < width; i++) {
        const p = this.platforms.create(
          (x + i) * T + T / 2, y * T + T / 2, "tile_surface"
        ) as Phaser.Physics.Arcade.Sprite;
        p.setDisplaySize(T, T);
        p.refreshBody();
      }
    };

    // Helper: place heart
    const heart = (x: number, y: number) => {
      const h = this.hearts.create(x * T + T / 2, y * T + T / 2, "heart") as Phaser.Physics.Arcade.Sprite;
      h.setDisplaySize(16, 16);
      h.refreshBody();
      // Bob animation
      this.tweens.add({
        targets: h,
        y: h.y - 6,
        duration: 1200,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      });
    };

    // Helper: place enemy
    const enemy = (x: number, y: number, range: number = 3) => {
      const e = this.physics.add.sprite(x * T + T / 2, y * T + T / 2, "shade_wisp");
      e.setDisplaySize(24, 24);
      (e.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
      (e.body as Phaser.Physics.Arcade.Body).setImmovable(true);
      this.enemies.push({
        sprite: e,
        startX: x * T + T / 2,
        range: range * T,
        speed: 50,
        hp: 1,
        direction: 1,
      });
    };

    // Helper: place checkpoint
    const checkpoint = (x: number, y: number) => {
      const cp = this.checkpoints.create(
        x * T + T / 2, y * T, "checkpoint"
      ) as Phaser.Physics.Arcade.Sprite;
      cp.setDisplaySize(16, 32);
      cp.setOrigin(0.5, 1);
      cp.refreshBody();
    };

    // Helper: place spirit fragment
    const fragment = (x: number, y: number) => {
      const f = this.spiritFragments.create(
        x * T + T / 2, y * T + T / 2, "spirit_fragment"
      ) as Phaser.Physics.Arcade.Sprite;
      f.setDisplaySize(12, 12);
      f.refreshBody();
      this.tweens.add({
        targets: f,
        y: f.y - 4,
        alpha: { from: 0.7, to: 1 },
        duration: 1500,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      });
    };

    // ═══ BEAT 1: Discover Movement (tiles 0-20) ═══
    ground(0, 22);
    heart(10, 9);
    heart(14, 9);

    // ═══ BEAT 2: Discover Jumping (tiles 20-35) ═══
    // Small 2-tile gap
    ground(24, 14);
    heart(22, 8); // Heart over gap to encourage jumping

    // ═══ BEAT 3: Platforms + Hearts (tiles 38-55) ═══
    ground(38, 4);
    platform(44, 8, 4);
    heart(45, 7);
    heart(46, 7);
    platform(50, 8, 4);
    heart(51, 7);
    ground(56, 6);

    // ═══ BEAT 4: Discover Attack (tiles 62-78) ═══
    ground(62, 18);
    enemy(70, 9, 3);
    heart(72, 9);
    heart(73, 9);

    // ═══ BEAT 5: First Real Challenge + Checkpoint (tiles 80-100) ═══
    checkpoint(80, groundY);
    ground(80, 5);
    // Gap
    ground(88, 4);
    enemy(90, 9, 2);
    ground(94, 12);
    heart(96, 9);

    // ═══ BEAT 6: Reward Exploration — Spirit Fragment (tiles 106-125) ═══
    ground(106, 20);
    // Upper path with fragment
    platform(110, 6, 3);
    platform(115, 4, 3);
    fragment(116, 3);
    heart(111, 5);
    checkpoint(112, groundY);

    // ═══ BEAT 7: Escalation (tiles 126-155) ═══
    ground(126, 6);
    // Gap with moving platform feel (static for Phase 1)
    platform(134, 8, 3);
    enemy(136, 7, 2);
    ground(140, 6);
    enemy(143, 9, 2);
    ground(148, 8);
    heart(150, 9);
    heart(152, 9);
    checkpoint(149, groundY);

    // ═══ BEAT 8: Secret area + Level End (tiles 156-200) ═══
    ground(156, 15);
    // Hidden upper path for second fragment
    platform(162, 5, 4);
    fragment(164, 4);
    heart(163, 4);

    // Third fragment — below ground (pit with platforms)
    platform(175, groundY + 1, 3);
    fragment(176, groundY);

    ground(172, 20);
    checkpoint(175, groundY);

    // Shrine at the end
    ground(195, 10);
    this.shrine = this.physics.add.staticSprite(200 * T + T / 2, groundY * T - T / 2, "shrine");
    this.shrine.setDisplaySize(32, 32);
    (this.shrine.body as any).refreshBody?.();

    this.physics.add.overlap(this.player, this.shrine, () => {
      this.levelComplete();
    });
  }

  private collectHeart(heart: Phaser.Physics.Arcade.Sprite): void {
    heart.destroy();
    this.heartsCollected++;
    this.events.emit("hearts-updated", this.heartsCollected);

    // Particle burst
    const x = heart.x;
    const y = heart.y;
    for (let i = 0; i < 5; i++) {
      const p = this.add.circle(x, y, 2, 0xff6699);
      this.tweens.add({
        targets: p,
        x: x + Phaser.Math.Between(-20, 20),
        y: y + Phaser.Math.Between(-20, -5),
        alpha: 0,
        scale: 0,
        duration: 400,
        onComplete: () => p.destroy(),
      });
    }
  }

  private collectFragment(frag: Phaser.Physics.Arcade.Sprite): void {
    frag.destroy();
    this.fragmentsCollected++;

    // Blue burst
    const x = frag.x;
    const y = frag.y;
    for (let i = 0; i < 8; i++) {
      const p = this.add.circle(x, y, 3, 0x44aaff);
      this.tweens.add({
        targets: p,
        x: x + Phaser.Math.Between(-30, 30),
        y: y + Phaser.Math.Between(-30, 30),
        alpha: 0,
        duration: 600,
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
  }

  private playerHitEnemy(enemyData: EnemyData): void {
    // Check if player is attacking
    const hitbox = this.player.getAttackHitbox();
    if (hitbox && this.player.body) {
      this.killEnemy(enemyData);
      return;
    }

    // Check if player is stomping (falling onto enemy)
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    if (body.velocity.y > 0 && this.player.y < enemyData.sprite.y - 8) {
      body.velocity.y = -300; // Bounce
      this.killEnemy(enemyData);
      return;
    }

    // Player takes damage
    this.player.takeDamage(1);
  }

  private killEnemy(enemyData: EnemyData): void {
    enemyData.hp--;
    if (enemyData.hp <= 0) {
      // Death effect
      const x = enemyData.sprite.x;
      const y = enemyData.sprite.y;
      enemyData.sprite.destroy();
      this.enemies = this.enemies.filter(e => e !== enemyData);

      // Drop hearts
      for (let i = 0; i < 2; i++) {
        const h = this.hearts.create(
          x + Phaser.Math.Between(-10, 10),
          y - 10,
          "heart"
        ) as Phaser.Physics.Arcade.Sprite;
        h.setDisplaySize(16, 16);
        h.refreshBody();
        this.tweens.add({
          targets: h,
          y: h.y - 8,
          duration: 1000,
          yoyo: true,
          repeat: -1,
          ease: "Sine.easeInOut",
        });
      }

      // Particles
      for (let i = 0; i < 6; i++) {
        const p = this.add.circle(x, y, 3, 0x9944cc);
        this.tweens.add({
          targets: p,
          x: x + Phaser.Math.Between(-25, 25),
          y: y + Phaser.Math.Between(-25, 25),
          alpha: 0,
          duration: 500,
          onComplete: () => p.destroy(),
        });
      }
    } else {
      // Flash enemy
      enemyData.sprite.setTint(0xff0000);
      this.time.delayedCall(100, () => {
        if (enemyData.sprite.active) enemyData.sprite.clearTint();
      });
    }
  }

  private levelComplete(): void {
    const elapsed = Math.floor((this.time.now - this.levelStartTime) / 1000);
    this.scene.start("LevelCompleteScene", {
      hearts: this.heartsCollected,
      fragments: this.fragmentsCollected,
      time: elapsed,
    });
    this.scene.stop("UIScene");
  }

  update(time: number, delta: number): void {
    this.player.update(time, delta);

    // Enemy patrol
    for (const e of this.enemies) {
      if (!e.sprite.active) continue;
      e.sprite.x += e.direction * e.speed * (delta / 1000);
      if (e.sprite.x > e.startX + e.range) e.direction = -1;
      if (e.sprite.x < e.startX - e.range) e.direction = 1;
      e.sprite.setFlipX(e.direction < 0);
    }

    // Pit death
    if (this.player.y > 12 * TILE_SIZE + 50) {
      this.player.die();
    }

    // Check attack overlaps manually
    const hitbox = this.player.getAttackHitbox();
    if (hitbox) {
      for (const enemy of this.enemies) {
        if (!enemy.sprite.active) continue;
        const dist = Phaser.Math.Distance.Between(hitbox.x, hitbox.y, enemy.sprite.x, enemy.sprite.y);
        if (dist < 30) {
          this.killEnemy(enemy);
        }
      }
    }
  }
}
