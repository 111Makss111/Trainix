type FeatureCardData = {
  title: string;
  description: string;

  stat: string;
  tone: "lime" | "amber" | "cyan" | "emerald" | "slate" | "teal";
  size: "large" | "small";
  icon: "spark" | "pulse" | "watch" | "library" | "target" | "bars";
};

const featureCards: FeatureCardData[] = [
  {
    title: "ШІ-тренер",
    description:
      "Підлаштовує навантаження під твою ціль, аналізує прогрес і пропонує вправи на день без ручного планування.",

    stat: "24/7",
    tone: "lime",
    size: "large",
    icon: "spark",
  },
  {
    title: "Фітнес-трекер",
    description:
      "Пульс, кроки, калорії, сон і активність зібрані в одному таймлайні, щоб бачити реальну динаміку.",

    stat: "Pulse",
    tone: "cyan",
    size: "small",
    icon: "pulse",
  },
  {
    title: "Підключення гаджетів",
    description:
      "Синхронізація з wearable-пристроями та сенсорами, щоб дані автоматично потрапляли в застосунок.",

    stat: "Sync",
    tone: "amber",
    size: "small",
    icon: "watch",
  },
  {
    title: "Бібліотека вправ",
    description:
      "Вправи для дому, залу і вулиці з фільтрами по рівню, обладнанню, м'язових групах і форматах занять.",

    stat: "600+",
    tone: "emerald",
    size: "small",
    icon: "library",
  },
  {
    title: "Персональні плани",
    description:
      "Програми на схуднення, набір форми, силу, кардіо та відновлення з поступовим ростом інтенсивності.",

    stat: "Goals",
    tone: "teal",
    size: "small",
    icon: "target",
  },
];

const toneStyles = {
  lime: {
    badge:
      "border-lime-200/12 bg-[linear-gradient(135deg,rgba(157,255,114,0.08),rgba(52,122,52,0.02))] text-lime-200/90",
    glow: "from-lime-300/8 via-lime-200/2 to-transparent",
    icon: "bg-[radial-gradient(circle_at_30%_30%,#edffc9_0%,#79f56a_36%,#215b2f_100%)]",
  },
  amber: {
    badge:
      "border-amber-200/12 bg-[linear-gradient(135deg,rgba(255,213,146,0.08),rgba(110,76,32,0.02))] text-amber-100/88",
    glow: "from-amber-200/8 via-amber-100/2 to-transparent",
    icon: "bg-[radial-gradient(circle_at_30%_30%,#ffe5b5_0%,#ffb55f_36%,#5d3411_100%)]",
  },
  cyan: {
    badge:
      "border-cyan-200/12 bg-[linear-gradient(135deg,rgba(143,233,255,0.08),rgba(43,94,117,0.02))] text-cyan-100/88",
    glow: "from-cyan-200/8 via-cyan-100/2 to-transparent",
    icon: "bg-[radial-gradient(circle_at_30%_30%,#d4f7ff_0%,#72dfff_36%,#1a4553_100%)]",
  },
  emerald: {
    badge:
      "border-emerald-200/12 bg-[linear-gradient(135deg,rgba(114,255,174,0.08),rgba(30,92,68,0.02))] text-emerald-100/88",
    glow: "from-emerald-200/8 via-emerald-100/2 to-transparent",
    icon: "bg-[radial-gradient(circle_at_30%_30%,#dbffe5_0%,#63e99a_36%,#1f4f32_100%)]",
  },
  slate: {
    badge:
      "border-white/7 bg-[linear-gradient(135deg,rgba(208,214,228,0.06),rgba(63,71,86,0.04))] text-white/82",
    glow: "from-white/6 via-white/2 to-transparent",
    icon: "bg-[radial-gradient(circle_at_30%_30%,#f6f7fb_0%,#b3bdca_38%,#39414d_100%)]",
  },
  teal: {
    badge:
      "border-teal-200/12 bg-[linear-gradient(135deg,rgba(125,255,231,0.08),rgba(26,97,90,0.02))] text-teal-100/88",
    glow: "from-teal-200/8 via-teal-100/2 to-transparent",
    icon: "bg-[radial-gradient(circle_at_30%_30%,#d9fff9_0%,#69efd3_36%,#19504c_100%)]",
  },
};

function FeatureIcon({ icon }: { icon: FeatureCardData["icon"] }) {
  if (icon === "spark") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 fill-current"
        aria-hidden="true"
      >
        <path d="m12 2 1.95 5.1L19 9.05l-5.05 1.95L12 16l-1.95-5L5 9.05l5.05-1.95L12 2Zm7 13 .98 2.52L22.5 18.5l-2.52.98L19 22l-.98-2.52L15.5 18.5l2.52-.98L19 15ZM5 14l.78 1.96L7.75 17l-1.97.77L5 19.75l-.78-1.98L2.25 17l1.97-.04L5 14Z" />
      </svg>
    );
  }

  if (icon === "pulse") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 fill-none stroke-current"
        aria-hidden="true"
      >
        <path
          d="M3 12h4l2.2-4.5 3.1 9 2.6-5.2H21"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (icon === "watch") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 fill-none stroke-current"
        aria-hidden="true"
      >
        <rect x="7" y="5" width="10" height="14" rx="3" strokeWidth="2" />
        <path
          d="M10 2h4M10 22h4M12 9v3l2 2"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (icon === "library") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 fill-none stroke-current"
        aria-hidden="true"
      >
        <path d="M5 5h4v14H5zM10 5h4v14h-4zM15 5h4v14h-4z" strokeWidth="1.8" />
      </svg>
    );
  }

  if (icon === "target") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 fill-none stroke-current"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="7" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3" strokeWidth="1.8" />
        <path
          d="M12 2v3M22 12h-3M12 22v-3M2 12h3"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-none stroke-current"
      aria-hidden="true"
    >
      <path
        d="M5 18V9m5 9V5m5 13v-7m4 7V8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

type FeatureCardProps = {
  feature: FeatureCardData;
  delay: number;
  isVisible: boolean;
};

function FeatureCard({ feature, delay, isVisible }: FeatureCardProps) {
  const tone = toneStyles[feature.tone];

  return (
    <article
      className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-transparent p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-[2px] transition-[opacity,transform,filter,border-color,box-shadow,background-color] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-white/14 hover:bg-white/[0.015] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_12px_26px_rgba(0,0,0,0.06)] ${isVisible ? "translate-y-0 scale-100 opacity-100 blur-0" : "translate-y-12 scale-[0.975] opacity-0 blur-md"} ${feature.size === "large" ? "min-h-[340px] lg:col-span-6 lg:row-span-2" : "min-h-[240px] lg:col-span-3"}`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80 ${tone.glow}`}
      />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl text-[#071108] shadow-[0_12px_24px_rgba(0,0,0,0.18)] ${tone.icon}`}
          >
            <FeatureIcon icon={feature.icon} />
          </div>
          <span
            className={`inline-flex rounded-full border px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] ${tone.badge}`}
          >
            {feature.stat}
          </span>
        </div>

        <div className="mt-8">
          <h3
            className={`mt-3 font-semibold tracking-[-0.04em] text-white ${feature.size === "large" ? "text-3xl sm:text-[2.2rem]" : "text-2xl"}`}
          >
            {feature.title}
          </h3>
          <p
            className={`mt-4 max-w-[34ch] leading-7 text-white/66 ${feature.size === "large" ? "text-base" : "text-sm"}`}
          >
            {feature.description}
          </p>
        </div>

        <div className="mt-auto pt-8">
          {feature.size === "large" ? (
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "плани", value: "AI" },
                { label: "рівні", value: "3+" },
                { label: "режим", value: "Home" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[20px] border border-white/8 bg-transparent px-4 py-3 backdrop-blur-[2px]"
                >
                  <p className="text-[0.62rem] uppercase tracking-[0.18em] text-white/36">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white/92">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-px w-full bg-gradient-to-r from-white/16 via-white/4 to-transparent" />
          )}
        </div>
      </div>
    </article>
  );
}

type FeatureGridProps = {
  isVisible: boolean;
};

export function FeatureGrid({ isVisible }: FeatureGridProps) {
  const [highlight, ...cards] = featureCards;

  return (
    <div className="mt-10 grid gap-4 lg:grid-cols-12">
      <FeatureCard feature={highlight} delay={140} isVisible={isVisible} />
      {cards.map((feature, index) => (
        <FeatureCard
          key={feature.title}
          feature={feature}
          delay={260 + index * 110}
          isVisible={isVisible}
        />
      ))}
    </div>
  );
}
