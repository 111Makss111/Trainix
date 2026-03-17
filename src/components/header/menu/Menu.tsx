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

export function Menu() {
  return (
    <nav aria-label="Основна навігація">
      <ul className="flex items-center gap-8">
        {menuItems.map((menuItem) => (
          <li key={menuItem.href}>
            <a
              href={menuItem.href}
              className="text-sm font-medium text-white/70 transition-colors duration-200 hover:text-white"
            >
              {menuItem.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
