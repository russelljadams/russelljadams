import Phaser from 'phaser';
import { CAR } from '../game/constants';

export class Car extends Phaser.GameObjects.Sprite {
  declare body: Phaser.Physics.Arcade.Body;

  private speed = 0;
  private heading: number; // radians

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'car');

    this.heading = -Math.PI / 2; // facing up

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setCollideWorldBounds(true);
    this.body.setSize(24, 26);
    this.body.setOffset(4, 3);

    if (scene.input.keyboard) {
      this.cursors = scene.input.keyboard.createCursorKeys();
    }
  }

  getSpeed(): number {
    return Math.abs(this.speed);
  }

  update(_time: number, delta: number): void {
    const dt = delta / 1000;

    const isUp = this.cursors?.up?.isDown ?? false;
    const isDown = this.cursors?.down?.isDown ?? false;
    const isLeft = this.cursors?.left?.isDown ?? false;
    const isRight = this.cursors?.right?.isDown ?? false;

    // Acceleration / braking
    if (isUp) {
      this.speed += CAR.ACCELERATION * dt;
    } else if (isDown) {
      if (this.speed > 0) {
        // Braking
        this.speed -= CAR.BRAKE_FORCE * dt;
        if (this.speed < 0) this.speed = 0;
      } else {
        // Reverse (slower)
        this.speed -= (CAR.ACCELERATION * 0.5) * dt;
      }
    } else {
      // Natural drag
      if (this.speed > 0) {
        this.speed -= CAR.DRAG * dt;
        if (this.speed < 0) this.speed = 0;
      } else if (this.speed < 0) {
        this.speed += CAR.DRAG * dt;
        if (this.speed > 0) this.speed = 0;
      }
    }

    // Clamp speed
    this.speed = Phaser.Math.Clamp(this.speed, -CAR.MAX_SPEED * 0.3, CAR.MAX_SPEED);

    // Turning - only when moving
    if (Math.abs(this.speed) > CAR.MIN_TURN_SPEED) {
      // Turn rate scales with speed (slower at low speed, full at higher speed)
      const speedFactor = Math.min(Math.abs(this.speed) / (CAR.MAX_SPEED * 0.5), 1);
      const turnAmount = Phaser.Math.DegToRad(CAR.TURN_RATE) * dt * speedFactor;

      // Reverse turning when going backwards
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

    // Project current body velocity onto forward and lateral axes
    const currentVx = this.body.velocity.x;
    const currentVy = this.body.velocity.y;

    const forwardComponent = currentVx * forwardX + currentVy * forwardY;
    const lateralX = currentVx - forwardComponent * forwardX;
    const lateralY = currentVy - forwardComponent * forwardY;

    // New velocity = intended forward + damped lateral
    this.body.setVelocity(
      vx + lateralX * CAR.LATERAL_DAMPING,
      vy + lateralY * CAR.LATERAL_DAMPING,
    );

    // Rotate sprite to match heading
    this.setRotation(this.heading + Math.PI / 2); // sprite faces up at 0
  }
}
