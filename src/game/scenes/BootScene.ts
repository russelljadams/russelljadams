import Phaser from 'phaser';
import { SCENES, TILE_SIZE, CAR } from '../constants';

export class BootScene extends Phaser.Scene {
  constructor() {
    super(SCENES.BOOT);
  }

  create() {
    this.generateTileset();
    this.generateCarSprite();
    this.scene.start(SCENES.TITLE);
  }

  private generateTileset() {
    const T = TILE_SIZE;
    const g = this.add.graphics();

    // 0: GRASS
    g.fillStyle(0x4a7c3f);
    g.fillRect(0, 0, T, T);
    g.fillStyle(0x3d6b34);
    g.fillRect(5, 7, 3, 3);
    g.fillRect(18, 3, 4, 3);
    g.fillRect(8, 20, 3, 2);
    g.fillRect(22, 22, 3, 3);
    g.fillRect(3, 14, 2, 2);
    g.fillRect(26, 12, 2, 2);
    g.fillStyle(0x578a4a);
    g.fillRect(14, 10, 2, 2);
    g.fillRect(1, 26, 2, 2);
    g.fillRect(24, 4, 2, 1);

    // 1: ROAD
    g.fillStyle(0x555555);
    g.fillRect(T, 0, T, T);
    g.fillStyle(0x505050);
    g.fillRect(T + 4, 8, 2, 2);
    g.fillRect(T + 16, 4, 2, 2);
    g.fillRect(T + 10, 20, 2, 2);
    g.fillRect(T + 24, 14, 2, 1);
    g.fillStyle(0x4a4a4a);
    g.fillRect(T + 2, 22, 1, 1);
    g.fillRect(T + 20, 26, 1, 1);

    // 2: WALL
    g.fillStyle(0x8b6914);
    g.fillRect(2 * T, 0, T, T);
    g.fillStyle(0x7a5c12);
    g.fillRect(2 * T, 0, T, 3);
    g.fillRect(2 * T, T - 3, T, 3);
    g.fillStyle(0x9a7a24);
    g.fillRect(2 * T + 4, 6, T - 8, 2);
    g.fillRect(2 * T + 4, T - 8, T - 8, 2);

    // 3: BUILDING_WALL
    g.fillStyle(0x667788);
    g.fillRect(3 * T, 0, T, T);
    // Brick pattern
    g.fillStyle(0x5a6b7c);
    for (let row = 0; row < T; row += 8) {
      const offset = (row % 16 === 0) ? 0 : 8;
      for (let col = offset; col < T; col += 16) {
        g.fillRect(3 * T + col, row, 15, 7);
        g.fillStyle(0x556677);
        g.fillRect(3 * T + col, row + 7, 15, 1);
        g.fillRect(3 * T + col + 15, row, 1, 8);
        g.fillStyle(0x5a6b7c);
      }
    }
    // Window detail
    g.fillStyle(0x8899aa);
    g.fillRect(3 * T + 8, 8, 16, 16);
    g.fillStyle(0x99bbdd);
    g.fillRect(3 * T + 10, 10, 12, 12);
    g.fillStyle(0x667788);
    g.fillRect(3 * T + 15, 10, 2, 12);
    g.fillRect(3 * T + 10, 15, 12, 2);

    // 4: BUILDING_ROOF
    g.fillStyle(0x445566);
    g.fillRect(4 * T, 0, T, T);
    g.fillStyle(0x3a4a5a);
    g.fillRect(4 * T + 2, 2, T - 4, T - 4);
    g.fillStyle(0x4d5d6d);
    g.fillRect(4 * T + 6, 6, T - 12, 2);
    g.fillRect(4 * T + 6, T - 8, T - 12, 2);
    g.fillRect(4 * T + 6, 6, 2, T - 12);
    g.fillRect(4 * T + T - 8, 6, 2, T - 12);

    // 5: DOOR
    g.fillStyle(0xddaa33);
    g.fillRect(5 * T, 0, T, T);
    g.fillStyle(0xcc9922);
    g.fillRect(5 * T + 3, 2, T - 6, T - 2);
    // Door panels
    g.fillStyle(0xbb8811);
    g.fillRect(5 * T + 5, 4, T / 2 - 5, T / 2 - 4);
    g.fillRect(5 * T + 5, T / 2 + 2, T / 2 - 5, T / 2 - 4);
    g.fillRect(5 * T + T / 2 + 2, 4, T / 2 - 5, T / 2 - 4);
    g.fillRect(5 * T + T / 2 + 2, T / 2 + 2, T / 2 - 5, T / 2 - 4);
    // Handle
    g.fillStyle(0xeedd66);
    g.fillRect(5 * T + T - 8, T / 2 - 2, 3, 4);

    // 6: SIDEWALK
    g.fillStyle(0x999999);
    g.fillRect(6 * T, 0, T, T);
    g.fillStyle(0x888888);
    g.fillRect(6 * T, 0, T, 1);
    g.fillRect(6 * T, T - 1, T, 1);
    // Grid pattern
    g.fillRect(6 * T + 16, 0, 1, T);
    g.fillRect(6 * T, 16, T, 1);
    g.fillStyle(0x8a8a8a);
    g.fillRect(6 * T + 8, 0, 1, T);
    g.fillRect(6 * T + 24, 0, 1, T);
    g.fillRect(6 * T, 8, T, 1);
    g.fillRect(6 * T, 24, T, 1);

    // 7: FLOOR (interior)
    g.fillStyle(0x777766);
    g.fillRect(7 * T, 0, T, T);
    g.fillStyle(0x6e6e5e);
    g.fillRect(7 * T + 8, 0, 1, T);
    g.fillRect(7 * T + 16, 0, 1, T);
    g.fillRect(7 * T + 24, 0, 1, T);
    g.fillRect(7 * T, 8, T, 1);
    g.fillRect(7 * T, 16, T, 1);
    g.fillRect(7 * T, 24, T, 1);

    g.generateTexture('placeholder-tileset', 8 * T, T);
    g.destroy();
  }

  private generateCarSprite() {
    const S = CAR.SPRITE_SIZE;
    const g = this.add.graphics();

    // --- REAR WING ---
    g.fillStyle(0xaa0000);
    g.fillRect(2, 27, 28, 3);
    g.fillStyle(0xcc1111);
    g.fillRect(3, 28, 26, 1);
    // Wing endplates
    g.fillStyle(0x888888);
    g.fillRect(1, 26, 2, 5);
    g.fillRect(29, 26, 2, 5);

    // --- REAR WHEELS ---
    g.fillStyle(0x1a1a1a);
    g.fillRect(1, 20, 5, 7);
    g.fillRect(26, 20, 5, 7);
    // Tire tread
    g.fillStyle(0x2a2a2a);
    g.fillRect(2, 21, 3, 1);
    g.fillRect(2, 23, 3, 1);
    g.fillRect(2, 25, 3, 1);
    g.fillRect(27, 21, 3, 1);
    g.fillRect(27, 23, 3, 1);
    g.fillRect(27, 25, 3, 1);

    // --- ENGINE COVER / REAR BODY ---
    g.fillStyle(0xdd2222);
    g.fillRect(10, 20, 12, 8);
    // Exhaust
    g.fillStyle(0x444444);
    g.fillRect(14, 27, 4, 1);
    // Air intake scoop
    g.fillStyle(0x222222);
    g.fillRect(13, 20, 6, 2);

    // --- SIDEPODS ---
    g.fillStyle(0xdd2222);
    g.fillRect(7, 12, 18, 10);
    // Sidepod intake openings
    g.fillStyle(0x222222);
    g.fillRect(7, 12, 3, 3);
    g.fillRect(22, 12, 3, 3);
    // White sponsor stripe
    g.fillStyle(0xeeeeee);
    g.fillRect(7, 16, 2, 5);
    g.fillRect(23, 16, 2, 5);
    // Number area
    g.fillStyle(0xffffff);
    g.fillRect(13, 16, 6, 4);
    g.fillStyle(0xdd2222);
    g.fillRect(14, 17, 4, 2);

    // --- COCKPIT ---
    g.fillStyle(0x333333);
    g.fillRect(11, 10, 10, 6);
    // Cockpit opening
    g.fillStyle(0x1a1a1a);
    g.fillRect(12, 11, 8, 4);
    // Driver helmet
    g.fillStyle(0xdddddd);
    g.fillRect(14, 12, 4, 2);
    // Halo
    g.fillStyle(0x555555);
    g.fillRect(11, 10, 10, 1);
    g.fillRect(11, 10, 1, 6);
    g.fillRect(20, 10, 1, 6);
    g.fillRect(14, 15, 4, 1);

    // --- FRONT BODY / MONOCOQUE ---
    g.fillStyle(0xdd2222);
    g.fillRect(11, 4, 10, 8);
    // Body highlight
    g.fillStyle(0xee3333);
    g.fillRect(12, 5, 8, 4);

    // --- FRONT WHEELS ---
    g.fillStyle(0x1a1a1a);
    g.fillRect(1, 5, 5, 7);
    g.fillRect(26, 5, 5, 7);
    // Tread
    g.fillStyle(0x2a2a2a);
    g.fillRect(2, 6, 3, 1);
    g.fillRect(2, 8, 3, 1);
    g.fillRect(2, 10, 3, 1);
    g.fillRect(27, 6, 3, 1);
    g.fillRect(27, 8, 3, 1);
    g.fillRect(27, 10, 3, 1);

    // --- FRONT SUSPENSION ARMS ---
    g.fillStyle(0x444444);
    g.fillRect(6, 6, 5, 1);
    g.fillRect(6, 10, 5, 1);
    g.fillRect(21, 6, 5, 1);
    g.fillRect(21, 10, 5, 1);

    // --- FRONT WING ---
    g.fillStyle(0xaa0000);
    g.fillRect(1, 2, 30, 2);
    g.fillStyle(0xcc1111);
    g.fillRect(2, 3, 28, 1);
    // Front wing endplates
    g.fillStyle(0x888888);
    g.fillRect(0, 1, 2, 4);
    g.fillRect(30, 1, 2, 4);

    // --- NOSE CONE ---
    g.fillStyle(0xdd2222);
    g.fillRect(13, 0, 6, 3);
    g.fillStyle(0xee3333);
    g.fillRect(14, 0, 4, 2);
    // Nose tip
    g.fillStyle(0xff4444);
    g.fillRect(15, 0, 2, 1);

    g.generateTexture('car', S, S);
    g.destroy();
  }
}
