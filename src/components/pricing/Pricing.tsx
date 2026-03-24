"use client";

import { useRepeatedReveal } from "@/components/ui/useRepeatedReveal";
import { PricingIntro } from "./content/PricingIntro";
import { PricingPlans } from "./plans/PricingPlans";

const summaryItems = [
  "APK доступний безкоштовно",
  "Донат тільки за бажанням",
  "Підписки будуть у додатку",
];

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
        <div
          className={`mt-7 grid gap-3 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:grid-cols-3 ${
            isVisible
              ? "translate-y-0 opacity-100 blur-0"
              : "translate-y-6 opacity-0 blur-md"
          }`}
          style={{ transitionDelay: isVisible ? "120ms" : "0ms" }}
        >
          {summaryItems.map((item) => (
            <div
              key={item}
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/68 backdrop-blur-md"
            >
              {item}
            </div>
          ))}
        </div>
        <PricingPlans isVisible={isVisible} />
      </div>
    </section>
  );
}
