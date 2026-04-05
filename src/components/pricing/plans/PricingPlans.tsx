"use client";

import {
  pricingPlans,
  type PricingPlan,
} from "@/utils/support-plans";

type PricingPlansProps = {
  isVisible: boolean;
};

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4.5 w-4.5 fill-none stroke-current"
      aria-hidden="true"
    >
      <path
        d="M5 12.5 9.2 16.7 19 7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SupportCheckoutAction({ plan }: { plan: PricingPlan }) {
  return (
    <form action="/api/support/checkout" method="POST">
      <input type="hidden" name="planId" value={plan.checkoutPlanId} />

      <p className="text-sm leading-6 text-white/54">
        Після натискання відкриється Stripe Checkout, де клієнт сам обере суму
        підтримки перед оплатою.
      </p>

      <button
        type="submit"
        className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-full border border-amber-200/18 bg-[linear-gradient(135deg,rgba(255,226,180,0.22),rgba(255,226,180,0.08))] px-5 text-sm font-medium text-white transition-all duration-300 hover:border-amber-200/24 hover:bg-[linear-gradient(135deg,rgba(255,226,180,0.28),rgba(255,226,180,0.12))]"
      >
        {plan.cta}
      </button>
    </form>
  );
}

export function PricingPlans({ isVisible }: PricingPlansProps) {
  return (
    <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-3">
      {pricingPlans.map((plan, index) => (
        <article
          key={plan.name}
          className={`group relative h-full overflow-hidden rounded-[26px] border px-5 py-5 transition-all duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-6 sm:py-6 ${
            plan.featured
              ? "border-emerald-200/22 bg-[linear-gradient(180deg,rgba(13,20,18,0.8),rgba(8,14,12,0.56)_100%)]"
              : "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02)_100%)]"
          } ${isVisible ? "translate-y-0 opacity-100 blur-0" : "translate-y-10 opacity-0 blur-md"}`}
          style={{
            transitionDelay: isVisible ? `${index * 130}ms` : "0ms",
            boxShadow: `0 18px 50px ${plan.glow}`,
          }}
        >
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${plan.accent} opacity-80 transition-opacity duration-500 group-hover:opacity-100`}
          />
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />

          <div className="relative flex h-full flex-col">
            <div className="flex min-h-[4.75rem] items-start justify-between gap-4">
              <div>
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-white/54">
                  {plan.badge}
                </p>
                <h3 className="mt-3 text-[1.55rem] font-semibold tracking-[-0.04em] text-white">
                  {plan.name}
                </h3>
              </div>
              <span
                className={`rounded-full border px-3 py-1 text-[0.72rem] font-medium ${
                  plan.featured
                    ? "border-emerald-200/18 bg-emerald-300/12 text-emerald-100"
                    : "invisible border-transparent text-transparent"
                }`}
              >
                Рекомендовано
              </span>
            </div>

            <div className="mt-8 flex items-end gap-2">
              <span
                className={`font-semibold tracking-[-0.05em] text-white ${
                  plan.featured ? "text-[2.7rem] sm:text-5xl" : "text-4xl"
                }`}
              >
                {plan.price}
              </span>
              {plan.priceSuffix ? (
                <span className="pb-1 text-sm text-white/44">
                  {plan.priceSuffix}
                </span>
              ) : null}
            </div>

            <p className="mt-4 min-h-[5.8rem] text-sm leading-7 text-white/62">
              {plan.description}
            </p>

            <ul className="mt-6 space-y-3">
              {plan.details.map((detail) => (
                <li
                  key={detail}
                  className="flex items-start gap-3 text-sm leading-6 text-white/72"
                >
                  <span
                    className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border ${
                      plan.featured
                        ? "border-emerald-200/20 bg-emerald-300/10 text-emerald-100"
                        : "border-white/10 bg-white/6 text-white/76"
                    }`}
                  >
                    <CheckIcon />
                  </span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex min-h-[7.5rem] flex-col justify-end pt-8">
              {plan.checkoutPlanId ? (
                <SupportCheckoutAction plan={plan} />
              ) : plan.ctaState === "disabled" ? (
                <button
                  type="button"
                  disabled
                  className="inline-flex h-12 w-full cursor-not-allowed items-center justify-center rounded-full border border-violet-200/14 bg-[linear-gradient(135deg,rgba(130,104,255,0.18),rgba(130,104,255,0.08))] px-5 text-sm font-medium text-white/72"
                >
                  {plan.cta}
                </button>
              ) : (
                <a
                  href={plan.href ?? "#community"}
                  className={`inline-flex h-12 w-full items-center justify-center rounded-full px-5 text-sm font-medium transition-all duration-300 ${
                    plan.featured
                      ? "bg-[linear-gradient(90deg,#99f870_0%,#48d66d_100%)] text-[#071108] shadow-[0_18px_40px_rgba(107,255,148,0.22)] hover:brightness-105"
                      : "border border-white/12 bg-white/7 text-white/88 backdrop-blur-md hover:border-white/18 hover:bg-white/10"
                  }`}
                >
                  {plan.cta}
                </a>
              )}

              <div className="mt-3 min-h-[2.5rem]">
                {plan.footnote ? (
                  <p className="text-xs leading-5 text-white/44">
                    {plan.footnote}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
