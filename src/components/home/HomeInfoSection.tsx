import Link from "next/link";
import { Building2, LayoutList, MoveRight, Shovel } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HomeInfoSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20 text-center">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Plonup to więcej niż ogłoszenia.
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed">
          Dzielimy się tym, co mamy – nadmiarem zbiorów, domowymi przetworami,
          naturalnymi produktami z sąsiedztwa. To miejsce, gdzie lokalność ma
          znaczenie, a jedzenie nie trafia do kosza.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sekcja dla Działkowiczów */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 text-left transition-all hover:shadow-xl hover:border-gray-200">
          <div className="flex gap-4 items-center mb-4">
            <span className="text-gray-500 border rounded-full p-3">
              <Shovel />
            </span>
            <h2 className="text-xl font-semibold text-gray-800">
              Dla działkowiczów
            </h2>
          </div>
          <p className="text-base text-gray-600 leading-relaxed mb-4">
            Wspieramy tych, którzy hodują z sercem i chcą dzielić się tym, co im
            zbywa. Z łatwością wystawisz ogłoszenie o swoich nadwyżkach,
            bezpłatnie i bez formalności.
          </p>
          <Button className="text-[var(--accent-green)] border border-[var(--accent-green)] bg-white hover:bg-[var(--accent-green)] hover:text-white hover:cursor-pointer rounded-full">
            Wystaw ogłoszenie
            <MoveRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Sekcja dla Firm */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 text-left transition-all hover:shadow-xl hover:border-gray-200">
          <div className="flex gap-4 items-center mb-4">
            <span className="text-gray-500 border rounded-full p-3">
              <Building2 />
            </span>
            <h2 className="text-xl font-semibold text-gray-800">Dla firm</h2>
          </div>
          <p className="text-base text-gray-600 leading-relaxed mb-4">
            Dołącz do naszej społeczności jako lokalny producent. Zwiększ
            widoczność swojej marki i dotrzyj do klientów, którzy cenią sobie
            naturalne, lokalne produkty.
          </p>
          <Button className="bg-[var(--accent-main)] hover:bg-[var(--accent-main-hover)] text-white hover:cursor-pointer rounded-full">
            Dołącz do nas
            <MoveRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Sekcja Popularne ogłoszenia */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 text-left transition-all hover:shadow-xl hover:border-gray-200">
          <div className="flex gap-4 items-center mb-4">
            <span className="text-gray-500 border rounded-full p-3">
              <LayoutList />
            </span>
            <h2 className="text-xl font-semibold text-gray-800">
              Popularne ogłoszenia
            </h2>
          </div>
          <ul className="space-y-3 text-gray-700">
            {[
              { emoji: "🍎", label: "Owoce", slug: "owoce" },
              { emoji: "🥕", label: "Warzywa", slug: "warzywa" },
              { emoji: "🥫", label: "Przetwory", slug: "przetwory" },
              { emoji: "🍯", label: "Miody", slug: "miody" },
            ].map((cat) => (
              <li key={cat.slug} className="text-left">
                <Link
                  href={`/ogloszenia?category=${cat.slug}`}
                  className="inline-flex items-center gap-2 hover:text-[var(--accent-main)] transition-colors"
                >
                  <span className="text-xl">{cat.emoji}</span>
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
