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
  const [isPromptVisible, setIsPromptVisible] = useState(false);
  const [isPromptDismissed, setIsPromptDismissed] = useState(false);
  const panelId = useId();
  const activeAnswer = quickAnswers[activeIndex];

  useEffect(() => {
    if (typeof window === "undefined" || isPromptDismissed) {
      return;
    }

    const promptTimer = window.setTimeout(() => {
      if (!document.hidden) {
        setIsPromptVisible(true);
      }
    }, 12000);

    return () => {
      window.clearTimeout(promptTimer);
    };
  }, [isPromptDismissed]);

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
        className={`fixed inset-x-3 bottom-22 z-50 max-h-[calc(100vh-7rem)] transform-gpu overflow-hidden rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(9,14,12,0.98),rgba(6,9,8,0.95)_100%)] p-3.5 shadow-[0_22px_60px_rgba(0,0,0,0.34)] transition-[opacity,transform] duration-200 motion-reduce:transition-none sm:inset-x-auto sm:bottom-28 sm:right-5 sm:w-[350px] sm:max-w-[calc(100vw-2.5rem)] sm:p-4 lg:bottom-32 lg:right-7 lg:w-[340px] ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <div className="flex max-h-full flex-col overflow-hidden">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[0.64rem] font-medium uppercase tracking-[0.2em] text-emerald-200/64">
                Швидка допомога
              </p>
              <h2 className="mt-2 text-[1.16rem] font-semibold tracking-[-0.04em] text-white sm:text-[1.25rem]">
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
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/74 transition-[background-color,border-color,color] duration-200 hover:border-emerald-200/18 hover:bg-white/[0.08] hover:text-white"
            >
              <span aria-hidden="true" className="text-base leading-none">
                ×
              </span>
            </button>
          </div>

          <div className="mt-4 grid max-h-[29vh] gap-2 overflow-y-auto pr-1 sm:max-h-[220px]">
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

          <div className="mt-4 rounded-[18px] border border-white/8 bg-white/[0.03] p-3.5 sm:p-4">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-emerald-100/54">
              Відповідь
            </p>
            <p className="mt-2.5 text-sm leading-6 text-white/82">
              {activeAnswer.answer}
            </p>
          </div>

          <div className="mt-3 rounded-[18px] border border-white/8 bg-white/[0.025] p-3.5 sm:p-4">
            <p className="text-sm font-medium text-white">
              Не знайшов потрібної відповіді?
            </p>
            <p className="mt-2 text-sm leading-6 text-white/62">
              Напиши на project email і ми відповімо через офіційний канал
            </p>

            <a
              href="mailto:support.trainix@gmail.com"
              onClick={() => setIsOpen(false)}
              className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-full bg-[linear-gradient(90deg,#99f870_0%,#48d66d_100%)] px-4 text-sm font-medium text-[#071108] shadow-[0_18px_40px_rgba(107,255,148,0.2)] transition duration-300 hover:brightness-105"
            >
              Написати в support
            </a>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          setIsPromptVisible(false);
          setIsPromptDismissed(true);
          setIsOpen(true);
        }}
        aria-hidden={!isPromptVisible}
        className={`help-widget-nudge fixed bottom-24 right-4 z-[55] max-w-[230px] text-left transition-[opacity,transform] duration-300 motion-reduce:transition-none lg:bottom-32 lg:right-6 ${
          isPromptVisible
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <span className="relative block rounded-[20px] border border-emerald-200/16 bg-[linear-gradient(180deg,rgba(10,16,13,0.96),rgba(6,10,8,0.94)_100%)] px-4 py-3 pr-5 shadow-[0_22px_54px_rgba(0,0,0,0.34)]">
          <span
            aria-hidden="true"
            className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 rounded-[4px] border-b border-r border-emerald-200/12 bg-[#09100c]"
          />
          <span className="inline-flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-emerald-200/62">
            <span className="h-2 w-2 rounded-full bg-[#97f86f] shadow-[0_0_12px_rgba(151,248,111,0.7)]" />
            Trainix helper
          </span>
          <span className="mt-2 block text-sm font-medium leading-6 text-white">
            Якщо маєш питання, заглянь сюди
          </span>
        </span>
      </button>

      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? "Закрити швидку допомогу" : "Відкрити швидку допомогу"}
        onClick={() => {
          setIsPromptVisible(false);
          setIsPromptDismissed(true);
          setIsOpen((currentState) => !currentState);
        }}
        className={`fixed bottom-4 right-4 z-[60] inline-flex h-16 w-16 items-center justify-center bg-transparent p-0 text-transparent transition-transform duration-200 hover:-translate-y-0.5 lg:bottom-5 lg:right-5 lg:h-28 lg:w-28 ${
          isOpen ? "scale-[0.96]" : "scale-100"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-11 w-11 fill-none drop-shadow-[0_10px_22px_rgba(0,0,0,0.28)] lg:hidden"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="trainix-help-bot-mobile" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#D8FF92" />
              <stop offset="0.45" stopColor="#7BF160" />
              <stop offset="1" stopColor="#31C565" />
            </linearGradient>
          </defs>
          <path
            d="M12 4.25v2.3M7.5 9.25h9a2.75 2.75 0 0 1 2.75 2.75v3A2.75 2.75 0 0 1 16.5 17.75h-9A2.75 2.75 0 0 1 4.75 15v-3A2.75 2.75 0 0 1 7.5 9.25ZM3.25 12.5h1.5M19.25 12.5h1.5M9.25 12.25h.01M14.75 12.25h.01M9.25 15h5.5"
            stroke="url(#trainix-help-bot-mobile)"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className="help-widget-avatar relative hidden h-24 w-24 items-center justify-center lg:inline-flex">
          <span
            aria-hidden="true"
            className="absolute inset-x-3 bottom-1 h-5 rounded-full bg-[radial-gradient(circle,rgba(95,255,139,0.32),rgba(95,255,139,0)_72%)] blur-md"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_30%_25%,rgba(218,255,157,0.42),rgba(218,255,157,0)_34%),radial-gradient(circle_at_70%_78%,rgba(53,201,102,0.32),rgba(53,201,102,0)_42%)]"
          />
          <span
            aria-hidden="true"
            className="help-widget-avatar-orbit absolute right-2 top-3 h-3 w-3 rounded-full bg-[#d8ff92] shadow-[0_0_14px_rgba(216,255,146,0.7)]"
          />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-0.5 h-5 w-[2px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(216,255,146,0.95),rgba(86,223,102,0.18))]"
          />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-0.5 h-3 w-3 -translate-x-1/2 rounded-full border border-lime-100/40 bg-[radial-gradient(circle,#ebffc0_0%,#b5fb7d_45%,#59d967_100%)] shadow-[0_0_18px_rgba(159,255,126,0.42)]"
          />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[18px] h-[54px] w-[62px] -translate-x-1/2 rounded-[20px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,27,22,0.98),rgba(8,14,11,0.96)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_30px_rgba(0,0,0,0.28)]"
          />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[22px] h-[16px] w-[44px] -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,rgba(216,255,146,0.16),rgba(93,247,118,0.3),rgba(216,255,146,0.16))] blur-[1px]"
          />
          <span
            aria-hidden="true"
            className="absolute left-[30px] top-[35px] h-[10px] w-[10px] rounded-full bg-[#dbff95] shadow-[0_0_12px_rgba(219,255,149,0.8)]"
          />
          <span
            aria-hidden="true"
            className="absolute right-[30px] top-[35px] h-[10px] w-[10px] rounded-full bg-[#78f360] shadow-[0_0_12px_rgba(120,243,96,0.7)]"
          />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[49px] h-[4px] w-[24px] -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,rgba(216,255,146,0.95),rgba(91,225,103,0.95))]"
          />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[63px] h-[10px] w-[22px] -translate-x-1/2 rounded-b-[10px] rounded-t-[6px] border border-emerald-200/16 bg-[linear-gradient(180deg,rgba(18,30,23,0.92),rgba(11,20,15,0.96))]"
          />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[69px] h-[28px] w-[58px] -translate-x-1/2 rounded-[18px] bg-[linear-gradient(180deg,rgba(22,35,28,0.92),rgba(10,16,13,0.98))] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[73px] h-[8px] w-[34px] -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,rgba(216,255,146,0.18),rgba(91,225,103,0.34),rgba(216,255,146,0.18))]"
          />
          <span
            aria-hidden="true"
            className="absolute left-[16px] top-[74px] h-[22px] w-[14px] rounded-full bg-[linear-gradient(180deg,rgba(17,29,21,0.92),rgba(9,15,12,0.98))]"
          />
          <span
            aria-hidden="true"
            className="absolute right-[16px] top-[74px] h-[22px] w-[14px] rounded-full bg-[linear-gradient(180deg,rgba(17,29,21,0.92),rgba(9,15,12,0.98))]"
          />
        </span>
      </button>
    </>
  );
}
