"use client";

import { useAnnouncementStore } from "@/store/announcement";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

const steps = [
  "Typ ogłoszenia",
  "Szczegóły",
  "Zdjęcia",
  "Lokalizacja i kontakt",
  "Podsumowanie",
];

const AnnouncementStepsIndicator = () => {
  const { step, setField } = useAnnouncementStore();

  const currentLabel = useMemo(() => steps[step - 1] ?? "", [step]);

  const StepButtons = ({ compact = false }: { compact?: boolean }) => (
    <div
      className={cn(
        "flex gap-2 flex-col md:flex-wrap",
        compact ? "px-2 py-2" : "md:flex-col md:w-56 text-sm md:text-lg"
      )}
    >
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const current = step === stepNumber;
        const future = step < stepNumber;

        return (
          <button
            key={label}
            disabled={future}
            onClick={() => setField("step", stepNumber)}
            className={cn(
              "px-3 py-2 text-left rounded-md border border-transparent",
              compact && "text-sm",
              current &&
                "bg-gray-50 text-[var(--accent-main)] border-2 border-[var(--accent-main)] font-medium",
              future && "opacity-40 blur-[1px] cursor-not-allowed",
              !current && !future && "opacity-80 hover:opacity-100 transition"
            )}
          >
            {stepNumber}. {label}
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      {/* MOBILE: kompakt + collapsible */}
      <div className="md:hidden w-full">
        <details className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <summary className="list-none cursor-pointer select-none flex items-center justify-between gap-3 px-4 py-3">
            <span className="text-sm font-semibold text-gray-800">
              {step}. {currentLabel}
            </span>
            <span className="text-xs text-gray-500">
              Krok {step} / {steps.length}
            </span>
          </summary>
          <div className="border-t border-gray-100">
            <StepButtons compact />
          </div>
        </details>
      </div>

      <div className="hidden md:block bg-gray-100 rounded-md p-2 shadow-sm">
        <StepButtons />
      </div>
    </>
  );
};

export default AnnouncementStepsIndicator;
