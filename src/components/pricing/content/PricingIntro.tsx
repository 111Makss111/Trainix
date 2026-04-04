type PricingIntroProps = {
  isVisible: boolean;
};

export function PricingIntro({ isVisible }: PricingIntroProps) {
  return (
    <div
      className={`mx-auto max-w-[840px] text-center transition-all duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-md"}`}
    >
      <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-white/44">
        Формати доступу
      </p>
      <h2 className="mx-auto mt-3 max-w-[14ch] text-4xl font-semibold tracking-[-0.05em] text-white sm:max-w-[16ch] sm:text-5xl lg:max-w-[18ch] lg:text-[3.35rem]">
        Обери свій формат старту в Trainix.
      </h2>
      <p className="mx-auto mt-4 max-w-[68ch] text-sm leading-7 text-white/64 sm:text-[0.98rem]">
        Почати можна безкоштовно вже зараз через beta APK. Основна підписка
        Trainix Plus з’явиться пізніше вже всередині додатка, а поки що ти
        можеш або спокійно протестувати продукт, або добровільно підтримати
        запуск проєкту.
      </p>
    </div>
  );
}
