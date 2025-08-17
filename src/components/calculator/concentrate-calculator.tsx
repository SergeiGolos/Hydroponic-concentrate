import { component$, useSignal, $, useTask$ } from "@builder.io/qwik";
import type {
  CalculationResult,
  MeasurementSystem,
  VolumeUnit,
} from "../../types/calculator";
import {
  calculateMixture,
  validateInput,
  formatWeight,
  formatVolume,
  getDynamicUnitAndValue,
  getDynamicRange,
  getUnitDisplayName,
  convertToMilliliters,
} from "../../utils/calculator";

export const ConcentrateCalculator = component$(() => {
  const containerSize = useSignal(500); // This is now the raw slider value
  const measurementSystem = useSignal<MeasurementSystem>("metric");
  const selectedUnit = useSignal<VolumeUnit>("ml"); // New signal for selected unit
  const showPreciseInput = useSignal(false); // New signal for checkbox state
  const results = useSignal<CalculationResult | null>(null);
  const error = useSignal("");
  const showResults = useSignal(false);
  const sliderRef = useSignal<HTMLInputElement>();

  const performCalculation = $(() => {
    try {
      // Use the selected unit and container size for calculation
      const input = {
        containerSize: containerSize.value,
        unit: selectedUnit.value,
        measurementSystem: measurementSystem.value,
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
      const range = getDynamicRange(measurementSystem.value);
      const progress =
        ((containerSize.value - range.min) / (range.max - range.min)) * 100;
      sliderRef.value.style.setProperty("--range-progress", `${progress}%`);
    }
  });

  // Update container size and maintain within bounds
  const updateContainerSize = $((newSize: number) => {
    const range = getDynamicRange(measurementSystem.value);
    containerSize.value = Math.max(range.min, Math.min(range.max, newSize));
    updateSliderProgress();
    performCalculation();
  });

  const handleUnitChange = $((newUnit: VolumeUnit) => {
    selectedUnit.value = newUnit;
    // Update measurement system based on selected unit
    if (newUnit === "ml" || newUnit === "liter") {
      measurementSystem.value = "metric";
    } else {
      measurementSystem.value = "imperial";
    }
    performCalculation();
  });

  const handleMeasurementSystemChange = $((newSystem: MeasurementSystem) => {
    const oldSystem = measurementSystem.value;
    measurementSystem.value = newSystem;

    // Convert the current container size to maintain approximately the same volume
    if (oldSystem !== newSystem) {
      const currentVolumeML = convertToMilliliters(
        containerSize.value,
        selectedUnit.value,
      );

      // Set the appropriate default unit for the new system
      if (newSystem === "metric") {
        selectedUnit.value = "ml";
        containerSize.value = Math.round(currentVolumeML);
      } else {
        selectedUnit.value = "floz";
        // Convert ML to fl oz and round to nearest integer
        containerSize.value = Math.round(currentVolumeML / 29.5735);
      }

      // Update slider range for the new system and recalculate
      updateSliderProgress();
      performCalculation();
    }
  });

  // Get container icon based on volume
  const getContainerIcon = (totalML: number) => {
    if (totalML <= 500) return "🥛";
    if (totalML <= 1500) return "🫙";
    if (totalML <= 5000) return "🪣";
    return "🛢️";
  };

  // Get current range for the selected measurement system (used for slider)
  const range = getDynamicRange(measurementSystem.value);

  // Get display value based on whether we're using precise input or slider
  const getDisplayValue = () => {
    if (showPreciseInput.value) {
      return `${containerSize.value} ${getUnitDisplayName(selectedUnit.value)}`;
    } else {
      const dynamicUnit = getDynamicUnitAndValue(
        containerSize.value,
        measurementSystem.value,
      );
      return dynamicUnit.displayText;
    }
  };

  // Initial calculation and setup using useTask$
  useTask$(() => {
    // Set initial unit based on measurement system
    if (measurementSystem.value === "metric") {
      selectedUnit.value = "ml";
    } else {
      selectedUnit.value = "floz";
    }
    performCalculation();
  });

  return (
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 lg:p-6 xl:p-8">
      <div class="mx-auto w-full max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        {/* Header */}
        <div class="mb-8 text-center lg:mb-12">
          <h1 class="gradient-text mb-3 text-4xl font-bold md:text-5xl lg:text-6xl xl:text-7xl">
            Hydroponic Calculator
          </h1>
          <p class="text-lg font-medium text-slate-600 lg:text-xl xl:text-2xl">
            Precision nutrient mixing made simple
          </p>
        </div>

        {/* Main Calculator Card */}
        <div class="rounded-2xl border border-white/20 bg-white/80 p-6 shadow-xl backdrop-blur-sm md:p-8 lg:p-12 xl:p-16">
          <div class="mb-6">
            <p class="mb-6 text-center leading-relaxed text-slate-700 lg:text-lg xl:text-xl">
              Calculate precise ratios for your hydroponic solution. Based on
              the proven
              <strong class="text-emerald-600"> Master Blend formula</strong>:
              120g Master Blend + 60g Epsom Salt + 120g Calcium Nitrate per
              500ml.
            </p>
          </div>

          {/* Volume Control Section */}
          <div class="mb-8 space-y-6">
            <div class="flex items-center justify-between">
              <label class="text-lg font-semibold text-slate-800 lg:text-xl xl:text-2xl">
                Container Volume
              </label>
              <div class="flex items-center space-x-2">
                <span class="text-2xl lg:text-3xl xl:text-4xl">
                  {getContainerIcon(
                    results.value?.totalVolumeML || containerSize.value,
                  )}
                </span>
                <span class="text-sm font-medium text-slate-600 lg:text-base xl:text-lg">
                  {results.value
                    ? formatVolume(
                        results.value.totalVolumeML,
                        measurementSystem.value,
                      )
                    : getDisplayValue()}
                </span>
              </div>
            </div>

            {/* Measurement System Toggle */}
            <div class="flex items-center justify-center">
              <div class="inline-flex rounded-lg border border-slate-300 bg-white p-1">
                <button
                  onClick$={() => handleMeasurementSystemChange("metric")}
                  class={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    measurementSystem.value === "metric"
                      ? "bg-emerald-500 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  Metric
                </button>
                <button
                  onClick$={() => handleMeasurementSystemChange("imperial")}
                  class={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    measurementSystem.value === "imperial"
                      ? "bg-emerald-500 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  Imperial
                </button>
              </div>
            </div>

            {/* Precise Input Checkbox */}
            <div class="mb-4">
              <label class="flex cursor-pointer items-center space-x-3">
                <input
                  type="checkbox"
                  checked={showPreciseInput.value}
                  onChange$={(e) => {
                    const target = e.target as HTMLInputElement;
                    showPreciseInput.value = target.checked;
                  }}
                  class="h-4 w-4 rounded border-slate-300 bg-white text-emerald-600 focus:ring-2 focus:ring-emerald-500"
                />
                <span class="text-sm font-medium text-slate-700 lg:text-base xl:text-lg">
                  Use precise value input
                </span>
              </label>
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
                  <span>
                    {
                      getDynamicUnitAndValue(range.min, measurementSystem.value)
                        .displayText
                    }
                  </span>
                  <span>
                    {
                      getDynamicUnitAndValue(range.max, measurementSystem.value)
                        .displayText
                    }
                  </span>
                </div>
              </div>

              {/* Precise Input - only shown when checkbox is checked */}
              {showPreciseInput.value && (
                <div class="space-y-3">
                  <label class="text-sm font-medium text-slate-700">
                    Precise value:
                  </label>
                  <div class="flex items-center space-x-3">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={containerSize.value}
                      class="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 focus:outline-none"
                      onInput$={(e) => {
                        const target = e.target as HTMLInputElement;
                        containerSize.value = parseFloat(target.value) || 0;
                        performCalculation();
                      }}
                    />
                    <select
                      value={selectedUnit.value}
                      onChange$={(e) => {
                        const target = e.target as HTMLSelectElement;
                        handleUnitChange(target.value as VolumeUnit);
                      }}
                      class="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 focus:outline-none"
                    >
                      <optgroup label="Metric">
                        <option value="ml">ml</option>
                        <option value="liter">L</option>
                      </optgroup>
                      <optgroup label="Imperial">
                        <option value="floz">fl oz</option>
                        <option value="gallon">gal</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          {showResults.value && results.value && (
            <div class="fade-in-up space-y-6 rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-bold text-emerald-800 lg:text-2xl xl:text-3xl">
                  Required Ingredients
                </h2>
                <div class="text-sm font-medium text-emerald-700 lg:text-base xl:text-lg">
                  Scale: {results.value.scalingFactor.toFixed(2)}×
                </div>
              </div>

              <div class="space-y-6">
                {/* Part A - Nitrogen Source */}
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <h3 class="text-lg font-semibold text-emerald-800">
                      Part A - Nitrogen Solution
                    </h3>
                    <div class="text-sm font-medium text-emerald-700">
                      {formatWeight(results.value.calciumNitrate)}g total
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

                {/* Part B - Master Blend & Epsom Salt */}
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <h3 class="text-lg font-semibold text-emerald-800">
                      Part B - Master Blend Solution
                    </h3>
                    <div class="text-sm font-medium text-emerald-700">
                      {formatWeight(
                        results.value.masterBlend + results.value.epsomSalt,
                      )}
                      g total
                    </div>
                  </div>
                  <div class="grid gap-3">
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
                  </div>
                </div>
              </div>

              <div class="border-t border-emerald-200 pt-4">
                <div class="flex items-center justify-between text-sm text-emerald-700">
                  <span>Total solution volume:</span>
                  <span class="font-semibold">
                    {formatVolume(
                      results.value.totalVolumeML,
                      measurementSystem.value,
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Supply Purchase Section */}
          {showResults.value && (
            <div class="fade-in-up mt-6 space-y-4 rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
              <div class="flex items-center space-x-2">
                <span class="text-2xl">🛒</span>
                <h2 class="text-lg font-bold text-blue-800">
                  Purchase Ingredients
                </h2>
              </div>

              <p class="text-sm leading-relaxed text-blue-700">
                Get all the ingredients you need for your hydroponic solution.
                This complete kit includes Master Blend, Epsom Salt, and Calcium
                Nitrate.
              </p>

              <div class="flex flex-col space-y-3">
                <a
                  href="https://a.co/d/dz8waSw"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group flex items-center justify-center space-x-3 rounded-lg border border-orange-400 bg-gradient-to-r from-orange-400 to-orange-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:from-orange-500 hover:to-orange-600 hover:shadow-xl focus:ring-4 focus:ring-orange-300 focus:outline-none"
                >
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.75 9.75h22.5A.75.75 0 0 1 24 10.5v9a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3v-9a.75.75 0 0 1 .75-.75zm21 1.5H2.25v7.5c0 .828.672 1.5 1.5 1.5h16.5c.828 0 1.5-.672 1.5-1.5v-7.5z" />
                    <path d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75zm2.25-3A.75.75 0 0 1 6 3h12a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75z" />
                  </svg>
                  <span>Buy on Amazon</span>
                  <svg
                    class="h-4 w-4 transition-transform group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </a>

                <div class="flex items-center justify-center text-xs text-blue-600">
                  <svg
                    class="mr-1 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15,3 21,3 21,9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  <span>Opens in new tab</span>
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
        <div class="mt-6 space-y-2 text-center">
          <p class="text-sm text-slate-500">
            Formula precision tested for optimal plant nutrition
          </p>
          <div class="flex items-center justify-center space-x-1">
            <span class="text-xs text-slate-400">Based on</span>
            <a
              href="https://www.youtube.com/watch?v=gsDTyNBfTtw"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center space-x-1 text-xs text-slate-500 transition-colors hover:text-red-600"
            >
              <svg class="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span>YouTube tutorial</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});
