import { useCallback, useRef, useState, type ReactNode } from "react";
import { cn } from "./utils/cn";
import { MANTRAS, type Mantra } from "./lib/data";
import { Mandala, Petals, Reveal, SectionHeading, Temples } from "./components/Decor";
import { Check } from "./components/Icons";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { MalaCounter } from "./components/MalaCounter";
import { BubbleGame } from "./components/BubbleGame";
import { ProgressChart } from "./components/ProgressChart";
import { MantraList } from "./components/MantraList";
import { VoiceChant } from "./components/VoiceChant";
import { Footer } from "./components/Footer";

function FeatureSection({
  id,
  kicker,
  title,
  mandalaSide,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  mandalaSide: "left" | "right";
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative scroll-mt-24 px-5 py-20 md:py-24">
      <Mandala
        className={cn(
          "animate-spin-slower pointer-events-none absolute top-8 h-64 w-64 opacity-[0.15] md:h-80 md:w-80",
          mandalaSide === "left" ? "-left-28" : "-right-28",
        )}
      />
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading kicker={kicker} title={title} />
        <Reveal delay={120} className="mx-auto mt-12 w-full max-w-[400px]">
          {children}
        </Reveal>
      </div>
    </section>
  );
}

export default function App() {
  const [mantra, setMantra] = useState<Mantra>(MANTRAS[0]);
  const [toast, setToast] = useState("Saved successfully");
  const [toastVisible, setToastVisible] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setToastVisible(true);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setToastVisible(false), 2400);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* base wash */}
      <div
        className="fixed inset-0 -z-10 bg-gradient-to-b from-cream via-[#FBEFD8] to-[#F6DCAE]"
        aria-hidden="true"
      />
      {/* ambient decor */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <Mandala className="animate-spin-slower absolute -left-28 -top-28 h-80 w-80 opacity-25" />
        <Mandala className="animate-spin-slower absolute -right-32 top-[34%] h-96 w-96 opacity-[0.18]" />
        <Temples className="absolute bottom-0 left-0 h-36 w-full opacity-70 md:h-44" />
        <Petals className="absolute inset-0" />
      </div>

      <Nav />

      <main className="relative z-10">
        <Hero />

        <FeatureSection id="counter" kicker="108 Jap" title="Made Simple" mandalaSide="right">
          <MalaCounter mantra={mantra} onMantraChange={setMantra} onToast={showToast} />
        </FeatureSection>

        <FeatureSection id="game" kicker="Exciting" title="Game" mandalaSide="left">
          <BubbleGame onToast={showToast} />
        </FeatureSection>

        <FeatureSection id="progress" kicker="Mantra" title="Chant Status" mandalaSide="right">
          <ProgressChart />
        </FeatureSection>

        <FeatureSection id="mantras" kicker="Change" title="Jap Name" mandalaSide="left">
          <MantraList mantra={mantra} onMantraChange={setMantra} onToast={showToast} />
        </FeatureSection>

        <FeatureSection id="voice" kicker="Voice" title="Chant" mandalaSide="right">
          <VoiceChant mantra={mantra} onToast={showToast} />
        </FeatureSection>
      </main>

      <Footer />

      {/* toast */}
      <div
        aria-live="polite"
        className={cn(
          "fixed bottom-6 right-5 z-50 flex items-center gap-3 rounded-xl bg-[#16181D]/95 px-5 py-4 text-white shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-500",
          toastVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-8 opacity-0",
        )}
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-flame">
          <Check className="h-3.5 w-3.5" />
        </span>
        <span className="text-sm font-medium">{toast}</span>
      </div>
    </div>
  );
}
