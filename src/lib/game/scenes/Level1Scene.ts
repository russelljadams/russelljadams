import Phaser from "phaser";
import Player from "../entities/Player";
import { TILE_SIZE, INTERNAL_WIDTH, INTERNAL_HEIGHT, SHAKE_ENEMY_KILL, SHAKE_PLAYER_DAMAGE } from "../constants";

interface EnemyData {
  sprite: Phaser.Physics.Arcade.Sprite;
  startX: number;
  range: number;
  speed: number;
  hp: number;
  direction: number;
}

export default class Level1Scene extends Phaser.Scene {
  public player!: Player;
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
    console.log("[GGsHeart] Level1Scene.create()");
    this.heartsCollected = 0;
    this.fragmentsCollected = 0;
    this.enemies = [];
    this.activeCheckpoints = new Set();
    this.levelStartTime = this.time.now;

    const levelWidth = 220 * TILE_SIZE;
    const levelHeight = 12 * TILE_SIZE;
    this.physics.world.setBounds(0, 0, levelWidth, levelHeight);

    this.createParallaxBackground(levelWidth);

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
      this.scene.launch("UIScene");
    }
    this.events.emit("player-damaged", this.player.hp);
    this.events.emit("hearts-updated", this.heartsCollected);

    console.log("[GGsHeart] Level1Scene ready. Player at", this.player.x, this.player.y);
    console.log("[GGsHeart] Platforms count:", this.platforms.getLength());
  }

  private createParallaxBackground(levelWidth: number): void {
    // Simple dark background
    this.add.rectangle(0, 0, levelWidth, INTERNAL_HEIGHT, 0x111122)
      .setOrigin(0).setScrollFactor(0).setDepth(-4);

    // Forest silhouettes
    for (let x = 0; x < levelWidth; x += 120) {
      const h = Phaser.Math.Between(40, 80);
      this.add.rectangle(x, INTERNAL_HEIGHT - h, 30, h, 0x1a2a1a)
        .setOrigin(0, 0).setScrollFactor(0.3, 0.3).setDepth(-3).setAlpha(0.6);
    }

    // Particles
    this.add.particles(0, 0, "particle", {
      x: { min: 0, max: levelWidth },
      y: { min: 0, max: INTERNAL_HEIGHT },
      lifespan: 4000,
      speed: { min: 5, max: 15 },
      scale: { start: 0.5, end: 0 },
      alpha: { start: 0.6, end: 0 },
      tint: [0x44ffaa, 0x44aaff, 0xaaff44],
      frequency: 200,
      quantity: 1,
    }).setScrollFactor(0.5).setDepth(-1);
  }

  private buildLevel(): void {
    const T = TILE_SIZE;
    const GY = 10; // Ground row

    // Place ground: series of surface tiles with fill below
    const placeGround = (startTile: number, widthTiles: number, row: number = GY) => {
      for (let i = 0; i < widthTiles; i++) {
        const x = (startTile + i) * T + T / 2;
        const y = row * T + T / 2;
        const tile = this.platforms.create(x, y, "tile_surface") as Phaser.Physics.Arcade.Sprite;
        tile.refreshBody();
        // Fill below
        for (let j = row + 1; j < 12; j++) {
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

    const placeHeart = (tileX: number, tileY: number) => {
      const h = this.hearts.create(tileX * T + T / 2, tileY * T + T / 2, "heart") as Phaser.Physics.Arcade.Sprite;
      h.refreshBody();
      this.tweens.add({
        targets: h, y: h.y - 6, duration: 1200,
        yoyo: true, repeat: -1, ease: "Sine.easeInOut",
      });
    };

    const placeEnemy = (tileX: number, tileY: number, rangeTiles: number = 3) => {
      const e = this.physics.add.sprite(tileX * T + T / 2, tileY * T + T / 2, "shade_wisp");
      const body = e.body as Phaser.Physics.Arcade.Body;
      body.setAllowGravity(false);
      body.setImmovable(true);
      this.enemies.push({
        sprite: e, startX: tileX * T + T / 2,
        range: rangeTiles * T, speed: 50, hp: 1, direction: 1,
      });
    };

    const placeCheckpoint = (tileX: number, row: number = GY) => {
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

    // ═══ BEAT 1: Discover Movement (tiles 0-20) ═══
    placeGround(0, 22);
    placeHeart(10, 9);
    placeHeart(14, 9);

    // ═══ BEAT 2: Small gap (tiles 22-36) ═══
    placeGround(24, 14);
    placeHeart(22, 8);

    // ═══ BEAT 3: Platforms + Hearts (tiles 38-56) ═══
    placeGround(38, 4);
    placePlatform(44, 8, 4);
    placeHeart(45, 7);
    placeHeart(46, 7);
    placePlatform(50, 8, 4);
    placeHeart(51, 7);
    placeGround(56, 6);

    // ═══ BEAT 4: First enemy (tiles 62-78) ═══
    placeGround(62, 18);
    placeEnemy(70, 9, 3);
    placeHeart(72, 9);
    placeHeart(73, 9);

    // ═══ BEAT 5: Challenge + Checkpoint (tiles 80-105) ═══
    placeGround(80, 5);
    placeCheckpoint(82);
    placeGround(88, 4);
    placeEnemy(90, 9, 2);
    placeGround(94, 12);
    placeHeart(96, 9);

    // ═══ BEAT 6: Exploration + Fragment (tiles 106-125) ═══
    placeGround(106, 20);
    placePlatform(110, 6, 3);
    placePlatform(115, 4, 3);
    placeFragment(116, 3);
    placeHeart(111, 5);
    placeCheckpoint(112);

    // ═══ BEAT 7: Escalation (tiles 126-155) ═══
    placeGround(126, 6);
    placePlatform(134, 8, 3);
    placeEnemy(136, 7, 2);
    placeGround(140, 6);
    placeEnemy(143, 9, 2);
    placeGround(148, 8);
    placeHeart(150, 9);
    placeHeart(152, 9);
    placeCheckpoint(149);

    // ═══ BEAT 8: Final stretch + Shrine (tiles 156-205) ═══
    placeGround(156, 15);
    placePlatform(162, 5, 4);
    placeFragment(164, 4);
    placeHeart(163, 4);
    placeGround(172, 30);
    placeCheckpoint(175);
    placeFragment(180, 9);

    // Shrine
    this.shrine = this.physics.add.staticSprite(200 * T + T / 2, GY * T - T / 2, "shrine");
  }

  private collectHeart(heart: Phaser.Physics.Arcade.Sprite): void {
    // Prevent double-collect
    if (!heart.active) return;
    const x = heart.x, y = heart.y;

    // Disable physics so it cannot be collected again
    const hBody = heart.body as Phaser.Physics.Arcade.Body;
    if (hBody) hBody.enable = false;

    // Scale up then disappear animation
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

    // Upward particles
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

      // Screen shake on kill
      this.cameras.main.shake(SHAKE_ENEMY_KILL.duration, SHAKE_ENEMY_KILL.intensity);

      // Flash white, scale up, then burst into particles
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
          // Burst particles
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
          // Central flash
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

  private levelComplete(): void {
    const elapsed = Math.floor((this.time.now - this.levelStartTime) / 1000);
    this.scene.stop("UIScene");
    this.scene.start("LevelCompleteScene", {
      hearts: this.heartsCollected,
      fragments: this.fragmentsCollected,
      time: elapsed,
    });
  }

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

    // Pit death
    if (this.player.y > 12 * TILE_SIZE + 50) {
      this.player.die();
    }

    // Attack hitbox check
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
