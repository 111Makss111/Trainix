"use client";

import { useRepeatedReveal } from "@/components/ui/useRepeatedReveal";
import { PricingIntro } from "./content/PricingIntro";
import { PricingPlans } from "./plans/PricingPlans";

export function Pricing() {
  const { ref, isVisible } = useRepeatedReveal<HTMLElement>({
    threshold: 0.22,
    rootMargin: "0px 0px -10% 0px",
  });

  return (
    <section
      ref={ref}
      id="pricing"
      className="relative mt-8 overflow-hidden rounded-[14px] "
    >
      <div className="relative">
        <PricingIntro isVisible={isVisible} />
        <PricingPlans isVisible={isVisible} />
      </div>
    </section>
  );
}
