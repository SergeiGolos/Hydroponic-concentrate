import { component$, useSignal, $ } from '@builder.io/qwik';
import type { VolumeUnit, CalculationResult } from '../../types/calculator';
import { calculateMixture, validateInput, formatWeight } from '../../utils/calculator';

export const ConcentrateCalculator = component$(() => {
  const containerSize = useSignal(500);
  const unit = useSignal<VolumeUnit>('ml');
  const results = useSignal<CalculationResult | null>(null);
  const error = useSignal('');
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
      error.value = '';
      showResults.value = true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Calculation failed';
      showResults.value = false;
    }
  });

  // Perform initial calculation
  performCalculation();

  return (
    <div class="bg-gradient-to-br from-blue-100 to-purple-200 min-h-screen flex items-center justify-center p-4">
      <div class="bg-white p-8 md:p-10 lg:p-12 w-full max-w-md mx-auto text-center rounded-xl shadow-xl">
        <h1 class="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">
          Mixture Calculator
        </h1>

        <p class="text-gray-600 mb-8 text-sm md:text-base">
          Enter your desired container size to calculate the required grams for each concentrate.
          The original formula is based on 120g Master Blend, 60g Epsom Salt, and 120g Calcium Nitrate per 500ml of water.
        </p>

        <div class="mb-6">
          <label for="containerSize" class="block text-gray-700 text-lg font-semibold mb-2 text-left">
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
              class="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 text-lg"
              placeholder="e.g., 500"
            />
            <select
              id="unit"
              bind:value={unit}
              onChange$={performCalculation}
              class="p-3 border border-gray-300 rounded-md bg-white text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="ml">ml</option>
              <option value="gallon">Gallon</option>
              <option value="5gallon">5 Gallons</option>
            </select>
          </div>
        </div>

        <button
          onClick$={performCalculation}
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 shadow-lg"
        >
          Calculate
        </button>

        {showResults.value && results.value && (
          <div class="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl text-left">
            <h2 class="text-2xl font-bold text-blue-800 mb-4">Required Amounts:</h2>
            <p class="text-gray-700 text-lg mb-2">
              <span class="font-semibold">Master Blend:</span>{' '}
              <span class="font-bold text-blue-900">{formatWeight(results.value.masterBlend)}</span> grams
            </p>
            <p class="text-gray-700 text-lg mb-2">
              <span class="font-semibold">Epsom Salt:</span>{' '}
              <span class="font-bold text-blue-900">{formatWeight(results.value.epsomSalt)}</span> grams
            </p>
            <p class="text-gray-700 text-lg">
              <span class="font-semibold">Calcium Nitrate:</span>{' '}
              <span class="font-bold text-blue-900">{formatWeight(results.value.calciumNitrate)}</span> grams
            </p>
          </div>
        )}

        {error.value && (
          <div class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error.value}
          </div>
        )}
      </div>
    </div>
  );
});