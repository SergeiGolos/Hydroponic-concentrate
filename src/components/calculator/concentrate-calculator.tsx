import { component$, useSignal, $ } from "@builder.io/qwik";
import type { VolumeUnit, CalculationResult } from "../../types/calculator";
import {
  calculateMixture,
  validateInput,
  formatWeight,
} from "../../utils/calculator";

export const ConcentrateCalculator = component$(() => {
  const containerSize = useSignal(500);
  const unit = useSignal<VolumeUnit>("ml");
  const results = useSignal<CalculationResult | null>(null);
  const error = useSignal("");
  const showResults = useSignal(false);

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

  // Perform initial calculation
  performCalculation();

  return (
    <div class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <div class="mx-auto w-full max-w-md rounded-xl bg-white p-8 text-center shadow-xl md:p-10 lg:p-12">
        <h1 class="mb-6 text-3xl font-extrabold text-gray-800 md:text-4xl">
          Mixture Calculator
        </h1>

        <p class="mb-8 text-sm text-gray-600 md:text-base">
          Enter your desired container size to calculate the required grams for
          each concentrate. The original formula is based on 120g Master Blend,
          60g Epsom Salt, and 120g Calcium Nitrate per 500ml of water.
        </p>

        <div class="mb-6">
          <label
            for="containerSize"
            class="mb-2 block text-left text-lg font-semibold text-gray-700"
          >
            Container Size:
          </label>
          <div class="flex items-center space-x-3">
            <input
              type="number"
              id="containerSize"
              min="0.1"
              step="0.1"
              bind:value={containerSize}
              onInput$={performCalculation}
              class="flex-grow rounded-md border border-gray-300 p-3 text-lg text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="e.g., 500"
            />
            <select
              id="unit"
              bind:value={unit}
              onChange$={performCalculation}
              class="rounded-md border border-gray-300 bg-white p-3 text-lg text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="ml">ml</option>
              <option value="gallon">Gallon</option>
              <option value="5gallon">5 Gallons</option>
            </select>
          </div>
        </div>

        <button
          onClick$={performCalculation}
          class="focus:ring-opacity-75 w-full transform rounded-md bg-blue-600 px-6 py-3 font-bold text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          Calculate
        </button>

        {showResults.value && results.value && (
          <div class="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-6 text-left">
            <h2 class="mb-4 text-2xl font-bold text-blue-800">
              Required Amounts:
            </h2>
            <p class="mb-2 text-lg text-gray-700">
              <span class="font-semibold">Master Blend:</span>{" "}
              <span class="font-bold text-blue-900">
                {formatWeight(results.value.masterBlend)}
              </span>{" "}
              grams
            </p>
            <p class="mb-2 text-lg text-gray-700">
              <span class="font-semibold">Epsom Salt:</span>{" "}
              <span class="font-bold text-blue-900">
                {formatWeight(results.value.epsomSalt)}
              </span>{" "}
              grams
            </p>
            <p class="text-lg text-gray-700">
              <span class="font-semibold">Calcium Nitrate:</span>{" "}
              <span class="font-bold text-blue-900">
                {formatWeight(results.value.calciumNitrate)}
              </span>{" "}
              grams
            </p>
          </div>
        )}

        {error.value && (
          <div class="mt-4 rounded-md border border-red-400 bg-red-100 p-3 text-red-700">
            {error.value}
          </div>
        )}
      </div>
    </div>
  );
});
