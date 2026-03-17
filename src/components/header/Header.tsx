import { HeaderButton } from "./button/HeaderButton";
import { Menu } from "./menu/Menu";
import { Logo } from "./logo/Logo";

export default function Header() {
  return (
    <header className="grid grid-cols-[auto_1fr_auto] items-center gap-6">
      <div className="justify-self-start">
        <Logo className="h-16 w-auto" />
      </div>

      <div className="justify-self-center">
        <Menu />
      </div>

      <div className="justify-self-end">
        <HeaderButton />
      </div>
    </header>
  );
}
