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
    label: "777docmax777@gmail.com",
    href: "mailto:777docmax777@gmail.com",
    external: true,
  },
];

function FooterLinkItem({ link }: { link: FooterLink }) {
  const className =
    "inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/72 transition-all duration-300 hover:border-emerald-300/30 hover:bg-emerald-300/[0.08] hover:text-white";

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

function FooterGroup({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div>
      <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-emerald-200/62">
        {title}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {links.map((link) => (
          <FooterLinkItem key={link.label} link={link} />
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-8 overflow-hidden rounded-[22px] border border-white/10 bg-black/28 px-6 py-8 backdrop-blur-xl sm:px-8 sm:py-10 lg:px-10">
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />
      <div className="pointer-events-none absolute -right-20 top-0 h-52 w-52 rounded-full bg-emerald-300/12 blur-3xl" />
      <div className="pointer-events-none absolute -left-12 bottom-0 h-44 w-44 rounded-full bg-cyan-300/8 blur-3xl" />

      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
        <div className="max-w-[34rem]">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-emerald-200/62">
            Trainix
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-[2rem]">
            Перший офіційний простір для beta-продукту, спільноти та майбутніх
            релізів.
          </h2>
          <p className="mt-4 max-w-[32rem] text-sm leading-7 text-white/64 sm:text-[0.96rem]">
            Тут зібрані основні секції лендингу, офіційні сторінки продукту та
            контактні канали. Коли Trainix перейде від ранньої beta до
            стабільного застосунку, саме ці сторінки стануть базою для
            публічного релізу.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <FooterGroup title="Навігація" links={productLinks} />
          <FooterGroup title="Офіційно" links={legalLinks} />
        </div>
      </div>

      <div className="relative mt-8 grid gap-6 border-t border-white/8 pt-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <FooterGroup title="Контакти" links={contactLinks} />

        <div className="text-sm leading-7 text-white/46 lg:text-right">
          <p>© 2026 Trainix. All rights reserved.</p>
          <p>Early beta product. Information and availability may change.</p>
        </div>
      </div>
    </footer>
  );
}
