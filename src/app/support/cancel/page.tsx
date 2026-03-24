import type { Metadata } from "next";

import { SupportShell } from "@/components/support/SupportShell";

export const metadata: Metadata = {
  title: "Донат скасовано",
  description: "Добровільну підтримку Trainix скасовано до завершення оплати.",
};

export default function SupportCancelPage() {
  return (
    <SupportShell
      eyebrow="Донат скасовано"
      title="Оплату не завершено."
      description="Нічого не списано. APK усе одно можна отримати безкоштовно, а до добровільної підтримки завжди можна повернутися пізніше."
      primaryHref="/download"
      primaryLabel="Перейти до APK"
      secondaryHref="/#pricing"
      secondaryLabel="Повернутися до секції"
    />
  );
}
