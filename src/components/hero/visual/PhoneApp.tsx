import { PhoneChart } from "./PhoneChart";

type PhoneAppProps = {
  scrollProgress: number;
};

const metricCards = [
  { label: "кал", value: "398", accent: "bg-[#3fd16f]/18 text-[#21a94e]" },
  { label: "хв", value: "62", accent: "bg-[#142d1e] text-[#8ef0a8]" },
];

const workouts = [
  { day: "Mon", title: "Cardio Flow", duration: "28 min" },
  { day: "Tue", title: "Core Power", duration: "34 min" },
  { day: "Wed", title: "Recovery", duration: "18 min" },
  { day: "Thu", title: "HIIT Pulse", duration: "22 min" },
];

export function PhoneApp({ scrollProgress }: PhoneAppProps) {
  const contentOffset = scrollProgress * 3.2;

  return (
    <div className="flex h-full flex-col bg-[linear-gradient(180deg,#f8f8f3_0%,#edf0ea_100%)] text-[#141a1c]">
      <div className="px-4 pb-3 pt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-full bg-[radial-gradient(circle_at_40%_28%,#eefbd7_0%,#7ce08d_36%,#23573a_100%)] ring-2 ring-white/70" />
            <div>
              <p className="text-[0.74rem] font-semibold tracking-[-0.03em]">
                Яна Я
              </p>
              <p className="text-[0.58rem] text-[#7d8585]">Level cardio pro</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/85 text-[#151b1c] shadow-[0_4px_12px_rgba(15,24,28,0.08)]">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current">
                <path
                  d="M12 5v14M5 12h14"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/85 text-[#d64b52] shadow-[0_4px_12px_rgba(15,24,28,0.08)]">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                <path d="M12 21s-6.72-4.4-9.5-8.06C-.63 8.96 1.14 4 5.22 4c2.35 0 3.76 1.34 4.49 2.5C10.44 5.34 11.85 4 14.2 4c4.08 0 5.85 4.96 2.72 8.94C18.72 16.6 12 21 12 21Z" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden px-3">
        <div
          className="absolute inset-x-3 top-0 pb-8 transition-transform duration-150 ease-out"
          style={{ transform: `translateY(-${contentOffset}px)` }}
        >
          <section className="rounded-[1.35rem] bg-[#121819] p-3.5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            <div className="flex items-center justify-between text-[0.55rem] uppercase tracking-[0.18em] text-white/45">
              <span>Weekly energy</span>
              <span>108</span>
            </div>

            <div className="mt-3 h-[104px] rounded-[1rem] bg-[linear-gradient(180deg,#111717_0%,#0d1214_100%)] px-2 py-3">
              <PhoneChart />
            </div>

            <div className="mt-2 flex justify-between px-1 text-[0.52rem] uppercase tracking-[0.16em] text-white/34">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>
          </section>

          <section className="mt-3 rounded-[1.2rem] bg-[linear-gradient(135deg,#22292a_0%,#1a2122_48%,#263339_100%)] p-3 text-white shadow-[0_18px_32px_rgba(17,25,29,0.14)]">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-[1rem] bg-[radial-gradient(circle_at_40%_28%,#d4ffda_0%,#59d07d_36%,#183d28_100%)]" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.92rem] font-semibold tracking-[-0.03em]">
                  Coach Brief
                </p>
                <p className="text-[0.58rem] uppercase tracking-[0.18em] text-white/42">
                  Cardio + Recovery
                </p>
              </div>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-[0.52rem] uppercase tracking-[0.18em] text-white/62">
                2 tasks
              </span>
            </div>

            <div className="mt-3 rounded-[1rem] border border-white/8 bg-black/18 p-3">
              <div className="flex items-center justify-between text-[0.54rem] uppercase tracking-[0.18em] text-white/45">
                <span>Today</span>
                <span>18:30</span>
              </div>
              <p className="mt-2 text-[0.78rem] leading-5 text-white/92">
                Tempo run, lower-body stretch, and a short cooldown walk
              </p>
            </div>
          </section>

          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {metricCards.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[1rem] bg-white/90 px-3 py-3 shadow-[0_10px_20px_rgba(17,25,29,0.06)]"
              >
                <div
                  className={`inline-flex rounded-full px-2 py-1 text-[0.52rem] font-semibold uppercase tracking-[0.18em] ${metric.accent}`}
                >
                  {metric.label}
                </div>
                <p className="mt-3 text-[1rem] font-semibold tracking-[-0.03em]">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mt-3 h-11 w-full rounded-full bg-[linear-gradient(135deg,#65ef74_0%,#39d965_56%,#22b95b_100%)] text-[0.8rem] font-semibold text-[#071108] shadow-[0_10px_26px_rgba(47,215,99,0.22)]"
          >
            Start training
          </button>

          <section className="mt-4 rounded-[1.2rem] bg-white/90 p-3 shadow-[0_12px_24px_rgba(17,25,29,0.06)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[0.8rem] font-semibold tracking-[-0.03em]">
                  Weekly plan
                </p>
                <p className="text-[0.55rem] uppercase tracking-[0.18em] text-[#7c8485]">
                  Scroll preview
                </p>
              </div>
              <span className="rounded-full bg-[#edf8ef] px-2.5 py-1 text-[0.52rem] font-semibold uppercase tracking-[0.18em] text-[#1d9447]">
                4 days
              </span>
            </div>

            <div className="mt-3 space-y-2">
              {workouts.map((workout) => (
                <div
                  key={workout.day}
                  className="flex items-center justify-between rounded-[0.95rem] bg-[#f3f5f0] px-3 py-2.5"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#151b1c] text-[0.52rem] font-semibold uppercase tracking-[0.16em] text-white">
                      {workout.day}
                    </span>
                    <span className="text-[0.72rem] font-semibold">
                      {workout.title}
                    </span>
                  </div>
                  <span className="text-[0.62rem] text-[#667072]">
                    {workout.duration}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-4 rounded-[1.2rem] bg-[linear-gradient(180deg,#121819_0%,#172022_100%)] p-3 text-white shadow-[0_18px_32px_rgba(17,25,29,0.14)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[0.78rem] font-semibold tracking-[-0.03em]">
                  Recovery score
                </p>
                <p className="text-[0.55rem] uppercase tracking-[0.18em] text-white/42">
                  Keep the streak
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-300/24 bg-[radial-gradient(circle,#83ff9e_0%,#33be63_42%,#15241b_74%)] text-[0.82rem] font-semibold text-[#08110a]">
                88
              </div>
            </div>

            <div className="mt-3 h-2 rounded-full bg-white/8">
              <div className="h-full w-[72%] rounded-full bg-[linear-gradient(90deg,#4bff90_0%,#1db45c_100%)]" />
            </div>
          </section>
        </div>
      </div>

      <div className="border-t border-black/6 px-3 pb-3 pt-2">
        <div className="flex items-center justify-between rounded-full bg-white/75 px-4 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
          <span className="flex h-7 w-7 items-center justify-center text-[#57cf7c]">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M12 4.75 4 11h2v8h5v-5h2v5h5v-8h2l-8-6.25Z" />
            </svg>
          </span>
          <span className="flex h-7 w-7 items-center justify-center text-[#818889]">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current">
              <path
                d="M5 19v-7m7 7V5m7 14v-9"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#101617] text-white shadow-[0_10px_18px_rgba(14,20,23,0.18)]">
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current">
              <path d="M12 5a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H6a1 1 0 1 1 0-2h5V6a1 1 0 0 1 1-1Z" />
            </svg>
          </span>
          <span className="flex h-7 w-7 items-center justify-center text-[#818889]">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current">
              <path
                d="M6 18.5V9.8c0-.57.26-1.1.7-1.45L12 4.25l5.3 4.1c.44.35.7.88.7 1.45v8.7"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="flex h-7 w-7 items-center justify-center text-[#818889]">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current">
              <path
                d="M12 12a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Zm-5.5 7.5a5.5 5.5 0 0 1 11 0"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
