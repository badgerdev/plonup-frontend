"use client";

import { useAnnouncementStore } from "@/store/announcement";
import FormStepNav from "../FormStepNav";
import { useStepTwoPrivateValidation } from "@/hooks/announcement/useStepTwoValidation";
import { CATEGORIES } from "@/lib/constants/categories";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { BadgeCheck } from "lucide-react";
import { FormStepNavMobile } from "../FormStepNavMobile";

const StepTwoPrivate = () => {
  const { title, description, category, listingType, setField, nextStep } =
    useAnnouncementStore();

  const { validate, errors } = useStepTwoPrivateValidation();

  const handleNext = () => {
    const isValid = validate({
      title,
      description,
      category,
      listingType: listingType ?? "",
    });
    if (!isValid) return;
    nextStep();
  };

  const isDisabled = !title || !description || !category || !listingType;

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-2xl px-4 sm:px-6 space-y-8">
        {/* Sticky nav (mobile only) */}
        <div className="sticky top-22 z-40 lg:hidden">
          <FormStepNavMobile onNext={handleNext} nextDisabled={isDisabled} />
        </div>

        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Szczegóły ogłoszenia
          </h1>
          <p className="mt-3 text-lg text-gray-500 flex items-start gap-4">
            <BadgeCheck className="text-[var(--accent-main)]" />
            Podaj podstawowe informacje o Twoim produkcie.
          </p>
        </div>

        {/* Formularz */}
        <div className="space-y-6">
          {/* Tytuł */}
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Tytuł ogłoszenia
            </label>
            <Input
              id="title"
              type="text"
              className={cn(
                "w-full px-4 py-2 border rounded-md transition-colors duration-200",
                errors.title
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "border-gray-300 focus-visible:ring-2 focus-visible:ring-[var(--accent-main)]"
              )}
              placeholder="Np. Nadmiar truskawek z działki"
              value={title}
              onChange={(e) => setField("title", e.target.value)}
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-1">{errors.title}</p>
            )}
          </div>

          {/* Opis */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Opis
            </label>
            <Textarea
              id="description"
              className={cn(
                "w-full px-4 py-2 border rounded-md min-h-[120px] transition-colors duration-200",
                errors.description
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "border-gray-300 focus-visible:ring-2 focus-visible:ring-[var(--accent-main)]"
              )}
              placeholder="Krótko opisz swój produkt, ilość, dostępność..."
              value={description}
              onChange={(e) => setField("description", e.target.value)}
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Kategoria */}
          <div className="space-y-2">
            <label
              htmlFor="category"
              className="text-sm font-medium text-gray-700"
            >
              Kategoria
            </label>
            <Select
              value={category}
              onValueChange={(value) => setField("category", value)}
            >
              <SelectTrigger
                id="category"
                className={cn(
                  "w-full h-11 px-4 border rounded-md transition-colors duration-200",
                  errors.category
                    ? "border-red-500 focus-visible:ring-red-500"
                    : "border-gray-300 focus-visible:ring-2 focus-visible:ring-[var(--accent-main)]"
                )}
              >
                <SelectValue placeholder="Wybierz kategorię" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(({ key, label, icon }) => (
                  <SelectItem key={key} value={key}>
                    {icon ? `${icon} ` : ""}
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-600 mt-1">{errors.category}</p>
            )}
          </div>

          {/* Forma ogłoszenia */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Forma ogłoszenia
            </label>
            <div className="flex gap-4 flex-wrap">
              {(
                [
                  { type: "sale_or_exchange", label: "Sprzedaż / Wymiana" },
                  { type: "free", label: "Oddam za darmo" },
                ] as const
              ).map(({ type, label }) => (
                <button
                  key={type}
                  onClick={() => setField("listingType", type)}
                  type="button"
                  className={cn(
                    "px-6 py-2.5 rounded-full border-2 transition-all duration-300 transform",
                    "text-sm font-semibold",
                    listingType === type
                      ? "border-[var(--accent-green)] bg-green-50 text-dark shadow-md"
                      : "border-gray-200 text-gray-600 hover:border-gray-400"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
            {errors.listingType && (
              <p className="text-sm text-red-600 mt-1">{errors.listingType}</p>
            )}
          </div>
        </div>

        {/* Static nav (desktop only) */}
        <div className="hidden lg:block pt-6">
          <FormStepNav onNext={handleNext} nextDisabled={isDisabled} />
        </div>
      </div>
    </div>
  );
};

export default StepTwoPrivate;
