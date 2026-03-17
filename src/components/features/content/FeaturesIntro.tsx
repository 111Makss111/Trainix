type FeaturesIntroProps = {
  isVisible: boolean;
};

export function FeaturesIntro({ isVisible }: FeaturesIntroProps) {
  return (
    <div
      className={`max-w-[720px] transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-md"}`}
    >
      <p className="text-xs font-medium uppercase tracking-[0.28em] text-emerald-200/70">
        Можливості
      </p>
      <h2 className="mt-4 max-w-[13ch] text-3xl font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-4xl lg:text-[3.35rem]">
        Все, що потрібно для{" "}
        <span className="bg-[linear-gradient(180deg,#d8ff92_0%,#91f35c_45%,#5adf63_100%)] bg-clip-text text-transparent">
          розумного тренування
        </span>
        .
      </h2>
      <p className="mt-5 max-w-[60ch] text-sm leading-7 text-white/68 sm:text-base">
        Trainix поєднує ШІ-тренера, фітнес-трекер, вправи, гаджети і
        персональні плани в одному мобільному застосунку, щоб прогрес було
        видно щодня, а не раз на місяць.
      </p>
    </div>
  );
}
