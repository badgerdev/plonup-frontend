import { AnnouncementPreviewCard } from "@/components/home/AnnouncementPreviewCard";
import { AnnouncementOut } from "@/lib/helpers/types";

interface Props {
  announcementId: number;
}

export default async function RelatedAnnouncements({ announcementId }: Props) {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL;
  const url = `${base}/announcements/${announcementId}/related`;

  let related: AnnouncementOut[] = [];

  try {
    const res = await fetch(url, { cache: "no-cache" });
    if (res.ok) {
      related = await res.json();
    }
  } catch (err) {
    console.error("Błąd pobierania powiązanych ogłoszeń:", err);
  }

  // Jeśli brak danych — nie renderujemy sekcji
  if (!related.length) return null;

  return (
    <section className="mt-12">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Powiązane ogłoszenia
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((item) => (
          <AnnouncementPreviewCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
