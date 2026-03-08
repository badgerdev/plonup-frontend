"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAnnouncementStore } from "@/store/announcement";
import type { UserType } from "@/store/announcement";
import FormStepNav from "../FormStepNav";
import { BadgeCheck } from "lucide-react";
import { FormStepNavMobile } from "../FormStepNavMobile";

const StepOne = () => {
  const { userType, setField } = useAnnouncementStore();

  const handleClick = (value: UserType) => {
    setField("userType", value);
  };

  const options: { label: string; value: UserType; desc: string }[] = [
    {
      label: "Osoba prywatna",
      value: "private",
      desc: "Mam nadmiar warzyw, przetworów lub jajek.",
    },
    {
      label: "Gospodarstwo / Firma",
      value: "business",
      desc: "Posiadam sad, plantację lub produkcję.",
    },
  ];

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-2xl px-4 sm:px-6 space-y-8">
        {/* Sticky nav (mobile only) */}
        <div className="lg:hidden">
          <FormStepNavMobile nextDisabled={userType === null} />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Rodzaj ogłoszenia
          </h1>
          <p className="mt-3 flex gap-4 items-center text-lg text-gray-500">
            <BadgeCheck className="text-[var(--accent-main)]" />
            Wybierz, jako kto chcesz dodać ogłoszenie.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {options.map(({ label, value, desc }) => (
            <Card
              key={value}
              onClick={() => handleClick(value)}
              className={cn(
                "p-8 cursor-pointer border-2 rounded-xl transition-all duration-300 transform",
                userType === value
                  ? "border-[var(--accent-green)] bg-green-50 shadow-lg scale-105"
                  : "border-gray-200 hover:border-[var(--accent-main)] hover:shadow-md"
              )}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {label}
              </h2>
              <p className="text-sm text-gray-600">{desc}</p>
            </Card>
          ))}
        </div>

        {/* Static nav (desktop only) */}
        <div className="hidden lg:block pt-6">
          <FormStepNav nextDisabled={userType === null} />
        </div>
      </div>
    </div>
  );
};

export default StepOne;
