import Phaser from "phaser";
import {
  MAX_RUN_SPEED, ACCELERATION, DECELERATION, AIR_CONTROL,
  JUMP_VELOCITY, FALL_MULTIPLIER, SHORT_HOP_MULTIPLIER,
  COYOTE_TIME, JUMP_BUFFER, MAX_FALL_SPEED,
  ATTACK_RANGE, ATTACK_DURATION, ATTACK_COOLDOWN,
  MAX_HP, INVINCIBILITY_DURATION,
} from "../constants";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  hp: number = MAX_HP;
  facingRight: boolean = true;

  private isGrounded: boolean = false;
  private wasGrounded: boolean = false;
  private coyoteTimer: number = COYOTE_TIME + 1;
  private jumpBufferTimer: number = 0;
  private isJumping: boolean = false;
  private jumpHeld: boolean = false;

  private isAttacking: boolean = false;
  private attackTimer: number = 0;
  private attackCooldownTimer: number = 0;
  private attackHitbox: Phaser.GameObjects.Rectangle | null = null;

  private iFrameTimer: number = 0;
  private isDead: boolean = false;

  // Keyboard (may be null on mobile)
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
  private attackKey: Phaser.Input.Keyboard.Key | null = null;

  // Touch input (set by UIScene)
  public touchLeft: boolean = false;
  public touchRight: boolean = false;
  public touchJump: boolean = false;
  public touchJumpJustPressed: boolean = false;
  public touchAttack: boolean = false;

  public checkpointX: number = 0;
  public checkpointY: number = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "ghostboy");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.checkpointX = x;
    this.checkpointY = y;

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(20, 28);
    body.setOffset(6, 4);
    body.setMaxVelocity(MAX_RUN_SPEED, MAX_FALL_SPEED);
    body.setCollideWorldBounds(false);

    if (scene.input.keyboard) {
      this.cursors = scene.input.keyboard.createCursorKeys();
      this.attackKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    }
  }

  private get inputLeft(): boolean {
    return (this.cursors?.left?.isDown ?? false) || this.touchLeft;
  }

  private get inputRight(): boolean {
    return (this.cursors?.right?.isDown ?? false) || this.touchRight;
  }

  private get inputJump(): boolean {
    return (this.cursors?.up?.isDown ?? false) ||
           (this.cursors?.space?.isDown ?? false) ||
           this.touchJump;
  }

  private get inputJumpJustPressed(): boolean {
    let kbJump = false;
    if (this.cursors?.up) {
      kbJump = Phaser.Input.Keyboard.JustDown(this.cursors.up);
    }
    if (!kbJump && this.cursors?.space) {
      kbJump = Phaser.Input.Keyboard.JustDown(this.cursors.space);
    }
    return kbJump || this.touchJumpJustPressed;
  }

  private get inputAttack(): boolean {
    let kbAttack = false;
    if (this.attackKey) {
      kbAttack = Phaser.Input.Keyboard.JustDown(this.attackKey);
    }
    return kbAttack || this.touchAttack;
  }

  update(_time: number, delta: number): void {
    if (this.isDead) return;

    const body = this.body as Phaser.Physics.Arcade.Body;
    if (!body) return;

    const dt = delta;

    // Ground detection
    this.wasGrounded = this.isGrounded;
    this.isGrounded = body.blocked.down || body.touching.down;

    // Coyote time
    if (this.isGrounded) {
      this.coyoteTimer = 0;
      this.isJumping = false;
    } else if (this.wasGrounded && !this.isJumping) {
      this.coyoteTimer = 0;
    } else {
      this.coyoteTimer += dt;
    }

    // Horizontal movement
    const moveDir = (this.inputRight ? 1 : 0) - (this.inputLeft ? 1 : 0);
    const accel = this.isGrounded ? ACCELERATION : ACCELERATION * AIR_CONTROL;

    if (moveDir !== 0) {
      this.facingRight = moveDir > 0;
      this.setFlipX(!this.facingRight);

      if (Math.sign(body.velocity.x) === -moveDir && Math.abs(body.velocity.x) > 10) {
        body.velocity.x += moveDir * (DECELERATION + accel) * (dt / 1000);
      } else {
        body.velocity.x += moveDir * accel * (dt / 1000);
      }
      body.velocity.x = Phaser.Math.Clamp(body.velocity.x, -MAX_RUN_SPEED, MAX_RUN_SPEED);
    } else {
      if (Math.abs(body.velocity.x) < DECELERATION * (dt / 1000)) {
        body.velocity.x = 0;
      } else {
        body.velocity.x -= Math.sign(body.velocity.x) * DECELERATION * (dt / 1000);
      }
    }

    // Jump buffer
    if (this.inputJumpJustPressed) {
      this.jumpBufferTimer = JUMP_BUFFER;
    } else {
      this.jumpBufferTimer = Math.max(0, this.jumpBufferTimer - dt);
    }

    this.jumpHeld = this.inputJump;

    // Jump execution
    const canJump = this.isGrounded || this.coyoteTimer < COYOTE_TIME;
    if (this.jumpBufferTimer > 0 && canJump) {
      body.velocity.y = JUMP_VELOCITY;
      this.isJumping = true;
      this.jumpHeld = true;
      this.jumpBufferTimer = 0;
      this.coyoteTimer = COYOTE_TIME + 1;
    }

    // Variable jump height (extra gravity when falling or short-hopping)
    if (!this.isGrounded) {
      if (body.velocity.y > 0) {
        body.velocity.y += FALL_MULTIPLIER * (dt / 1000) * 1000;
      } else if (body.velocity.y < 0 && !this.jumpHeld) {
        body.velocity.y += SHORT_HOP_MULTIPLIER * (dt / 1000) * 1000;
      }
      body.velocity.y = Math.min(body.velocity.y, MAX_FALL_SPEED);
    }

    // Attack
    this.attackCooldownTimer = Math.max(0, this.attackCooldownTimer - dt);
    if (this.inputAttack && this.attackCooldownTimer <= 0 && !this.isAttacking) {
      this.doAttack();
    }
    if (this.isAttacking) {
      this.attackTimer -= dt;
      if (this.attackTimer <= 0) this.endAttack();
    }

    // I-frames flash
    if (this.iFrameTimer > 0) {
      this.iFrameTimer -= dt;
      this.setAlpha(Math.sin(Date.now() * 0.02) > 0 ? 1 : 0.3);
      if (this.iFrameTimer <= 0) this.setAlpha(1);
    }

    // Tint based on state (placeholder for real animations)
    this.updateTint();

    // Clear one-frame touch flags
    this.touchJumpJustPressed = false;
    this.touchAttack = false;
  }

  private doAttack(): void {
    this.isAttacking = true;
    this.attackTimer = ATTACK_DURATION;
    this.attackCooldownTimer = ATTACK_COOLDOWN;

    const offsetX = this.facingRight ? ATTACK_RANGE / 2 + 10 : -ATTACK_RANGE / 2 - 10;
    this.attackHitbox = this.scene.add.rectangle(
      this.x + offsetX, this.y, ATTACK_RANGE, 24, 0x88ccff, 0.3
    );
    this.scene.physics.add.existing(this.attackHitbox, true);
  }

  private endAttack(): void {
    this.isAttacking = false;
    if (this.attackHitbox) {
      this.attackHitbox.destroy();
      this.attackHitbox = null;
    }
  }

  public getAttackHitbox(): Phaser.GameObjects.Rectangle | null {
    return this.attackHitbox;
  }

  public takeDamage(amount: number = 1): void {
    if (this.iFrameTimer > 0 || this.isDead) return;
    this.hp -= amount;
    this.iFrameTimer = INVINCIBILITY_DURATION;
    this.scene.cameras.main.shake(100, 0.01);
    this.scene.events.emit("player-damaged", this.hp);
    if (this.hp <= 0) this.die();
  }

  public die(): void {
    this.isDead = true;
    this.setAlpha(0.5);
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.velocity.x = 0;
    body.velocity.y = JUMP_VELOCITY * 0.5;
    this.scene.time.delayedCall(600, () => this.respawn());
  }

  public respawn(): void {
    this.isDead = false;
    this.hp = MAX_HP;
    this.iFrameTimer = 0;
    this.setAlpha(1);
    this.setPosition(this.checkpointX, this.checkpointY);
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.velocity.x = 0;
    body.velocity.y = 0;
    this.scene.events.emit("player-damaged", this.hp);
  }

  public setCheckpoint(x: number, y: number): void {
    this.checkpointX = x;
    this.checkpointY = y;
  }

  private updateTint(): void {
    if (this.isDead) return;
    const body = this.body as Phaser.Physics.Arcade.Body;
    if (this.isAttacking) {
      this.setTint(0x88ccff);
    } else if (!this.isGrounded) {
      this.setTint(body.velocity.y < 0 ? 0xaaddff : 0x8899cc);
    } else if (Math.abs(body.velocity.x) > 10) {
      this.setTint(0xffffff);
    } else {
      this.setTint(0xccccff);
    }
  }
}
