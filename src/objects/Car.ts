import Phaser from 'phaser';
import { CAR_STATS, VAN_STATS, VehicleType } from '../game/constants';
import { VirtualPad } from '../ui/VirtualPad';

const DRS_BOOST = 1.3;       // 30% speed increase
const DRS_DURATION = 3000;   // ms
const DRS_COOLDOWN = 10000;  // ms

export class Car extends Phaser.GameObjects.Sprite {
  declare body: Phaser.Physics.Arcade.Body;

  private speed = 0;
  private heading: number; // radians
  private vehicleType: VehicleType;

  // DRS state (F1 car only)
  private drsActive = false;
  private drsTimer = 0;
  private drsCooldownTimer = 0;

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private vpad?: VirtualPad;

  constructor(scene: Phaser.Scene, x: number, y: number, vehicleType: VehicleType = 'car') {
    super(scene, x, y, vehicleType === 'van' ? 'van' : 'car');

    this.vehicleType = vehicleType;
    this.heading = -Math.PI / 2; // facing up

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setCollideWorldBounds(true);

    if (vehicleType === 'van') {
      this.body.setSize(20, 26);
      this.body.setOffset(6, 3);
    } else {
      this.body.setSize(24, 26);
      this.body.setOffset(4, 3);
    }

    if (scene.input.keyboard) {
      this.cursors = scene.input.keyboard.createCursorKeys();
    }
  }

  private get stats() {
    return this.vehicleType === 'van' ? VAN_STATS : CAR_STATS;
  }

  getSpeed(): number {
    return Math.abs(this.speed);
  }

  getVehicleType(): VehicleType {
    return this.vehicleType;
  }

  isDrsActive(): boolean {
    return this.drsActive;
  }

  isDrsReady(): boolean {
    return this.vehicleType === 'car' && !this.drsActive && this.drsCooldownTimer <= 0;
  }

  getDrsCooldownPercent(): number {
    if (this.drsActive) return 1;
    if (this.drsCooldownTimer <= 0) return 1;
    return 1 - (this.drsCooldownTimer / DRS_COOLDOWN);
  }

  activateDrs(): boolean {
    if (this.vehicleType !== 'car') return false;
    if (this.drsActive) return false;
    if (this.drsCooldownTimer > 0) return false;
    if (this.speed < this.stats.MAX_SPEED * 0.3) return false; // need some speed

    this.drsActive = true;
    this.drsTimer = DRS_DURATION;
    return true;
  }

  setVirtualPad(vpad: VirtualPad) {
    this.vpad = vpad;
  }

  setVehicleType(type: VehicleType) {
    this.vehicleType = type;
    this.setTexture(type === 'van' ? 'van' : 'car');
    this.speed = 0;
    this.drsActive = false;
    this.drsTimer = 0;
    this.drsCooldownTimer = 0;
    if (type === 'van') {
      this.body.setSize(20, 26);
      this.body.setOffset(6, 3);
    } else {
      this.body.setSize(24, 26);
      this.body.setOffset(4, 3);
    }
  }

  update(_time: number, delta: number): void {
    const dt = delta / 1000;
    const s = this.stats;

    // DRS timers
    if (this.drsActive) {
      this.drsTimer -= delta;
      if (this.drsTimer <= 0) {
        this.drsActive = false;
        this.drsCooldownTimer = DRS_COOLDOWN;
      }
    } else if (this.drsCooldownTimer > 0) {
      this.drsCooldownTimer -= delta;
    }

    const maxSpeed = this.drsActive ? s.MAX_SPEED * DRS_BOOST : s.MAX_SPEED;

    const isUp = (this.cursors?.up?.isDown ?? false) || (this.vpad?.isDown('up') ?? false);
    const isDown = (this.cursors?.down?.isDown ?? false) || (this.vpad?.isDown('down') ?? false);
    const isLeft = (this.cursors?.left?.isDown ?? false) || (this.vpad?.isDown('left') ?? false);
    const isRight = (this.cursors?.right?.isDown ?? false) || (this.vpad?.isDown('right') ?? false);

    // Acceleration / braking
    if (isUp) {
      const accel = this.drsActive ? s.ACCELERATION * 1.2 : s.ACCELERATION;
      this.speed += accel * dt;
    } else if (isDown) {
      if (this.speed > 0) {
        this.speed -= s.BRAKE_FORCE * dt;
        if (this.speed < 0) this.speed = 0;
      } else {
        this.speed -= (s.ACCELERATION * 0.5) * dt;
      }
    } else {
      if (this.speed > 0) {
        this.speed -= s.DRAG * dt;
        if (this.speed < 0) this.speed = 0;
      } else if (this.speed < 0) {
        this.speed += s.DRAG * dt;
        if (this.speed > 0) this.speed = 0;
      }
    }

    // Clamp speed
    this.speed = Phaser.Math.Clamp(this.speed, -s.MAX_SPEED * 0.3, maxSpeed);

    // Turning - only when moving
    if (Math.abs(this.speed) > s.MIN_TURN_SPEED) {
      const speedFactor = Math.min(Math.abs(this.speed) / (s.MAX_SPEED * 0.5), 1);
      const turnAmount = Phaser.Math.DegToRad(s.TURN_RATE) * dt * speedFactor;
      const turnDirection = this.speed < 0 ? -1 : 1;

      if (isLeft) {
        this.heading -= turnAmount * turnDirection;
      }
      if (isRight) {
        this.heading += turnAmount * turnDirection;
      }
    }

    // Calculate velocity from heading and speed
    const vx = Math.cos(this.heading) * this.speed;
    const vy = Math.sin(this.heading) * this.speed;

    // Apply lateral damping for drift feel
    const forwardX = Math.cos(this.heading);
    const forwardY = Math.sin(this.heading);

    const currentVx = this.body.velocity.x;
    const currentVy = this.body.velocity.y;

    const forwardComponent = currentVx * forwardX + currentVy * forwardY;
    const lateralX = currentVx - forwardComponent * forwardX;
    const lateralY = currentVy - forwardComponent * forwardY;

    this.body.setVelocity(
      vx + lateralX * s.LATERAL_DAMPING,
      vy + lateralY * s.LATERAL_DAMPING,
    );

    // Rotate sprite to match heading
    this.setRotation(this.heading + Math.PI / 2);
  }
}
