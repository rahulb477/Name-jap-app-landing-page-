import { useState } from "react";
import { cn } from "../utils/cn";
import { BUBBLE_COLORS } from "../lib/data";

type Bubble = {
  id: number;
  color: number;
  size: number;
  x: number; // % from left
  y: number; // % from top
  dur: number;
  delay: number;
  popping: boolean;
};

const INITIAL: Bubble[] = [
  { id: 0, color: 0, size: 74, x: 10, y: 8, dur: 5.2, delay: 0, popping: false },
  { id: 1, color: 1, size: 52, x: 46, y: 3, dur: 4.4, delay: 0.6, popping: false },
  { id: 2, color: 2, size: 66, x: 70, y: 12, dur: 5.8, delay: 1.1, popping: false },
  { id: 3, color: 3, size: 80, x: 34, y: 30, dur: 4.8, delay: 0.3, popping: false },
  { id: 4, color: 4, size: 94, x: 60, y: 50, dur: 5.5, delay: 0.9, popping: false },
  { id: 5, color: 5, size: 70, x: 14, y: 56, dur: 4.6, delay: 1.4, popping: false },
  { id: 6, color: 6, size: 46, x: 7, y: 79, dur: 5.0, delay: 0.2, popping: false },
  { id: 7, color: 7, size: 72, x: 42, y: 80, dur: 5.6, delay: 0.7, popping: false },
];

const rand = (min: number, max: number) => min + Math.random() * (max - min);

export function BubbleGame({ onToast }: { onToast: (msg: string) => void }) {
  const [bubbles, setBubbles] = useState<Bubble[]>(INITIAL);
  const [count, setCount] = useState(15);
  const [glowId, setGlowId] = useState(4);

  const pop = (id: number) => {
    setBubbles((bs) => bs.map((b) => (b.id === id ? { ...b, popping: true } : b)));
    setGlowId(id);
    setCount((c) => c + 1);
    window.setTimeout(() => {
      setBubbles((bs) =>
        bs.map((b) =>
          b.id === id
            ? {
                ...b,
                popping: false,
                x: rand(6, 72),
                y: rand(4, 78),
                size: rand(48, 92),
                color: Math.floor(rand(0, BUBBLE_COLORS.length)),
                dur: rand(4.4, 6),
                delay: 0,
              }
            : b,
        ),
      );
    }, 260);
    if ((count + 1) % 8 === 0) onToast("Eight more jap — keep going");
  };

  return (
    <div className="rounded-[30px] border border-[#F3DDBE] bg-card px-5 pb-6 pt-7 shadow-[0_28px_70px_rgba(180,110,40,0.16)] sm:px-7">
      <h3 className="text-center text-[15px] font-semibold text-ink">Game</h3>

      <div className="mt-4 flex justify-center">
        <span className="rounded-lg bg-gradient-to-br from-flame-soft to-flame-deep px-9 py-2.5 text-[15px] font-semibold text-white shadow-[0_10px_24px_rgba(228,87,10,0.35)]">
          Jap Count : {count}
        </span>
      </div>

      <div className="relative mt-4 h-[430px] overflow-hidden sm:h-[470px]">
        {bubbles.map((b) => {
          const c = BUBBLE_COLORS[b.color];
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => !b.popping && pop(b.id)}
              aria-label="Tap the Radhe bubble to count a jap"
              className={cn(
                "group absolute rounded-full outline-none transition-[left,top,width,height] duration-500 ease-out",
                !b.popping && "animate-bob",
              )}
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: b.size,
                height: b.size,
                animationDelay: `${b.delay}s`,
                animationDuration: `${b.dur}s`,
              }}
            >
              <span
                className={cn(
                  "flex h-full w-full items-center justify-center rounded-full transition-transform duration-200",
                  b.popping ? "bubble-pop" : "group-hover:scale-110 group-focus-visible:scale-110",
                  glowId === b.id && !b.popping && "animate-glowpulse",
                )}
                style={{
                  background: `radial-gradient(circle at 32% 26%, rgba(255,255,255,0.9), rgba(255,255,255,0) 44%), radial-gradient(circle at 68% 80%, ${c.dark}, ${c.base} 72%)`,
                  boxShadow: `inset 0 -7px 14px rgba(0,0,0,0.2), 0 12px 22px ${c.base}44`,
                }}
              >
                <span
                  className="pointer-events-none absolute left-[16%] top-[10%] h-[20%] w-[38%] -rotate-[18deg] rounded-full bg-white/70 blur-[1.5px]"
                  aria-hidden="true"
                />
                <span
                  className="font-deva pointer-events-none relative font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
                  style={{ color: c.text, fontSize: Math.max(15, b.size * 0.3) }}
                >
                  राधे
                </span>
              </span>
            </button>
          );
        })}

        {/* tapping hand */}
        <img
          src="/images/hand-tap.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="animate-tap pointer-events-none absolute -bottom-3 right-[6%] w-32 mix-blend-multiply sm:w-40"
        />
      </div>

      <p className="mt-2 text-center text-xs font-medium text-ink/45">
        Tap the floating bubbles — every pop counts one jap.
      </p>
    </div>
  );
}
