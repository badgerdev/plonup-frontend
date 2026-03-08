"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/constants/categories";
import { EditAnnouncementImages } from "./EditAnnouncementImages";
import {
  formatPhoneNumber,
  formatPostalCode,
} from "@/lib/formatters/formatters";
import { toast } from "sonner";

// UI
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Info,
  AlertTriangle,
  Loader2,
  MapPin,
  Phone,
  ImageIcon,
} from "lucide-react";
import { useRequireActiveAndVerified } from "@/hooks/guards/useRequireActiveAndVerified";

type FormDataPrivate = {
  title: string;
  description: string;
  category: string;
  listing_type: "sale_or_exchange" | "free";
  location: string;
  postal_code: string;
  email: string;
  phone: string;
};

type Props = {
  id: number;
  moderationStatus?: "approved" | "needs_fix";
  moderationReason?: string | null;
};

export function EditAnnouncementPrivateForm({
  id,
  moderationStatus,
  moderationReason,
}: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormDataPrivate | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const requireAction = useRequireActiveAndVerified();

  const isFixMode = moderationStatus === "needs_fix";

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/my-announcements/${id}`);

      if (!res.ok) {
        toast.error("Nie udało się pobrać ogłoszenia.");
        return;
      }
      const data = await res.json();
      setFormData({
        title: data.title,
        description: data.description,
        category: data.category,
        listing_type: data.listing_type,
        location: data.location,
        postal_code: data.postal_code ?? "",
        email: data.email ?? "",
        phone: data.phone ?? "",
      });
      setLoading(false);
    };
    fetchData();
  }, [id, router]);

  const handleChange = (key: keyof FormDataPrivate, value: string) => {
    setFormData((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allowed = requireAction(() => {});
    if (!allowed) return;
    if (!formData) return;

    setSaving(true);
    const endpoint = isFixMode
      ? `/api/my-announcements/${id}/resubmit`
      : `/api/my-announcements/${id}/edit`;

    const res = await fetch(endpoint, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast.success(
        isFixMode
          ? "Poprawione ogłoszenie zostało ponownie wysłane do moderacji."
          : "Zapisano zmiany. Ogłoszenie trafi ponownie do moderacji."
      );
      router.push(`/panel/twoje-ogloszenia/${id}`);
    } else {
      toast.error("Nie udało się zapisać zmian.");
    }
    setSaving(false);
  };

  if (loading || !formData) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Ładowanie danych...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10 mb-16">
      {/* 🔹 Baner informacyjny */}
      {isFixMode ? (
        <div className="bg-amber-100 border border-amber-300 text-amber-800 p-4 rounded-lg">
          <div className="flex items-center gap-2 font-medium">
            <AlertTriangle className="h-5 w-5 text-amber-700" />
            Wymaga poprawy
          </div>
          {moderationReason && (
            <p className="text-sm mt-2">{moderationReason}</p>
          )}
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg">
          <div className="flex items-center gap-2 font-medium">
            <Info className="h-5 w-5 text-blue-600" />
            Po zapisaniu ogłoszenie trafi ponownie do moderacji.
          </div>
          <p className="text-sm mt-2">
            Nie będzie widoczne publicznie, dopóki moderator go nie zatwierdzi.
          </p>
        </div>
      )}

      {/* ✅ Tryb 1: DO POPRAWY — pełny formularz */}
      {isFixMode ? (
        <>
          <section className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Info className="h-4 w-4" /> Dane ogólne
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Tytuł</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </div>
              <div>
                <Label>Kategoria</Label>
                <Select
                  value={formData.category}
                  onValueChange={(v) => handleChange("category", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz kategorię" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c.key} value={c.key}>
                        {c.icon} {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Opis</Label>
              <Textarea
                rows={5}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Lokalizacja
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Miasto</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
              </div>
              <div>
                <Label>Kod pocztowy</Label>
                <Input
                  value={formData.postal_code}
                  onChange={(e) =>
                    handleChange(
                      "postal_code",
                      formatPostalCode(e.target.value)
                    )
                  }
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Phone className="h-4 w-4" /> Kontakt
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Email</Label>
                <Input
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
              <div>
                <Label>Telefon</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    handleChange("phone", formatPhoneNumber(e.target.value))
                  }
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ImageIcon className="h-4 w-4" /> Zdjęcia
            </h2>
            <EditAnnouncementImages id={id} />
          </section>
        </>
      ) : (
        /* ✅ Tryb 2: APPROVED — tylko wybrane pola - STANDARDOWA EDYCJA OGŁOSZENIA UŻYTKOWNIKA */
        <>
          <section className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Info className="h-4 w-4" /> Edytuj podstawowe dane
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Tytuł</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>Opis</Label>
              <Textarea
                rows={5}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Lokalizacja i kontakt
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Miasto</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
              </div>
              <div>
                <Label>Kod pocztowy</Label>
                <Input
                  value={formData.postal_code}
                  onChange={(e) =>
                    handleChange(
                      "postal_code",
                      formatPostalCode(e.target.value)
                    )
                  }
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
              <div>
                <Label>Telefon</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    handleChange("phone", formatPhoneNumber(e.target.value))
                  }
                />
              </div>
            </div>
          </section>
        </>
      )}

      <Button type="submit" className="w-full mt-6" disabled={saving}>
        {saving
          ? "Zapisywanie..."
          : isFixMode
            ? "Wyślij do ponownej weryfikacji"
            : "Zapisz zmiany"}
      </Button>
    </form>
  );
}
