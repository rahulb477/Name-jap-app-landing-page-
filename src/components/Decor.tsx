import type { CSSProperties, ReactNode } from "react";
import { cn } from "../utils/cn";
import { useInView } from "../hooks/useInView";

/* ---------------- scroll reveal wrapper ---------------- */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn("reveal", inView && "in-view", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------------- ornamental divider: line · dot · line ---------------- */
export function Divider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-2.5", className)} aria-hidden="true">
      <span className="h-px w-20 bg-gradient-to-l from-flame/60 to-transparent sm:w-28" />
      <span className="h-2.5 w-2.5 rounded-full bg-flame shadow-[0_0_0_4px_rgba(244,113,31,0.16)]" />
      <span className="h-px w-20 bg-gradient-to-r from-flame/60 to-transparent sm:w-28" />
    </div>
  );
}

/* ---------------- section heading: black kicker + big orange title ---------------- */
export function SectionHeading({
  kicker,
  title,
}: {
  kicker: string;
  title: string;
}) {
  return (
    <Reveal className="text-center">
      <h2 className="leading-tight">
        <span className="block text-3xl font-bold text-ink sm:text-4xl">{kicker}</span>
        <span className="mt-1 block text-5xl font-bold text-flame sm:text-6xl lg:text-7xl">
          {title}
        </span>
      </h2>
      <Divider className="mt-6" />
    </Reveal>
  );
}

/* ---------------- line-art mandala ---------------- */
export function Mandala({ className }: { className?: string }) {
  const petals = Array.from({ length: 12 });
  return (
    <svg viewBox="-100 -100 200 200" className={className} aria-hidden="true">
      <g fill="none" stroke="#E9A05C" strokeWidth="1">
        <circle r="94" opacity="0.5" />
        <circle r="70" opacity="0.7" />
        <circle r="26" opacity="0.8" />
        <circle r="12" opacity="0.8" />
        {petals.map((_, i) => (
          <ellipse key={`p${i}`} cx="0" cy="-48" rx="13" ry="24" transform={`rotate(${i * 30})`} opacity="0.65" />
        ))}
        {petals.map((_, i) => (
          <circle key={`d${i}`} cx="0" cy="-82" r="3.4" transform={`rotate(${i * 30 + 15})`} opacity="0.6" />
        ))}
        {petals.map((_, i) => (
          <path key={`s${i}`} d="M0 -26 Q 8 -38 0 -48 Q -8 -38 0 -26" transform={`rotate(${i * 30 + 15})`} opacity="0.5" />
        ))}
      </g>
    </svg>
  );
}

/* ---------------- temple silhouettes along the horizon ---------------- */
export function Temples({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 230" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      <g fill="#F0C489">
        {/* left cluster */}
        <g opacity="0.55">
          <path d="M64 230v-78h60v78z" />
          <path d="M94 96c-26 17-32 40-32 56h64c0-16-6-39-32-56z" />
          <rect x="92" y="66" width="4" height="30" />
          <path d="M96 66l24 9-24 9z" />
          <path d="M150 230v-52h40v52z" />
          <path d="M170 148c-17 11-21 26-21 36h42c0-10-4-25-21-36z" />
          <rect x="168" y="128" width="3" height="20" />
        </g>
        {/* far middle */}
        <g opacity="0.3">
          <path d="M330 230v-40h34v40z" />
          <path d="M347 166c-14 9-17 21-17 29h34c0-8-3-20-17-29z" />
          <rect x="345.5" y="150" width="3" height="16" />
        </g>
        {/* right cluster */}
        <g opacity="0.5">
          <path d="M1074 230v-70h54v70z" />
          <path d="M1101 106c-23 15-29 36-29 50h58c0-14-6-35-29-50z" />
          <rect x="1099" y="78" width="4" height="28" />
          <path d="M1103 78l22 8-22 8z" />
          <path d="M1016 230v-44h36v44z" />
          <path d="M1034 158c-15 10-19 23-19 32h38c0-9-4-22-19-32z" />
        </g>
      </g>
    </svg>
  );
}

/* ---------------- falling petals ambient layer ---------------- */
const PETALS = [
  { left: "5%", delay: 0, dur: 17, w: 16 },
  { left: "16%", delay: 5, dur: 21, w: 12 },
  { left: "29%", delay: 9, dur: 18, w: 14 },
  { left: "42%", delay: 2, dur: 23, w: 11 },
  { left: "55%", delay: 12, dur: 19, w: 15 },
  { left: "66%", delay: 6, dur: 22, w: 12 },
  { left: "78%", delay: 14, dur: 18, w: 16 },
  { left: "88%", delay: 3, dur: 20, w: 13 },
  { left: "95%", delay: 10, dur: 24, w: 11 },
];

export function Petals({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none overflow-hidden", className)} aria-hidden="true">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="animate-fall absolute -top-6"
          style={{
            left: p.left,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          } as CSSProperties}
        >
          <svg width={p.w} viewBox="0 0 24 24">
            <path d="M12 2c6.2 6 6.2 14 0 20-6.2-6-6.2-14 0-20z" fill="#F5BE93" opacity="0.75" />
          </svg>
        </span>
      ))}
    </div>
  );
}

/* ---------------- saffron tassel hanging under the mala ---------------- */
export function Tassel({ className }: { className?: string }) {
  const strands = [-16, -11, -6, 0, 6, 11, 16];
  return (
    <svg viewBox="0 0 60 92" className={className} aria-hidden="true">
      <circle cx="30" cy="9" r="7" fill="#E8891B" />
      <rect x="23.5" y="13" width="13" height="11" rx="5" fill="#D97706" />
      {strands.map((t, i) => (
        <path
          key={t}
          d={`M30 23 C ${30 + t * 0.5} 44, ${30 + t} 60, ${30 + t * 1.5} 86`}
          stroke={i % 2 === 0 ? "#F5A623" : "#E8891B"}
          strokeWidth="3.4"
          strokeLinecap="round"
          fill="none"
        />
      ))}
    </svg>
  );
}

/* ---------------- tiny dotted mala icon (progress card) ---------------- */
export function MalaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 46" className={className} aria-hidden="true">
      <path
        d="M20 9c9.5 4 14.5 13.5 9.5 21.5-5 8-17.5 8-21.5 0C3.5 21.5 10.5 13 20 9"
        fill="none"
        stroke="#8A4520"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeDasharray="0.1 6.6"
      />
      <path d="M20 3.5v4" stroke="#C4271C" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="20" cy="8.5" r="3.6" fill="#C4271C" />
    </svg>
  );
}

/* ---------------- arc of faint Om symbols ---------------- */
export function OmArc({ className }: { className?: string }) {
  const arcs = [
    { r: 46, n: 5, size: 15, o: 0.55 },
    { r: 78, n: 7, size: 17, o: 0.45 },
    { r: 112, n: 9, size: 19, o: 0.36 },
    { r: 148, n: 11, size: 21, o: 0.28 },
  ];
  return (
    <div className={cn("pointer-events-none relative overflow-hidden", className)} aria-hidden="true">
      {arcs.map((arc, ai) =>
        Array.from({ length: arc.n }).map((_, i) => {
          const angle = Math.PI - (i / (arc.n - 1)) * Math.PI; // 180deg -> 0deg
          const x = Math.cos(angle) * arc.r;
          const y = Math.sin(angle) * arc.r;
          return (
            <span
              key={`${ai}-${i}`}
              className="font-deva absolute text-[#D98E5F]"
              style={{
                left: `calc(50% + ${x}px - ${arc.size / 2}px)`,
                bottom: `${y - 24}px`,
                fontSize: `${arc.size}px`,
                opacity: arc.o,
                transform: `rotate(${(angle * 180) / Math.PI - 90}deg)`,
              }}
            >
              ॐ
            </span>
          );
        }),
      )}
    </div>
  );
}
