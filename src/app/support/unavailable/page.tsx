import type { Metadata } from "next";

import { SupportShell } from "@/components/support/SupportShell";

export const metadata: Metadata = {
  title: "Підтримка тимчасово недоступна",
  description: "Флоу добровільної підтримки Trainix тимчасово недоступний.",
};

const reasonLabels: Record<string, string> = {
  plan: "Ми не змогли розпізнати обраний план підтримки.",
  checkout: "Сторінка донату тимчасово недоступна або ще не налаштована.",
  setup:
    "Платіжний потік ще не налаштований повністю. Перед запуском потрібно підключити Stripe та Neon.",
  session: "Ми не отримали ідентифікатор успішної оплати від платіжної сторінки.",
  payment: "Оплата ще не підтверджена, тому подяку за підтримку не вдалося показати автоматично.",
  verification: "Ми не змогли перевірити платіж і підтвердити донат.",
};

export default async function SupportUnavailablePage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const params = await searchParams;
  const reason =
    (params.reason && reasonLabels[params.reason]) ||
    "Сервіс підтримки зараз недоступний або ще в процесі налаштування.";

  return (
    <SupportShell
      eyebrow="Тимчасово недоступно"
      title="Підтримку поки не вдалося провести."
          description={`${reason} Якщо проблема повторюється, можна повернутися на головну, а також написати напряму на support.trainix@gmail.com.`}
      primaryHref="/download"
      primaryLabel="Перейти до APK"
      secondaryHref="/contact"
      secondaryLabel="Відкрити контакт"
    />
  );
}
