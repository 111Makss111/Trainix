import { BackgroundGrid } from "@/components/landing/background-grid";
import { BackgroundPanels } from "@/components/landing/background-panels";
import { NeonGymDecor } from "@/components/landing/neon-gym-decor";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <BackgroundPanels />
      <BackgroundGrid />
      <NeonGymDecor />

      <div className="relative z-10">
        {/* тут уже твій контент: хіро, текст, телефони тощо */}
      </div>
    </main>
  );
}
