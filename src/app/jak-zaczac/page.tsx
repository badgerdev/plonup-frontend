import { UserPlus, FilePlus, Search, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TypingEffect } from "@/components/typing-effect/TypingEffect";

const steps = [
  {
    icon: <UserPlus className="w-6 h-6 text-[var(--accent-main)]" />,
    title: "Załóż konto",
    desc: (
      <>
        Rejestracja trwa dwie minuty i jest darmowa. <br />
        <Link
          href="/rejestracja"
          className="text-[var(--accent-main)] underline hover:opacity-80"
        >
          Zarejestruj się →
        </Link>
      </>
    ),
  },
  {
    icon: <FilePlus className="w-6 h-6 text-[var(--accent-green)]" />,
    title: "Dodaj ogłoszenie",
    desc: "W kilku krokach opisz swój produkt i dodaj zdjęcia.",
  },
  {
    icon: <Search className="w-6 h-6 text-[var(--accent-main-hover)]" />,
    title: "Nawiązuj znajomości",
    desc: "Skontaktuj się z działkowiczami i firmami w Twojej okolicy.",
  },
];

export default function JakZaczacPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-100 to-gray-200 py-24 lg:py-32 px-6">
      {/* HERO */}
      <div className="flex flex-col lg:flex-row max-w-[1300px] mx-auto">
        <section className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Jak zacząć z{" "}
            <span className="bg-gradient-to-r from-[var(--accent-main)] to-[var(--accent-green)] bg-clip-text text-transparent">
              Plonup
            </span>
            ?
          </h1>

          <div className="flex gap-2 justify-center">
            <TypingEffect text="Sprzedawaj," />
            <TypingEffect text="wymieniaj," timeDelay={2.5} />

            <TypingEffect text="poznawaj..." timeDelay={3.2} />
          </div>
        </section>

        <section className="max-w-2xl mx-auto">
          <div className="relative">
            {/* pionowa linia */}
            <div className="absolute left-6 top-0 bottom-8 w-1 bg-gradient-to-b from-[var(--accent-main)] to-[var(--accent-green)] rounded-full"></div>

            <ul className="space-y-12">
              {steps.map((step, i) => (
                <li key={i} className="relative flex items-start gap-6">
                  {/* punkt */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 shadow flex items-center justify-center relative z-10">
                      {step.icon}
                    </div>
                  </div>

                  {/* content */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {i + 1}. {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      {step.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      {/* TIMELINE */}
      {/* CTA */}
      <section className="text-center mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Gotowy, aby dołączyć?
        </h2>
        <p className="text-gray-600 mb-8">
          Załóż darmowe konto i zacznij korzystać z Plonup już dziś.
        </p>
        <Link href="/rejestracja">
          <Button variant="gradient" className="px-20 py-6 text-xl">
            Zacznij teraz
          </Button>
        </Link>

        {/* Kontakt */}
        <div className="mt-6 flex justify-center items-center gap-2 text-sm text-gray-500">
          <Mail className="w-4 h-4 text-[var(--accent-main)]" />
          Masz pytania?{" "}
          <Link
            href="/kontakt"
            className="text-[var(--accent-main)] underline hover:opacity-80"
          >
            Skontaktuj się z nami →
          </Link>
        </div>
      </section>
    </div>
  );
}
