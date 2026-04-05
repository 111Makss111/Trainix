import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

const productLinks: FooterLink[] = [
  { label: "Головна", href: "#project" },
  { label: "Можливості", href: "#features" },
  { label: "Спільнота", href: "#community" },
  { label: "Тарифи", href: "#pricing" },
];

const legalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Health Disclaimer", href: "/health" },
  { label: "Contact", href: "/contact" },
];

const contactLinks: FooterLink[] = [
  {
    label: "Telegram Group",
    href: "https://t.me/+R015CBmeJrhiNzYy",
    external: true,
  },
  {
    label: "support.trainix@gmail.com",
    href: "mailto:support.trainix@gmail.com",
    external: true,
  },
];

function FooterLinkItem({ link }: { link: FooterLink }) {
  const className =
    "inline-flex w-full min-w-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-center text-sm text-white/72 transition-[border-color,background-color,color] duration-300 hover:border-emerald-300/30 hover:bg-emerald-300/[0.08] hover:text-white sm:w-auto sm:justify-start sm:py-2";

  if (link.external) {
    return (
      <a
        href={link.href}
        target={link.href.startsWith("http") ? "_blank" : undefined}
        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
        className={className}
      >
        <span className="min-w-0 break-words">{link.label}</span>
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      <span className="min-w-0 break-words">{link.label}</span>
    </Link>
  );
}

function FooterGroup({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div className="min-w-0">
      <p className="text-center text-[0.68rem] font-medium uppercase tracking-[0.22em] text-emerald-200/62 sm:text-left sm:tracking-[0.24em]">
        {title}
      </p>
      <div className="mt-4 grid gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
        {links.map((link) => (
          <FooterLinkItem key={link.label} link={link} />
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-8 overflow-hidden rounded-[20px] border border-white/10 bg-black/34 px-4 py-6 sm:rounded-[22px] sm:bg-black/28 sm:px-8 sm:py-10 sm:backdrop-blur-xl lg:px-10">
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent sm:inset-x-8" />
      <div className="pointer-events-none absolute -right-20 top-0 hidden h-52 w-52 rounded-full bg-emerald-300/12 blur-3xl lg:block" />
      <div className="pointer-events-none absolute -left-12 bottom-0 hidden h-44 w-44 rounded-full bg-cyan-300/8 blur-3xl lg:block" />

      <div className="relative grid gap-7 sm:gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
        <div className="max-w-[34rem]">
          <p className="text-center text-[0.68rem] font-medium uppercase tracking-[0.22em] text-emerald-200/62 sm:text-left sm:tracking-[0.24em]">
            Trainix
          </p>
          <h2 className="mt-3 text-center text-[1.75rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-left sm:text-[2rem]">
            Перший офіційний простір для beta-продукту, спільноти та майбутніх
            релізів
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
          <FooterGroup title="Навігація" links={productLinks} />
          <FooterGroup title="Офіційно" links={legalLinks} />
        </div>
      </div>

      <div className="relative mt-7 grid gap-5 border-t border-white/8 pt-5 sm:mt-8 sm:gap-6 sm:pt-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <FooterGroup title="Контакти" links={contactLinks} />

        <div className="text-center text-sm leading-6 text-white/46 sm:leading-7 lg:text-right">
          <p>© 2026 Trainix | All rights reserved</p>
          <p>Early beta product | Information and availability may change</p>
        </div>
      </div>
    </footer>
  );
}
