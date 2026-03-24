import type { ReactNode } from "react";
import Link from "next/link";

import { Container } from "@/components/ui/container";

type SupportShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function SupportShell({
  eyebrow,
  title,
  description,
  children,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: SupportShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(104,255,153,0.14),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(61,194,255,0.08),transparent_34%)]" />

      <div className="relative z-10 py-8 sm:py-12">
        <Container>
          <div className="rounded-[28px] border border-white/10 bg-black/40 p-6 backdrop-blur-xl sm:p-8 lg:p-10">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-emerald-200/66">
              {eyebrow}
            </p>
            <h1 className="mt-3 max-w-[14ch] text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-[62ch] text-sm leading-7 text-white/64 sm:text-[0.98rem]">
              {description}
            </p>

            {children ? <div className="mt-8">{children}</div> : null}

            {primaryHref || secondaryHref ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {primaryHref && primaryLabel ? (
                  <Link
                    href={primaryHref}
                    className="inline-flex h-12 items-center justify-center rounded-full bg-[linear-gradient(90deg,#99f870_0%,#48d66d_100%)] px-5 text-sm font-medium text-[#071108] shadow-[0_18px_40px_rgba(107,255,148,0.22)] transition duration-300 hover:brightness-105"
                  >
                    {primaryLabel}
                  </Link>
                ) : null}

                {secondaryHref && secondaryLabel ? (
                  <Link
                    href={secondaryHref}
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/12 bg-white/7 px-5 text-sm font-medium text-white/88 backdrop-blur-md transition duration-300 hover:border-white/18 hover:bg-white/10"
                  >
                    {secondaryLabel}
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>
        </Container>
      </div>
    </main>
  );
}
