"use client";

import { useAnnouncementStore } from "@/store/announcement";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

// custom types:
import { ValidationError } from "@/lib/helpers/types";

// ui
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Loader2,
  FileCheck2,
  ArrowLeft,
  ListChecks,
  Info,
  BadgeCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { authFetch } from "@/lib/authFetch";

const StepFive = () => {
  const {
    userType,
    title,
    description,
    category,
    listingType,
    businessName,
    postalCode,
    openingHours,
    location,
    email,
    phone,
    address,
    images,
    reset,
    prevStep,
  } = useAnnouncementStore();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("announcement_type", userType!);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("postal_code", postalCode);
    formData.append("listing_type", listingType!);
    if (email.trim() !== "") {
      formData.append("email", email);
    }

    if (phone.trim() !== "") {
      formData.append("phone", phone);
    }
    if (userType === "business") {
      formData.append("company_name", businessName);
      formData.append("address", address);
      formData.append("opening_hours", openingHours);
      formData.append("notes", "");
    }

    images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const res = await authFetch("/api/announcements", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        let message = "Błąd nieznany";

        if (Array.isArray(data)) {
          message = data
            .map((err: ValidationError) => err?.msg ?? "Błąd walidacji")
            .join("; ");
        } else if (typeof data === "object" && data.detail) {
          message = data.detail;
        } else {
          message = JSON.stringify(data); // fallback
        }
        toast.error(message);
        setError(message);
        return;
      }

      toast.success("Ogłoszenie dodane");
      reset();
      router.replace("/panel");
    } catch (err) {
      console.error("Błąd:", err);
      toast.error("Błąd sieci lub połączenia");
      setError("Wystąpił błąd sieci.");
    } finally {
      setLoading(false);
    }
  };

  const SummaryItem = ({
    label,
    value,
  }: {
    label: string;
    value: string | undefined | null;
  }) => {
    if (!value) return null;
    return (
      <li className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2 break-words text-sm md:text-base">
        <strong className="text-gray-600 min-w-[140px] font-medium">
          {label}:
        </strong>
        <span className="text-gray-800 font-semibold">{value}</span>
      </li>
    );
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-4xl px-2 sm:px-6 space-y-8">
        <div className="pt-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Podsumowanie
          </h1>
          <p className="mt-3 flex items-center justify-center gap-2 text-lg text-gray-500">
            <ListChecks className="text-[var(--accent-main)]" />
            Sprawdź dane przed publikacją.
          </p>
        </div>

        <div className="space-y-6">
          <Card className="p-4 rounded-2xl shadow-sm border-2 border-gray-100">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2 text-gray-700">
                <Info className="h-5 w-5 text-gray-500" />
                Informacje podstawowe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <SummaryItem
                  label="Typ ogłoszenia"
                  value={userType === "private" ? "Osoba prywatna" : "Firma"}
                />
                <SummaryItem label="Tytuł" value={title} />
                <SummaryItem label="Opis" value={description} />
                <SummaryItem label="Kategoria" value={category} />
                <SummaryItem
                  label="Typ ogłoszenia"
                  value={
                    listingType === "free"
                      ? "Oddam za darmo"
                      : "Sprzedaż / Wymiana"
                  }
                />
              </ul>
            </CardContent>
          </Card>

          <Card className="p-4 rounded-2xl shadow-sm border-2 border-gray-100">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2 text-gray-700">
                <BadgeCheck className="h-5 w-5 text-gray-500" />
                Dane kontaktowe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <SummaryItem label="Lokalizacja" value={location} />
                <SummaryItem label="Kod pocztowy" value={postalCode} />
                <SummaryItem label="E-mail" value={email || "Brak"} />
                <SummaryItem label="Telefon" value={phone || "Brak"} />
                {userType === "business" && (
                  <>
                    <SummaryItem label="Nazwa firmy" value={businessName} />
                    <SummaryItem label="Adres" value={address} />
                    <SummaryItem
                      label="Godziny otwarcia"
                      value={openingHours}
                    />
                  </>
                )}
              </ul>
            </CardContent>
          </Card>

          <Card className="p-4 rounded-2xl shadow-sm border-2 border-gray-100">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2 text-gray-700">
                <FileCheck2 className="h-5 w-5 text-gray-500" />
                Zdjęcia
              </CardTitle>
              <p className="text-sm text-gray-500">
                Łącznie: ({images.length})
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((file, i) => (
                  <div
                    key={i}
                    className={cn(
                      "relative w-full aspect-square rounded-xl overflow-hidden shadow-md",
                      i === 0 ? "border-2 border-[var(--accent-main)]" : ""
                    )}
                  >
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`preview-${i}`}
                      fill
                      className="object-cover"
                    />
                    {i === 0 && (
                      <div className="absolute top-2 left-2 bg-[var(--accent-main)] text-white text-xs font-semibold px-2 py-1 rounded-full">
                        Główne
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {error && (
          <p className="text-sm text-red-600 text-center mt-4">{error}</p>
        )}

        <div className="flex flex-col gap-4 mt-8 items-center">
          <Button
            onClick={() => prevStep()}
            variant="ghost"
            className="w-full text-lg font-semibold text-gray-600 hover:text-gray-900 transition hover:bg-transparent max-w-sm rounded-full px-6 py-3 gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Wróć i edytuj
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full border-2 border-[var(--accent-green)] bg-white max-w-sm rounded-full text-lg font-semibold px-6 py-5 gap-2 text-[var(--accent-green-dark)] hover:bg-[var(--accent-green)] hover:text-white hover:cursor-pointer transition shadow-md"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Dodawanie...
              </>
            ) : (
              <>
                <FileCheck2 className="w-5 h-5" />
                Dodaj ogłoszenie
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepFive;
