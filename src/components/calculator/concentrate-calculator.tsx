import { component$, useSignal, $, useTask$ } from "@builder.io/qwik";
import type { VolumeUnit, CalculationResult } from "../../types/calculator";
import {
  calculateMixture,
  validateInput,
  formatWeight,
  formatVolume,
} from "../../utils/calculator";

export const ConcentrateCalculator = component$(() => {
  const containerSize = useSignal(500);
  const unit = useSignal<VolumeUnit>("ml");
  const results = useSignal<CalculationResult | null>(null);
  const error = useSignal("");
  const showResults = useSignal(false);
  const sliderRef = useSignal<HTMLInputElement>();

  const performCalculation = $(() => {
    try {
      const input = {
        containerSize: containerSize.value,
        unit: unit.value,
      };

      const validation = validateInput(input);
      if (!validation.isValid) {
        error.value = validation.errors[0];
        showResults.value = false;
        return;
      }

      const calculationResult = calculateMixture(input);
      results.value = calculationResult;
      error.value = "";
      showResults.value = true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Calculation failed";
      showResults.value = false;
    }
  });

  // Update slider progress indicator
  const updateSliderProgress = $(() => {
    if (sliderRef.value) {
      let range: { min: number; max: number; step: number };
      switch (unit.value) {
        case "ml":
          range = { min: 100, max: 2000, step: 50 };
          break;
        case "gallon":
          range = { min: 0.1, max: 2, step: 0.1 };
          break;
        case "5gallon":
          range = { min: 0.1, max: 2, step: 0.1 };
          break;
        default:
          range = { min: 100, max: 2000, step: 50 };
      }
      const progress = ((containerSize.value - range.min) / (range.max - range.min)) * 100;
      sliderRef.value.style.setProperty('--range-progress', `${progress}%`);
    }
  });

  // Update container size and maintain within bounds
  const updateContainerSize = $((newSize: number) => {
    let range: { min: number; max: number; step: number };
    switch (unit.value) {
      case "ml":
        range = { min: 100, max: 2000, step: 50 };
        break;
      case "gallon":
        range = { min: 0.1, max: 2, step: 0.1 };
        break;
      case "5gallon":
        range = { min: 0.1, max: 2, step: 0.1 };
        break;
      default:
        range = { min: 100, max: 2000, step: 50 };
    }
    containerSize.value = Math.max(range.min, Math.min(range.max, newSize));
    updateSliderProgress();
    performCalculation();
  });

  const handleUnitChange = $((newUnit: VolumeUnit) => {
    unit.value = newUnit;
    // Reset to a reasonable default for the new unit
    if (newUnit === "ml") {
      containerSize.value = 500;
    } else {
      containerSize.value = 1;
    }
    updateSliderProgress();
    performCalculation();
  });

  // Get container icon based on volume
  const getContainerIcon = (totalML: number) => {
    if (totalML <= 500) return "🥛";
    if (totalML <= 1500) return "🫙";
    if (totalML <= 5000) return "🪣";
    return "🛢️";
  };

  // Volume ranges for different units - computed inline to avoid serialization issues
  let range: { min: number; max: number; step: number };
  switch (unit.value) {
    case "ml":
      range = { min: 100, max: 2000, step: 50 };
      break;
    case "gallon":
      range = { min: 0.1, max: 2, step: 0.1 };
      break;
    case "5gallon":
      range = { min: 0.1, max: 2, step: 0.1 };
      break;
    default:
      range = { min: 100, max: 2000, step: 50 };
  }

  // Initial calculation using useTask$
  useTask$(() => {
    performCalculation();
  });

  return (
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div class="mx-auto max-w-lg">
        {/* Header */}
        <div class="mb-8 text-center">
          <h1 class="gradient-text mb-3 text-4xl font-bold md:text-5xl">
            Hydroponic Calculator
          </h1>
          <p class="text-slate-600 text-lg font-medium">
            Precision nutrient mixing made simple
          </p>
        </div>

        {/* Main Calculator Card */}
        <div class="backdrop-blur-sm rounded-2xl border border-white/20 bg-white/80 p-8 shadow-xl">
          <div class="mb-6">
            <p class="text-slate-700 mb-6 text-center leading-relaxed">
              Calculate precise ratios for your hydroponic solution. Based on the proven 
              <strong class="text-emerald-600"> Master Blend formula</strong>: 
              120g Master Blend + 60g Epsom Salt + 120g Calcium Nitrate per 500ml.
            </p>
          </div>

          {/* Volume Control Section */}
          <div class="mb-8 space-y-6">
            <div class="flex items-center justify-between">
              <label class="text-slate-800 text-lg font-semibold">
                Container Volume
              </label>
              <div class="flex items-center space-x-2">
                <span class="text-2xl">
                  {getContainerIcon(results.value?.totalVolumeML || containerSize.value)}
                </span>
                <span class="text-slate-600 text-sm font-medium">
                  {results.value ? formatVolume(results.value.totalVolumeML) : `${containerSize.value} ${unit.value}`}
                </span>
              </div>
            </div>

            {/* Unit Selection */}
            <div class="mb-4">
              <div class="grid grid-cols-3 rounded-xl border border-slate-200 bg-slate-50 p-1">
                <button
                  class={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    unit.value === "ml"
                      ? "bg-white text-emerald-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                  onClick$={() => handleUnitChange("ml")}
                >
                  ml
                </button>
                <button
                  class={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    unit.value === "gallon"
                      ? "bg-white text-emerald-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                  onClick$={() => handleUnitChange("gallon")}
                >
                  Gallon
                </button>
                <button
                  class={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    unit.value === "5gallon"
                      ? "bg-white text-emerald-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                  onClick$={() => handleUnitChange("5gallon")}
                >
                  5 Gallons
                </button>
              </div>
            </div>

            {/* Slider Control */}
            <div class="space-y-4">
              <div class="relative">
                <input
                  ref={sliderRef}
                  type="range"
                  min={range.min}
                  max={range.max}
                  step={range.step}
                  value={containerSize.value}
                  class="w-full"
                  onInput$={(e) => {
                    const target = e.target as HTMLInputElement;
                    updateContainerSize(parseFloat(target.value));
                  }}
                />
                <div class="mt-2 flex justify-between text-xs text-slate-500">
                  <span>{range.min} {unit.value}</span>
                  <span>{range.max} {unit.value}</span>
                </div>
              </div>

              {/* Manual Input */}
              <div class="flex items-center space-x-3">
                <label class="text-slate-700 text-sm font-medium whitespace-nowrap">
                  Precise value:
                </label>
                <input
                  type="number"
                  min={range.min}
                  max={range.max}
                  step={range.step}
                  value={containerSize.value}
                  class="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  onInput$={(e) => {
                    const target = e.target as HTMLInputElement;
                    updateContainerSize(parseFloat(target.value) || range.min);
                  }}
                />
                <span class="text-slate-600 text-sm">{unit.value}</span>
              </div>
            </div>
          </div>

          {/* Results Section */}
          {showResults.value && results.value && (
            <div class="fade-in-up space-y-6 rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
              <div class="flex items-center justify-between">
                <h2 class="text-emerald-800 text-xl font-bold">
                  Required Ingredients
                </h2>
                <div class="text-emerald-700 text-sm font-medium">
                  Scale: {results.value.scalingFactor.toFixed(2)}×
                </div>
              </div>
              
              <div class="grid gap-4">
                <div class="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-100 p-4 text-blue-800">
                  <div>
                    <div class="font-semibold">Master Blend</div>
                    <div class="text-sm opacity-75">Primary nutrients</div>
                  </div>
                  <div class="text-right">
                    <div class="text-xl font-bold">
                      {formatWeight(results.value.masterBlend)}
                    </div>
                    <div class="text-sm">grams</div>
                  </div>
                </div>
                
                <div class="flex items-center justify-between rounded-lg border border-purple-200 bg-purple-100 p-4 text-purple-800">
                  <div>
                    <div class="font-semibold">Epsom Salt</div>
                    <div class="text-sm opacity-75">Magnesium & sulfur</div>
                  </div>
                  <div class="text-right">
                    <div class="text-xl font-bold">
                      {formatWeight(results.value.epsomSalt)}
                    </div>
                    <div class="text-sm">grams</div>
                  </div>
                </div>
                
                <div class="flex items-center justify-between rounded-lg border border-orange-200 bg-orange-100 p-4 text-orange-800">
                  <div>
                    <div class="font-semibold">Calcium Nitrate</div>
                    <div class="text-sm opacity-75">Calcium & nitrogen</div>
                  </div>
                  <div class="text-right">
                    <div class="text-xl font-bold">
                      {formatWeight(results.value.calciumNitrate)}
                    </div>
                    <div class="text-sm">grams</div>
                  </div>
                </div>
              </div>

              <div class="border-t border-emerald-200 pt-4">
                <div class="text-emerald-700 flex items-center justify-between text-sm">
                  <span>Total solution volume:</span>
                  <span class="font-semibold">{formatVolume(results.value.totalVolumeML)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error.value && (
            <div class="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
              <div class="flex items-center space-x-2">
                <span>⚠️</span>
                <span>{error.value}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div class="mt-6 text-center">
          <p class="text-slate-500 text-sm">
            Formula precision tested for optimal plant nutrition
          </p>
        </div>
      </div>
    </div>
  );
});
