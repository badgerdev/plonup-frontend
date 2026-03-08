"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { ModAnnStatusBadge } from "@/components/badgesUi/ModAnnStatusBadge";
import { TypeBadge } from "@/components/badgesUi/TypeBadge";
import { StatusBadge } from "@/components/badgesUi/StatusBadge";
import { CalendarDays, TriangleAlert, Wrench } from "lucide-react";
import { AnnouncementOut, AnnouncementType } from "@/lib/helpers/types";
import { CATEGORIES } from "@/lib/constants/categories";

export default function PendingAnnouncementsList() {
  const [announcements, setAnnouncements] = useState<AnnouncementOut[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const statuses = ["pending", "script_check_approved", "needs_fix"];
        const allResults: AnnouncementOut[] = [];

        for (const status of statuses) {
          const res = await fetch(
            `/api/my-announcements?moderation_status=${status}`,
            {
              cache: "no-store",
            }
          );

          const data = await res.json();
          allResults.push(...data);
        }

        // 🔹 Sortujemy tak, by "needs_fix" były na górze
        allResults.sort((a, b) => {
          if (
            a.moderation_status === "needs_fix" &&
            b.moderation_status !== "needs_fix"
          )
            return -1;
          if (
            a.moderation_status !== "needs_fix" &&
            b.moderation_status === "needs_fix"
          )
            return 1;
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          ); // potem najnowsze
        });

        setAnnouncements(allResults);
      } catch (err) {
        console.error("❌ Błąd pobierania oczekujących ogłoszeń:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPending();
  }, []);

  const findCategory = (key: string) =>
    CATEGORIES.find((c) => c.key === key)?.label || key;

  const findCategoryIcon = (key: string) =>
    CATEGORIES.find((c) => c.key === key)?.icon || "📦";

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-zinc-800">
        Oczekujące ogłoszenia
      </h2>

      {loading ? (
        <p className="text-center text-muted-foreground py-10">
          Ładowanie ogłoszeń...
        </p>
      ) : announcements.length === 0 ? (
        <p className="text-center text-muted-foreground py-10">
          Nie masz obecnie żadnych ogłoszeń w trakcie moderacji.
        </p>
      ) : (
        <ul className="space-y-3">
          {announcements.map((a) => (
            <li key={a.id}>
              <div className="p-4 border rounded-lg bg-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3 hover:shadow-md transition">
                {/* Lewa sekcja */}
                <div className="flex flex-col gap-1 md:max-w-[70%]">
                  <h3 className="font-semibold text-lg line-clamp-1">
                    {a.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      Kategoria: {findCategoryIcon(a.category)}{" "}
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

                  {/* 🔸 Jeśli ogłoszenie wymaga poprawy */}
                  {a.moderation_status === "needs_fix" && (
                    <p className="flex gap-2 items-center text-sm text-[var(--second-orange)] mt-2">
                      <TriangleAlert className="w-5 h-5 text-[var(--second-orange)]" />
                      <b>Ogłoszenie wymaga poprawy</b>
                    </p>
                  )}
                </div>

                {/* Prawa sekcja */}
                <div className="flex items-center justify-end md:flex-col md:items-end gap-2 mt-2 md:mt-0">
                  {/* 🏷️ Główny status (Aktywne / Zawieszone / Zarchiwizowane) */}
                  <StatusBadge status={a.status} label={a.status_display} />

                  {/* 🔹 Przycisk: zawsze "Zobacz szczegóły" */}
                  <div className="flex gap-2">
                    <Link href={`/panel/twoje-ogloszenia/${a.id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        Zobacz szczegóły
                      </Button>
                    </Link>

                    {/* 🔹 Warunkowy drugi przycisk */}
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
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
