export const TILE_SIZE = 32;
export const MAP_WIDTH_TILES = 30;
export const MAP_HEIGHT_TILES = 26;
export const MAP_WIDTH = MAP_WIDTH_TILES * TILE_SIZE;
export const MAP_HEIGHT = MAP_HEIGHT_TILES * TILE_SIZE;

export const CAR = {
  MAX_SPEED: 250,
  ACCELERATION: 180,
  BRAKE_FORCE: 350,
  DRAG: 100,
  TURN_RATE: 180,           // degrees per second at max speed
  MIN_TURN_SPEED: 10,       // minimum speed to allow turning
  LATERAL_DAMPING: 0.92,    // drift damping (1 = no drift, 0 = ice)
  SPRITE_SIZE: 32,
} as const;

export const CAMERA = {
  LERP: 0.1,
  DEADZONE_WIDTH: 60,
  DEADZONE_HEIGHT: 60,
} as const;

export const SCENES = {
  BOOT: 'BootScene',
  TITLE: 'TitleScene',
  OVERWORLD: 'OverworldScene',
  HUD: 'HUDScene',
  GARAGE: 'GarageScene',
  OFFICE: 'OfficeScene',
  MAILROOM: 'MailroomScene',
  ARCADE: 'ArcadeScene',
} as const;

export const TILES = {
  GRASS: 0,
  ROAD: 1,
  WALL: 2,
  BUILDING_WALL: 3,
  BUILDING_ROOF: 4,
  DOOR: 5,
  SIDEWALK: 6,
  FLOOR: 7,
} as const;
