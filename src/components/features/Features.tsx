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
      className="relative mt-8 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-300/35 to-transparent" />

      <div className="relative">
        <FeaturesIntro isVisible={isVisible} />
        <FeatureGrid isVisible={isVisible} />
      </div>
    </section>
  );
}
