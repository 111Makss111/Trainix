const menuItems = [
  {
    label: "Проєкт",
    href: "#project",
  },
  {
    label: "Можливості",
    href: "#features",
  },
  {
    label: "Спільнота",
    href: "#community",
  },
  {
    label: "Тарифи",
    href: "#pricing",
  },
];

type MenuProps = {
  layout?: "desktop" | "mobile";
  onNavigate?: () => void;
  className?: string;
};

export function Menu({
  layout = "desktop",
  onNavigate,
  className = "",
}: MenuProps) {
  const isMobile = layout === "mobile";

  return (
    <nav aria-label="Основна навігація" className={className}>
      <ul
        className={isMobile ? "flex flex-col gap-2" : "flex items-center gap-8"}
      >
        {menuItems.map((menuItem) => (
          <li key={menuItem.href}>
            <a
              href={menuItem.href}
              onClick={onNavigate}
              className={
                isMobile
                  ? "group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-[0.98rem] font-medium text-white/82 transition-[background-color,border-color,color] duration-200 hover:border-emerald-200/18 hover:bg-emerald-300/[0.07] hover:text-white motion-reduce:transition-none"
                  : "text-sm font-medium text-white/70 transition-colors duration-200 hover:text-white motion-reduce:transition-none"
              }
            >
              {menuItem.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
