export type VolumeUnit = "ml" | "gallon" | "5gallon" | "floz" | "liter";

export type MeasurementSystem = "metric" | "imperial";

export type CalculationMode = "by-container" | "by-ingredient";

export interface ConcentrateFormula {
  readonly originalVolumeML: number;
  readonly masterBlendPerOriginal: number;
  readonly epsomSaltPerOriginal: number;
  readonly calciumNitratePerOriginal: number;
}

export interface CalculationInput {
  containerSize: number;
  unit: VolumeUnit;
  measurementSystem?: MeasurementSystem;
  mode?: CalculationMode;
}

export interface CalculationResult {
  masterBlend: number;
  epsomSalt: number;
  calciumNitrate: number;
  totalVolumeML: number;
  scalingFactor: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
