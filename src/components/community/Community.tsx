"use client";

import { useRepeatedReveal } from "@/components/ui/useRepeatedReveal";

import { CommunityScene } from "./scene/CommunityScene";
import { CommunityPanel } from "./panel/CommunityPanel";

export function Community() {
  const { ref, isVisible } = useRepeatedReveal<HTMLElement>({
    threshold: 0.24,
    rootMargin: "0px 0px -10% 0px",
  });

  return (
    <section
      ref={ref}
      id="community"
      className="relative mt-8 overflow-hidden rounded-[16px]"
    >
      <div className="relative grid gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.95fr)_minmax(300px,0.84fr)] lg:items-end lg:gap-10 lg:px-12 lg:py-12">
        <CommunityScene isVisible={isVisible} />
        <div className="lg:justify-self-end lg:w-full lg:max-w-[350px] xl:max-w-[360px]">
          <CommunityPanel isVisible={isVisible} />
        </div>
      </div>
    </section>
  );
}
