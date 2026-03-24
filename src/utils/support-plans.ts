export type CheckoutPlanId = "support_trainix";

export type PricingPlan = {
  name: string;
  badge: string;
  price: string;
  description: string;
  details: readonly string[];
  cta: string;
  accent: string;
  glow: string;
  featured?: boolean;
  href?: string;
  checkoutPlanId?: CheckoutPlanId;
  footnote?: string;
};

export const pricingPlans: readonly PricingPlan[] = [
  {
    name: "Спільнота",
    badge: "Безкоштовно",
    price: "0 zł",
    description:
      "Заходь у Telegram-спільноту Trainix, дивись апдейти, став запитання і тримай контакт із розвитком продукту без будь-якої оплати.",
    details: [
      "новини та апдейти про розвиток Trainix",
      "ранні анонси і живий зв'язок із проєктом",
      "спокійний вхід у продукт без тиску на оплату",
    ],
    cta: "Перейти в спільноту",
    href: "#community",
    accent: "from-white/12 via-white/6 to-transparent",
    glow: "rgba(255,255,255,0.12)",
    footnote:
      "Спільнота допомагає слідкувати за апдейтами, але не потрібна для скачування APK.",
  },
  {
    name: "Безкоштовний APK",
    badge: "Beta-доступ",
    price: "0 zł",
    description:
      "APK можна отримати безкоштовно вже зараз. Це рання beta-версія, щоб спробувати і побачити, куди рухається Trainix.",
    details: [
      "безкоштовне скачування Android APK",
      "жодної оплати для старту і знайомства",
      "майбутня монетизація буде вже на підписках у самому додатку",
    ],
    cta: "Скачати APK",
    href: "/download",
    accent: "from-emerald-300/24 via-emerald-200/10 to-transparent",
    glow: "rgba(111,255,160,0.24)",
    featured: true,
    footnote: "Скачування APK безкоштовне. Це не підписка.",
  },
  {
    name: "Підтримати Trainix",
    badge: "Добровільний донат",
    price: "5 zł",
    description:
      "Якщо хочеш допомогти проекту рости швидше, можна залишити символічний донат. Це не відкриває додаткові функції і не впливає на доступ до APK.",
    details: [
      "повністю добровільна підтримка проекту",
      "APK і далі залишається безкоштовним",
      "допомога в розвитку продукту на ранньому етапі",
    ],
    cta: "Підтримати проект",
    accent: "from-amber-200/18 via-amber-100/7 to-transparent",
    glow: "rgba(255,219,150,0.16)",
    checkoutPlanId: "support_trainix",
    footnote: "Донат добровільний і не відкриває окремий цифровий доступ.",
  },
];

export function isCheckoutPlanId(value: string): value is CheckoutPlanId {
  return value === "support_trainix";
}
