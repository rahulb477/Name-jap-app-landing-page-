import { useState } from "react";
import { cn } from "../utils/cn";
import { CHART_DATA, type RangeKey } from "../lib/data";
import { MalaIcon } from "./Decor";
import { useInView } from "../hooks/useInView";

const RANGES: RangeKey[] = ["Daily", "Weekly", "Monthly"];

export function ProgressChart() {
  const [range, setRange] = useState<RangeKey>("Weekly");
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  const { labels, values, suffix } = CHART_DATA[range];
  const max = Math.max(...values);
  const min = Math.min(...values);
  const total = values.reduce((a, b) => a + b, 0);

  return (
    <div className="rounded-[30px] border border-[#F3DDBE] bg-card px-5 pb-7 pt-7 shadow-[0_28px_70px_rgba(180,110,40,0.16)] sm:px-7">
      <h3 className="text-center text-[15px] font-semibold text-ink">Progress</h3>

      {/* range tabs */}
      <div className="mt-5 grid grid-cols-3 gap-1 rounded-xl bg-[#F5E9DA] p-1">
        {RANGES.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRange(r)}
            className={cn(
              "rounded-lg py-2.5 text-sm font-semibold transition-all duration-300",
              r === range
                ? "bg-gradient-to-br from-flame-soft to-flame-deep text-white shadow-[0_8px_18px_rgba(228,87,10,0.35)]"
                : "text-ink/80 hover:bg-white/70",
            )}
          >
            {r}
          </button>
        ))}
      </div>

      {/* total */}
      <p className="mt-5 text-[13px] font-medium text-ink">Total Jap</p>
      <div className="mt-2 flex items-center justify-between rounded-lg bg-peach-soft px-4 py-3">
        <p>
          <span className="text-2xl font-bold text-flame">{total}</span>{" "}
          <span className="text-sm font-semibold text-flame">{suffix}</span>
        </p>
        <MalaIcon className="h-11 w-9" />
      </div>

      {/* bar chart */}
      <div ref={ref} className="mt-7 flex h-[280px] items-end justify-between gap-2 px-1">
        {values.map((v, i) => {
          const isHigh = v === max;
          const isLow = v === min;
          const h = inView ? (v / max) * 100 : 0;
          return (
            <div key={`${range}-${labels[i]}`} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              {isHigh ? (
                <span className="rounded-full bg-white px-3 py-0.5 text-base font-bold text-flame shadow-[0_6px_16px_rgba(150,90,30,0.18)]">
                  {v}
                </span>
              ) : (
                <span
                  className={cn(
                    "text-sm font-semibold",
                    isLow ? "text-[#9CA3AF]" : "text-peach-deep",
                  )}
                >
                  {v}
                </span>
              )}
              <div
                className={cn(
                  "rounded-full transition-[height] duration-[900ms] ease-out",
                  isHigh
                    ? "w-3.5 bg-gradient-to-t from-flame-deep to-flame-soft shadow-[0_10px_22px_rgba(228,87,10,0.35)]"
                    : isLow
                      ? "w-2.5 bg-[#9CA3AF]"
                      : "w-2.5 bg-peach",
                )}
                style={{ height: `${h}%`, transitionDelay: `${i * 70}ms` }}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex justify-between gap-2 border-t border-ink/5 px-1 pt-3">
        {labels.map((l) => (
          <span key={l} className="flex-1 text-center text-xs font-medium text-ink/80">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
