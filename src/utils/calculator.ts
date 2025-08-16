import type {
  VolumeUnit,
  ConcentrateFormula,
  CalculationInput,
  CalculationResult,
  ValidationResult,
} from '../types/calculator';

// Constants based on the original video's 500ml formula
export const DEFAULT_FORMULA: ConcentrateFormula = {
  originalVolumeML: 500,
  masterBlendPerOriginal: 120, // grams
  epsomSaltPerOriginal: 60,    // grams
  calciumNitratePerOriginal: 120, // grams
} as const;

// Conversion factors to milliliters
const GALLON_TO_ML = 3785.41; // 1 US liquid gallon = 3785.41 ml

/**
 * Convert input volume to milliliters based on the selected unit
 */
export function convertToMilliliters(containerSize: number, unit: VolumeUnit): number {
  switch (unit) {
    case 'ml':
      return containerSize;
    case 'gallon':
      return containerSize * GALLON_TO_ML;
    case '5gallon':
      return containerSize * (5 * GALLON_TO_ML);
    default:
      console.error('Unknown unit selected:', unit);
      return containerSize; // Default to ml if unit is unknown
  }
}

/**
 * Validate calculation input
 */
export function validateInput(input: CalculationInput): ValidationResult {
  const errors: string[] = [];

  if (isNaN(input.containerSize) || input.containerSize <= 0) {
    errors.push('Container size must be a positive number');
  }

  if (!['ml', 'gallon', '5gallon'].includes(input.unit)) {
    errors.push('Invalid unit selected');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Calculate the required grams of each component based on container size
 */
export function calculateMixture(
  input: CalculationInput,
  formula: ConcentrateFormula = DEFAULT_FORMULA
): CalculationResult {
  const validation = validateInput(input);
  if (!validation.isValid) {
    throw new Error(`Invalid input: ${validation.errors.join(', ')}`);
  }

  // Convert the input container size to milliliters
  const newVolumeML = convertToMilliliters(input.containerSize, input.unit);

  // Calculate the scaling factor relative to the original formula
  const scalingFactor = newVolumeML / formula.originalVolumeML;

  // Calculate the new amounts for each component
  const masterBlend = parseFloat((formula.masterBlendPerOriginal * scalingFactor).toFixed(2));
  const epsomSalt = parseFloat((formula.epsomSaltPerOriginal * scalingFactor).toFixed(2));
  const calciumNitrate = parseFloat((formula.calciumNitratePerOriginal * scalingFactor).toFixed(2));

  return {
    masterBlend,
    epsomSalt,
    calciumNitrate,
    totalVolumeML: newVolumeML,
    scalingFactor,
  };
}

/**
 * Format number to display with appropriate decimal places
 */
export function formatWeight(weight: number): string {
  return weight.toFixed(2);
}

/**
 * Format volume for display
 */
export function formatVolume(volumeML: number): string {
  if (volumeML >= 3785) {
    return `${(volumeML / GALLON_TO_ML).toFixed(2)} gallons`;
  }
  return `${volumeML.toFixed(0)} ml`;
}