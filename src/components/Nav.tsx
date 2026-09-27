import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { APK_DOWNLOAD_URL } from "../lib/download";
import { Download } from "./Icons";

const LINKS = [
  { href: "#counter", label: "Counter" },
  { href: "#game", label: "Game" },
  { href: "#progress", label: "Progress" },
  { href: "#mantras", label: "Mantras" },
  { href: "#voice", label: "Voice" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled
          ? "bg-cream/85 shadow-[0_10px_34px_rgba(150,90,30,0.10)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="font-deva flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-flame-soft to-flame-deep text-lg font-semibold text-white shadow-[0_6px_16px_rgba(228,87,10,0.35)] transition-transform duration-300 group-hover:scale-110">
            ॐ
          </span>
          <span className="hidden text-[15px] font-bold tracking-tight text-ink sm:block">
            Radha Naam
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink/65 transition-colors duration-200 hover:text-flame"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href={APK_DOWNLOAD_URL}
            aria-label="Download App"
            title="Download App"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-flame-soft to-flame-deep text-white shadow-[0_8px_20px_rgba(228,87,10,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(228,87,10,0.45)]"
          >
            <Download className="h-[18px] w-[18px]" />
          </a>
          <a
            href="#counter"
            className="rounded-full bg-gradient-to-br from-flame-soft to-flame-deep px-5 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(228,87,10,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(228,87,10,0.45)]"
          >
            Start Jap
          </a>
        </div>
      </nav>
    </header>
  );
}
