const storeLinks = [
  {
    label: "App Store",
    caption: "Download on the",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M16.77 12.27c.02 2.2 1.93 2.93 1.95 2.94-.02.05-.3 1.03-.99 2.05-.6.88-1.22 1.76-2.2 1.78-.97.02-1.28-.57-2.39-.57-1.1 0-1.45.55-2.37.59-.94.04-1.65-.94-2.26-1.82-1.25-1.8-2.2-5.08-.92-7.3.63-1.1 1.76-1.79 2.98-1.81.93-.02 1.82.62 2.39.62.57 0 1.63-.77 2.75-.66.47.02 1.8.19 2.65 1.43-.07.04-1.58.93-1.57 2.75Zm-1.94-5.02c.5-.61.84-1.45.75-2.29-.72.03-1.59.48-2.11 1.09-.46.53-.87 1.38-.76 2.19.8.06 1.62-.41 2.12-.99Z" />
      </svg>
    ),
  },
  {
    label: "Google Play",
    caption: "Get it on",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path fill="#34A853" d="M4.8 4.62c-.14.14-.25.36-.25.68v13.4c0 .32.1.54.25.68l7.53-7.52L4.8 4.62Z" />
        <path fill="#4285F4" d="M14.85 14.38 7.34 21.9c.23.03.5-.01.8-.18l8.7-4.96-1.99-2.38Z" />
        <path fill="#FBBC04" d="m16.84 7.24-8.7-4.95a1.47 1.47 0 0 0-.8-.18l7.51 7.52 1.99-2.39Z" />
        <path fill="#EA4335" d="M18.62 9.28 14.85 11.5l-2.52 2.5 2.52 2.38 3.76-2.14c1.2-.67 1.2-1.97 0-2.96Z" />
      </svg>
    ),
  },
];

export function HeroStoreButtons() {
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      {storeLinks.map((store) => (
        <a
          key={store.label}
          href={store.href}
          className="inline-flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 text-left text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm transition-colors duration-200 hover:border-emerald-300/25 hover:bg-black/45"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/8 text-white">
            {store.icon}
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[0.65rem] uppercase tracking-[0.16em] text-white/45">
              {store.caption}
            </span>
            <span className="mt-1 text-sm font-semibold">{store.label}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
