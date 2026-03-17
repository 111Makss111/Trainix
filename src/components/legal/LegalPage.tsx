import Link from "next/link";

import { BackgroundGrid } from "@/components/landing/background-grid";
import { BackgroundPanels } from "@/components/landing/background-panels";
import { NeonGymDecor } from "@/components/landing/neon-gym-decor";
import { Container } from "@/components/ui/container";

type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

type LegalLink = {
  label: string;
  href: string;
  external?: boolean;
};

type LegalFact = {
  label: string;
  value: string;
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
  facts: LegalFact[];
  links: LegalLink[];
};

function ResourceLink({ link }: { link: LegalLink }) {
  const className =
    "inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/74 transition-all duration-300 hover:border-emerald-300/30 hover:bg-emerald-300/[0.08] hover:text-white";

  if (link.external) {
    return (
      <a
        href={link.href}
        target={link.href.startsWith("http") ? "_blank" : undefined}
        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
        className={className}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

export function LegalPage({
  eyebrow,
  title,
  intro,
  lastUpdated,
  sections,
  facts,
  links,
}: LegalPageProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <BackgroundPanels />
      <BackgroundGrid />
      <NeonGymDecor />

      <div className="relative z-10 py-6">
        <Container>
          <div className="min-h-screen p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.75fr)] lg:gap-10">
              <section className="rounded-[26px] border border-white/10 bg-black/28 px-6 py-7 backdrop-blur-xl sm:px-8 sm:py-9">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/74 transition-colors duration-300 hover:border-white/16 hover:text-white"
                >
                  <span aria-hidden="true">←</span>
                  Повернутися на головну
                </Link>

                <div className="mt-7">
                  <p className="text-[0.7rem] font-medium uppercase tracking-[0.24em] text-emerald-200/62">
                    {eyebrow}
                  </p>
                  <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-[3rem]">
                    {title}
                  </h1>
                  <p className="mt-4 max-w-[48rem] text-sm leading-7 text-white/66 sm:text-[0.98rem]">
                    {intro}
                  </p>
                  <p className="mt-4 text-sm font-medium text-emerald-200/74">
                    Last updated: {lastUpdated}
                  </p>
                </div>

                <div className="mt-8 space-y-6">
                  {sections.map((section) => (
                    <article
                      key={section.title}
                      className="rounded-[22px] border border-white/8 bg-white/[0.03] px-5 py-5"
                    >
                      <h2 className="text-xl font-semibold tracking-[-0.03em] text-white">
                        {section.title}
                      </h2>
                      <div className="mt-3 space-y-3 text-sm leading-7 text-white/68 sm:text-[0.96rem]">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>

                      {section.bullets && section.bullets.length > 0 ? (
                        <ul className="mt-4 space-y-2 text-sm leading-7 text-white/72 sm:text-[0.96rem]">
                          {section.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-3">
                              <span className="mt-2 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(131,255,158,0.45)]" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </article>
                  ))}
                </div>
              </section>

              <aside className="space-y-4 lg:pt-16">
                <div className="rounded-[24px] border border-white/10 bg-black/30 p-5 backdrop-blur-xl">
                  <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-emerald-200/62">
                    Quick facts
                  </p>
                  <div className="mt-4 space-y-3">
                    {facts.map((fact) => (
                      <div
                        key={fact.label}
                        className="rounded-[18px] border border-white/8 bg-white/[0.03] px-4 py-3"
                      >
                        <p className="text-[0.72rem] uppercase tracking-[0.16em] text-white/42">
                          {fact.label}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-white/80">
                          {fact.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-black/30 p-5 backdrop-blur-xl">
                  <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-emerald-200/62">
                    Useful links
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {links.map((link) => (
                      <ResourceLink key={link.label} link={link} />
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
}
