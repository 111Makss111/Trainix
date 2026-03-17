import { HeroStoreButtons } from "./HeroStoreButtons";

export function HeroContent() {
  return (
    <div className="relative z-10 max-w-[560px]">
      <h1 className="max-w-[24ch] text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-5xl lg:text-[4.25rem]">
        Trainix App - Твій персональний шлях до{" "}
        <span className="bg-[linear-gradient(180deg,#d8ff92_0%,#91f35c_45%,#5adf63_100%)] bg-clip-text text-transparent">
          ідеальної форми!
        </span>
      </h1>

      <p className="mt-6 max-w-[54ch] text-sm leading-7 text-white/72 sm:text-base">
        Досягайте нових цілей та покращуйте свої тренування. Ваш персональний
        тренер для занять вдома, на вулиці та у залі.
      </p>

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center">
        <a
          href="#pricing"
          className="inline-flex h-14 items-center justify-center rounded-full border border-lime-100/25 bg-[linear-gradient(135deg,#a8ff61_0%,#68ea5a_52%,#37c55f_100%)] px-8 text-base font-semibold text-[#071108] shadow-[0_16px_40px_rgba(85,255,133,0.28),inset_0_1px_0_rgba(255,255,255,0.34)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(85,255,133,0.34),inset_0_1px_0_rgba(255,255,255,0.42)]"
        >
          Спробувати безкоштовно
        </a>
      </div>

      <HeroStoreButtons />
    </div>
  );
}
