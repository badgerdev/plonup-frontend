import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { AnnouncementPreviewCard } from "@/components/home/AnnouncementPreviewCard";
import { AnnouncementOut } from "@/lib/helpers/types";

import Link from "next/link";
import { MoveRight } from "lucide-react";

export default async function HomeAnnouncementsPreview() {
  let announcements: AnnouncementOut[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/announcements/?limit=4`,
      {
        cache: "no-cache",
      }
    );

    if (res.ok) {
      const data = await res.json();
      announcements = data.items ?? data;
    }
  } catch (error) {
    console.error("Failed to fetch announcements:", error);
  }

  return (
    <section className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-24 text-center ">
        <div className="mb-12 flex flex-col">
          <p className="text-left text-lg uppercase font-extrabold text-[var(--accent-main)]">
            Dla każdego
          </p>
          <h2 className="pt-4 text-3xl sm:text-4xl font-light text-gray-700 text-left">
            Najnowsze ogłoszenia w{" "}
            <span className="font-semibold">Plonup.</span>
          </h2>
        </div>

        <RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {announcements.length > 0 ? (
              announcements.map((item) => (
                <AnnouncementPreviewCard key={item.id} item={item} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full">
                Brak ogłoszeń do wyświetlenia.
              </p>
            )}
          </div>
        </RevealOnScroll>

        <Link
          href="/ogloszenia"
          className="group inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-[var(--accent-main)] text-[var(--accent-main)] hover:bg-[var(--accent-main)] hover:text-white transition-all text-sm font-semibold"
        >
          Zobacz wszystkie
          <span className="transition-transform group-hover:translate-x-1">
            <MoveRight className="w-4 h-4" />
          </span>
        </Link>
      </div>
    </section>
  );
}
