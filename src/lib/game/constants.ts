// GG's Heart — All GDD balance values. Single source of truth.
// Every value marked [PLACEHOLDER] in GDD lives here for easy tuning.

// Movement
export const MAX_RUN_SPEED = 300;
export const ACCELERATION = 1200;
export const DECELERATION = 1800;
export const AIR_CONTROL = 0.7;

// Jumping
export const JUMP_VELOCITY = -550;
export const GRAVITY = 1400;
export const FALL_MULTIPLIER = 1.8;
export const SHORT_HOP_MULTIPLIER = 3.0;
export const COYOTE_TIME = 80;
export const JUMP_BUFFER = 100;
export const MAX_FALL_SPEED = 600;

// Attack (Ghost Pulse)
export const ATTACK_RANGE = 48;
export const ATTACK_DURATION = 150;
export const ATTACK_COOLDOWN = 300;
export const ATTACK_DAMAGE = 1;
export const ATTACK_KNOCKBACK = 200;

// Health
export const MAX_HP = 5;
export const INVINCIBILITY_DURATION = 1500;

// Level
export const TILE_SIZE = 32;
export const INTERNAL_WIDTH = 480;
export const INTERNAL_HEIGHT = 270;

// Cart Runner (for later phases)
export const CART_BASE_SPEED = 400;
export const CART_MAX_SPEED = 700;
export const CART_MIN_SPEED = 250;
export const CART_JUMP_MULTIPLIER = 0.8;
export const CART_HITS_BEFORE_CRASH = 3;
