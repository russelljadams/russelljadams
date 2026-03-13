import Phaser from "phaser";
import Player from "../entities/Player";
import {
  TILE_SIZE, INTERNAL_WIDTH, INTERNAL_HEIGHT,
  ATTACK_RANGE, MAX_HP,
  SHAKE_PLAYER_DAMAGE_DURATION, SHAKE_PLAYER_DAMAGE_INTENSITY,
} from "../constants";

// ═══════════════════════════════════════════════════════════
// The Hollow Knight — World 1 Boss: Doubt Made Flesh
// Arena: 12 tiles wide × 8 tiles tall, bioluminescent forest
// ═══════════════════════════════════════════════════════════

const ARENA_W = 12; // tiles
const ARENA_H = 8;  // tiles
const ARENA_PX_W = ARENA_W * TILE_SIZE;
const ARENA_PX_H = ARENA_H * TILE_SIZE;

const BOSS_SIZE = 64;
const BOSS_MAX_HP = 8;
const BOSS_PHASE2_HP = 4;

const BOSS_DRIFT_SPEED = 30;
const BOSS_HIT_INVULN = 500; // ms

// Attack timing (Phase 1)
const CHARGE_WINDUP = 800;
const CHARGE_SPEED = 350;
const CHARGE_STUN = 1500;

const SHADOW_DROP_TELEGRAPH = 500;
const SHADOW_DROP_SPEED = 500;
const SHADOW_DROP_STUN = 1000;

const DARK_PULSE_COUNT_P1 = 3;
const DARK_PULSE_SPEED = 100;
const DARK_PULSE_LIFETIME = 4000;

const ATTACK_COOLDOWN_MIN = 1500;
const ATTACK_COOLDOWN_MAX = 2500;

// Phase 2 multipliers
const P2_CHARGE_SPEED_MULT = 1.3;
const P2_SHADOW_TELEGRAPH = 300;
const P2_PULSE_COUNT = 5;
const P2_COOLDOWN_MIN = 1000;
const P2_COOLDOWN_MAX = 1800;

type BossState =
  | "idle"
  | "charge_windup"
  | "charging"
  | "charge_stunned"
  | "shadow_telegraph"
  | "shadow_dropping"
  | "shadow_stunned"
  | "dark_pulse"
  | "phase_transition"
  | "dying"
  | "dead";

class HollowKnight {
  sprite: Phaser.GameObjects.Rectangle;
  hp: number = BOSS_MAX_HP;
  state: BossState = "idle";
  phase: 1 | 2 = 1;
  stateTimer: number = 0;
  cooldownTimer: number = 1500; // initial delay before first attack
  invulnTimer: number = 0;
  facingRight: boolean = false;

  // Charge state
  chargeDir: number = 0;

  // Shadow drop state
  shadowMarker: Phaser.GameObjects.Ellipse | null = null;
  dropTargetX: number = 0;

  // Projectiles
  projectiles: Phaser.GameObjects.Arc[] = [];

  // Shockwave (Phase 2)
  shockwave: Phaser.GameObjects.Arc | null = null;
  shockwaveRadius: number = 0;

  private scene: Phaser.Scene;
  private groundY: number;
  private arenaLeft: number;
  private arenaRight: number;

  constructor(scene: Phaser.Scene, x: number, y: number, groundY: number, arenaLeft: number, arenaRight: number) {
    this.scene = scene;
    this.groundY = groundY;
    this.arenaLeft = arenaLeft;
    this.arenaRight = arenaRight;

    // Generate boss texture
    const gfx = scene.make.graphics({ x: 0, y: 0 });
    gfx.clear();
    // Dark knight body
    gfx.fillStyle(0x222244);
    gfx.fillRect(8, 8, 48, 48);
    // Helmet visor
    gfx.fillStyle(0x6644aa);
    gfx.fillRect(16, 14, 32, 12);
    // Eyes — hollow glow
    gfx.fillStyle(0xff2266);
    gfx.fillCircle(24, 20, 4);
    gfx.fillCircle(40, 20, 4);
    // Inner darkness
    gfx.fillStyle(0x000000);
    gfx.fillCircle(24, 20, 2);
    gfx.fillCircle(40, 20, 2);
    // Shoulder plates
    gfx.fillStyle(0x333366);
    gfx.fillRect(4, 22, 10, 16);
    gfx.fillRect(50, 22, 10, 16);
    // Sword hint
    gfx.fillStyle(0x8866cc);
    gfx.fillRect(54, 30, 6, 28);
    gfx.generateTexture("hollow_knight", BOSS_SIZE, BOSS_SIZE);
    gfx.destroy();

    this.sprite = scene.add.rectangle(x, y, BOSS_SIZE, BOSS_SIZE, 0x222244)
      .setDepth(10);
    // Replace the rectangle visual with the texture
    // Actually we'll overlay an image on the rectangle for collision purposes
    // Keep rectangle for physics simplicity; we'll tint it
    this.sprite.setFillStyle(0x222244);
  }

  get x(): number { return this.sprite.x; }
  set x(v: number) { this.sprite.x = v; }
  get y(): number { return this.sprite.y; }
  set y(v: number) { this.sprite.y = v; }

  get isVulnerable(): boolean {
    if (this.invulnTimer > 0) return false;
    if (this.state === "dying" || this.state === "dead" || this.state === "phase_transition") return false;
    // Vulnerable during stun or dark_pulse (if close)
    return this.state === "charge_stunned"
      || this.state === "shadow_stunned"
      || this.state === "dark_pulse"
      || this.state === "idle";
  }

  takeDamage(scene: Boss1Scene): void {
    if (!this.isVulnerable) return;
    this.hp--;
    this.invulnTimer = BOSS_HIT_INVULN;

    // Flash white
    this.sprite.setFillStyle(0xffffff);
    scene.cameras.main.shake(80, 0.008);

    // Check phase transition
    if (this.hp <= BOSS_PHASE2_HP && this.phase === 1) {
      this.enterPhase2(scene);
      return;
    }

    if (this.hp <= 0) {
      this.state = "dying";
      this.stateTimer = 0;
    }
  }

  enterPhase2(scene: Boss1Scene): void {
    this.phase = 2;
    this.state = "phase_transition";
    this.stateTimer = 0;
    this.cooldownTimer = 0;
    // Screen shake
    scene.cameras.main.shake(500, 0.015);
  }

  destroy(): void {
    this.sprite.destroy();
    if (this.shadowMarker) this.shadowMarker.destroy();
    if (this.shockwave) this.shockwave.destroy();
    for (const p of this.projectiles) p.destroy();
    this.projectiles = [];
  }
}

export default class Boss1Scene extends Phaser.Scene {
  public player!: Player;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private boss!: HollowKnight;
  private bossHpBar!: Phaser.GameObjects.Rectangle;
  private bossHpBarBg!: Phaser.GameObjects.Rectangle;
  private bossHpText!: Phaser.GameObjects.Text;
  private arenaLeft: number = 0;
  private arenaRight: number = 0;
  private arenaGroundY: number = 0;
  private levelStartTime: number = 0;
  private fightStarted: boolean = false;
  private bioParticles: Phaser.GameObjects.Arc[] = [];

  constructor() {
    super({ key: "Level1_B" });
  }

  create(): void {
    console.log("[GGsHeart] Boss1Scene.create() — The Hollow Knight");
    this.levelStartTime = this.time.now;
    this.fightStarted = false;

    // Arena dimensions
    const arenaX = (INTERNAL_WIDTH - ARENA_PX_W) / 2;
    const arenaY = INTERNAL_HEIGHT - ARENA_H * TILE_SIZE;
    this.arenaLeft = arenaX;
    this.arenaRight = arenaX + ARENA_PX_W;
    this.arenaGroundY = INTERNAL_HEIGHT - TILE_SIZE;

    this.physics.world.setBounds(arenaX, arenaY, ARENA_PX_W, ARENA_PX_H);

    // ═══ BACKGROUND ═══
    // Dark atmospheric background
    this.add.rectangle(INTERNAL_WIDTH / 2, INTERNAL_HEIGHT / 2, INTERNAL_WIDTH, INTERNAL_HEIGHT, 0x0a0a1a)
      .setDepth(-5);

    // Bioluminescent forest silhouettes
    for (let i = 0; i < 8; i++) {
      const tx = arenaX + Phaser.Math.Between(0, ARENA_PX_W);
      const th = Phaser.Math.Between(60, 120);
      this.add.rectangle(tx, INTERNAL_HEIGHT - th / 2, Phaser.Math.Between(15, 30), th, 0x0d1a0d)
        .setDepth(-4).setAlpha(0.7);
      // Bioluminescent spots on trees
      for (let j = 0; j < 3; j++) {
        const spotY = INTERNAL_HEIGHT - Phaser.Math.Between(20, th - 10);
        const glow = this.add.circle(tx + Phaser.Math.Between(-8, 8), spotY, Phaser.Math.Between(2, 4),
          Phaser.Math.RND.pick([0x44ffaa, 0x22ddcc, 0x66ff88]), 0.5)
          .setDepth(-3);
        this.tweens.add({
          targets: glow, alpha: { from: 0.2, to: 0.7 },
          duration: Phaser.Math.Between(1500, 3000), yoyo: true, repeat: -1,
        });
      }
    }

    // Floating bioluminescent particles
    for (let i = 0; i < 15; i++) {
      const px = Phaser.Math.Between(arenaX, this.arenaRight);
      const py = Phaser.Math.Between(arenaY, this.arenaGroundY - 20);
      const dot = this.add.circle(px, py, Phaser.Math.Between(1, 2),
        Phaser.Math.RND.pick([0x44ffaa, 0x44aaff, 0xaaff44]), 0.4)
        .setDepth(-1);
      this.bioParticles.push(dot);
      this.tweens.add({
        targets: dot,
        x: dot.x + Phaser.Math.Between(-20, 20),
        y: dot.y + Phaser.Math.Between(-15, 15),
        alpha: { from: 0.2, to: 0.6 },
        duration: Phaser.Math.Between(3000, 6000),
        yoyo: true, repeat: -1, ease: "Sine.easeInOut",
      });
    }

    // ═══ ARENA PLATFORMS ═══
    this.platforms = this.physics.add.staticGroup();

    // Ground
    for (let i = 0; i < ARENA_W; i++) {
      const tile = this.platforms.create(
        arenaX + i * TILE_SIZE + TILE_SIZE / 2,
        this.arenaGroundY + TILE_SIZE / 2,
        "tile_surface"
      ) as Phaser.Physics.Arcade.Sprite;
      tile.refreshBody();
      // Fill below
      this.add.image(
        arenaX + i * TILE_SIZE + TILE_SIZE / 2,
        this.arenaGroundY + TILE_SIZE + TILE_SIZE / 2,
        "tile_ground"
      );
    }

    // Left wall (3 tiles high)
    for (let j = 0; j < 3; j++) {
      const wall = this.platforms.create(
        arenaX + TILE_SIZE / 2,
        this.arenaGroundY - (j + 1) * TILE_SIZE + TILE_SIZE / 2,
        "tile_ground"
      ) as Phaser.Physics.Arcade.Sprite;
      wall.refreshBody();
    }

    // Right wall (3 tiles high)
    for (let j = 0; j < 3; j++) {
      const wall = this.platforms.create(
        arenaX + (ARENA_W - 1) * TILE_SIZE + TILE_SIZE / 2,
        this.arenaGroundY - (j + 1) * TILE_SIZE + TILE_SIZE / 2,
        "tile_ground"
      ) as Phaser.Physics.Arcade.Sprite;
      wall.refreshBody();
    }

    // ═══ PLAYER ═══
    this.player = new Player(this, arenaX + 2 * TILE_SIZE, this.arenaGroundY - TILE_SIZE);
    this.player.setDepth(10);
    this.player.setCheckpoint(arenaX + 2 * TILE_SIZE, this.arenaGroundY - TILE_SIZE);

    // Camera — no scroll for arena fight
    this.cameras.main.setBounds(0, 0, INTERNAL_WIDTH, INTERNAL_HEIGHT);

    // Collisions
    this.physics.add.collider(this.player, this.platforms);

    // ═══ BOSS ═══
    const bossCenterX = arenaX + ARENA_PX_W / 2;
    const bossStartY = this.arenaGroundY - BOSS_SIZE / 2;
    this.boss = new HollowKnight(this, bossCenterX, bossStartY, this.arenaGroundY, this.arenaLeft, this.arenaRight);

    // ═══ HP BAR ═══
    const barWidth = 160;
    const barHeight = 8;
    const barX = INTERNAL_WIDTH / 2;
    const barY = 16;
    this.bossHpBarBg = this.add.rectangle(barX, barY, barWidth + 4, barHeight + 4, 0x222222)
      .setDepth(50);
    this.bossHpBar = this.add.rectangle(barX, barY, barWidth, barHeight, 0xff2266)
      .setDepth(51);
    this.bossHpText = this.add.text(barX, barY - 10, "The Hollow Knight", {
      fontFamily: "monospace", fontSize: "8px", color: "#cc88aa",
    }).setOrigin(0.5).setDepth(51);

    // ═══ BOSS NAME INTRO ═══
    const nameText = this.add.text(INTERNAL_WIDTH / 2, INTERNAL_HEIGHT / 2 - 20, "The Hollow Knight", {
      fontFamily: "monospace", fontSize: "14px", color: "#ff4488",
    }).setOrigin(0.5).setDepth(60).setAlpha(0);

    const subtitleText = this.add.text(INTERNAL_WIDTH / 2, INTERNAL_HEIGHT / 2, "Doubt Made Flesh", {
      fontFamily: "monospace", fontSize: "9px", color: "#aa6688",
    }).setOrigin(0.5).setDepth(60).setAlpha(0);

    this.tweens.add({
      targets: [nameText, subtitleText],
      alpha: 1, duration: 600, ease: "Quad.easeOut",
      onComplete: () => {
        this.time.delayedCall(1500, () => {
          this.tweens.add({
            targets: [nameText, subtitleText],
            alpha: 0, duration: 400,
            onComplete: () => {
              nameText.destroy();
              subtitleText.destroy();
              this.fightStarted = true;
            },
          });
        });
      },
    });

    // ═══ LANDING DUST ═══
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

    // ═══ LAUNCH UI ═══
    if (!this.scene.isActive("UIScene")) {
      this.scene.launch("UIScene", { levelKey: "Level1_B" });
    }
    this.events.emit("player-damaged", this.player.hp);

    console.log("[GGsHeart] Boss1Scene ready. Arena:", this.arenaLeft, "-", this.arenaRight);
  }

  update(time: number, delta: number): void {
    if (!this.player || !this.player.active) return;

    this.player.update(time, delta);

    // Pit death — respawn resets boss
    if (this.player.y > INTERNAL_HEIGHT + 50) {
      this.player.die();
      this.resetBoss();
    }

    // Update boss HP bar
    const hpFrac = Math.max(0, this.boss.hp / BOSS_MAX_HP);
    this.bossHpBar.setScale(hpFrac, 1);

    if (!this.fightStarted) return;

    // ═══ BOSS AI ═══
    this.updateBoss(delta);

    // ═══ ATTACK HITBOX CHECK ═══
    const hitbox = this.player.getAttackHitbox();
    if (hitbox && this.boss.isVulnerable) {
      const dist = Phaser.Math.Distance.Between(hitbox.x, hitbox.y, this.boss.x, this.boss.y);
      if (dist < BOSS_SIZE / 2 + ATTACK_RANGE / 2) {
        this.boss.takeDamage(this);
      }
    }

    // ═══ PLAYER-BOSS COLLISION (contact damage) ═══
    if (this.boss.state !== "dying" && this.boss.state !== "dead" && this.boss.state !== "phase_transition") {
      const playerBossDist = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.boss.x, this.boss.y);
      if (playerBossDist < BOSS_SIZE / 2 + 10) {
        this.player.takeDamage(1);
        this.events.emit("player-damaged", this.player.hp);
      }
    }

    // ═══ PROJECTILE COLLISION ═══
    for (let i = this.boss.projectiles.length - 1; i >= 0; i--) {
      const proj = this.boss.projectiles[i];
      if (!proj.active) continue;
      const pd = Phaser.Math.Distance.Between(this.player.x, this.player.y, proj.x, proj.y);
      if (pd < 14) {
        this.player.takeDamage(1);
        this.events.emit("player-damaged", this.player.hp);
        proj.destroy();
        this.boss.projectiles.splice(i, 1);
      }
    }

    // ═══ SHOCKWAVE COLLISION ═══
    if (this.boss.shockwave && this.boss.shockwave.active) {
      const sw = this.boss.shockwave;
      // Player must be on ground and within shockwave radius
      const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
      const onGround = playerBody.blocked.down || playerBody.touching.down;
      if (onGround) {
        const horizDist = Math.abs(this.player.x - sw.x);
        if (horizDist < this.boss.shockwaveRadius + 10 && horizDist > this.boss.shockwaveRadius - 20) {
          this.player.takeDamage(1);
          this.events.emit("player-damaged", this.player.hp);
        }
      }
    }
  }

  private updateBoss(delta: number): void {
    const boss = this.boss;
    const dt = delta;

    // Invulnerability timer
    if (boss.invulnTimer > 0) {
      boss.invulnTimer -= dt;
      // Flash effect
      if (boss.invulnTimer > 0) {
        boss.sprite.setFillStyle(Math.sin(Date.now() * 0.02) > 0 ? 0xffffff : (boss.phase === 2 ? 0x441122 : 0x222244));
      } else {
        boss.sprite.setFillStyle(boss.phase === 2 ? 0x441122 : 0x222244);
      }
    }

    switch (boss.state) {
      case "idle":
        this.bossIdle(dt);
        break;
      case "charge_windup":
        this.bossChargeWindup(dt);
        break;
      case "charging":
        this.bossCharging(dt);
        break;
      case "charge_stunned":
        this.bossStunned(dt, "idle");
        break;
      case "shadow_telegraph":
        this.bossShadowTelegraph(dt);
        break;
      case "shadow_dropping":
        this.bossShadowDrop(dt);
        break;
      case "shadow_stunned":
        this.bossShadowStunned(dt);
        break;
      case "dark_pulse":
        this.bossDarkPulse(dt);
        break;
      case "phase_transition":
        this.bossPhaseTransition(dt);
        break;
      case "dying":
        this.bossDying(dt);
        break;
      case "dead":
        break;
    }

    // Clean up off-screen or expired projectiles
    for (let i = boss.projectiles.length - 1; i >= 0; i--) {
      const p = boss.projectiles[i];
      if (!p.active || p.x < this.arenaLeft - 50 || p.x > this.arenaRight + 50 ||
          p.y < 0 || p.y > INTERNAL_HEIGHT + 50) {
        p.destroy();
        boss.projectiles.splice(i, 1);
      }
    }
  }

  // ═══ BOSS STATES ═══

  private bossIdle(dt: number): void {
    const boss = this.boss;

    // Drift toward player
    if (Math.abs(boss.x - this.player.x) > 20) {
      const dir = boss.x < this.player.x ? 1 : -1;
      boss.x += dir * BOSS_DRIFT_SPEED * (dt / 1000);
      boss.facingRight = dir > 0;
    }

    // Keep boss on ground
    boss.y = this.arenaGroundY - BOSS_SIZE / 2;

    // Cooldown
    boss.cooldownTimer -= dt;
    if (boss.cooldownTimer <= 0) {
      this.chooseAttack();
    }
  }

  private chooseAttack(): void {
    const boss = this.boss;
    const roll = Phaser.Math.Between(1, 3);

    switch (roll) {
      case 1:
        boss.state = "charge_windup";
        boss.stateTimer = 0;
        boss.chargeDir = boss.x < this.player.x ? 1 : -1;
        break;
      case 2:
        boss.state = "shadow_telegraph";
        boss.stateTimer = 0;
        boss.dropTargetX = this.player.x;
        break;
      case 3:
        boss.state = "dark_pulse";
        boss.stateTimer = 0;
        break;
    }
  }

  private resetCooldown(): void {
    const boss = this.boss;
    if (boss.phase === 2) {
      boss.cooldownTimer = Phaser.Math.Between(P2_COOLDOWN_MIN, P2_COOLDOWN_MAX);
    } else {
      boss.cooldownTimer = Phaser.Math.Between(ATTACK_COOLDOWN_MIN, ATTACK_COOLDOWN_MAX);
    }
  }

  // ── CHARGE ──

  private bossChargeWindup(dt: number): void {
    const boss = this.boss;
    boss.stateTimer += dt;

    // Flash red during windup
    const flashRate = Math.sin(boss.stateTimer * 0.015) > 0;
    boss.sprite.setFillStyle(flashRate ? 0xff2222 : (boss.phase === 2 ? 0x441122 : 0x222244));

    // Pull back slightly
    boss.x -= boss.chargeDir * 15 * (dt / 1000);

    if (boss.stateTimer >= CHARGE_WINDUP) {
      boss.state = "charging";
      boss.stateTimer = 0;
    }
  }

  private bossCharging(dt: number): void {
    const boss = this.boss;
    const speed = boss.phase === 2 ? CHARGE_SPEED * P2_CHARGE_SPEED_MULT : CHARGE_SPEED;

    boss.x += boss.chargeDir * speed * (dt / 1000);
    boss.sprite.setFillStyle(0xff4444);

    // Hit wall check
    const wallMargin = TILE_SIZE + BOSS_SIZE / 2;
    if (boss.x <= this.arenaLeft + wallMargin || boss.x >= this.arenaRight - wallMargin) {
      boss.x = Phaser.Math.Clamp(boss.x, this.arenaLeft + wallMargin, this.arenaRight - wallMargin);
      boss.state = "charge_stunned";
      boss.stateTimer = CHARGE_STUN;
      boss.sprite.setFillStyle(0x666688);
      this.cameras.main.shake(120, 0.01);

      // Wall impact particles
      const impactX = boss.chargeDir > 0 ? this.arenaRight - TILE_SIZE : this.arenaLeft + TILE_SIZE;
      for (let i = 0; i < 8; i++) {
        const spark = this.add.circle(impactX, boss.y + Phaser.Math.Between(-20, 20),
          Phaser.Math.Between(2, 4), 0xaaaacc, 0.8).setDepth(11);
        this.tweens.add({
          targets: spark,
          x: spark.x + Phaser.Math.Between(-30, 30),
          y: spark.y + Phaser.Math.Between(-30, 10),
          alpha: 0, scale: 0, duration: 400,
          onComplete: () => spark.destroy(),
        });
      }
    }
  }

  private bossStunned(dt: number, nextState: BossState): void {
    const boss = this.boss;
    boss.stateTimer -= dt;

    // Stunned visual — slight shake
    boss.sprite.x += Math.sin(Date.now() * 0.05) * 0.5;

    if (boss.stateTimer <= 0) {
      boss.state = nextState;
      boss.sprite.setFillStyle(boss.phase === 2 ? 0x441122 : 0x222244);
      this.resetCooldown();
    }
  }

  // ── SHADOW DROP ──

  private bossShadowTelegraph(dt: number): void {
    const boss = this.boss;
    boss.stateTimer += dt;

    // Create shadow marker on ground
    if (!boss.shadowMarker) {
      boss.shadowMarker = this.add.ellipse(boss.dropTargetX, this.arenaGroundY, 50, 12, 0x000000, 0.5)
        .setDepth(5);
      // Pulse the shadow
      this.tweens.add({
        targets: boss.shadowMarker,
        scaleX: 1.3, scaleY: 1.3, alpha: 0.8,
        duration: 200, yoyo: true, repeat: -1,
      });
    }

    // Boss fades out (teleporting)
    boss.sprite.setAlpha(1 - (boss.stateTimer / (boss.phase === 2 ? P2_SHADOW_TELEGRAPH : SHADOW_DROP_TELEGRAPH)));

    const telegraphTime = boss.phase === 2 ? P2_SHADOW_TELEGRAPH : SHADOW_DROP_TELEGRAPH;
    if (boss.stateTimer >= telegraphTime) {
      // Teleport above target
      boss.x = boss.dropTargetX;
      boss.y = this.arenaGroundY - ARENA_PX_H + TILE_SIZE;
      boss.sprite.setAlpha(1);
      boss.state = "shadow_dropping";
      boss.stateTimer = 0;
    }
  }

  private bossShadowDrop(dt: number): void {
    const boss = this.boss;

    boss.y += SHADOW_DROP_SPEED * (dt / 1000);

    const landingY = this.arenaGroundY - BOSS_SIZE / 2;
    if (boss.y >= landingY) {
      boss.y = landingY;

      // Destroy shadow marker
      if (boss.shadowMarker) {
        boss.shadowMarker.destroy();
        boss.shadowMarker = null;
      }

      // Impact effect
      this.cameras.main.shake(100, 0.008);
      for (let i = 0; i < 6; i++) {
        const dust = this.add.circle(
          boss.x + Phaser.Math.Between(-20, 20), this.arenaGroundY,
          Phaser.Math.Between(2, 4), 0x444466, 0.7
        ).setDepth(11);
        this.tweens.add({
          targets: dust,
          y: dust.y - Phaser.Math.Between(10, 30),
          x: dust.x + Phaser.Math.Between(-15, 15),
          alpha: 0, scale: 0, duration: 400,
          onComplete: () => dust.destroy(),
        });
      }

      boss.state = "shadow_stunned";
      boss.stateTimer = SHADOW_DROP_STUN;

      // Phase 2: create shockwave
      if (boss.phase === 2) {
        this.createShockwave(boss.x);
      }
    }
  }

  private bossShadowStunned(dt: number): void {
    const boss = this.boss;
    boss.stateTimer -= dt;

    // Stunned visual
    boss.sprite.x += Math.sin(Date.now() * 0.05) * 0.5;
    boss.sprite.setFillStyle(0x666688);

    // Update shockwave
    if (boss.shockwave && boss.shockwave.active) {
      boss.shockwaveRadius += 200 * (dt / 1000);
      boss.shockwave.setRadius(boss.shockwaveRadius);
      boss.shockwave.setAlpha(Math.max(0, 1 - boss.shockwaveRadius / 200));
      if (boss.shockwaveRadius > 200) {
        boss.shockwave.destroy();
        boss.shockwave = null;
      }
    }

    if (boss.stateTimer <= 0) {
      boss.state = "idle";
      boss.sprite.setFillStyle(boss.phase === 2 ? 0x441122 : 0x222244);
      this.resetCooldown();
      if (boss.shockwave) {
        boss.shockwave.destroy();
        boss.shockwave = null;
      }
    }
  }

  private createShockwave(x: number): void {
    const boss = this.boss;
    boss.shockwaveRadius = 10;
    boss.shockwave = this.add.circle(x, this.arenaGroundY, 10, 0xff4488, 0.6)
      .setDepth(8);
    boss.shockwave.setStrokeStyle(2, 0xff88aa);
    // Make it a ring (no fill, just stroke)
    boss.shockwave.setFillStyle(0xff4488, 0.15);
  }

  // ── DARK PULSE ──

  private bossDarkPulse(dt: number): void {
    const boss = this.boss;
    boss.stateTimer += dt;

    if (boss.stateTimer < 100) return; // brief pause before firing

    // Fire projectiles once
    if (boss.projectiles.length === 0 && boss.stateTimer >= 100) {
      const count = boss.phase === 2 ? P2_PULSE_COUNT : DARK_PULSE_COUNT_P1;
      const angleToPlayer = Phaser.Math.Angle.Between(boss.x, boss.y, this.player.x, this.player.y);
      const spreadAngle = Math.PI / 6; // 30 degrees total spread

      for (let i = 0; i < count; i++) {
        const t = (count as number) === 1 ? 0 : (i / (count - 1)) - 0.5;
        const angle = angleToPlayer + t * spreadAngle * 2;
        const proj = this.add.circle(boss.x, boss.y, 6, 0xaa44ff, 0.9).setDepth(11);
        // Store velocity data on the object
        (proj as any).vx = Math.cos(angle) * DARK_PULSE_SPEED;
        (proj as any).vy = Math.sin(angle) * DARK_PULSE_SPEED;
        (proj as any).lifetime = 0;
        boss.projectiles.push(proj);

        // Muzzle flash
        const flash = this.add.circle(boss.x, boss.y, 4, 0xdd66ff, 0.6).setDepth(12);
        this.tweens.add({
          targets: flash, scaleX: 2, scaleY: 2, alpha: 0,
          duration: 200, onComplete: () => flash.destroy(),
        });
      }

      boss.sprite.setFillStyle(0x8844cc);
    }

    // Move projectiles
    for (const proj of boss.projectiles) {
      if (!proj.active) continue;
      proj.x += (proj as any).vx * (dt / 1000);
      proj.y += (proj as any).vy * (dt / 1000);
      (proj as any).lifetime += dt;

      // Trail effect
      if (Math.random() < 0.3) {
        const trail = this.add.circle(proj.x, proj.y, 2, 0x6622aa, 0.4).setDepth(10);
        this.tweens.add({
          targets: trail, alpha: 0, scale: 0, duration: 300,
          onComplete: () => trail.destroy(),
        });
      }
    }

    // End dark pulse after projectiles expire or leave arena
    const allGone = boss.projectiles.every(p => !p.active || (p as any).lifetime > DARK_PULSE_LIFETIME);
    if (boss.projectiles.length > 0 && allGone) {
      for (const p of boss.projectiles) if (p.active) p.destroy();
      boss.projectiles = [];
      boss.state = "idle";
      boss.sprite.setFillStyle(boss.phase === 2 ? 0x441122 : 0x222244);
      this.resetCooldown();
    }

    // Also end if stateTimer exceeds a max (safety valve)
    if (boss.stateTimer > DARK_PULSE_LIFETIME + 500) {
      for (const p of boss.projectiles) if (p.active) p.destroy();
      boss.projectiles = [];
      boss.state = "idle";
      boss.sprite.setFillStyle(boss.phase === 2 ? 0x441122 : 0x222244);
      this.resetCooldown();
    }
  }

  // ── PHASE TRANSITION ──

  private bossPhaseTransition(dt: number): void {
    const boss = this.boss;
    boss.stateTimer += dt;

    // Flash rapidly between colors
    const flashColor = Math.sin(boss.stateTimer * 0.03) > 0 ? 0xff2222 : 0x441122;
    boss.sprite.setFillStyle(flashColor);

    // Grow slightly
    const scale = 1 + Math.sin(boss.stateTimer * 0.005) * 0.1;
    boss.sprite.setScale(scale);

    // Emit dark particles
    if (Math.random() < 0.3) {
      const spark = this.add.circle(
        boss.x + Phaser.Math.Between(-30, 30),
        boss.y + Phaser.Math.Between(-30, 30),
        Phaser.Math.Between(2, 4), 0xff2244, 0.7
      ).setDepth(11);
      this.tweens.add({
        targets: spark,
        y: spark.y - Phaser.Math.Between(20, 50),
        alpha: 0, scale: 0, duration: 600,
        onComplete: () => spark.destroy(),
      });
    }

    if (boss.stateTimer >= 2000) {
      boss.state = "idle";
      boss.sprite.setScale(1);
      boss.sprite.setFillStyle(0x441122);
      // Boss now darker/redder
      this.bossHpBar.setFillStyle(0xff0033);
      this.bossHpText.setText("The Hollow Knight — Phase 2");
      this.bossHpText.setColor("#ff4466");
      this.resetCooldown();
    }
  }

  // ── DYING ──

  private bossDying(dt: number): void {
    const boss = this.boss;
    boss.stateTimer += dt;

    // Rapid flashing
    const flash = Math.sin(boss.stateTimer * 0.04) > 0;
    boss.sprite.setFillStyle(flash ? 0xffffff : 0xff2266);

    // Expand
    const scale = 1 + (boss.stateTimer / 2000) * 0.8;
    boss.sprite.setScale(scale);

    // Shake
    boss.sprite.x += Math.sin(Date.now() * 0.08) * 2;

    // Emit particles
    if (Math.random() < 0.5) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Phaser.Math.Between(10, 40);
      const p = this.add.circle(
        boss.x + Math.cos(angle) * dist,
        boss.y + Math.sin(angle) * dist,
        Phaser.Math.Between(2, 5),
        Phaser.Math.RND.pick([0xff4488, 0xffffff, 0xaa22cc]),
        0.8
      ).setDepth(12);
      this.tweens.add({
        targets: p,
        x: p.x + Math.cos(angle) * 40,
        y: p.y + Math.sin(angle) * 40,
        alpha: 0, scale: 0, duration: 500,
        onComplete: () => p.destroy(),
      });
    }

    if (boss.stateTimer >= 2500) {
      // Final burst
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2;
        const dist = Phaser.Math.Between(20, 60);
        const p = this.add.circle(boss.x, boss.y, Phaser.Math.Between(3, 6),
          Phaser.Math.RND.pick([0xff4488, 0xffffff, 0xaa22cc, 0xff88aa]),
          0.9).setDepth(12);
        this.tweens.add({
          targets: p,
          x: boss.x + Math.cos(angle) * dist,
          y: boss.y + Math.sin(angle) * dist,
          alpha: 0, scale: 0, duration: Phaser.Math.Between(400, 800),
          onComplete: () => p.destroy(),
        });
      }

      // White flash
      const whiteFlash = this.add.rectangle(
        INTERNAL_WIDTH / 2, INTERNAL_HEIGHT / 2,
        INTERNAL_WIDTH, INTERNAL_HEIGHT,
        0xffffff, 0.9
      ).setDepth(100);
      this.tweens.add({
        targets: whiteFlash,
        alpha: 0, duration: 800,
        onComplete: () => {
          whiteFlash.destroy();
          this.bossDefeated();
        },
      });

      boss.sprite.setAlpha(0);
      boss.state = "dead";

      // Hide HP bar
      this.bossHpBar.setVisible(false);
      this.bossHpBarBg.setVisible(false);
      this.bossHpText.setVisible(false);
    }
  }

  private bossDefeated(): void {
    const elapsed = Math.floor((this.time.now - this.levelStartTime) / 1000);
    this.time.delayedCall(1000, () => {
      this.scene.stop("UIScene");
      this.scene.start("LevelCompleteScene", {
        levelKey: "Level1_B", hearts: 0,
        fragments: 0,
        time: elapsed,
      });
    });
  }

  private resetBoss(): void {
    // Clean up old boss
    this.boss.destroy();

    // Recreate
    const bossCenterX = this.arenaLeft + ARENA_PX_W / 2;
    const bossStartY = this.arenaGroundY - BOSS_SIZE / 2;
    this.boss = new HollowKnight(this, bossCenterX, bossStartY, this.arenaGroundY, this.arenaLeft, this.arenaRight);

    // Reset HP bar
    this.bossHpBar.setScale(1, 1);
    this.bossHpBar.setFillStyle(0xff2266);
    this.bossHpBar.setVisible(true);
    this.bossHpBarBg.setVisible(true);
    this.bossHpText.setVisible(true);
    this.bossHpText.setText("The Hollow Knight");
    this.bossHpText.setColor("#cc88aa");

    this.fightStarted = true;
  }
}
