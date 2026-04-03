import { BackgroundGrid } from "@/components/landing/background-grid";
import { BackgroundPanels } from "@/components/landing/background-panels";
import { NeonGymDecor } from "@/components/landing/neon-gym-decor";
import { CursorMagicTrail } from "@/components/landing/cursor-glow";
import { Community } from "@/components/community/Community";
import { Footer } from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { Features } from "@/components/features/Features";
import { Hero } from "@/components/hero/Hero";
import { Pricing } from "@/components/pricing/Pricing";
import { Container } from "@/components/ui/container";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02040a]">
      <div className="pointer-events-none absolute inset-0 lg:hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(123,255,175,0.12),transparent_34%),radial-gradient(circle_at_80%_24%,rgba(246,236,196,0.08),transparent_20%),linear-gradient(180deg,#030712_0%,#040b16_42%,#02040a_100%)]" />
        <div className="absolute inset-x-0 top-0 h-[32vh] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]" />
        <div className="absolute inset-x-[8%] bottom-[12%] h-32 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <CursorMagicTrail />
      <div className="hidden lg:block">
        <BackgroundPanels />
        <BackgroundGrid />
        <NeonGymDecor />
      </div>

      <div className="relative z-10">
        <Container>
          <div className="min-h-[calc(100vh-32px)] p-6">
            <Header />
            <Hero />
            <Features />
            <Community />
            <Pricing />
            <Footer />
          </div>
        </Container>
      </div>
    </main>
  );
}
