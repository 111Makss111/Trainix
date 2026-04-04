type FeaturesIntroProps = {
  isVisible: boolean;
};

export function FeaturesIntro({ isVisible }: FeaturesIntroProps) {
  return (
    <div
      className={`max-w-[680px] transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-md"}`}
    >
      <p className="text-xs font-medium uppercase tracking-[0.28em] text-emerald-200/70">
        Можливості
      </p>
      <h2 className="mt-4 max-w-[11ch] text-[2.15rem] font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:max-w-[13ch] sm:text-4xl sm:leading-[0.98] lg:text-[3.25rem]">
        Все, що потрібно для{" "}
        <span className="bg-[linear-gradient(180deg,#d8ff92_0%,#91f35c_45%,#5adf63_100%)] bg-clip-text text-transparent">
          розумного тренування
        </span>
        .
      </h2>
      <p className="mt-5 max-w-[58ch] text-sm leading-6 text-white/70 sm:text-base sm:leading-7">
        Trainix поєднує ШІ-тренера, фітнес-трекер, вправи, гаджети і
        персональні плани в одному мобільному застосунку, щоб прогрес було
        видно щодня, а не раз на місяць.
      </p>
    </div>
  );
}
