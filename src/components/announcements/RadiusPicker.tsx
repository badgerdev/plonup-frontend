"use client";

const OPTIONS = [25, 50, 75, 100];

interface Props {
  value: number;
  onChange: (km: number) => void;
}

export function RadiusPicker({ value, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {OPTIONS.map((km) => (
        <button
          key={km}
          onClick={() => onChange(km)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            value === km
              ? "bg-[var(--accent-main)] text-white"
              : "bg-white border border-gray-300 text-[var(--text-main)] hover:border-[var(--accent-main)]"
          }`}
        >
          {km} km
        </button>
      ))}
    </div>
  );
}
