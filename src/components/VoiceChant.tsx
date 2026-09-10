import { useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";
import { devanagari, type Mantra } from "../lib/data";
import { Mic } from "./Icons";
import { useInView } from "../hooks/useInView";

const WAVE_HEIGHTS = [10, 20, 30, 16, 36, 22, 12, 28, 34, 14, 24, 12];

type RisingWord = { id: number; x: number; size: number };

function Waveform({ listening, flip }: { listening: boolean; flip?: boolean }) {
  return (
    <div
      className={cn("flex h-12 items-center gap-[3px]", flip && "flex-row-reverse")}
      aria-hidden="true"
    >
      {WAVE_HEIGHTS.map((h, i) => (
        <span
          key={i}
          className={cn("w-[3px] rounded-full bg-flame transition-all duration-300", listening && "animate-wave")}
          style={{
            height: listening ? h + 8 : Math.max(6, h * 0.55),
            opacity: listening ? 0.95 : 0.55,
            animationDelay: `${i * 0.07}s`,
          }}
        />
      ))}
    </div>
  );
}

export function VoiceChant({
  mantra,
  onToast,
}: {
  mantra: Mantra;
  onToast: (msg: string) => void;
}) {
  const [count, setCount] = useState(102);
  const [listening, setListening] = useState(true);
  const [words, setWords] = useState<RisingWord[]>([]);
  const idRef = useRef(0);
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  useEffect(() => {
    if (!listening || !inView) return;
    const id = window.setInterval(() => {
      setCount((c) => c + 1);
      const wid = ++idRef.current;
      setWords((w) => [
        ...w.slice(-3),
        { id: wid, x: 18 + Math.random() * 60, size: 14 + Math.random() * 14 },
      ]);
      onToast("Saved successfully");
      window.setTimeout(() => {
        setWords((w) => w.filter((x) => x.id !== wid));
      }, 1600);
    }, 2600);
    return () => window.clearInterval(id);
  }, [listening, inView, onToast]);

  return (
    <div
      ref={ref}
      className="rounded-[30px] border border-[#F3DDBE] bg-card px-5 pb-8 pt-7 shadow-[0_28px_70px_rgba(180,110,40,0.16)] sm:px-7"
    >
      <h3 className="text-center text-[15px] font-semibold text-ink">Voice Chant</h3>

      <p className="mt-5 text-xs font-medium text-ink/70">Select Mantra</p>
      <div className="mt-1.5 rounded-md bg-peach-soft px-4 py-3 text-[15px] font-semibold text-flame">
        {mantra}
      </div>

      <div className="relative mt-4 rounded-md bg-peach-soft px-4 pb-5 pt-4 text-center">
        <p className="text-sm font-semibold text-ink">Jap Count</p>
        <p className="mt-1 text-[64px] font-extrabold leading-none text-flame">{count}</p>
        <span className="font-deva absolute bottom-3 left-4 text-xs text-ink/40">
          {devanagari(count)}
        </span>
      </div>

      {/* floating chant words */}
      <div className="relative h-16" aria-hidden="true">
        <span className="font-deva animate-bob absolute left-[28%] top-4 text-2xl font-medium text-ember/85">
          राधे
        </span>
        <span
          className="font-deva animate-bob absolute right-[16%] top-0 text-sm font-medium text-ember/60"
          style={{ animationDelay: "1.2s" }}
        >
          राधे
        </span>
        {words.map((w) => (
          <span
            key={w.id}
            className="font-deva animate-rise absolute top-6 font-semibold text-flame"
            style={{ left: `${w.x}%`, fontSize: w.size }}
          >
            राधे
          </span>
        ))}
      </div>

      {/* mic + waveforms */}
      <div className="mt-2 flex items-center justify-center gap-4 sm:gap-6">
        <Waveform listening={listening} />
        <button
          type="button"
          onClick={() => setListening((l) => !l)}
          aria-pressed={listening}
          aria-label={listening ? "Stop listening" : "Start listening"}
          className="group relative h-24 w-24 shrink-0 outline-none"
        >
          <span
            className={cn(
              "absolute inset-0 rounded-full bg-flame/20",
              listening && "animate-halo",
            )}
            aria-hidden="true"
          />
          <span
            className={cn(
              "absolute inset-0 rounded-full bg-flame/15",
              listening && "animate-halo",
            )}
            style={{ animationDelay: "0.7s" }}
            aria-hidden="true"
          />
          <span
            className={cn(
              "relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-flame-soft to-flame-deep text-white shadow-[0_16px_36px_rgba(228,87,10,0.45)] transition-transform duration-300 group-hover:scale-105 group-active:scale-95",
              listening && "ring-4 ring-flame/25",
            )}
          >
            <Mic className="h-10 w-10" />
          </span>
        </button>
        <Waveform listening={listening} flip />
      </div>

      <div className="mt-6 text-center">
        {listening ? (
          <p className="text-[17px] font-medium text-ink">
            Listening
            <span className="animate-blink">.</span>
            <span className="animate-blink" style={{ animationDelay: "0.2s" }}>
              .
            </span>
            <span className="animate-blink" style={{ animationDelay: "0.4s" }}>
              .
            </span>
          </p>
        ) : (
          <p className="text-[17px] font-medium text-ink/60">Mic is off</p>
        )}
        <p className="mt-1.5 text-[15px] text-ink/80">
          Say "<span className="font-semibold text-flame">{mantra}</span>"
        </p>
      </div>
    </div>
  );
}
