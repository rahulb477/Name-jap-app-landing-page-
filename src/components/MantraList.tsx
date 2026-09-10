import { cn } from "../utils/cn";
import { MANTRAS, type Mantra } from "../lib/data";
import { Check, ChevronRight } from "./Icons";
import { OmArc } from "./Decor";

export function MantraList({
  mantra,
  onMantraChange,
  onToast,
}: {
  mantra: Mantra;
  onMantraChange: (m: Mantra) => void;
  onToast: (msg: string) => void;
}) {
  return (
    <div className="rounded-[30px] border border-[#F3DDBE] bg-card px-6 pb-2 pt-7 shadow-[0_28px_70px_rgba(180,110,40,0.16)] sm:px-8">
      <h3 className="text-center text-[15px] font-semibold text-ink">Select Mantra</h3>

      <ul className="mt-6">
        {MANTRAS.map((m) => {
          const active = m === mantra;
          return (
            <li key={m}>
              <button
                type="button"
                onClick={() => {
                  onMantraChange(m);
                  onToast(`Mantra set — ${m}`);
                }}
                aria-pressed={active}
                className={cn(
                  "group flex w-full items-center justify-between text-left transition-all duration-300",
                  active
                    ? "-mx-8 mb-2 rounded-xl bg-gradient-to-br from-flame-soft to-flame-deep px-7 py-4 text-[17px] font-semibold text-white shadow-[0_16px_34px_rgba(228,87,10,0.4)] sm:-mx-10"
                    : "border-b border-ink/5 px-1 py-[18px] text-[15px] font-medium text-ink hover:pl-3 hover:text-flame",
                )}
              >
                {m}
                {active ? (
                  <Check className="h-6 w-6 shrink-0" />
                ) : (
                  <ChevronRight className="h-5 w-5 shrink-0 text-ink/55 transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <OmArc className="-mx-6 -mb-2 h-36 sm:-mx-8" />
    </div>
  );
}
