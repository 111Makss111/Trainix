type PricingIntroProps = {
  isVisible: boolean;
};

export function PricingIntro({ isVisible }: PricingIntroProps) {
  return (
    <div
      className={`max-w-[760px] transition-all duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-md"}`}
    >
      <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-emerald-200/66">
        Beta та підтримка
      </p>
      <h2 className="mt-3 max-w-[12ch] text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-[3.35rem]">
        Спробуй Trainix безкоштовно і підтримай, якщо відгукнеться.
      </h2>
      <p className="mt-4 max-w-[62ch] text-sm leading-7 text-white/64 sm:text-[0.98rem]">
        APK можна отримати безкоштовно вже зараз, без web-підписки і без
        обов’язкової оплати. Якщо ж захочеш допомогти проєкту рости швидше,
        поруч є добровільна символічна підтримка. Основна монетизація Trainix
        пізніше буде вже на підписках тренувань усередині самого додатка.
      </p>
    </div>
  );
}
