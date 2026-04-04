import type { Metadata } from "next";

import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact information for Trainix early beta, support, and community.",
};

export default function ContactPage() {
  return (
    <LegalPage
      eyebrow="Contact"
      title="Зв'язатися з Trainix"
      intro="Якщо ти хочеш отримати ранній доступ, поділитися ідеєю, написати про баг або обговорити розвиток продукту, тут зібрані основні канали зв'язку. На етапі ранньої beta це найшвидший спосіб напряму достукатися до Trainix."
      lastUpdated="March 17, 2026"
      facts={[
        { label: "Email", value: "support.trainix@gmail.com" },
        { label: "Telegram", value: "Trainix community group" },
        { label: "Формат", value: "Early beta communication and feedback" },
      ]}
      links={[
        {
          label: "Написати email",
            href: "mailto:support.trainix@gmail.com",
          external: true,
        },
        {
          label: "Відкрити Telegram",
          href: "https://t.me/+R015CBmeJrhiNzYy",
          external: true,
        },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Use", href: "/terms" },
      ]}
      sections={[
        {
          title: "1. Питання щодо beta-доступу",
          paragraphs: [
            "Якщо тебе цікавить ранній доступ до Trainix, найкраще написати через email або приєднатися до Telegram-спільноти. Так можна швидко отримати апдейти про статус продукту, наступні кроки й тестові релізи.",
          ],
        },
        {
          title: "2. Повідомлення про баги та фідбек",
          paragraphs: [
            "Можна надсилати ідеї, помилки, побажання щодо функцій, UX або майбутніх релізів. На ранньому етапі це особливо важливо, бо багато рішень ще гнучкі й можуть змінюватися.",
            "Щоб фідбек був кориснішим, варто коротко описати контекст, очікувану поведінку та те, що спрацювало не так.",
          ],
        },
        {
          title: "3. Запити щодо приватності та даних",
          paragraphs: [
            "Якщо ти хочеш поставити запитання щодо обробки даних, попросити видалити інформацію або уточнити, які дані зберігаються, достатньо написати на email з темою листа, що коротко описує запит.",
          ],
        },
        {
          title: "4. Співпраця та продукт",
          paragraphs: [
            "Через ці ж канали можна написати щодо потенційної співпраці, інтеграцій, ідей для розвитку Trainix або пропозицій щодо beta-напряму.",
          ],
        },
      ]}
    />
  );
}
