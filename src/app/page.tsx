import { BackgroundGrid } from "@/components/landing/background-grid";
import { BackgroundPanels } from "@/components/landing/background-panels";
import { NeonGymDecor } from "@/components/landing/neon-gym-decor";
import { CursorMagicTrail } from "@/components/landing/cursor-glow";
import { Community } from "@/components/community/Community";
import Header from "@/components/header/Header";
import { Features } from "@/components/features/Features";
import { Hero } from "@/components/hero/Hero";
import { Container } from "@/components/ui/container";
export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <CursorMagicTrail />
      <BackgroundPanels />
      <BackgroundGrid />
      <NeonGymDecor />

      <div className="relative z-10">
        <Container>
          <div className="min-h-[calc(100vh-32px)] p-6">
            <Header />
            <Hero />
            <Features />
            <Community />
          </div>
        </Container>
      </div>
    </main>
  );
}
