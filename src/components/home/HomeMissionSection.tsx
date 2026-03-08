// components/home/HomeMissionSection.tsx
import Link from "next/link";
import {
  ShieldCheck,
  MapPin,
  Lightbulb,
  MessageCircleWarning,
  Speech,
} from "lucide-react";

export function HomeMissionSection() {
  return (
    <section
      className="group relative py-24 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('/placeholder-bg.jpg')` }}
    >
      <div className="absolute inset-0 bg-black/70 z-0"></div>
      <div className="relative z-10 max-w-7xl mx-auto text-white">
        {/* Sekcja "Nasz cel" z tekstem nałożonym na tło */}
        <div className="text-center mb-16 animate-fade-in animate-slide-up duration-700">
          <p className="uppercase text-lg text-[var(--accent-main)] font-extrabold">
            Poznaj Plonup
          </p>
          <h2 className="text-4xl font-bold mb-12">
            Łączymy lokalne społeczności
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-300">
            Plonup powstał z myślą o łączeniu ludzi, promowaniu lokalnej wymiany
            i wspieraniu małych producentów. <br />
            Sprawdź, jak działamy i dlaczego warto dołączyć.
          </p>
          <Link
            href="/poznaj-plonup"
            className="group inline-block mt-6 relative font-bold text-white transition-colors duration-300"
          >
            <span className="text-xl">Dowiedz się więcej o nas</span>
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-[var(--accent-main)] via-[#1ba04c] to-[#187795] transition-all duration-500 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Sekcja "Bezpieczeństwo" z efektem glassmorphism na tle obrazka */}
        <div className="mt-12 bg-white/30 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg p-8 md:p-12 text-gray-900 animate-fade-in-delay-300">
          <div className="flex items-center justify-center mb-8">
            <ShieldCheck className="h-10 w-10 text-[var(--accent-main)]" />
            <h3 className="text-3xl font-bold ml-4 text-white">
              Bezpieczeństwo jest dla nas ważne
            </h3>
          </div>
          <p className="text-lg text-gray-200 mb-8 lg:px-24">
            Bezpieczeństwo naszych użytkowników jest dla nas priorytetem.
            <br />
            Pamiętaj o kilku prostych zasadach, które pomogą Ci w bezpiecznym
            kontakcie z członkami społeczności.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
            <div className="flex items-start gap-4 animate-fade-in-delay-500">
              <Lightbulb className="h-6 w-6 flex-shrink-0 text-[var(--accent-main)] mt-1" />
              <div>
                <h4 className="text-xl font-bold">Zachowaj ostrożność</h4>
                <p className="mt-1 text-gray-300">
                  Wierzymy w uczciowość Zawsze sprawdzaj profil i opinie osoby,
                  z którą się kontaktujesz. W razie wątpliwości, możesz zadać
                  dodatkowe pytania przed dokonaniem transakcji.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 animate-fade-in-delay-700">
              <MapPin className="h-6 w-6 flex-shrink-0 text-[var(--accent-main)] mt-1" />
              <div>
                <h4 className="text-xl font-bold">
                  Umawiaj się w miejscach publicznych
                </h4>
                <p className="mt-1 text-gray-300">
                  Jeśli decydujesz się na odbiór osobisty, zawsze umawiaj się w
                  dobrze oświetlonych i publicznych miejscach.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 animate-fade-in-delay-900">
              <Speech className="h-6 w-6 flex-shrink-0 text-[var(--accent-main)] mt-1" />
              <div>
                <h4 className="text-xl font-bold">
                  Uważność podczas kontaktu z innymi.
                </h4>
                <p className="mt-1 text-gray-300">
                  Cała komunikacja powinna odbywać się z zachowaniem szczególnej
                  ostrożności.
                  <br />
                  <span className="font-bold underline">Nigdy</span> nie podawaj
                  żadnych wrażliwych danych osobistych.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 animate-fade-in-delay-1100">
              <MessageCircleWarning className="h-6 w-6 flex-shrink-0 text-[var(--accent-main)] mt-1" />
              <div>
                <h4 className="text-xl font-bold">
                  Zgłaszaj podejrzane działania
                </h4>
                <p className="mt-1 text-gray-300">
                  Jeśli natrafisz na ogłoszenie lub użytkownika, który budzi
                  Twoje wątpliwości, skorzystaj z opcji{" "}
                  <span className="underline font-bold uppercase">
                    Zgłoś użytkownika
                  </span>
                  , abyśmy mogli podjąć odpowiednie kroki.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
