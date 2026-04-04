export type CheckoutPlanId = "support_trainix";

export type PricingPlan = {
  name: string;
  badge: string;
  price: string;
  priceSuffix?: string;
  description: string;
  details: readonly string[];
  cta: string;
  accent: string;
  glow: string;
  featured?: boolean;
  href?: string;
  checkoutPlanId?: CheckoutPlanId;
  footnote?: string;
  ctaState?: "active" | "disabled";
};

export const pricingPlans: readonly PricingPlan[] = [
  {
    name: "Start",
    badge: "Безкоштовний старт",
    price: "$0",
    priceSuffix: "/ зараз",
    description:
      "Почни знайомство з Trainix уже зараз: скачай beta APK, подивись інтерфейс і відчуй загальний ритм продукту без будь-якої оплати.",
    details: [
      "Безкоштовне скачування Android beta APK",
      "Швидкий старт без web-підписки та прихованих оплат",
      "Новини, апдейти і підтримка через спільноту Trainix",
    ],
    cta: "Скачати APK",
    href: "/download",
    accent: "from-white/12 via-white/6 to-transparent",
    glow: "rgba(255,255,255,0.12)",
    footnote:
      "Найпростіший спосіб почати й подивитися, як Trainix виглядає вже зараз.",
  },
  {
    name: "Trainix Plus",
    badge: "Підписка",
    price: "Скоро",
    priceSuffix: "у додатку",
    description:
      "Основна підписка з’явиться вже всередині додатка після релізу. Саме там буде відкриватися повний premium-досвід Trainix.",
    details: [
      "Персональні програми тренувань під твою ціль",
      "Глибший прогрес, історія й розумні рекомендації",
      "Розширені можливості, які стануть доступні після запуску",
    ],
    cta: "Незабаром у додатку",
    href: "#download",
    accent: "from-emerald-300/24 via-emerald-200/10 to-transparent",
    glow: "rgba(111,255,160,0.24)",
    featured: true,
    footnote:
      "Після запуску саме тут відкриється повний premium-досвід Trainix.",
    ctaState: "disabled",
  },
  {
    name: "Support",
    badge: "Допомога проекту",
    price: "від $1",
    description:
      "Якщо тобі відгукується ідея Trainix, можеш підтримати запуск будь-якою комфортною сумою й допомогти продукту розвиватися швидше.",
    details: [
      "Добровільна підтримка розвитку продукту на ранньому етапі",
      "APK залишається безкоштовним і не прив’язаний до донату",
      "Донат не замінює майбутню підписку Trainix Plus у додатку",
    ],
    cta: "Підтримати Trainix",
    accent: "from-amber-200/18 via-amber-100/7 to-transparent",
    glow: "rgba(255,219,150,0.16)",
    checkoutPlanId: "support_trainix",
    footnote:
      "Добровільна підтримка, якщо хочеш допомогти Trainix рости швидше.",
  },
];

export function isCheckoutPlanId(value: string): value is CheckoutPlanId {
  return value === "support_trainix";
}
