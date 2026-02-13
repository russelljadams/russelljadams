import Phaser from 'phaser';
import { SCENES, TILE_SIZE, CAR_STATS } from '../constants';

export class BootScene extends Phaser.Scene {
  constructor() {
    super(SCENES.BOOT);
  }

  create() {
    this.generateTileset();
    this.generateCarSprite();
    this.generateVanSprite();
    this.generatePackageSprite();
    this.scene.start(SCENES.TITLE);
  }

  private generateTileset() {
    const T = TILE_SIZE;
    const TILE_COUNT = 22;
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

    // 3: BUILDING_WALL (standard blue-gray)
    this.drawBuildingWall(g, 3, 0x667788, 0x5a6b7c, 0x556677, 0x8899aa, 0x99bbdd);

    // 4: BUILDING_ROOF (standard)
    this.drawBuildingRoof(g, 4, 0x445566, 0x3a4a5a, 0x4d5d6d);

    // 5: DOOR
    g.fillStyle(0xddaa33);
    g.fillRect(5 * T, 0, T, T);
    g.fillStyle(0xcc9922);
    g.fillRect(5 * T + 3, 2, T - 6, T - 2);
    g.fillStyle(0xbb8811);
    g.fillRect(5 * T + 5, 4, T / 2 - 5, T / 2 - 4);
    g.fillRect(5 * T + 5, T / 2 + 2, T / 2 - 5, T / 2 - 4);
    g.fillRect(5 * T + T / 2 + 2, 4, T / 2 - 5, T / 2 - 4);
    g.fillRect(5 * T + T / 2 + 2, T / 2 + 2, T / 2 - 5, T / 2 - 4);
    g.fillStyle(0xeedd66);
    g.fillRect(5 * T + T - 8, T / 2 - 2, 3, 4);

    // 6: SIDEWALK
    g.fillStyle(0x999999);
    g.fillRect(6 * T, 0, T, T);
    g.fillStyle(0x888888);
    g.fillRect(6 * T, 0, T, 1);
    g.fillRect(6 * T, T - 1, T, 1);
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

    // 8: RED_WALL (warm brick)
    this.drawBuildingWall(g, 8, 0x884444, 0x773838, 0x663030, 0xaa6666, 0xcc8888);

    // 9: RED_ROOF
    this.drawBuildingRoof(g, 9, 0x553333, 0x4a2a2a, 0x664040);

    // 10: GREEN_WALL (teal office)
    this.drawBuildingWall(g, 10, 0x448877, 0x3a7a6a, 0x306b5c, 0x66aa99, 0x88ccbb);

    // 11: GREEN_ROOF
    this.drawBuildingRoof(g, 11, 0x335544, 0x2a4a3a, 0x446655);

    // 12: TAN_WALL (sandstone)
    this.drawBuildingWall(g, 12, 0x998866, 0x8a7a5a, 0x7a6c4e, 0xbbaa88, 0xddccaa);

    // 13: TAN_ROOF
    this.drawBuildingRoof(g, 13, 0x665544, 0x5a4a3a, 0x776655);

    // 14: DARK_WALL (industrial charcoal)
    this.drawBuildingWall(g, 14, 0x555566, 0x4a4a5a, 0x404050, 0x777788, 0x9999aa);

    // 15: DARK_ROOF
    this.drawBuildingRoof(g, 15, 0x333344, 0x2a2a3a, 0x444455);

    // 16: DEPOT_WALL (Amazon orange)
    this.drawBuildingWall(g, 16, 0xcc7722, 0xbb6618, 0xaa5510, 0xee9944, 0xffbb66);

    // 17: DEPOT_ROOF
    this.drawBuildingRoof(g, 17, 0x884400, 0x773a00, 0x995500);

    // 18: LOCKED_DOOR (red with padlock)
    const ld = 18 * T;
    g.fillStyle(0x992222);
    g.fillRect(ld, 0, T, T);
    g.fillStyle(0x881818);
    g.fillRect(ld + 3, 2, T - 6, T - 2);
    g.fillStyle(0x771010);
    g.fillRect(ld + 5, 4, T / 2 - 5, T / 2 - 4);
    g.fillRect(ld + 5, T / 2 + 2, T / 2 - 5, T / 2 - 4);
    g.fillRect(ld + T / 2 + 2, 4, T / 2 - 5, T / 2 - 4);
    g.fillRect(ld + T / 2 + 2, T / 2 + 2, T / 2 - 5, T / 2 - 4);
    // Padlock body
    g.fillStyle(0xdddd44);
    g.fillRect(ld + 11, 16, 10, 10);
    // Padlock shackle
    g.fillStyle(0xcccc33);
    g.fillRect(ld + 13, 12, 6, 5);
    g.fillStyle(0x881818);
    g.fillRect(ld + 15, 12, 2, 3);
    // Keyhole
    g.fillStyle(0x664400);
    g.fillRect(ld + 15, 20, 2, 4);

    // 19: TRACK_ASPHALT
    const ta = 19 * T;
    g.fillStyle(0x444444);
    g.fillRect(ta, 0, T, T);
    g.fillStyle(0x3e3e3e);
    g.fillRect(ta + 6, 6, 2, 2);
    g.fillRect(ta + 20, 14, 2, 2);
    g.fillRect(ta + 12, 24, 2, 2);

    // 20: TRACK_RUMBLE (red/white curb)
    const tr = 20 * T;
    g.fillStyle(0xdd2222);
    g.fillRect(tr, 0, T, T);
    g.fillStyle(0xffffff);
    g.fillRect(tr, 0, T / 2, T / 2);
    g.fillRect(tr + T / 2, T / 2, T / 2, T / 2);

    // 21: TRACK_FENCE
    const tf = 21 * T;
    g.fillStyle(0x666666);
    g.fillRect(tf, 0, T, T);
    // Fence posts
    g.fillStyle(0x888888);
    g.fillRect(tf + 2, 0, 3, T);
    g.fillRect(tf + 14, 0, 3, T);
    g.fillRect(tf + 26, 0, 3, T);
    // Horizontal rails
    g.fillStyle(0xaaaaaa);
    g.fillRect(tf, 6, T, 2);
    g.fillRect(tf, 18, T, 2);

    g.generateTexture('placeholder-tileset', TILE_COUNT * T, T);
    g.destroy();
  }

  private drawBuildingWall(
    g: Phaser.GameObjects.Graphics,
    tileIndex: number,
    baseColor: number,
    brickColor: number,
    mortarColor: number,
    windowFrameColor: number,
    windowGlassColor: number,
  ) {
    const T = TILE_SIZE;
    const x0 = tileIndex * T;

    g.fillStyle(baseColor);
    g.fillRect(x0, 0, T, T);
    // Brick pattern
    g.fillStyle(brickColor);
    for (let row = 0; row < T; row += 8) {
      const offset = (row % 16 === 0) ? 0 : 8;
      for (let col = offset; col < T; col += 16) {
        g.fillRect(x0 + col, row, 15, 7);
        g.fillStyle(mortarColor);
        g.fillRect(x0 + col, row + 7, 15, 1);
        g.fillRect(x0 + col + 15, row, 1, 8);
        g.fillStyle(brickColor);
      }
    }
    // Window
    g.fillStyle(windowFrameColor);
    g.fillRect(x0 + 8, 8, 16, 16);
    g.fillStyle(windowGlassColor);
    g.fillRect(x0 + 10, 10, 12, 12);
    g.fillStyle(baseColor);
    g.fillRect(x0 + 15, 10, 2, 12);
    g.fillRect(x0 + 10, 15, 12, 2);
  }

  private drawBuildingRoof(
    g: Phaser.GameObjects.Graphics,
    tileIndex: number,
    baseColor: number,
    innerColor: number,
    detailColor: number,
  ) {
    const T = TILE_SIZE;
    const x0 = tileIndex * T;

    g.fillStyle(baseColor);
    g.fillRect(x0, 0, T, T);
    g.fillStyle(innerColor);
    g.fillRect(x0 + 2, 2, T - 4, T - 4);
    g.fillStyle(detailColor);
    g.fillRect(x0 + 6, 6, T - 12, 2);
    g.fillRect(x0 + 6, T - 8, T - 12, 2);
    g.fillRect(x0 + 6, 6, 2, T - 12);
    g.fillRect(x0 + T - 8, 6, 2, T - 12);
  }

  private generateCarSprite() {
    const S = CAR_STATS.SPRITE_SIZE;
    const g = this.add.graphics();

    // --- REAR WING ---
    g.fillStyle(0xaa0000);
    g.fillRect(2, 27, 28, 3);
    g.fillStyle(0xcc1111);
    g.fillRect(3, 28, 26, 1);
    g.fillStyle(0x888888);
    g.fillRect(1, 26, 2, 5);
    g.fillRect(29, 26, 2, 5);

    // --- REAR WHEELS ---
    g.fillStyle(0x1a1a1a);
    g.fillRect(1, 20, 5, 7);
    g.fillRect(26, 20, 5, 7);
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
    g.fillStyle(0x444444);
    g.fillRect(14, 27, 4, 1);
    g.fillStyle(0x222222);
    g.fillRect(13, 20, 6, 2);

    // --- SIDEPODS ---
    g.fillStyle(0xdd2222);
    g.fillRect(7, 12, 18, 10);
    g.fillStyle(0x222222);
    g.fillRect(7, 12, 3, 3);
    g.fillRect(22, 12, 3, 3);
    g.fillStyle(0xeeeeee);
    g.fillRect(7, 16, 2, 5);
    g.fillRect(23, 16, 2, 5);
    g.fillStyle(0xffffff);
    g.fillRect(13, 16, 6, 4);
    g.fillStyle(0xdd2222);
    g.fillRect(14, 17, 4, 2);

    // --- COCKPIT ---
    g.fillStyle(0x333333);
    g.fillRect(11, 10, 10, 6);
    g.fillStyle(0x1a1a1a);
    g.fillRect(12, 11, 8, 4);
    g.fillStyle(0xdddddd);
    g.fillRect(14, 12, 4, 2);
    g.fillStyle(0x555555);
    g.fillRect(11, 10, 10, 1);
    g.fillRect(11, 10, 1, 6);
    g.fillRect(20, 10, 1, 6);
    g.fillRect(14, 15, 4, 1);

    // --- FRONT BODY / MONOCOQUE ---
    g.fillStyle(0xdd2222);
    g.fillRect(11, 4, 10, 8);
    g.fillStyle(0xee3333);
    g.fillRect(12, 5, 8, 4);

    // --- FRONT WHEELS ---
    g.fillStyle(0x1a1a1a);
    g.fillRect(1, 5, 5, 7);
    g.fillRect(26, 5, 5, 7);
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
    g.fillStyle(0x888888);
    g.fillRect(0, 1, 2, 4);
    g.fillRect(30, 1, 2, 4);

    // --- NOSE CONE ---
    g.fillStyle(0xdd2222);
    g.fillRect(13, 0, 6, 3);
    g.fillStyle(0xee3333);
    g.fillRect(14, 0, 4, 2);
    g.fillStyle(0xff4444);
    g.fillRect(15, 0, 2, 1);

    g.generateTexture('car', S, S);
    g.destroy();
  }

  private generateVanSprite() {
    const S = CAR_STATS.SPRITE_SIZE;
    const g = this.add.graphics();

    // --- CARGO BODY (main boxy shape) ---
    // Shadow/undercarriage
    g.fillStyle(0x1a2a4a);
    g.fillRect(6, 9, 20, 22);

    // Body panels - dark blue (Amazon DSP blue)
    g.fillStyle(0x232f3e);
    g.fillRect(6, 8, 20, 22);

    // Body highlight (left panel)
    g.fillStyle(0x2a3a50);
    g.fillRect(7, 9, 3, 19);
    // Body highlight (right panel)
    g.fillRect(22, 9, 3, 19);

    // Cargo door lines (rear - bottom of sprite)
    g.fillStyle(0x1a2530);
    g.fillRect(10, 27, 1, 3);
    g.fillRect(16, 27, 1, 3);
    g.fillRect(21, 27, 1, 3);

    // --- CAB (front of van - top of sprite) ---
    g.fillStyle(0x232f3e);
    g.fillRect(7, 2, 18, 8);

    // Windshield
    g.fillStyle(0x88bbee);
    g.fillRect(9, 3, 14, 5);
    // Windshield divider
    g.fillStyle(0x232f3e);
    g.fillRect(15, 3, 2, 5);
    // Windshield glare
    g.fillStyle(0xaaddff);
    g.fillRect(10, 3, 4, 2);

    // Hood
    g.fillStyle(0x2a3a50);
    g.fillRect(9, 1, 14, 2);

    // Headlights
    g.fillStyle(0xffffcc);
    g.fillRect(8, 1, 2, 2);
    g.fillRect(22, 1, 2, 2);

    // --- SIDE MIRRORS ---
    g.fillStyle(0x232f3e);
    g.fillRect(3, 4, 3, 3);
    g.fillRect(26, 4, 3, 3);
    // Mirror glass
    g.fillStyle(0x6688aa);
    g.fillRect(3, 5, 2, 1);
    g.fillRect(27, 5, 2, 1);

    // --- WHEELS ---
    // Front wheels
    g.fillStyle(0x111111);
    g.fillRect(4, 7, 3, 6);
    g.fillRect(25, 7, 3, 6);
    // Rear wheels
    g.fillRect(4, 22, 3, 6);
    g.fillRect(25, 22, 3, 6);
    // Wheel highlights
    g.fillStyle(0x222222);
    g.fillRect(5, 8, 1, 1);
    g.fillRect(5, 10, 1, 1);
    g.fillRect(5, 12, 1, 1);
    g.fillRect(26, 8, 1, 1);
    g.fillRect(26, 10, 1, 1);
    g.fillRect(26, 12, 1, 1);
    g.fillRect(5, 23, 1, 1);
    g.fillRect(5, 25, 1, 1);
    g.fillRect(5, 27, 1, 1);
    g.fillRect(26, 23, 1, 1);
    g.fillRect(26, 25, 1, 1);
    g.fillRect(26, 27, 1, 1);

    // --- AMAZON ARROW LOGO (orange smile + arrow) ---
    g.fillStyle(0xff9900);
    // Smile curve across the cargo area
    g.fillRect(9, 18, 2, 1);
    g.fillRect(10, 19, 2, 1);
    g.fillRect(12, 20, 4, 1);
    g.fillRect(16, 19, 2, 1);
    g.fillRect(18, 18, 2, 1);
    // Arrowhead pointing right
    g.fillRect(19, 17, 2, 1);
    g.fillRect(20, 18, 2, 1);
    g.fillRect(19, 19, 2, 1);

    // --- REAR DETAILS ---
    // Tail lights
    g.fillStyle(0xff2222);
    g.fillRect(7, 29, 3, 2);
    g.fillRect(22, 29, 3, 2);
    // Bumper
    g.fillStyle(0x333333);
    g.fillRect(8, 31, 16, 1);

    // --- ROOF RACK / TOP EDGE ---
    g.fillStyle(0x1a2530);
    g.fillRect(7, 8, 18, 1);

    g.generateTexture('van', S, S);
    g.destroy();
  }

  private generatePackageSprite() {
    const g = this.add.graphics();

    // Brown cardboard box (12x12)
    g.fillStyle(0xaa7744);
    g.fillRect(0, 0, 12, 12);
    // Box shading
    g.fillStyle(0x996633);
    g.fillRect(0, 0, 12, 2);
    g.fillRect(0, 10, 12, 2);
    g.fillRect(0, 0, 2, 12);
    g.fillRect(10, 0, 2, 12);
    // Tape cross
    g.fillStyle(0xccaa66);
    g.fillRect(5, 1, 2, 10);
    g.fillRect(1, 5, 10, 2);
    // Center tape overlap
    g.fillStyle(0xddbb77);
    g.fillRect(5, 5, 2, 2);

    g.generateTexture('package', 12, 12);
    g.destroy();
  }
}
