"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  formatPhoneNumber,
  formatPostalCode,
} from "@/lib/formatters/formatters";
import { EditAnnouncementImages } from "./EditAnnouncementImages";
import { toast } from "sonner";

// UI
import {
  Info,
  AlertTriangle,
  Loader2,
  MapPin,
  Phone,
  ImageIcon,
  Building2,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRequireActiveAndVerified } from "@/hooks/guards/useRequireActiveAndVerified";

type Props = {
  id: number;
  moderationStatus?: "approved" | "needs_fix";
  moderationReason?: string | null;
};

type FormData = {
  title: string;
  description: string;
  businessName: string;
  category: string;
  listing_type: "sale_or_exchange" | "free";
  location: string;
  address: string;
  postal_code: string;
  openingHours: string;
  email: string;
  phone: string;
  notes: string;
};

export function EditAnnouncementBusinessForm({
  id,
  moderationStatus,
  moderationReason,
}: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const requireAction = useRequireActiveAndVerified();

  const isFixMode = moderationStatus === "needs_fix";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/my-announcements/${id}`);

        if (!res.ok) throw new Error("Błąd pobierania danych");
        const data = await res.json();
        setFormData({
          title: data.title,
          description: data.description,
          businessName: data.company_name ?? "",
          category: data.category,
          listing_type: data.listing_type,
          location: data.location,
          address: data.address ?? "",
          postal_code: data.postal_code ?? "",
          openingHours: data.opening_hours ?? "",
          email: data.email ?? "",
          phone: data.phone ?? "",
          notes: data.notes ?? "",
        });
      } catch {
        toast.error("Nie udało się pobrać ogłoszenia.");
        router.push("/panel/twoje-ogloszenia");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, router]);

  const handleChange = (key: keyof FormData, value: string) => {
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

    try {
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
    } catch {
      toast.error("Wystąpił błąd połączenia z serwerem.");
    } finally {
      setSaving(false);
    }
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
            Ogłoszenie wymaga poprawy
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

      {/* 🟡 TRYB: DO POPRAWY */}
      {isFixMode ? (
        <>
          <section className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Building2 className="h-4 w-4" /> Dane firmy
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Tytuł ogłoszenia</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </div>
              <div>
                <Label>Nazwa firmy</Label>
                <Input
                  value={formData.businessName}
                  onChange={(e) => handleChange("businessName", e.target.value)}
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
                <Label>Adres</Label>
                <Input
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
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
                <Label>Godziny otwarcia</Label>
                <Input
                  value={formData.openingHours}
                  onChange={(e) => handleChange("openingHours", e.target.value)}
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
              <ImageIcon className="h-4 w-4" /> Zdjęcia i notatki
            </h2>
            <EditAnnouncementImages id={id} />
            <div>
              <Label>Notatki</Label>
              <Textarea
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
              />
            </div>
          </section>
        </>
      ) : (
        /* 🔵 TRYB: APPROVED — uproszczony */
        <>
          <section className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Building2 className="h-4 w-4" /> Edytuj podstawowe dane
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
