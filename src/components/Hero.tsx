import { useEffect, useState } from "react";
import { Divider, Reveal } from "./Decor";

const DOTS = 44;
const COUNT = 95;
const FILLED = Math.round((COUNT / 108) * DOTS);

function DottedRing() {
  const dots = Array.from({ length: DOTS });
  const R = 118;
  const [mounted, setMounted] = useState(false);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * COUNT));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mounted]);

  return (
    <div className="relative mx-auto h-[280px] w-[280px] sm:h-[300px] sm:w-[300px]">
      {dots.map((_, i) => {
        const a = ((-90 + (i * 360) / DOTS) * Math.PI) / 180;
        const left = 50 + (R / 2.8) * Math.cos(a);
        const top = 50 + (R / 2.8) * Math.sin(a);
        return (
          <span
            key={i}
            className="absolute h-[7px] w-[7px] rounded-full transition-colors duration-500"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              marginLeft: "-3.5px",
              marginTop: "-3.5px",
              backgroundColor: mounted && i < FILLED ? "#F09A3E" : "#F3D6B0",
              transitionDelay: `${i * 16}ms`,
            }}
          />
        );
      })}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-6xl font-extrabold leading-none text-flame drop-shadow-[0_2px_0_rgba(255,255,255,0.8)] sm:text-7xl">
          {display}
        </span>
        <span className="mt-3 text-2xl font-bold text-ember">108</span>
        <span className="mt-2 h-px w-12 bg-flame/30" />
        <span className="mt-2 text-xs font-semibold tracking-[0.35em] text-flame">
          CHANT
        </span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32">
      {/* ambient wash */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-cream via-[#FBEED3] to-[#F5D5A2]"
        aria-hidden="true"
      />

      <div className="relative z-10 px-5">
        <Reveal className="text-center">
          <h1 className="leading-tight">
            <span className="block text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">
              Radha Naam
            </span>
            <span className="mt-1 block text-5xl font-bold text-flame sm:text-7xl lg:text-8xl">
              Jap Counter
            </span>
          </h1>
          <Divider className="mt-7" />
        </Reveal>

        {/* phone-style card */}
        <Reveal delay={140} className="relative z-10 mx-auto mt-10 max-w-[360px]">
          <div className="flex justify-end px-1">
            <span className="font-deva relative z-20 -mb-4 rounded-lg bg-gradient-to-br from-flame-soft to-flame-deep px-6 py-2.5 text-lg font-semibold text-white shadow-[0_12px_26px_rgba(228,87,10,0.4)]">
              राधे राधे
            </span>
          </div>
          <div className="rounded-[30px] border border-white/70 bg-white/75 px-6 pb-44 pt-9 shadow-[0_30px_70px_rgba(180,110,40,0.22)] backdrop-blur-sm sm:pb-52">
            <DottedRing />
          </div>
        </Reveal>
      </div>

      {/* hand + mala scene, fading over the card bottom */}
      <div className="relative z-20 -mt-40 sm:-mt-48">
        <img
          src="/images/hero-mala.jpg"
          alt="A hand holding a rudraksha mala with a saffron tassel"
          className="mx-auto h-[430px] w-full max-w-[980px] object-cover object-center sm:h-[520px] [mask-image:linear-gradient(to_bottom,transparent,black_26%)]"
        />
      </div>

      {/* scroll cue */}
      <div className="relative z-10 -mt-2 flex justify-center pb-10">
        <a
          href="#counter"
          aria-label="Scroll to the jap counter"
          className="animate-bounce-soft flex h-11 w-11 items-center justify-center rounded-full border border-flame/30 bg-white/60 text-flame backdrop-blur-sm transition-colors hover:bg-flame hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path d="M6 9.5l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
