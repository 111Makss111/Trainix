"use client";

import { useEffect, useId, useState } from "react";

type QuickAnswer = {
  question: string;
  answer: string;
};

const quickAnswers: readonly QuickAnswer[] = [
  {
    question: "Чи можна скачати APK безкоштовно?",
    answer:
      "Так, beta APK уже доступний безкоштовно на сайті й не вимагає оплати",
  },
  {
    question: "Де з’явиться підписка?",
    answer:
      "Основна підписка Trainix Plus з’явиться після релізу вже всередині самого додатка",
  },
  {
    question: "Як підтримати проект?",
    answer:
      "У секції підтримки можна перейти в Stripe Checkout і залишити будь-яку комфортну суму",
  },
  {
    question: "Де стежити за новинами?",
    answer:
      "Найшвидші апдейти, анонси та ранні новини ми публікуємо в Telegram-спільноті Trainix",
  },
  {
    question: "Куди писати з питанням?",
    answer:
      "Для нестандартних запитів і зворотного зв’язку найкраще написати на support.trainix@gmail.com",
  },
];

export function QuickHelpWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const panelId = useId();
  const activeAnswer = quickAnswers[activeIndex];

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || typeof window === "undefined" || window.innerWidth >= 640) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        aria-label="Закрити швидку допомогу"
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/42 transition-opacity duration-200 sm:bg-black/18 motion-reduce:transition-none ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <div
        id={panelId}
        aria-hidden={!isOpen}
        className={`fixed inset-x-4 bottom-24 z-50 transform-gpu rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(9,14,12,0.98),rgba(6,9,8,0.95)_100%)] p-4 shadow-[0_22px_60px_rgba(0,0,0,0.34)] transition-[opacity,transform] duration-200 motion-reduce:transition-none sm:inset-x-auto sm:right-5 sm:w-[380px] sm:p-5 ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-emerald-200/64">
              Швидка допомога
            </p>
            <h2 className="mt-2 text-[1.35rem] font-semibold tracking-[-0.04em] text-white">
              Потрібна підказка?
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/62">
              Зібрали короткі відповіді на найчастіші питання про Trainix
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Закрити віджет"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/74 transition-[background-color,border-color,color] duration-200 hover:border-emerald-200/18 hover:bg-white/[0.08] hover:text-white"
          >
            <span aria-hidden="true" className="text-base leading-none">
              ×
            </span>
          </button>
        </div>

        <div className="mt-5 grid gap-2">
          {quickAnswers.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={item.question}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`rounded-[18px] border px-4 py-3 text-left text-sm leading-6 transition-[border-color,background-color,color] duration-200 ${
                  isActive
                    ? "border-emerald-200/24 bg-emerald-300/[0.08] text-white"
                    : "border-white/8 bg-white/[0.03] text-white/72 hover:border-white/14 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {item.question}
              </button>
            );
          })}
        </div>

        <div className="mt-4 rounded-[20px] border border-white/8 bg-white/[0.03] p-4">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-emerald-100/54">
            Відповідь
          </p>
          <p className="mt-3 text-sm leading-7 text-white/82">
            {activeAnswer.answer}
          </p>
        </div>

        <div className="mt-4 rounded-[20px] border border-white/8 bg-white/[0.025] p-4">
          <p className="text-sm font-medium text-white">
            Не знайшов потрібної відповіді?
          </p>
          <p className="mt-2 text-sm leading-6 text-white/62">
            Напиши на project email і ми відповімо через офіційний канал
          </p>

          <a
            href="mailto:support.trainix@gmail.com"
            onClick={() => setIsOpen(false)}
            className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-[linear-gradient(90deg,#99f870_0%,#48d66d_100%)] px-4 text-sm font-medium text-[#071108] shadow-[0_18px_40px_rgba(107,255,148,0.2)] transition duration-300 hover:brightness-105"
          >
            Написати в support
          </a>
        </div>
      </div>

      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? "Закрити швидку допомогу" : "Відкрити швидку допомогу"}
        onClick={() => setIsOpen((currentState) => !currentState)}
        className="fixed bottom-4 right-4 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full border border-emerald-200/18 bg-[linear-gradient(180deg,#102316_0%,#0b1511_100%)] text-white shadow-[0_16px_42px_rgba(0,0,0,0.28)] transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-emerald-200/28 sm:h-14 sm:w-auto sm:min-w-[160px] sm:gap-2 sm:px-4"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-none stroke-current"
          aria-hidden="true"
        >
          <path
            d="M7 10.5h10M7 14h6m6.5-2A7.5 7.5 0 0 1 12 19.5c-1.2 0-2.33-.28-3.33-.78L4.5 20l1.28-3.82A7.47 7.47 0 0 1 4.5 12 7.5 7.5 0 1 1 19.5 12Z"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="hidden text-sm font-medium sm:inline">Допомога</span>
      </button>
    </>
  );
}
