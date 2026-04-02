import Image from "next/image";
import treningWork from "@/img/train1.png";
import { HeroContent } from "./content/HeroContent";
import { HeroVisual } from "./visual/HeroVisual";

export function Hero() {
  return (
    <section
      id="project"
      className="relative mt-6 overflow-hidden rounded-[28px] border border-white/8 shadow-[0_26px_80px_rgba(0,0,0,0.34)] sm:mt-8 sm:rounded-[32px]"
    >
      <Image
        src={treningWork}
        alt=""
        fill
        priority
        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 92vw, 1440px"
        className="object-cover object-[64%_center] sm:object-center"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,10,0.84)_0%,rgba(5,8,12,0.8)_24%,rgba(5,8,12,0.58)_48%,rgba(4,7,10,0.92)_100%)] sm:bg-[linear-gradient(90deg,rgba(6,10,16,0.86)_0%,rgba(6,10,16,0.78)_28%,rgba(6,10,16,0.45)_56%,rgba(6,10,16,0.7)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(231,222,199,0.18),transparent_28%),radial-gradient(circle_at_78%_72%,rgba(80,255,137,0.1),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(3,7,11,0)_22%,rgba(3,7,11,0.2)_100%)] sm:bg-[radial-gradient(circle_at_62%_30%,rgba(231,222,199,0.34),transparent_28%),radial-gradient(circle_at_86%_72%,rgba(80,255,137,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(3,7,11,0)_22%,rgba(3,7,11,0.2)_100%)]" />
      <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-300/35 to-transparent sm:inset-x-8" />

      <div className="relative grid items-center gap-8 px-5 py-7 sm:gap-10 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,470px)] lg:px-12 lg:py-12">
        <HeroContent />
        <HeroVisual />
      </div>
    </section>
  );
}
