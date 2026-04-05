"use client";

import { useEffect, useState } from "react";

import { useRepeatedReveal } from "@/components/ui/useRepeatedReveal";

import { CommunityScene } from "./scene/CommunityScene";
import { CommunityPanel } from "./panel/CommunityPanel";

export function Community() {
  const [showScene, setShowScene] = useState(false);
  const { ref, isVisible } = useRepeatedReveal<HTMLElement>({
    threshold: 0.24,
    rootMargin: "0px 0px -10% 0px",
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const syncSceneVisibility = () => {
      setShowScene(mediaQuery.matches);
    };

    syncSceneVisibility();

    mediaQuery.addEventListener("change", syncSceneVisibility);

    return () => {
      mediaQuery.removeEventListener("change", syncSceneVisibility);
    };
  }, []);

  return (
    <section
      ref={ref}
      id="community"
      className="relative mt-14 overflow-hidden rounded-[20px] sm:mt-16 lg:mt-20"
    >
      <div className="relative grid items-center gap-8 px-4 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.95fr)_minmax(300px,0.84fr)] lg:items-end lg:gap-10 lg:px-12 lg:py-12">
        {showScene ? <CommunityScene isVisible={isVisible} /> : null}
        <div className="mx-auto w-full max-w-[560px] lg:justify-self-end lg:max-w-[350px] xl:max-w-[360px]">
          <CommunityPanel isVisible={isVisible} />
        </div>
      </div>
    </section>
  );
}
