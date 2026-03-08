import { ScrollText } from "lucide-react";

interface Props {
  description: string;
}

export function AnnouncementDescription({ description }: Props) {
  return (
    <section className="bg-white border border-gray-200 rounded-xl px-6 py-5 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <ScrollText className="w-8 h-8 text-[var(--accent-main)]" />
        <h2 className="text-2xl font-bold text-[var(--accent-dark)]">
          Opis ogłoszenia
        </h2>
      </div>
      <p className="text-base text-gray-700 leading-relaxed">{description}</p>
    </section>
  );
}
