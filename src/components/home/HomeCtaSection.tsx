// components/landing/HomeCTASection.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { CheckCircle, ChevronRight, FilePlus2, MoveRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const stepsContent = [
  {
    id: "step1",
    title: "1. Załóż konto",
    subtitle: "Szybko i bez komplikacji",
    description:
      "Tylko zarejestrowani użytkownicy mogą dodać ogłoszenie lub skontaktować się z ogłoszeniodawcą. Rejestracja jest bezpłatna i zajmuje tylko chwilę. Potrzebujesz tylko adresu e-mail! Po utworzeniu konta zyskujesz dostęp do panelu, w którym wygodnie zarządzasz swoimi ogłoszeniami i ustawieniami.",
    benefits: [
      "Rejestracja w 2 minuty",
      "Możliwość dodawania i edytowania ogłoszeń",
      "Tylko zarejestrowani użytkownicy mogą zobaczyć dane kontaktowe",
    ],
    ctaText: "Dołącz do nas",
    ctaLink: "/register",
  },
  {
    id: "step2",
    title: "2. Dodaj ogłoszenie",
    subtitle: "Dla osób prywatnych i firm",
    description:
      "Ogłoszenie Prywatne lub Firmowe w kilku prostych krokach. Uzupełnij potrzebne informacje, dodaj zdjęcia, lokalizacje oraz dane kontaktowe. Pamiętaj - tylko zalogowani użytkownicy mogą zobaczyć twoje dane kontaktowe. Ogłoszenie pojawi się na stronie zaraz po dodaniu.",
    benefits: [
      "Wybór typu ogłoszenia: prywatne | firmowe",
      "Wybierz metodę kontaktu - email lub nr. telefonu",
      "Dodaj zdjęcia, aby pokazać swój produkt",
      "Natychmiastowa publikacja po uzupełnieniu formularza",
    ],
    ctaText: "Dodaj ogłoszenie",
    ctaLink: "/ogloszenia/dodaj",
  },
  {
    id: "step3",
    title: "3. Opinie",
    subtitle: "Zbuduj zaufanie",
    description:
      "Użytkownicy, którzy zobaczą Twoje ogłoszenie, mogą wystawić Ci ocenę. System opinii pomaga innym podjąć świadomą decyzję i wspiera wiarygodnych użytkowników. Opinie są widoczne na Twoim profilu.",
    benefits: [
      "Przejrzysty system opinii",
      "Zaufanie wśród innych użytkowników",
      "Budowanie wiarygodności w społeczności",
    ],
    ctaText: "Dowiedz się więcej",
    ctaLink: "/opinie",
  },
];

export function HomeCTASection() {
  const [activeStepId, setActiveStepId] = useState(stepsContent[0].id);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
          setActiveStepId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-100px 0px -100px 0px",
        threshold: 0.5,
      }
    );

    const currentRefs = contentRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const handleLinkClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset =
        document.querySelector(".mobile-steps-nav")?.clientHeight || 0;
      const yOffset = -headerOffset - 24; // Dodatkowe 24px dla marginesu

      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-gray-100 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12">
        {/* MOBILE nagłówek */}
        <div className="flex flex-col md:hidden mb-8 text-center">
          <div className="flex items-center justify-center gap-4">
            <FilePlus2 className="w-16 h-16 text-[var(--accent-green)] border-2 p-3 rounded-full border-[var(--accent-main)]" />
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
              Dodaj Ogłoszenie
            </h2>
          </div>
          <p className="text-lg text-gray-600 mt-2 px-10">
            Dodawanie ogłoszeń nigdy nie było takie proste.
          </p>
        </div>

        {/* MOBILE sticky pager */}
        <div className="mobile-steps-nav md:hidden sticky top-20 z-20 flex bg-white border-y border-gray-200 px-4 sm:px-6 lg:px-8 -mx-4 sm:-mx-6 lg:-mx-8">
          {stepsContent.map((step) => (
            <a
              key={step.id}
              href={`#${step.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(step.id);
              }}
              className={`flex-1 text-center py-4 text-xs font-bold transition-colors duration-300 ${
                activeStepId === step.id
                  ? "text-[var(--accent-main)] border-b-2 border-[var(--accent-main)] "
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {step.title}
            </a>
          ))}
        </div>

        {/* DESKTOP: sticky kolumna */}
        <div className="hidden md:block sticky top-24 h-fit">
          <div className="mb-12">
            <h2 className="md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              Dodaj Ogłoszenie
            </h2>
            <p className="text-lg text-gray-600 mt-2">
              Dodawanie ogłoszeń nigdy nie było takie proste.
            </p>
          </div>
          <nav className="space-y-4">
            {stepsContent.map((step) => (
              <a
                key={step.id}
                href={`#${step.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(step.id);
                }}
                className={`group flex items-start gap-4 border-l-4 pl-4 pr-2 py-4 transition-all duration-300 ${
                  activeStepId === step.id
                    ? "border-[var(--accent-main)] bg-gray-50 shadow-sm"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <CheckCircle
                  className={`w-5 h-5 flex-shrink-0 mt-1 transition-colors ${
                    activeStepId === step.id
                      ? "text-[var(--accent-main)]"
                      : "text-gray-300 group-hover:text-gray-400"
                  }`}
                />
                <div>
                  <h4
                    className={`text-base font-semibold transition-colors ${
                      activeStepId === step.id
                        ? "text-gray-900"
                        : "text-gray-800"
                    }`}
                  >
                    {step.title}
                  </h4>
                  <p
                    className={`mt-1 text-sm transition-colors ${
                      activeStepId === step.id
                        ? "text-gray-500"
                        : "text-gray-400"
                    }`}
                  >
                    {step.subtitle}
                  </p>
                </div>
              </a>
            ))}
          </nav>
        </div>

        {/* PRAWA kolumna - treść */}
        <div className="space-y-16">
          {stepsContent.map((step, index) => (
            <div
              key={step.id}
              id={step.id}
              ref={(el) => {
                contentRefs.current[index] = el;
              }}
              className="min-h-[60vh] md:min-h-[80vh] pt-16 md:pt-36 p-4 md:p-8"
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {step.description}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-12">
                {step.benefits.map((benefit, bIndex) => (
                  <li key={bIndex} className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-[var(--accent-main)] flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="group text-lg py-6 bg-white border-2 border-[var(--accent-main)] text-[var(--accent-main)] hover:bg-gray-100 rounded-full"
              >
                <Link href={step.ctaLink}>
                  {step.ctaText}
                  <MoveRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
