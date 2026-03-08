// components/announcement/StepFour.tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAnnouncementStore } from "@/store/announcement";
import FormStepNav from "../FormStepNav";
import { useStepFourValidation } from "@/hooks/announcement/useStepFourValidation";

import {
  formatPostalCode,
  formatPhoneNumber,
} from "@/lib/formatters/formatters";

import {
  PHONE_MASK_PATTERN,
  POSTAL_CODE_MASK_PATTERN,
  MAX_PHONE_LENGTH,
  MAX_POSTAL_CODE_LENGTH,
} from "@/lib/constants/inputMasks";

import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import {
  MapPin,
  Building,
  Mail,
  Phone,
  Clock,
  ShieldCheck,
  Info,
  BadgeCheck,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FormStepNavMobile } from "../FormStepNavMobile";

const StepFour = () => {
  const {
    userType,
    location,
    address,
    postalCode,
    email,
    phone,
    openingHours,
    setField,
    nextStep,
  } = useAnnouncementStore();

  const { validate, errors } = useStepFourValidation(userType!);
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);

  const showBusiness = userType === "business";
  const showPrivate = userType === "private";

  const handleNext = () => {
    const data = { location, address, postalCode, email, phone, openingHours };
    const isValid = validate(data);
    if (!isValid) return;
    nextStep();
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-3xl px-4 sm:px-6 space-y-8">
        {/* Sticky nav (mobile only) */}
        <div className="sticky top-22 z-40 lg:hidden">
          <FormStepNavMobile onNext={handleNext} />
        </div>

        {/* Nagłówek */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Lokalizacja i kontakt
          </h1>
          <p className="mt-3 flex items-center gap-4 text-lg text-gray-500">
            <BadgeCheck className="text-[var(--accent-main)]" />
            Przybliż swoją lokalizację oraz podaj dane kontaktowe.
          </p>
        </div>

        {/* KARTA: LOKALIZACJA */}
        <Card className="bg-white border border-gray-200 shadow-sm rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-xl">
              <MapPin className="h-5 w-5 text-[var(--accent-main)]" />
              Lokalizacja
            </CardTitle>
            <CardDescription>
              Miasto jest wymagane. Dla firm dodaj także adres, kod i godziny.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Miasto */}
            <div className="space-y-2">
              <label
                htmlFor="location"
                className="text-sm font-medium text-gray-700"
              >
                Miasto
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="location"
                  type="text"
                  placeholder="Np. Kraków"
                  className={cn(
                    "w-full pl-11 pr-4 py-2 border rounded-md transition-colors",
                    errors.location
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-gray-300 focus-visible:ring-2 focus-visible:ring-[var(--accent-main)]"
                  )}
                  value={location}
                  onChange={(e) => setField("location", e.target.value)}
                />
              </div>
              {errors.location && (
                <p className="text-sm text-red-600 mt-1">{errors.location}</p>
              )}
            </div>

            {/* Pola specyficzne */}
            {showBusiness && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Ulica i numer */}
                <div className="space-y-2">
                  <label
                    htmlFor="address"
                    className="text-sm font-medium text-gray-700"
                  >
                    Ulica i numer
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="address"
                      type="text"
                      placeholder="Np. Rolnicza 5"
                      className={cn(
                        "w-full pl-11 pr-4 py-2 border rounded-md transition-colors",
                        errors.address
                          ? "border-red-500 focus-visible:ring-red-500"
                          : "border-gray-300 focus-visible:ring-2 focus-visible:ring-[var(--accent-main)]"
                      )}
                      value={address}
                      onChange={(e) => setField("address", e.target.value)}
                    />
                  </div>
                  {errors.address && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Kod pocztowy */}
                <div className="space-y-2">
                  <label
                    htmlFor="postalCode"
                    className="text-sm font-medium text-gray-700"
                  >
                    Kod pocztowy
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="postalCode"
                      type="text"
                      placeholder="Np. 00-001"
                      className={cn(
                        "w-full pl-11 pr-4 py-2 border rounded-md transition-colors",
                        errors.postalCode
                          ? "border-red-500 focus-visible:ring-red-500"
                          : "border-gray-300 focus-visible:ring-2 focus-visible:ring-[var(--accent-main)]"
                      )}
                      value={postalCode}
                      onChange={(e) =>
                        setField("postalCode", formatPostalCode(e.target.value))
                      }
                      pattern={POSTAL_CODE_MASK_PATTERN}
                      maxLength={MAX_POSTAL_CODE_LENGTH}
                    />
                  </div>
                  {errors.postalCode && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.postalCode}
                    </p>
                  )}
                </div>

                {/* Godziny otwarcia */}
                <div className="space-y-2 sm:col-span-2">
                  <label
                    htmlFor="openingHours"
                    className="text-sm font-medium text-gray-700"
                  >
                    Godziny otwarcia
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="openingHours"
                      type="text"
                      placeholder="Np. Pon–Pt 9–17"
                      className={cn(
                        "w-full pl-11 pr-4 py-2 border rounded-md transition-colors",
                        errors.openingHours
                          ? "border-red-500 focus-visible:ring-red-500"
                          : "border-gray-300 focus-visible:ring-2 focus-visible:ring-[var(--accent-main)]"
                      )}
                      value={openingHours}
                      onChange={(e) => setField("openingHours", e.target.value)}
                    />
                  </div>
                  {errors.openingHours && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.openingHours}
                    </p>
                  )}
                </div>
              </div>
            )}

            {showPrivate && (
              <div className="space-y-2">
                <label
                  htmlFor="postalCode"
                  className="text-sm font-medium text-gray-700"
                >
                  Kod pocztowy
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="postalCode"
                    type="text"
                    placeholder="Np. 00-001"
                    className={cn(
                      "w-full pl-11 pr-4 py-2 border rounded-md transition-colors",
                      errors.postalCode
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-gray-300 focus-visible:ring-2 focus-visible:ring-[var(--accent-main)]"
                    )}
                    value={postalCode}
                    onChange={(e) =>
                      setField("postalCode", formatPostalCode(e.target.value))
                    }
                    pattern={POSTAL_CODE_MASK_PATTERN}
                    maxLength={MAX_POSTAL_CODE_LENGTH}
                  />
                </div>
                {errors.postalCode && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.postalCode}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* KARTA: KONTAKT */}
        <Card className="bg-white border border-gray-200 shadow-sm rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Phone className="h-5 w-5 text-[var(--accent-main)]" />
              Kontakt
            </CardTitle>
            <CardDescription>
              Wymagany jest e-mail <u>lub</u> telefon. Dane widzą tylko
              zalogowani.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  maxLength={60}
                  placeholder="E-mail"
                  className={cn(
                    "w-full pl-11 pr-4 py-2 border rounded-md transition-colors",
                    errors.email
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-gray-300 focus-visible:ring-2 focus-visible:ring-[var(--accent-main)]"
                  )}
                  value={email}
                  onChange={(e) => setField("email", e.target.value)}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Telefon */}
            <div
              className={cn(
                "relative flex items-start gap-3 p-4 rounded-lg border transition-colors",
                errors.phone
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 bg-violet-100"
              )}
            >
              <ShieldCheck className="h-5 w-5 mt-0.5 text-[var(--accent-third)] flex-shrink-0" />
              <div className="flex-grow">
                <p className="text-sm font-semibold text-gray-800">
                  Rekomendujemy podanie numeru telefonu — szybciej złapiesz
                  kontakt.
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  Dane kontaktowe zobaczą tylko zalogowani użytkownicy.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                Telefon
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Np. 123 456 789"
                  className={cn(
                    "w-full pl-11 pr-4 py-2 border rounded-md transition-colors",
                    errors.phone
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-gray-300 focus-visible:ring-2 focus-visible:ring-[var(--accent-main)]"
                  )}
                  value={phone}
                  onChange={(e) =>
                    setField("phone", formatPhoneNumber(e.target.value))
                  }
                  pattern={PHONE_MASK_PATTERN}
                  maxLength={MAX_PHONE_LENGTH}
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sekcja Bezpieczeństwa */}
        <div className="pt-2">
          <Collapsible
            open={isCollapsibleOpen}
            onOpenChange={setIsCollapsibleOpen}
          >
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 w-full text-left p-3 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <Info className="h-5 w-5 text-[var(--accent-main)]" />
                <span className="font-semibold text-sm text-gray-700 underline underline-offset-2">
                  Jak bezpiecznie prowadzić transakcje?
                </span>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4 bg-gray-50 rounded-lg mt-2 text-sm text-gray-600">
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>Uważaj na podejrzane e-maile.</strong> Nigdy nie
                    podawaj danych logowania ani karty.
                  </li>
                  <li>
                    <strong>Spotykaj się w bezpiecznych miejscach.</strong>{" "}
                    Publicznie i w dzień.
                  </li>
                  <li>
                    <strong>Minimalizuj dane osobowe.</strong> Podawaj tylko to,
                    co niezbędne.
                  </li>
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Static nav (desktop only) */}
        <div className="hidden lg:block pt-6">
          <FormStepNav onNext={handleNext} />
        </div>
      </div>
    </div>
  );
};

export default StepFour;
