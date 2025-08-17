import type {
  VolumeUnit,
  ConcentrateFormula,
  CalculationInput,
  CalculationResult,
  ValidationResult,
} from "../types/calculator";

// Constants based on the original video's 500ml formula
export const DEFAULT_FORMULA: ConcentrateFormula = {
  originalVolumeML: 500,
  masterBlendPerOriginal: 120, // grams
  epsomSaltPerOriginal: 60, // grams
  calciumNitratePerOriginal: 120, // grams
} as const;

// Conversion factors to milliliters
const GALLON_TO_ML = 3785.41; // 1 US liquid gallon = 3785.41 ml
const FLOZ_TO_ML = 29.5735; // 1 US fluid ounce = 29.5735 ml
const LITER_TO_ML = 1000; // 1 liter = 1000 ml

/**
 * Convert input volume to milliliters based on the selected unit
 */
export function convertToMilliliters(
  containerSize: number,
  unit: VolumeUnit,
): number {
  switch (unit) {
    case "ml":
      return containerSize;
    case "liter":
      return containerSize * LITER_TO_ML;
    case "floz":
      return containerSize * FLOZ_TO_ML;
    case "gallon":
      return containerSize * GALLON_TO_ML;
    case "5gallon":
      return containerSize * (5 * GALLON_TO_ML);
    default:
      console.error("Unknown unit selected:", unit);
      return containerSize; // Default to ml if unit is unknown
  }
}

/**
 * Validate calculation input
 */
export function validateInput(input: CalculationInput): ValidationResult {
  const errors: string[] = [];

  if (isNaN(input.containerSize) || input.containerSize <= 0) {
    errors.push("Container size must be a positive number");
  }

  if (!["ml", "liter", "floz", "gallon", "5gallon"].includes(input.unit)) {
    errors.push("Invalid unit selected");
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
  formula: ConcentrateFormula = DEFAULT_FORMULA,
): CalculationResult {
  const validation = validateInput(input);
  if (!validation.isValid) {
    throw new Error(`Invalid input: ${validation.errors.join(", ")}`);
  }

  // Convert the input container size to milliliters
  const newVolumeML = convertToMilliliters(input.containerSize, input.unit);

  // Calculate the scaling factor relative to the original formula
  const scalingFactor = newVolumeML / formula.originalVolumeML;

  // Calculate the new amounts for each component
  const masterBlend = parseFloat(
    (formula.masterBlendPerOriginal * scalingFactor).toFixed(2),
  );
  const epsomSalt = parseFloat(
    (formula.epsomSaltPerOriginal * scalingFactor).toFixed(2),
  );
  const calciumNitrate = parseFloat(
    (formula.calciumNitratePerOriginal * scalingFactor).toFixed(2),
  );

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
 * Format volume for display with appropriate units
 */
export function formatVolume(
  volumeML: number,
  preferredSystem?: "metric" | "imperial",
): string {
  if (preferredSystem === "imperial" || (!preferredSystem && volumeML >= 946)) {
    // Imperial system or large volumes
    if (volumeML >= 3785) {
      return `${(volumeML / GALLON_TO_ML).toFixed(2)} gallons`;
    } else {
      return `${(volumeML / FLOZ_TO_ML).toFixed(1)} fl oz`;
    }
  } else {
    // Metric system
    if (volumeML >= 1000) {
      return `${(volumeML / LITER_TO_ML).toFixed(2)} L`;
    } else {
      return `${volumeML.toFixed(0)} ml`;
    }
  }
}

/**
 * Get slider range configuration for a specific unit
 */
export function getUnitRange(unit: VolumeUnit): {
  min: number;
  max: number;
  step: number;
  defaultValue: number;
} {
  switch (unit) {
    case "ml":
      return { min: 50, max: 20000, step: 25, defaultValue: 500 };
    case "liter":
      return { min: 0.1, max: 50, step: 0.1, defaultValue: 0.5 };
    case "floz":
      return { min: 1, max: 640, step: 1, defaultValue: 17 }; // ~500ml
    case "gallon":
      return { min: 0.1, max: 15, step: 0.1, defaultValue: 0.13 }; // ~500ml
    case "5gallon":
      return { min: 0.1, max: 2, step: 0.1, defaultValue: 1 };
    default:
      return { min: 50, max: 20000, step: 25, defaultValue: 500 };
  }
}

/**
 * Get display name for unit
 */
export function getUnitDisplayName(unit: VolumeUnit): string {
  switch (unit) {
    case "ml":
      return "ml";
    case "liter":
      return "L";
    case "floz":
      return "fl oz";
    case "gallon":
      return "gal";
    case "5gallon":
      return "5-gal";
    default:
      return unit;
  }
}

/**
 * Get available units for a measurement system
 */
export function getSystemUnits(system: "metric" | "imperial"): VolumeUnit[] {
  if (system === "metric") {
    return ["ml", "liter"];
  } else {
    return ["floz", "gallon"];
  }
}

/**
 * Get the appropriate unit and display value based on the raw value and measurement system
 * For sliding scale behavior: ml->L at 1000ml, fl oz->gal at 128 fl oz
 */
export function getDynamicUnitAndValue(
  rawValue: number,
  system: "metric" | "imperial",
): { unit: VolumeUnit; displayValue: number; displayText: string } {
  if (system === "metric") {
    if (rawValue >= 1000) {
      // Switch to liters after 1000ml
      const displayValue = rawValue / 1000;
      return {
        unit: "liter",
        displayValue,
        displayText: `${displayValue.toFixed(1)} L`,
      };
    } else {
      // Stay in milliliters
      return {
        unit: "ml",
        displayValue: rawValue,
        displayText: `${Math.round(rawValue)} ml`,
      };
    }
  } else {
    // Imperial system
    if (rawValue >= 128) {
      // Switch to gallons after 128 fl oz (1 gallon)
      const displayValue = rawValue / 128;
      return {
        unit: "gallon",
        displayValue,
        displayText: `${displayValue.toFixed(1)} gal`,
      };
    } else {
      // Stay in fluid ounces
      return {
        unit: "floz",
        displayValue: rawValue,
        displayText: `${Math.round(rawValue)} fl oz`,
      };
    }
  }
}

/**
 * Get unified slider range for a measurement system that spans both units
 * Metric: 50ml to 20000ml (20L)
 * Imperial: 1 fl oz to 1280 fl oz (10 gallons)
 */
export function getDynamicRange(system: "metric" | "imperial"): {
  min: number;
  max: number;
  step: number;
  defaultValue: number;
} {
  if (system === "metric") {
    // Range from 50ml to 20,000ml (20L)
    // Step of 25ml when < 1000ml, then equivalent to 0.025L steps
    return { min: 50, max: 20000, step: 25, defaultValue: 500 };
  } else {
    // Range from 1 fl oz to 1280 fl oz (10 gallons)  
    // Step of 1 fl oz when < 128 fl oz, then equivalent to ~0.008 gallon steps
    return { min: 1, max: 1280, step: 1, defaultValue: 17 }; // ~500ml equivalent
  }
}

/**
 * Convert the raw slider value to the appropriate internal unit for calculations
 * This ensures calculations always work with the expected base units
 */
export function convertDynamicValueToUnit(
  rawValue: number,
  system: "metric" | "imperial",
): { value: number; unit: VolumeUnit } {
  const unitInfo = getDynamicUnitAndValue(rawValue, system);
  
  if (system === "metric") {
    if (rawValue >= 1000) {
      // Value is in liters for calculation
      return { value: unitInfo.displayValue, unit: "liter" };
    } else {
      // Value is in ml for calculation
      return { value: rawValue, unit: "ml" };
    }
  } else {
    if (rawValue >= 128) {
      // Value is in gallons for calculation  
      return { value: unitInfo.displayValue, unit: "gallon" };
    } else {
      // Value is in fl oz for calculation
      return { value: rawValue, unit: "floz" };
    }
  }
}
