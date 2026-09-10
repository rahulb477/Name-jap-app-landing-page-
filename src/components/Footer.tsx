import { Divider } from "./Decor";

export function Footer() {
  return (
    <footer className="relative px-5 pb-14 pt-8 text-center">
      <Divider />
      <p className="font-deva mt-8 text-4xl font-semibold text-flame">राधे राधे</p>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink/60">
        108 Jap · Made Simple. Count every chant with love — by bead, by bubble,
        or by voice.
      </p>
      <p className="mt-6 text-xs font-medium tracking-wide text-ink/40">
        © 2026 Radha Naam Jap Counter · Crafted with devotion
      </p>
    </footer>
  );
}
