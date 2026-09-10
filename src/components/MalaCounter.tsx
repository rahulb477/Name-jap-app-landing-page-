import { useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";
import { MANTRAS, type Mantra } from "../lib/data";
import { Check, ChevronDown, Pause, Play, Reset } from "./Icons";
import { Tassel } from "./Decor";

const BEADS = 40;

export function MalaCounter({
  mantra,
  onMantraChange,
  onToast,
}: {
  mantra: Mantra;
  onMantraChange: (m: Mantra) => void;
  onToast: (msg: string) => void;
}) {
  const [count, setCount] = useState(54);
  const [auto, setAuto] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const filled = Math.round((Math.min(count, 108) / 108) * BEADS);

  useEffect(() => {
    if (!auto) return;
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c + 1 >= 108) {
          setAuto(false);
          onToast("Mala complete — 108 jap");
          return 108;
        }
        return c + 1;
      });
    }, 480);
    return () => window.clearInterval(id);
  }, [auto, onToast]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const increment = () =>
    setCount((c) => {
      if (c >= 108) {
        onToast("Mala complete — 108 jap");
        return c;
      }
      return c + 1;
    });

  return (
    <div className="rounded-[30px] border border-[#F3DDBE] bg-card px-6 pb-7 pt-7 shadow-[0_28px_70px_rgba(180,110,40,0.16)] sm:px-8">
      <h3 className="text-center text-[15px] font-semibold text-ink">Name Jap</h3>

      {/* mantra dropdown */}
      <div ref={menuRef} className="relative mt-4">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex w-full items-center justify-between rounded-lg bg-gradient-to-br from-flame-soft to-flame-deep px-5 py-3.5 text-left text-[15px] font-semibold text-white shadow-[0_10px_24px_rgba(228,87,10,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(228,87,10,0.45)]"
        >
          {mantra}
          <ChevronDown
            className={cn(
              "h-5 w-5 transition-transform duration-300",
              open && "rotate-180",
            )}
          />
        </button>
        <div
          className={cn(
            "absolute z-30 mt-2 w-full origin-top rounded-xl border border-orange-100 bg-white p-1.5 shadow-[0_22px_50px_rgba(120,70,20,0.18)] transition-all duration-200",
            open
              ? "pointer-events-auto scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0",
          )}
          role="listbox"
        >
          {MANTRAS.map((m) => (
            <button
              key={m}
              type="button"
              role="option"
              aria-selected={m === mantra}
              onClick={() => {
                onMantraChange(m);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors duration-150",
                m === mantra
                  ? "bg-peach-soft font-semibold text-flame"
                  : "text-ink/80 hover:bg-peach-soft/70 hover:text-ink",
              )}
            >
              {m}
              {m === mantra && <Check className="h-4 w-4 text-flame" />}
            </button>
          ))}
        </div>
      </div>

      {/* bead ring */}
      <button
        type="button"
        onClick={increment}
        aria-label={`Count one jap of ${mantra}. Current count ${count} of 108`}
        className="group relative mx-auto mt-8 block h-[290px] w-[290px] cursor-pointer rounded-full outline-none transition-transform duration-200 active:scale-[0.97] sm:h-[310px] sm:w-[310px]"
      >
        {Array.from({ length: BEADS }).map((_, i) => {
          // start at the bottom (tassel) and travel clockwise up the left side
          const a = ((90 + (i * 360) / BEADS) * Math.PI) / 180;
          const left = 50 + 45 * Math.cos(a);
          const top = 50 + 45 * Math.sin(a);
          const isFilled = i < filled;
          return (
            <span
              key={i}
              className={cn(
                "bead absolute h-[21px] w-[21px] rounded-full transition-all duration-300",
                isFilled ? "opacity-100" : "opacity-25 saturate-50",
                i === filled - 1 && "animate-beadpop",
              )}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                marginLeft: "-10.5px",
                marginTop: "-10.5px",
              }}
            />
          );
        })}

        <span className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[64px] font-extrabold leading-none text-flame drop-shadow-[0_2px_0_rgba(255,255,255,0.9)] transition-transform duration-200 group-active:scale-110 sm:text-[72px]">
            {count}
          </span>
          <span className="mt-3 h-px w-14 bg-flame/25" />
          <span className="mt-2 text-[26px] font-bold leading-none text-ember">108</span>
          <span className="mt-2 text-[13px] font-semibold tracking-[0.35em] text-flame">
            CHANT
          </span>
        </span>

        <Tassel className="absolute -bottom-[74px] left-1/2 h-[86px] w-[56px] -translate-x-1/2" />
      </button>

      {/* controls */}
      <div className="mt-24 grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setAuto((a) => !a)}
          className={cn(
            "flex flex-col items-center gap-1.5 rounded-xl py-3.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5",
            auto
              ? "bg-flame/15 text-flame-deep shadow-[inset_0_0_0_1.5px_rgba(244,113,31,0.4)]"
              : "bg-[#F1F2F4] text-ink hover:bg-peach-soft",
          )}
        >
          {auto ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 text-ember" />}
          {auto ? "Pause" : "Auto"}
        </button>
        <button
          type="button"
          onClick={() => {
            setAuto(false);
            setCount(0);
          }}
          className="flex flex-col items-center gap-1.5 rounded-xl bg-[#F1F2F4] py-3.5 text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-peach-soft"
        >
          <Reset className="h-5 w-5 text-flame-deep" />
          Reset
        </button>
      </div>
    </div>
  );
}
