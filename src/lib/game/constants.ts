// GG's Heart — All GDD balance values. Single source of truth.

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

// Screen shake
export const SHAKE_ENEMY_KILL_DURATION = 80;
export const SHAKE_ENEMY_KILL_INTENSITY = 0.006;
export const SHAKE_PLAYER_DAMAGE_DURATION = 150;
export const SHAKE_PLAYER_DAMAGE_INTENSITY = 0.012;
export const SHAKE_LANDING_DURATION = 50;
export const SHAKE_LANDING_INTENSITY = 0.003;

// Ghost trail
export const GHOST_TRAIL_INTERVAL = 60;
export const GHOST_TRAIL_FADE = 300;

// Squash/stretch
export const SQUASH_SCALE_X = 1.3;
export const SQUASH_SCALE_Y = 0.7;
export const STRETCH_SCALE_X = 0.8;
export const STRETCH_SCALE_Y = 1.2;
export const SQUASH_DURATION = 120;

// Camera
export const CAMERA_LOOKAHEAD = 40;

// Cart Runner (future)
export const CART_BASE_SPEED = 400;
export const CART_MAX_SPEED = 700;
export const CART_MIN_SPEED = 250;
export const CART_JUMP_MULTIPLIER = 0.8;
export const CART_HITS_BEFORE_CRASH = 3;
