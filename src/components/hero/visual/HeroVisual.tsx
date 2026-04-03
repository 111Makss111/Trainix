"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DesktopPhone3D = dynamic(
  () => import("./Phone3D").then((module) => module.Phone3D),
  {
    ssr: false,
  },
);

function DesktopHeroPreview() {
  return (
    <div className="relative hidden w-full max-w-[520px] items-center justify-center lg:flex lg:justify-end">
      <div className="relative aspect-[10/12] w-full max-w-[350px]">
        <div className="absolute inset-0">
          <DesktopPhone3D />
        </div>
      </div>
    </div>
  );
}

export function HeroVisual() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const syncViewport = (event?: MediaQueryListEvent) => {
      setIsDesktop(event ? event.matches : mediaQuery.matches);
    };

    syncViewport();

    mediaQuery.addEventListener("change", syncViewport);

    return () => {
      mediaQuery.removeEventListener("change", syncViewport);
    };
  }, []);

  return isDesktop ? <DesktopHeroPreview /> : null;
}
