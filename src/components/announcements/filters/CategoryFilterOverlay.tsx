"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/constants/categories";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CategoryFilterOverlay({ open, onClose }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const location = searchParams.get("location");
  const [selected, setSelected] = useState<string[]>([]);

  // RESET STANU po zmianie query!
  useEffect(() => {
    const updated = (searchParams.get("category") || "")
      .split(",")
      .filter(Boolean);
    setSelected(updated);
  }, [searchParams]);

  const toggleCategory = (key: string) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
    );
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (selected.length > 0) {
      params.set("category", selected.join(","));
    }
    router.push(`/ogloszenia?${params.toString()}`);
    onClose();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-start pt-24 px-4 lg:hidden"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 animate-in slide-in-from-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[color:var(--accent-dark)]">
            Wybierz kategorie
          </h2>
          <Button
            className="flex items-center gap-1"
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            <X className="!w-6 !h-6 text-destructive" /> Zamknij
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-6">
          {CATEGORIES.map(({ key, label, icon }) => {
            const isActive = selected.includes(key);
            return (
              <Toggle
                key={key}
                pressed={isActive}
                onPressedChange={() => toggleCategory(key)}
                className={`w-full justify-start text-sm border-2 ${
                  isActive
                    ? "bg-[color:var(--accent-main)/10] text-[color:var(--accent-main)] border-[color:var(--accent-main)]"
                    : "border-border"
                }`}
              >
                <span className="mr-2">{icon}</span>
                {label}
              </Toggle>
            );
          })}
        </div>

        <Button
          onClick={applyFilters}
          className="w-full bg-[color:var(--accent-main)] hover:bg-[color:var(--accent-main-hover)] text-white"
        >
          Zastosuj filtry
        </Button>
      </div>
    </div>
  );
}
