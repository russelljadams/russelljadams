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

export default class Level1_2Scene extends Phaser.Scene {
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
    super({ key: "Level1_2" });
  }

  create(): void {
    console.log("[GGsHeart] Level1_2Scene.create() — Descent");
    this.heartsCollected = 0;
    this.fragmentsCollected = 0;
    this.enemies = [];
    this.activeCheckpoints = new Set();
    this.levelStartTime = this.time.now;

    const levelWidth = 180 * TILE_SIZE;
    const levelHeight = 20 * TILE_SIZE;
    this.physics.world.setBounds(0, 0, levelWidth, levelHeight);

    this.createParallaxBackground(levelWidth, levelHeight);

    this.platforms = this.physics.add.staticGroup();
    this.hearts = this.physics.add.staticGroup();
    this.checkpoints = this.physics.add.staticGroup();
    this.spiritFragments = this.physics.add.staticGroup();

    this.buildLevel();

    // Player starts at the top
    this.player = new Player(this, 5 * TILE_SIZE, 2 * TILE_SIZE);
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
      this.scene.launch("UIScene", { levelKey: "Level1_2" });
    }
    this.events.emit("player-damaged", this.player.hp);
    this.events.emit("hearts-updated", this.heartsCollected);

    console.log("[GGsHeart] Level1_2Scene ready. Player at", this.player.x, this.player.y);
    console.log("[GGsHeart] Platforms count:", this.platforms.getLength());
  }

  private createParallaxBackground(levelWidth: number, levelHeight: number): void {
    // Deep cave background — darker than Level 1
    this.add.rectangle(0, 0, levelWidth, levelHeight, 0x0a0a18)
      .setOrigin(0).setScrollFactor(0).setDepth(-4);

    // Stalactite silhouettes hanging from top
    for (let x = 0; x < levelWidth; x += 80) {
      const h = Phaser.Math.Between(30, 70);
      this.add.triangle(x, 0, 0, 0, 15, h, 30, 0, 0x151528)
        .setOrigin(0, 0).setScrollFactor(0.2, 0.2).setDepth(-3).setAlpha(0.5);
    }

    // Cave wall silhouettes on sides
    for (let y = 0; y < levelHeight; y += 100) {
      const w = Phaser.Math.Between(20, 50);
      this.add.rectangle(0, y, w, 60, 0x181830)
        .setOrigin(0, 0).setScrollFactor(0.3, 0.3).setDepth(-3).setAlpha(0.4);
      this.add.rectangle(levelWidth - w, y, w, 60, 0x181830)
        .setOrigin(0, 0).setScrollFactor(0.3, 0.3).setDepth(-3).setAlpha(0.4);
    }

    // Glowing particles — fewer and dimmer than surface
    this.add.particles(0, 0, "particle", {
      x: { min: 0, max: levelWidth },
      y: { min: 0, max: levelHeight },
      lifespan: 5000,
      speed: { min: 3, max: 10 },
      scale: { start: 0.4, end: 0 },
      alpha: { start: 0.4, end: 0 },
      tint: [0x2244aa, 0x334488, 0x225566],
      frequency: 300,
      quantity: 1,
    }).setScrollFactor(0.5).setDepth(-1);
  }

  private buildLevel(): void {
    const T = TILE_SIZE;

    const placeGround = (startTile: number, widthTiles: number, row: number) => {
      for (let i = 0; i < widthTiles; i++) {
        const x = (startTile + i) * T + T / 2;
        const y = row * T + T / 2;
        const tile = this.platforms.create(x, y, "tile_surface") as Phaser.Physics.Arcade.Sprite;
        tile.refreshBody();
        // Fill below to bottom of level
        for (let j = row + 1; j < 20; j++) {
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

    const placeCheckpoint = (tileX: number, row: number) => {
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

    // ═══════════════════════════════════════════════════════
    // LEVEL 1-2: "DESCENT" — Going deeper into the cave
    // Player starts at top-left, descends to shrine at bottom-right
    // ═══════════════════════════════════════════════════════

    // ═══ SECTION 1: Cave Entrance (tiles 0-25, rows 3-5) ═══
    // Wide starting platform at the top — player gets their bearings
    placeGround(0, 20, 4);
    placeHeart(8, 3);
    placeHeart(12, 3);
    placeCheckpoint(3, 4);

    // ═══ SECTION 2: First Drop (tiles 18-40, rows 5-8) ═══
    // Gap in the ground — player must drop down to lower platforms
    placePlatform(22, 6, 3);   // narrow stepping stone
    placePlatform(27, 6, 2);   // 2-tile wide — tighter
    placeHeart(28, 5);
    placePlatform(18, 8, 4);   // landing platform below
    placeEnemy(20, 7, 2);      // first enemy guards landing

    // ═══ SECTION 3: Staggered Descent (tiles 25-50, rows 8-12) ═══
    // Series of narrow platforms going down and right
    placePlatform(25, 9, 2);
    placeHeart(26, 8);
    placePlatform(30, 10, 3);
    placeEnemy(31, 9, 2);
    placePlatform(35, 11, 2);
    placeHeart(36, 10);
    placePlatform(40, 12, 3);
    placeCheckpoint(41, 12);

    // ═══ SECTION 4: Cave Alcove — Fragment 1 (tiles 45-55, rows 10-13) ═══
    // Main path continues right, but a hidden alcove to the left has a fragment
    placeGround(45, 12, 13);
    placeEnemy(50, 12, 3);
    placeHeart(48, 12);
    placeHeart(52, 12);
    // Alcove: small platform off the beaten path above
    placePlatform(43, 10, 2);
    placeFragment(44, 9);      // Fragment 1 — hidden above in alcove

    // ═══ SECTION 5: The Vertical Gauntlet (tiles 58-72, rows 8-17) ═══
    // Player must drop through a series of tiny platforms straight down
    // This is the signature section — rapid vertical descent
    placeGround(58, 6, 8);     // entry ledge
    placeHeart(60, 7);
    placeEnemy(62, 7, 2);

    // Gauntlet platforms — 2-tile wide, staggered left and right
    placePlatform(65, 10, 2);  // right
    placePlatform(60, 11, 2);  // left
    placeHeart(61, 10);
    placePlatform(66, 12, 2);  // right
    placePlatform(61, 13, 2);  // left
    placeHeart(66, 11);
    placePlatform(65, 14, 2);  // right
    placePlatform(60, 15, 2);  // left
    placeHeart(60, 14);
    placePlatform(64, 16, 2);  // right — bottom of gauntlet

    // Landing zone at bottom of gauntlet
    placeGround(58, 14, 17);
    placeCheckpoint(63, 17);
    placeEnemy(68, 16, 3);

    // ═══ SECTION 6: Deep Cavern (tiles 74-105, rows 15-18) ═══
    // Ground gets narrower, gaps get wider — feeling of descent
    placeGround(74, 5, 16);    // narrow ground
    placeHeart(76, 15);
    // Gap of 4 tiles
    placeGround(83, 4, 17);    // even lower and narrower
    placeEnemy(85, 16, 2);
    // Gap of 5 tiles
    placePlatform(92, 16, 2);  // tiny stepping stone over void
    placeHeart(93, 15);
    placeGround(97, 5, 18);    // narrow ground, deepest so far
    placeFragment(99, 17);     // Fragment 2 — on the narrow deep ground
    placeHeart(100, 17);

    // ═══ SECTION 7: Narrow Passages (tiles 106-135, rows 16-19) ═══
    // Tight corridors with enemies
    placeGround(106, 8, 17);
    placeEnemy(110, 16, 3);
    placeCheckpoint(108, 17);
    placeHeart(112, 16);

    // Stepping stones over deep pit
    placePlatform(116, 16, 2);
    placePlatform(120, 17, 2);
    placeHeart(121, 16);
    placePlatform(124, 16, 2);
    placeHeart(125, 15);

    // ═══ SECTION 8: Cave Floor — Final Stretch (tiles 136-175, rows 18-19) ═══
    // The bottom of the cave — wide ground for the final approach
    placeGround(128, 6, 18);
    placeEnemy(132, 17, 2);
    placeHeart(130, 17);

    // Brief gap
    placeGround(138, 35, 18);
    placeHeart(142, 17);
    placeHeart(148, 17);
    placeHeart(155, 17);

    // Fragment 3 — requires platforming above the main path
    placePlatform(150, 15, 2);
    placePlatform(154, 13, 2);
    placeFragment(155, 12);    // Fragment 3 — high above final stretch

    // Shrine at the bottom-right of the cave
    this.shrine = this.physics.add.staticSprite(168 * T + T / 2, 18 * T - T / 2, "shrine");
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

    const glow = this.add.circle(cp.x, cp.y, 8, 0x44ff44, 0.5).setDepth(11);
    this.tweens.add({
      targets: glow, scaleX: 4, scaleY: 4, alpha: 0,
      duration: 500, ease: "Quad.easeOut",
      onComplete: () => glow.destroy(),
    });

    for (let i = 0; i < 10; i++) {
      const spark = this.add.circle(
        cp.x + Phaser.Math.Between(-8, 8), cp.y,
        2, 0x44ff88, 0.8
      ).setDepth(11);
      this.tweens.add({
        targets: spark,
        y: cp.y - Phaser.Math.Between(20, 50),
        x: spark.x + Phaser.Math.Between(-10, 10),
        alpha: 0, duration: Phaser.Math.Between(400, 700),
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

      this.cameras.main.shake(SHAKE_ENEMY_KILL_DURATION, SHAKE_ENEMY_KILL_INTENSITY);

      spr.setTint(0xffffff);
      this.tweens.add({
        targets: spr,
        scaleX: 1.6, scaleY: 1.6, alpha: 0,
        duration: 200, ease: "Quad.easeOut",
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
              alpha: 0, scale: 0, duration: Phaser.Math.Between(300, 500),
              ease: "Quad.easeOut",
              onComplete: () => p.destroy(),
            });
          }
          const flash = this.add.circle(x, y, 6, 0xff44ff, 0.6).setDepth(11);
          this.tweens.add({
            targets: flash, scaleX: 3, scaleY: 3, alpha: 0,
            duration: 300, onComplete: () => flash.destroy(),
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
      levelKey: "Level1_2", hearts: this.heartsCollected,
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

    // Pit death — bottom of the 20-tile tall level
    if (this.player.y > 20 * TILE_SIZE + 50) {
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
