
export type Tool = 'plant' | 'water' | 'fertilize' | 'harvest' | 'inspect' | 'expand';

export type Season = 'Spring' | 'Summer' | 'Fall' | 'Winter';

export type SoilType = 'loamy' | 'sandy' | 'clay';

export interface Crop {
  id: string;
  name: string;
  icon: string;
  optimalTemp: [number, number];
  waterNeeds: 'low' | 'medium' | 'high';
  scientificName: string;
  family: string;
  daysToMaturity: number;
  germinationTemp: [number, number];
  maxTemp: number;
  frostSensitive: boolean;
  dailyWaterNeeds: number; // mm/day
  droughtTolerance: 'low' | 'medium' | 'high';
  nutrientRatio: { N: number; P: number; K: number };
  phPreference: [number, number];
  ndviRanges: {
    germination: [number, number];
    vegetative: [number, number];
    reproductive: [number, number];
    maturity: [number, number];
  };
  commonChallenges: string[];
  plantingDepth: number; // cm
  spacing: number; // cm between plants
}

export interface TileState {
  planted: boolean;
  watered: boolean;
  fertilized: boolean;
  growth: number;
  crop: Crop | null;
  health: number;
  soilType: SoilType;
  locked: boolean;
}

export interface Achievement {
    id: string;
    name: string;
}

export interface Upgrade {
    id: string;
    name: string;
    description: string;
    cost: number;
    levelRequired: number;
    stat: string;
    modifier: number;
}

export interface GameState {
  money: number;
  xp: number;
  level: number;
  water: number;
  energy: number;
  day: number;
  season: Season;
  selectedTool: Tool | null;
  tiles: TileState[];
  achievements: Achievement[];
  availableCrops: Crop[];
  upgrades: { [stat: string]: number }; // Stores active stat modifiers
  purchasedUpgradeIds: string[]; // Tracks IDs of purchased upgrades
  maxWater: number;
  maxEnergy: number;
}

export interface NasaData {
  soilMoisture: number;
  temperature: number;
  precipitation: number;
  solarIrradiance: number; // Replaces UV Index, W/m^2
  windSpeed: number;
  ndvi: number;
  relativeHumidity: number; // As a percentage
}

export interface NotificationMessage {
    message: string;
    type: 'info' | 'success' | 'warning' | 'achievement' | 'levelup';
}

export interface FarmerState {
    position: { x: number; y: number };
    direction: 'down' | 'up' | 'left' | 'right';
    action: 'idle' | Tool;
}

export interface FarmAnalysis {
  summary: string;
  recommendations: string[];
}

export interface Location {
    id: string;
    name: string;
    description: string;
    baseNasaData: NasaData;
    seasonalModifiers: {
        [key in Season]: {
            temp: number;
            precipitation: number;
            solar: number;
            humidity: number;
        }
    };
    availableCrops: string[]; // Array of Crop IDs
    soilDistribution: { [key in SoilType]: number };
}
