import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

// UI
import { TypeBadge } from "@/components/badgesUi/TypeBadge";
import { ModAnnStatusBadge } from "@/components/badgesUi/ModAnnStatusBadge";
import { AnnouncementLikesBadge } from "@/components/badgesUi/AnnouncementLikesBadge";
import { AnnouncementImagesPreview } from "@/components/panel/my-announcements/MyAnnouncementsImagesPreview";
import { ManageButtons } from "@/components/panel/my-announcements/ManageButtons";
import { ScrollToTopButton } from "@/components/shared/ScrollToTopButton";
import { Settings } from "lucide-react";

import type {
  AnnouncementStatus,
  AnnouncementType,
  AnnouncementDetail,
} from "@/lib/helpers/types";

type Props = {
  params: { id: string };
};

export default async function MyAnnouncementDetailPage({ params }: Props) {
  const { id } = await params;
  const parsedId = Number(id);
  if (isNaN(parsedId)) return notFound();

  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;
  if (!access) return notFound();

  let announcement: AnnouncementDetail;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/announcements/my/${parsedId}`,
      {
        headers: { Authorization: `Bearer ${access}` },
        cache: "no-store",
      }
    );

    if (!res.ok) return notFound();

    announcement = await res.json();
  } catch (error) {
    console.error("Failed to fetch announcement details:", error);
    return notFound();
  }

  const {
    title,
    description,
    category,
    created_at,
    announcement_type,
    status,
    status_display,
    images,
  } = announcement;

  return (
    <div className="container mx-auto">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* 🔹 HEADER */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 md:p-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <TypeBadge type={announcement_type as AnnouncementType} />
              <AnnouncementLikesBadge
                likesCount={announcement.likes_count}
                announcementId={announcement.id}
              />
              <ModAnnStatusBadge status={announcement.moderation_status} />{" "}
              {/* ✅ lepiej widoczny */}
            </div>
            <span className="text-sm text-muted-foreground">
              Dodano{" "}
              {format(new Date(created_at), "dd.MM.yyyy", { locale: pl })}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight tracking-tight">
            {title}
          </h1>

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-200">
              {category}
            </span>
          </div>
        </div>

        {/* 🔹 MOBILE: zarządzanie idzie wyżej */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-6">
          {/* LEWA — OPIS + ZDJĘCIA */}
          <div className="lg:col-span-2 space-y-6 mt-6 lg:mt-0">
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 md:p-8">
              <h2 className="text-xl font-bold mb-3">Opis</h2>
              <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                {description || "Brak opisu."}
              </p>
            </div>

            {images && images.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 md:p-8">
                <AnnouncementImagesPreview
                  images={images}
                  title={title}
                  announcementId={announcement.id}
                />
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 md:p-8 text-muted-foreground">
              <h2 className="text-lg font-semibold mb-2">Statystyki</h2>
              <p className="text-sm">
                Tu mogą być dane o wyświetleniach, kliknięciach itp.
              </p>
            </div>
          </div>

          {/* PRAWA — PANEL ZARZĄDZANIA */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 md:p-8">
              <h2 className="flex text-zinc-800 items-center gap-2 text-base font-semibold mb-4">
                <Settings className="text-zinc-600" />
                Zarządzanie
              </h2>

              {/* 🔹 Manage Buttons (statusy, archiwizacja, usuwanie) */}
              <div className="mt-6">
                <ManageButtons
                  id={announcement.id}
                  status={status as AnnouncementStatus}
                  status_display={status_display}
                  moderation_status={announcement.moderation_status}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
}
