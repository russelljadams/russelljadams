import Phaser from 'phaser';
import { SCENES, VehicleType } from '../constants';
import { VirtualPad } from '../../ui/VirtualPad';

interface Segment {
  curve: number;
}

// Track layout
const TOTAL_SEGMENTS = 600;
const SEGMENT_LENGTH = 200;

// Rendering
const ROAD_HALF_WIDTH = 1.1;
const CAMERA_HEIGHT = 1200;
const DRAW_DISTANCE = 150;

// Physics — tuned for challenge but fair
const MAX_SPEED = 8000;
const ACCEL = 4500;
const BRAKE = 8000;
const NATURAL_DECEL = 2000;
const OFF_ROAD_PENALTY = 12000;
const STEER_SPEED = 3.0;
const CENTRIPETAL = 0.9;         // sharp curves require braking, gentle ones are fine at speed

const LEADERBOARD_KEY = 'racetrack_leaderboard';
const MAX_LEADERBOARD = 5;

export class RacetrackScene extends Phaser.Scene {
  private returnX = 0;
  private returnY = 0;
  private vehicleType: VehicleType = 'car';

  private segments: Segment[] = [];
  private playerX = 0;
  private speed = 0;
  private trackPos = 0;
  private trackLength = 0;

  private lapCount = 0;
  private lapTime = 0;
  private bestLap = 0;
  private passedHalf = false;

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private escKey!: Phaser.Input.Keyboard.Key;
  private vpad!: VirtualPad;
  private gfx!: Phaser.GameObjects.Graphics;

  private speedText!: Phaser.GameObjects.Text;
  private lapText!: Phaser.GameObjects.Text;
  private timeText!: Phaser.GameObjects.Text;
  private bestText!: Phaser.GameObjects.Text;
  private leaderboardText!: Phaser.GameObjects.Text;
  private newBestText!: Phaser.GameObjects.Text;

  constructor() {
    super(SCENES.RACETRACK);
  }

  create(data?: { returnX?: number; returnY?: number; vehicleType?: VehicleType }) {
    this.returnX = data?.returnX ?? 0;
    this.returnY = data?.returnY ?? 0;
    this.vehicleType = data?.vehicleType ?? 'car';

    this.playerX = 0;
    this.speed = 0;
    this.trackPos = 0;
    this.lapCount = 0;
    this.lapTime = 0;
    this.bestLap = 0;
    this.passedHalf = false;

    this.buildTrack();
    this.trackLength = TOTAL_SEGMENTS * SEGMENT_LENGTH;

    this.gfx = this.add.graphics();

    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }
    this.vpad = new VirtualPad(this, { dpad: true, buttonB: true });

    const hs: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '16px', fontFamily: 'monospace', color: '#ffffff',
      backgroundColor: '#000000aa', padding: { x: 6, y: 3 },
    };
    this.speedText = this.add.text(10, 10, '', hs).setDepth(10);
    this.lapText = this.add.text(10, 35, '', hs).setDepth(10);
    this.timeText = this.add.text(10, 60, '', hs).setDepth(10);
    this.bestText = this.add.text(10, 85, '', hs).setDepth(10);

    // Leaderboard (top-right)
    const { width } = this.scale;
    this.leaderboardText = this.add.text(width - 10, 10, '', {
      fontSize: '12px', fontFamily: 'monospace', color: '#cccccc',
      backgroundColor: '#000000aa', padding: { x: 6, y: 3 },
      lineSpacing: 2,
    }).setOrigin(1, 0).setDepth(10);

    this.newBestText = this.add.text(width / 2, 120, '', {
      fontSize: '20px', fontFamily: 'monospace', color: '#00ff00',
      fontStyle: 'bold',
    }).setOrigin(0.5).setDepth(10).setVisible(false);

    this.updateLeaderboardDisplay();

    this.add.text(width / 2, 10, 'UP=gas  DOWN=brake  LEFT/RIGHT=steer  ESC=exit', {
      fontSize: '12px', fontFamily: 'monospace', color: '#666666',
      backgroundColor: '#000000aa', padding: { x: 6, y: 3 },
    }).setOrigin(0.5, 0).setDepth(10);
  }

  update(_time: number, delta: number) {
    const dt = delta / 1000;
    this.vpad.update();

    if (Phaser.Input.Keyboard.JustDown(this.escKey) || this.vpad.justDown('b')) {
      this.scene.start(SCENES.OVERWORLD, {
        returnX: this.returnX, returnY: this.returnY,
        vehicleType: this.vehicleType,
      });
      return;
    }

    const up = (this.cursors?.up?.isDown ?? false) || this.vpad.isDown('up');
    const down = (this.cursors?.down?.isDown ?? false) || this.vpad.isDown('down');
    const left = (this.cursors?.left?.isDown ?? false) || this.vpad.isDown('left');
    const right = (this.cursors?.right?.isDown ?? false) || this.vpad.isDown('right');

    // Speed
    if (up) this.speed += ACCEL * dt;
    else if (down) this.speed -= BRAKE * dt;
    else this.speed -= NATURAL_DECEL * dt;

    // Off-road penalty
    if (Math.abs(this.playerX) > ROAD_HALF_WIDTH && this.speed > 0) {
      this.speed -= OFF_ROAD_PENALTY * dt;
    }
    this.speed = Phaser.Math.Clamp(this.speed, 0, MAX_SPEED);

    // Position
    this.trackPos += this.speed * dt;
    while (this.trackPos >= this.trackLength) this.trackPos -= this.trackLength;

    // Steer — speed-dependent: faster = more responsive but also more dangerous
    const sr = this.speed / MAX_SPEED;
    if (left) this.playerX -= STEER_SPEED * dt;
    if (right) this.playerX += STEER_SPEED * dt;

    // Centripetal push from curves — this is what makes steering necessary
    const segIdx = Math.floor(this.trackPos / SEGMENT_LENGTH) % TOTAL_SEGMENTS;
    this.playerX += this.segments[segIdx].curve * CENTRIPETAL * sr * dt;
    this.playerX = Phaser.Math.Clamp(this.playerX, -3, 3);

    // Lap logic
    if (segIdx > TOTAL_SEGMENTS * 0.6) this.passedHalf = true;
    if (segIdx < 10 && this.passedHalf) {
      this.passedHalf = false;
      if (this.lapTime > 5) {
        if (this.bestLap === 0 || this.lapTime < this.bestLap) {
          this.bestLap = this.lapTime;
        }
        this.lapCount++;
        this.submitLapTime(this.lapTime);
      }
      this.lapTime = 0;
    }
    this.lapTime += dt;

    this.render();

    const mph = Math.floor(this.speed / MAX_SPEED * 200);
    this.speedText.setText(`${mph} MPH`);
    this.lapText.setText(`Lap ${this.lapCount}`);
    this.timeText.setText(`${this.lapTime.toFixed(1)}s`);
    this.bestText.setText(this.bestLap > 0 ? `Best ${this.bestLap.toFixed(1)}s` : 'Best --');
  }

  private buildTrack() {
    this.segments = [];
    for (let i = 0; i < TOTAL_SEGMENTS; i++) {
      let c = 0;
      // More varied curves with sharper turns
      if (i > 10 && i < 50) c = 2.5;
      else if (i > 60 && i < 100) c = -3.0;
      else if (i > 110 && i < 140) c = 1.8;
      else if (i > 150 && i < 200) c = -3.5;  // sharp left — must brake
      else if (i > 220 && i < 260) c = 3.0;
      else if (i > 270 && i < 310) c = -2.2;
      else if (i > 320 && i < 350) c = 3.5;   // sharpest right — must brake
      else if (i > 360 && i < 400) c = -2.5;
      else if (i > 420 && i < 460) c = 2.0;
      else if (i > 470 && i < 510) c = -3.0;  // another sharp left
      else if (i > 530 && i < 560) c = 2.5;
      else if (i > 570 && i < 590) c = -1.8;
      this.segments.push({ curve: c });
    }
  }

  private render() {
    const g = this.gfx;
    const W = this.scale.width;
    const H = this.scale.height;
    const halfW = W / 2;

    g.clear();

    const horizon = Math.floor(H * 0.4);
    const dashTop = H - 80;
    const roadHeight = dashTop - horizon;

    // Sky
    g.fillStyle(0x1a1a3a);
    g.fillRect(0, 0, W, horizon);
    // Stars
    g.fillStyle(0xffffff);
    for (let i = 0; i < 30; i++) {
      const sx = ((i * 137 + 50) % W);
      const sy = ((i * 89 + 20) % horizon);
      g.fillRect(sx, sy, 1, 1);
    }
    // Horizon glow
    g.fillStyle(0x2a2a4a);
    g.fillRect(0, horizon - 20, W, 20);

    // Flat green ground
    g.fillStyle(0x306828);
    g.fillRect(0, horizon, W, dashTop - horizon);

    // Scanline rasterization
    const baseSeg = Math.floor(this.trackPos / SEGMENT_LENGTH);

    for (let screenY = dashTop - 1; screenY >= horizon; screenY--) {
      const rowFromHorizon = screenY - horizon;
      if (rowFromHorizon <= 0) continue;

      // Perspective: near horizon → large z (far), near dashboard → small z (close)
      const z = (CAMERA_HEIGHT * roadHeight) / rowFromHorizon;

      const worldZ = this.trackPos + z;
      const segI = Math.floor(worldZ / SEGMENT_LENGTH) % TOTAL_SEGMENTS;

      // Accumulated curve shift from camera to this Z
      const startSeg = baseSeg % TOTAL_SEGMENTS;
      const endSeg = segI;
      let curveShift = 0;
      let stepSeg = startSeg;
      const maxSteps = Math.min(DRAW_DISTANCE, 200);
      for (let s = 0; s < maxSteps; s++) {
        if (stepSeg === endSeg) break;
        curveShift += this.segments[stepSeg].curve;
        stepSeg = (stepSeg + 1) % TOTAL_SEGMENTS;
      }

      // Perspective scale: 1 at horizon, 0 at dashboard
      const perspScale = 1 - (rowFromHorizon / roadHeight);
      const roadCenterX = halfW + curveShift * perspScale * 2 - this.playerX * (rowFromHorizon * 1.2);

      // Road width: wide at bottom (close), narrow at horizon (far)
      const roadW = rowFromHorizon * ROAD_HALF_WIDTH * 1.2;
      const roadL = roadCenterX - roadW;
      const roadR = roadCenterX + roadW;
      const rumbleW = roadW * 0.1;

      const stripe = (Math.floor(segI / 2)) % 2 === 0;
      const startLine = (segI % TOTAL_SEGMENTS) < 2;

      // Grass
      g.fillStyle(stripe ? 0x306828 : 0x3a7a30);
      g.fillRect(0, screenY, W, 1);

      // Rumble strips
      g.fillStyle(stripe ? 0xcc1111 : 0xeeeeee);
      g.fillRect(roadL - rumbleW, screenY, rumbleW, 1);
      g.fillRect(roadR, screenY, rumbleW, 1);

      // Road
      g.fillStyle(stripe ? 0x4a4a4a : 0x5a5a5a);
      g.fillRect(roadL, screenY, roadR - roadL, 1);

      // Center dashes
      if (!stripe) {
        g.fillStyle(0xdddddd);
        const dw = Math.max(1, roadW * 0.02);
        g.fillRect(roadCenterX - dw, screenY, dw * 2, 1);
      }

      // Lane lines
      if (stripe) {
        g.fillStyle(0x777777);
        const lw = Math.max(1, roadW * 0.01);
        g.fillRect(roadCenterX - roadW * 0.5, screenY, lw, 1);
        g.fillRect(roadCenterX + roadW * 0.5, screenY, lw, 1);
      }

      // Start/finish
      if (startLine) {
        g.fillStyle(0xffffff);
        g.fillRect(roadL, screenY, roadR - roadL, 1);
      }
    }

    // --- Dashboard / cockpit ---
    g.fillStyle(0x1a1a1a);
    g.fillRect(0, dashTop, W, H - dashTop);
    g.fillStyle(0x282828);
    g.fillRect(4, dashTop + 4, W - 8, H - dashTop - 8);

    g.fillStyle(0x333333);
    g.fillRect(0, dashTop, W, 2);

    // Steering wheel
    const cx = halfW;
    const cy = dashTop + 45;
    g.lineStyle(4, 0x555555);
    g.strokeCircle(cx, cy, 25);
    g.fillStyle(0x444444);
    g.fillRect(cx - 25, cy - 1, 50, 3);
    g.fillRect(cx - 1, cy - 25, 3, 50);
    g.fillStyle(0x333333);
    g.fillCircle(cx, cy, 6);

    // RPM gauge
    const rpm = this.speed / MAX_SPEED;
    g.fillStyle(0x111111);
    g.fillRect(cx - 90, dashTop + 10, 50, 25);
    g.fillStyle(rpm > 0.8 ? 0xff3333 : rpm > 0.5 ? 0xffaa00 : 0x00cc00);
    g.fillRect(cx - 88, dashTop + 14, 46 * rpm, 8);

    // Speed display
    g.fillStyle(0x111111);
    g.fillRect(cx + 40, dashTop + 10, 50, 25);
    g.fillStyle(0x00cc00);
    const mphBar = (this.speed / MAX_SPEED);
    g.fillRect(cx + 42, dashTop + 14, 46 * mphBar, 8);

    // Side mirrors
    g.fillStyle(0x222222);
    g.fillRect(15, dashTop - 45, 50, 35);
    g.fillStyle(0x3a4a5a);
    g.fillRect(18, dashTop - 42, 44, 29);

    g.fillStyle(0x222222);
    g.fillRect(W - 65, dashTop - 45, 50, 35);
    g.fillStyle(0x3a4a5a);
    g.fillRect(W - 62, dashTop - 42, 44, 29);

    // A-pillars
    g.fillStyle(0x111111);
    g.beginPath();
    g.moveTo(0, 0); g.lineTo(50, 0); g.lineTo(20, dashTop); g.lineTo(0, dashTop);
    g.closePath(); g.fillPath();
    g.beginPath();
    g.moveTo(W, 0); g.lineTo(W - 50, 0); g.lineTo(W - 20, dashTop); g.lineTo(W, dashTop);
    g.closePath(); g.fillPath();
  }

  // --- Leaderboard ---

  private getLeaderboard(): number[] {
    try {
      const raw = localStorage.getItem(LEADERBOARD_KEY);
      if (!raw) return [];
      return JSON.parse(raw) as number[];
    } catch {
      return [];
    }
  }

  private saveLeaderboard(times: number[]) {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(times));
  }

  private submitLapTime(time: number) {
    const board = this.getLeaderboard();
    board.push(Math.round(time * 100) / 100);
    board.sort((a, b) => a - b);
    const trimmed = board.slice(0, MAX_LEADERBOARD);
    this.saveLeaderboard(trimmed);
    this.updateLeaderboardDisplay();

    // Check if this is a new #1
    if (trimmed[0] === Math.round(time * 100) / 100) {
      this.newBestText.setText('NEW RECORD!');
      this.newBestText.setVisible(true);
      this.tweens.add({
        targets: this.newBestText,
        alpha: { from: 1, to: 0 },
        duration: 2000,
        onComplete: () => this.newBestText.setVisible(false),
      });
    }
  }

  private updateLeaderboardDisplay() {
    const board = this.getLeaderboard();
    if (board.length === 0) {
      this.leaderboardText.setText('LEADERBOARD\n(no times yet)');
      return;
    }
    const lines = ['LEADERBOARD'];
    for (let i = 0; i < board.length; i++) {
      lines.push(`${i + 1}. ${board[i].toFixed(2)}s`);
    }
    this.leaderboardText.setText(lines.join('\n'));
  }
}
