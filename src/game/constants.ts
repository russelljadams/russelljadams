export const TILE_SIZE = 32;
export const MAP_WIDTH_TILES = 60;
export const MAP_HEIGHT_TILES = 50;
export const MAP_WIDTH = MAP_WIDTH_TILES * TILE_SIZE;
export const MAP_HEIGHT = MAP_HEIGHT_TILES * TILE_SIZE;

export type VehicleType = 'car' | 'van';

export const CAR_STATS = {
  MAX_SPEED: 250,
  ACCELERATION: 180,
  BRAKE_FORCE: 350,
  DRAG: 100,
  TURN_RATE: 180,
  MIN_TURN_SPEED: 10,
  LATERAL_DAMPING: 0.92,
  SPRITE_SIZE: 32,
} as const;

export const VAN_STATS = {
  MAX_SPEED: 180,
  ACCELERATION: 140,
  BRAKE_FORCE: 300,
  DRAG: 120,
  TURN_RATE: 150,
  MIN_TURN_SPEED: 8,
  LATERAL_DAMPING: 0.96,
  SPRITE_SIZE: 32,
} as const;

/** @deprecated Use CAR_STATS instead */
export const CAR = CAR_STATS;

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
  NAV_OVERLAY: 'NavOverlayScene',
  GARAGE: 'GarageScene',
  OFFICE: 'OfficeScene',
  MAILROOM: 'MailroomScene',
  ARCADE: 'ArcadeScene',
  DEPOT: 'DepotScene',
  RACETRACK: 'RacetrackScene',
  DELIVERY: 'DeliveryScene',
} as const;

export const EXPERIMENT_URL = 'https://experiment.russelljadams.com';

export interface NavTarget {
  label: string;
  scene?: string;
  url?: string;
  highlight?: boolean;
}

export const NAV_TARGETS: NavTarget[] = [
  { label: 'The Experiment', url: EXPERIMENT_URL, highlight: true },
  { label: 'About Me', scene: SCENES.GARAGE },
  { label: 'Experience', scene: SCENES.OFFICE },
  { label: 'Projects', scene: SCENES.ARCADE },
  { label: 'Contact', scene: SCENES.MAILROOM },
];

export const TILES = {
  GRASS: 0,
  ROAD: 1,
  WALL: 2,
  BUILDING_WALL: 3,
  BUILDING_ROOF: 4,
  DOOR: 5,
  SIDEWALK: 6,
  FLOOR: 7,
  // Red building style
  RED_WALL: 8,
  RED_ROOF: 9,
  // Green building style
  GREEN_WALL: 10,
  GREEN_ROOF: 11,
  // Tan building style
  TAN_WALL: 12,
  TAN_ROOF: 13,
  // Dark building style
  DARK_WALL: 14,
  DARK_ROOF: 15,
  // Depot (Amazon orange)
  DEPOT_WALL: 16,
  DEPOT_ROOF: 17,
  // Locked door
  LOCKED_DOOR: 18,
  // Racetrack tiles
  TRACK_ASPHALT: 19,
  TRACK_RUMBLE: 20,
  TRACK_FENCE: 21,
} as const;

export const BUILDING_STYLES = {
  standard: { wall: TILES.BUILDING_WALL, roof: TILES.BUILDING_ROOF },
  red: { wall: TILES.RED_WALL, roof: TILES.RED_ROOF },
  green: { wall: TILES.GREEN_WALL, roof: TILES.GREEN_ROOF },
  tan: { wall: TILES.TAN_WALL, roof: TILES.TAN_ROOF },
  dark: { wall: TILES.DARK_WALL, roof: TILES.DARK_ROOF },
  depot: { wall: TILES.DEPOT_WALL, roof: TILES.DEPOT_ROOF },
} as const;

export type BuildingStyle = keyof typeof BUILDING_STYLES;
