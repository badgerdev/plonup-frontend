import { ShieldCheck, Check } from "lucide-react";

export function AnnouncementSafetySection() {
  const tips = [
    "Nigdy nie udostępniaj swoich wrażliwych danych osobowych",
    "Dokładnie sprawdź produkt przed zakupem",
    "Nigdy nie wysyłaj pieniędzy z góry bez obejrzenia przedmiotu",
    "Zgłaszaj podejrzane ogłoszenia lub użytkowników Plonup",
  ];

  return (
    <section className="bg-[var(--accent-secondary)] border border-foreground/50 rounded-xl px-6 py-5">
      <div className="flex items-center gap-4 mb-6">
        <ShieldCheck className="w-12 h-12 text-zinc-700" />
        <h2 className="text-2xl text-zinc-800 font-semibold">
          Zasady bezpieczeństwa
        </h2>
      </div>

      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className="w-4 h-4 text-zinc-700 mt-1 flex-shrink-0" />
            <span className="text-zinc-700">{tip}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
