"use client";

import { useEffect, useState } from "react";
import {
  AnnouncementOut,
  AnnouncementStatus,
  AnnouncementType,
  ModerationStatus,
} from "@/lib/helpers/types";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// NIE używamy ToggleGroup ani ToggleGroupItem
import { StatusBadge } from "@/components/badgesUi/StatusBadge";
import { TypeBadge } from "@/components/badgesUi/TypeBadge";
import { ModAnnStatusBadge } from "@/components/badgesUi/ModAnnStatusBadge";
import { CATEGORIES } from "@/lib/constants/categories";
import {
  CalendarDays,
  // Zostawiamy tylko te ikony, które są używane w liście ogłoszeń
  EllipsisVertical,
  Pencil,
  Wrench,
} from "lucide-react";

// Helper do dynamicznego generowania klas dla przycisków filtrów
const getButtonClasses = (
  currentValue: string | undefined,
  targetValue: string,
  baseClasses: string,
  activeClasses: string,
  inactiveClasses: string
) => {
  const isActive = currentValue === targetValue;
  return `${baseClasses} ${
    isActive ? activeClasses : inactiveClasses
  } !h-auto !py-1.5 !px-3 text-xs shadow-sm transition-colors`;
};

export default function MyAnnouncementsFullList() {
  const [announcements, setAnnouncements] = useState<AnnouncementOut[]>([]);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [moderationStatus, setModerationStatus] = useState<
    ModerationStatus | undefined
  >(undefined);

  const [type, setType] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams();
        if (status) query.append("status", status);
        if (type) query.append("type", type);
        if (moderationStatus)
          query.append("moderation_status", moderationStatus);

        const res = await fetch(`/api/my-announcements?${query.toString()}`, {
          cache: "no-store",
        });

        const data = await res.json();
        setAnnouncements(data);
      } catch (err) {
        console.error("❌ Błąd pobierania ogłoszeń:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [status, type, moderationStatus]);

  const findCategory = (key: string) =>
    CATEGORIES.find((c) => c.key === key)?.label || key;

  const findCategoryIcon = (key: string) =>
    CATEGORIES.find((c) => c.key === key)?.icon || "📦";

  return (
    <div className="space-y-6">
      {/* 🔹 Kontener Filtrów (Kompaktowe przyciski) */}
      <div className="p-4 bg-white border border-zinc-200 rounded-xl shadow-sm">
        {/* Nagłówek dla całej sekcji filtrów */}
        <h3 className="text-base font-semibold text-zinc-700 mb-3">Filtry</h3>

        {/* Pojedynczy kontener dla wszystkich małych filtrów - ułożenie w rzędzie z zawijaniem (wrap) */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Typy ogłoszeń */}
          <Button
            variant={type === "private" ? "default" : "outline"}
            className={getButtonClasses(
              type,
              "private",
              "border-zinc-300",
              "!bg-[var(--accent-main)] !text-white hover:!bg-[var(--accent-main)]/90 font-bold",
              "text-gray-600 hover:bg-gray-100"
            )}
            onClick={() =>
              setType((prev) => (prev === "private" ? undefined : "private"))
            }
          >
            Prywatne
          </Button>

          <Button
            variant={type === "business" ? "default" : "outline"}
            className={getButtonClasses(
              type,
              "business",
              "border-zinc-300",
              "!bg-[var(--accent-main)] !text-white hover:!bg-[var(--accent-main)]/90 font-bold",
              "text-gray-600 hover:bg-gray-100"
            )}
            onClick={() =>
              setType((prev) => (prev === "business" ? undefined : "business"))
            }
          >
            Firmowe
          </Button>

          {/* Separator wizualny (opcjonalny) */}
          <div className="w-px h-5 bg-zinc-200 mx-1 hidden sm:block"></div>

          {/* Statusy */}
          <Button
            variant={status === "active" ? "default" : "outline"}
            className={getButtonClasses(
              status,
              "active",
              "border-zinc-300",
              "!bg-green-600 !text-white hover:!bg-green-700 font-bold",
              "text-gray-600 hover:bg-gray-100"
            )}
            onClick={() =>
              setStatus((prev) => (prev === "active" ? undefined : "active"))
            }
          >
            Aktywne
          </Button>

          <Button
            variant={status === "paused" ? "default" : "outline"}
            className={getButtonClasses(
              status,
              "paused",
              "border-zinc-300",
              "!bg-yellow-500 !text-white hover:!bg-yellow-600 font-bold",
              "text-gray-600 hover:bg-gray-100"
            )}
            onClick={() =>
              setStatus((prev) => (prev === "paused" ? undefined : "paused"))
            }
          >
            Zawieszone
          </Button>

          {/* Separator wizualny (opcjonalny) */}
          <div className="w-px h-5 bg-zinc-200 mx-1 hidden sm:block"></div>

          {/* Statusy Moderacji */}
          <Button
            variant={moderationStatus === "pending" ? "default" : "outline"}
            className={getButtonClasses(
              moderationStatus,
              "pending",
              "border-zinc-300",
              "!bg-yellow-500 !text-white hover:!bg-yellow-600 font-bold",
              "text-gray-600 hover:bg-gray-100"
            )}
            onClick={() =>
              setModerationStatus(
                (prev) =>
                  (prev === "pending" ? undefined : "pending") as
                    | ModerationStatus
                    | undefined
              )
            }
          >
            Oczekujące
          </Button>

          <Button
            variant={moderationStatus === "approved" ? "default" : "outline"}
            className={getButtonClasses(
              moderationStatus,
              "approved",
              "border-zinc-300",
              "!bg-green-600 !text-white hover:!bg-green-700 font-bold",
              "text-gray-600 hover:bg-gray-100"
            )}
            onClick={() =>
              setModerationStatus(
                (prev) =>
                  (prev === "approved" ? undefined : "approved") as
                    | ModerationStatus
                    | undefined
              )
            }
          >
            Zatwierdzone
          </Button>

          <Button
            variant={moderationStatus === "rejected" ? "default" : "outline"}
            className={getButtonClasses(
              moderationStatus,
              "rejected",
              "border-zinc-300",
              "!bg-red-600 !text-white hover:!bg-red-700 font-bold",
              "text-gray-600 hover:bg-gray-100"
            )}
            onClick={() =>
              setModerationStatus(
                (prev) =>
                  (prev === "rejected" ? undefined : "rejected") as
                    | ModerationStatus
                    | undefined
              )
            }
          >
            Odrzucone
          </Button>
        </div>
      </div>

      {/* 🔹 Lista ogłoszeń */}
      {loading ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Ładowanie ogłoszeń...</p>
        </div>
      ) : announcements.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            Brak ogłoszeń dla wybranych filtrów.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {announcements.map((a) => (
            <li key={a.id}>
              <div className="p-4 border rounded-lg bg-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3 hover:shadow-md transition">
                {/* Lewa strona */}
                <div className="flex flex-col gap-1 md:max-w-[70%]">
                  <h3 className="font-semibold text-lg line-clamp-1">
                    {a.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      Kategoria: {findCategoryIcon(a.category)}
                      <span className="font-semibold">
                        {findCategory(a.category)}
                      </span>
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4 text-gray-500" /> Dodano:{" "}
                      <span className="font-semibold">
                        {format(new Date(a.created_at), "dd.MM.yyyy", {
                          locale: pl,
                        })}
                      </span>
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <TypeBadge type={a.announcement_type as AnnouncementType} />
                    <ModAnnStatusBadge status={a.moderation_status} />
                  </div>
                </div>

                {/* Prawa strona */}
                <div className="flex flex-col sm:flex-row md:flex-col md:items-end gap-2 mt-2 md:mt-0">
                  <StatusBadge
                    status={a.status as AnnouncementStatus}
                    label={a.status_display}
                  />

                  {/* 🔸 przycisk Zobacz szczegóły */}
                  <Link href={`/panel/twoje-ogloszenia/${a.id}`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full md:w-auto flex items-center gap-1"
                    >
                      <EllipsisVertical className="h-4 w-4" />
                      Więcej / Szczegóły
                    </Button>
                  </Link>

                  {/* 🔹 logika przycisku edycji / poprawy */}
                  {a.moderation_status === "approved" && (
                    <Link href={`/panel/twoje-ogloszenia/${a.id}/edytuj`}>
                      <Button
                        size="sm"
                        variant="default"
                        className="w-full md:w-auto flex items-center gap-1"
                      >
                        <Pencil className="h-4 w-4" />
                        Edytuj
                      </Button>
                    </Link>
                  )}

                  {a.moderation_status === "needs_fix" && (
                    <Link href={`/panel/twoje-ogloszenia/${a.id}/edytuj`}>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-full md:w-auto flex items-center gap-1 bg-[var(--second-orange)] hover:bg-[var(--second-orange-hover)] text-white"
                      >
                        <Wrench className="h-4 w-4" />
                        Popraw ogłoszenie
                      </Button>
                    </Link>
                  )}

                  {/* {[
                    "pending",
                    "rejected",
                    "script_check_rejected",
                    "script_check_approved",
                  ].includes(a.moderation_status) && (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled
                      title="Ogłoszenie nie może być edytowane w tym momencie"
                      className="w-full md:w-auto text-gray-500 cursor-not-allowed"
                    >
                      Oczekuje na moderację
                    </Button>
                  )} */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
