"use client";

import { useRepeatedReveal } from "@/components/ui/useRepeatedReveal";
import { FeaturesIntro } from "./content/FeaturesIntro";
import { FeatureGrid } from "./grid/FeatureGrid";

export function Features() {
  const { ref, isVisible } = useRepeatedReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="features"
      className="relative mt-14 overflow-hidden sm:mt-16 lg:mt-20"
    >
      <div className="pointer-events-none absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-300/35 to-transparent sm:inset-x-8" />

      <div className="relative">
        <FeaturesIntro isVisible={isVisible} />
        <FeatureGrid isVisible={isVisible} />
      </div>
    </section>
  );
}
