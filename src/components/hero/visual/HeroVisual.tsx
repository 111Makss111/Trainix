"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DesktopPhone3D = dynamic(
  () => import("./Phone3D").then((module) => module.Phone3D),
  {
    ssr: false,
  },
);

function MobileHeroPreview() {
  return (
    <div className="mx-auto w-full max-w-[22rem] lg:hidden">
      <div className="overflow-hidden rounded-[2rem] border border-emerald-200/14 bg-[linear-gradient(180deg,rgba(9,15,12,0.92),rgba(6,10,8,0.95)_100%)] shadow-[0_24px_56px_rgba(0,0,0,0.32)]">
        <div className="border-b border-white/8 px-4 pb-4 pt-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.22em] text-emerald-100/56">
                Trainix beta
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-white">
                Android preview
              </h3>
            </div>
            <span className="rounded-full border border-emerald-200/16 bg-emerald-300/10 px-3 py-1 text-[0.7rem] font-medium text-emerald-100">
              Безкоштовно
            </span>
          </div>

          <p className="mt-3 text-sm leading-6 text-white/62">
            Легка мобільна версія героя без 3D-анімації, щоб перший екран
            відкривався швидше і виглядав чистіше на телефоні.
          </p>
        </div>

        <div className="px-4 py-4">
          <div className="rounded-[1.6rem] border border-white/8 bg-[linear-gradient(180deg,#f4f5ef_0%,#e7ece1_100%)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-full bg-[radial-gradient(circle_at_35%_30%,#eefbd7_0%,#7ce08d_36%,#23573a_100%)] ring-2 ring-white/70" />
                <div>
                  <p className="text-[0.78rem] font-semibold tracking-[-0.03em] text-[#101617]">
                    Trainix Daily
                  </p>
                  <p className="text-[0.62rem] uppercase tracking-[0.16em] text-[#6c7577]">
                    План на сьогодні
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-[#101617] px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-white">
                beta
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <div className="rounded-[1rem] bg-white/88 px-3 py-3 shadow-[0_10px_20px_rgba(17,25,29,0.06)]">
                <p className="text-[0.58rem] uppercase tracking-[0.16em] text-[#6b7576]">
                  тренування
                </p>
                <p className="mt-2 text-base font-semibold tracking-[-0.03em] text-[#11181a]">
                  3 блоки
                </p>
              </div>
              <div className="rounded-[1rem] bg-[#151b1c] px-3 py-3 text-white shadow-[0_10px_20px_rgba(17,25,29,0.1)]">
                <p className="text-[0.58rem] uppercase tracking-[0.16em] text-white/42">
                  доступ
                </p>
                <p className="mt-2 text-base font-semibold tracking-[-0.03em]">
                  APK free
                </p>
              </div>
            </div>

            <div className="mt-3 rounded-[1rem] bg-[#eff4ec] px-3 py-3">
              <div className="flex items-center justify-between text-[0.64rem] uppercase tracking-[0.16em] text-[#657071]">
                <span>прогрес тижня</span>
                <span>72%</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-[#d8ded3]">
                <div className="h-full w-[72%] rounded-full bg-[linear-gradient(90deg,#69ee78_0%,#2ac45e_100%)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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

  return isDesktop ? <DesktopHeroPreview /> : <MobileHeroPreview />;
}
