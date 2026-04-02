"use client";

import { useEffect, useId, useState } from "react";

import { HeaderButton } from "./button/HeaderButton";
import { Menu } from "./menu/Menu";
import { Logo } from "./logo/Logo";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuId = useId();

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    function handleResize() {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function toggleMenu() {
    setIsMenuOpen((currentState) => !currentState);
  }

  return (
    <header className="relative z-30 grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-6">
      <div className="justify-self-start">
        <Logo className="h-12 w-auto sm:h-14 lg:h-16" />
      </div>

      <div className="hidden justify-self-center lg:block">
        <Menu />
      </div>

      <div className="hidden justify-self-end lg:block">
        <HeaderButton />
      </div>

      <div className="justify-self-end lg:hidden">
        <button
          type="button"
          aria-label={isMenuOpen ? "Закрити меню" : "Відкрити меню"}
          aria-expanded={isMenuOpen}
          aria-controls={mobileMenuId}
          onClick={toggleMenu}
          className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-white shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition-[background-color,border-color,color] duration-200 hover:border-emerald-200/18 hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816] motion-reduce:transition-none"
        >
          <span className="sr-only">
            {isMenuOpen
              ? "Закрити навігаційне меню"
              : "Відкрити навігаційне меню"}
          </span>
          <span className="relative h-4.5 w-5">
            <span
              aria-hidden="true"
              className={`absolute left-0 top-0 block h-[2px] w-5 rounded-full bg-current transition-[transform,top] duration-200 motion-reduce:transition-none ${
                isMenuOpen ? "top-[7px] rotate-45" : ""
              }`}
            />
            <span
              aria-hidden="true"
              className={`absolute left-0 top-[7px] block h-[2px] w-5 rounded-full bg-current transition-opacity duration-150 motion-reduce:transition-none ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              aria-hidden="true"
              className={`absolute left-0 top-[14px] block h-[2px] w-5 rounded-full bg-current transition-[transform,top] duration-200 motion-reduce:transition-none ${
                isMenuOpen ? "top-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <button
        type="button"
        aria-label="Закрити меню"
        onClick={closeMenu}
        className={`fixed inset-0 z-40 bg-[#020603]/82 transition-opacity duration-200 motion-reduce:transition-none lg:hidden ${
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <div
        id={mobileMenuId}
        aria-hidden={!isMenuOpen}
        className={`absolute inset-x-0 top-full z-50 mt-4 origin-top transform-gpu rounded-[28px] border border-emerald-200/12 bg-[linear-gradient(180deg,rgba(7,12,10,0.98),rgba(5,8,7,0.96)_100%)] p-3 shadow-[0_22px_54px_rgba(0,0,0,0.34)] will-change-transform transition-[opacity,transform] duration-200 motion-reduce:transition-none lg:hidden ${
          isMenuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="rounded-[22px] border border-white/8 bg-white/[0.025] p-3">
          <div className="mb-3 flex items-center justify-between gap-3 px-1">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-white/42">
              Меню
            </p>

            <button
              type="button"
              onClick={closeMenu}
              aria-label="Закрити меню"
              className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-3 text-sm font-medium text-white/76 transition-[background-color,border-color,color] duration-200 hover:border-emerald-200/18 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816] motion-reduce:transition-none"
            >
              <span aria-hidden="true" className="text-base leading-none">
                ×
              </span>
            </button>
          </div>

          <Menu layout="mobile" onNavigate={closeMenu} />

          <div className="mt-4 border-t border-white/8 pt-4">
            <HeaderButton className="w-full" onClick={closeMenu} />
          </div>
        </div>
      </div>
    </header>
  );
}
