import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { ConcentrateCalculator } from "../components/calculator/concentrate-calculator";

export default component$(() => {
  return <ConcentrateCalculator />;
});

export const head: DocumentHead = {
  title: "Hydroponic Concentrate Calculator",
  meta: [
    {
      name: "description",
      content: "Calculate precise hydroponic concentrate ratios based on Master Blend formula. Enter your container size to get exact measurements for Master Blend, Epsom Salt, and Calcium Nitrate.",
    },
    {
      name: "keywords",
      content: "hydroponic, concentrate, calculator, Master Blend, Epsom Salt, Calcium Nitrate, hydroponics, nutrition",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    },
  ],
};
