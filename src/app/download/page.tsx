import type { Metadata } from "next";
import Link from "next/link";

import { SupportShell } from "@/components/support/SupportShell";
import { isApkConfigured } from "@/utils/support-config";

export const metadata: Metadata = {
  title: "Скачати APK",
  description: "Безкоштовне скачування Android beta APK для Trainix",
};

export default async function DownloadPage({
  searchParams,
}: {
  searchParams: Promise<{ support?: string }>;
}) {
  const params = await searchParams;
  const showThanks = params.support === "success";

  return (
    <SupportShell
      eyebrow="Безкоштовний beta-доступ"
      title="APK можна отримати безкоштовно"
      description="Trainix зараз на ранньому етапі, тому Android beta APK доступний без оплати, а якщо проект тобі відгукується, підтримати його можна окремо добровільним донатом"
      secondaryHref="/#pricing"
      secondaryLabel="Повернутися до секції"
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
        <div className="rounded-[24px] border border-emerald-200/18 bg-[linear-gradient(180deg,rgba(13,20,18,0.9),rgba(8,14,12,0.58)_100%)] p-5">
          <p className="text-sm font-semibold text-white">Trainix Android beta APK</p>
          <p className="mt-2 text-sm leading-7 text-white/62">
            Це безкоштовна beta-версія, щоб познайомитися з продуктом і
            спокійно спробувати Trainix уже зараз
          </p>

          <div className="mt-5 flex flex-wrap gap-3 text-sm text-white/62">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
              Версія: {process.env.TRAINIX_APK_VERSION ?? "beta"}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
              Android: {process.env.TRAINIX_MIN_ANDROID_VERSION ?? "8.0+"}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
              Доступ: безкоштовно
            </span>
          </div>

          {isApkConfigured() ? (
            <a
              href="/api/download/apk"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[linear-gradient(90deg,#99f870_0%,#48d66d_100%)] px-5 text-sm font-medium text-[#071108] shadow-[0_18px_40px_rgba(107,255,148,0.22)] transition duration-300 hover:brightness-105"
            >
              Скачати APK
            </a>
          ) : (
            <div className="mt-6 rounded-[18px] border border-amber-200/16 bg-amber-200/[0.05] px-4 py-4 text-sm leading-7 text-amber-50/82">
              APK-файл ще не підключений у конфігурації сервера. Після додавання
              `TRAINIX_APK_PATH` або `TRAINIX_APK_URL` кнопка скачування
              з’явиться тут автоматично
            </div>
          )}

          {showThanks ? (
            <div className="mt-6 rounded-[18px] border border-emerald-200/16 bg-emerald-300/[0.08] px-4 py-4 text-sm leading-7 text-emerald-50/90">
              Дякуємо за підтримку Trainix. Донат отримано, а APK, як і
              обіцяли, залишається безкоштовним для всіх beta-користувачів
            </div>
          ) : null}
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
          <p className="text-sm font-semibold text-white">Що важливо знати</p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-white/62">
            <li>Це ранній beta-build, тому інтерфейс і поведінка ще можуть змінюватися</li>
            <li>Скачування APK безкоштовне і не вимагає донату</li>
            <li>Добровільна підтримка не відкриває окремі функції або цифровий контент</li>
            <li>Майбутні підписки Trainix з’являться вже всередині самого додатка</li>
          </ul>

          <div className="mt-6">
            <Link
              href="/terms"
              className="text-sm font-medium text-emerald-100 transition-colors duration-300 hover:text-white"
            >
              Переглянути умови beta-доступу
            </Link>
          </div>
        </div>
      </div>
    </SupportShell>
  );
}
