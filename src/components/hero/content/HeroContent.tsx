import { HeroStoreButtons } from "./HeroStoreButtons";

export function HeroContent() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-[560px] text-center lg:mx-0 lg:text-left">
      <h1 className="mx-auto max-w-[14ch] text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.05em] text-white sm:max-w-[16ch] sm:text-5xl sm:leading-[1] lg:mx-0 lg:max-w-[24ch] lg:text-[4.25rem] lg:leading-[0.97]">
        Trainix — Розкрий свій{" "}
        <span className="bg-[linear-gradient(180deg,#d8ff92_0%,#91f35c_45%,#5adf63_100%)] bg-clip-text text-transparent">
          фізичний потенціал!
        </span>
      </h1>

      <p className="mx-auto mt-5 max-w-[34ch] text-sm leading-7 text-white/72 sm:mt-6 sm:max-w-[54ch] sm:text-base lg:mx-0">
        Досягайте нових цілей та покращуйте свої тренування. Ваш персональний
        тренер для занять вдома, на вулиці та у залі.
      </p>

      <div className="mt-7 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center lg:items-start">
        <a
          href="#pricing"
          className="inline-flex h-14 w-full items-center justify-center rounded-full border border-lime-100/25 bg-[linear-gradient(135deg,#a8ff61_0%,#68ea5a_52%,#37c55f_100%)] px-8 text-base font-semibold text-[#071108] shadow-[0_16px_40px_rgba(85,255,133,0.28),inset_0_1px_0_rgba(255,255,255,0.34)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(85,255,133,0.34),inset_0_1px_0_rgba(255,255,255,0.42)] sm:w-auto"
        >
          Спробувати безкоштовно
        </a>
      </div>

      <HeroStoreButtons />
    </div>
  );
}
