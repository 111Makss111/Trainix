const activityItems = [
  {
    title: "Щоденні апдейти",
    text: "Короткі поради, міні-завдання і мотивація прямо в групі.",
  },
  {
    title: "Запитання та фідбек",
    text: "Можна написати ідею, проблему або просто запитати про функції Trainix.",
  },
  {
    title: "Ранній доступ",
    text: "Учасники спільноти першими бачать нові фічі та апдейти.",
  },
];

type CommunityPanelProps = {
  isVisible: boolean;
};

export function CommunityPanel({ isVisible }: CommunityPanelProps) {
  return (
    <div
      className={`relative transition-all duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? "translate-y-0 opacity-100 blur-0" : "translate-y-10 opacity-0 blur-md"}`}
      style={{ transitionDelay: isVisible ? "220ms" : "0ms" }}
    >
      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent sm:inset-x-6" />
      <div className="relative">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-emerald-200/64 sm:text-[0.68rem] sm:tracking-[0.2em]">
              Спільнота Trainix
            </p>
            <h3 className="mt-2 text-[1.7rem] font-semibold tracking-[-0.04em] text-white sm:text-2xl">
              Telegram-спільнота
            </h3>
          </div>
          <a
            href="https://t.me/+R015CBmeJrhiNzYy"
            target="_blank"
            rel="noreferrer"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white/90 transition-colors duration-300 hover:border-white/18 hover:bg-white/12 sm:h-11 sm:w-11 lg:backdrop-blur-md"
            aria-label="Open Telegram community"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current sm:h-4.5 sm:w-4.5"
              aria-hidden="true"
            >
              <path d="M20.67 4.33a1.52 1.52 0 0 0-1.58-.22L4.41 10.05c-.72.3-.68 1.34.07 1.58l3.75 1.2 1.46 4.5c.22.67 1.06.83 1.5.28l2.18-2.71 3.82 2.8c.58.42 1.4.1 1.53-.6l2.25-11.7c.08-.42-.08-.84-.42-1.07ZM9.52 12.2l7.62-5.9-5.93 6.73-.2 2.5-1.49-3.33Z" />
            </svg>
          </a>
        </div>

        <div className="mt-5 rounded-[22px] border border-white/8 bg-white/[0.035] p-4 sm:mt-6 sm:rounded-[24px] lg:bg-black/18 lg:backdrop-blur-md">
          <div className="flex items-start gap-3 sm:items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[radial-gradient(circle_at_30%_30%,#dbffe5_0%,#6ef28c_34%,#205a34_100%)] text-[#071108] shadow-[0_10px_20px_rgba(0,0,0,0.16)] sm:h-12 sm:w-12 sm:shadow-[0_12px_24px_rgba(0,0,0,0.18)]">
              <svg
                viewBox="0 0 24 24"
                className="h-4.5 w-4.5 fill-current sm:h-5 sm:w-5"
                aria-hidden="true"
              >
                <path d="M20.67 4.33a1.52 1.52 0 0 0-1.58-.22L4.41 10.05c-.72.3-.68 1.34.07 1.58l3.75 1.2 1.46 4.5c.22.67 1.06.83 1.5.28l2.18-2.71 3.82 2.8c.58.42 1.4.1 1.53-.6l2.25-11.7c.08-.42-.08-.84-.42-1.07Z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">
                Приєднуйся до групи
              </p>
              <p className="mt-1 text-sm leading-6 text-white/62">
                Спілкування, поради, оновлення і мотивація в одному місці.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {activityItems.map((item, index) => (
            <div
              key={item.title}
              className={`rounded-[20px] border border-white/8 bg-white/[0.035] px-4 py-4 transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:rounded-[22px] lg:bg-white/[0.03] lg:backdrop-blur-md ${isVisible ? "translate-x-0 opacity-100 blur-0" : "translate-x-6 opacity-0 blur-md"}`}
              style={{
                transitionDelay: isVisible ? `${320 + index * 100}ms` : "0ms",
              }}
            >
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(131,255,158,0.45)]" />
                <div>
                  <p className="text-sm font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-white/62">
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-[20px] border border-white/8 bg-white/[0.03] px-4 py-4 sm:rounded-[22px] lg:bg-black/16 lg:backdrop-blur-md">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-white/42 sm:text-[0.68rem] sm:tracking-[0.2em]">
            Написати напряму
          </p>
          <a
            href="mailto:support.trainix@gmail.com"
            className="mt-3 inline-flex max-w-full items-start gap-3 text-sm font-medium text-white/88 transition-colors duration-300 hover:text-white sm:items-center"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/6">
              <svg
                viewBox="0 0 24 24"
                className="h-4.5 w-4.5 fill-none stroke-current"
                aria-hidden="true"
              >
                <path
                  d="M4 7.5 12 13l8-5.5M5 6h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="min-w-0 break-all leading-6">
              support.trainix@gmail.com
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
