import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import { OpenCookieSettingsButton } from "@/components/cookies-consent/OpenCookieSettingButton";

const PlonupLogo = () => (
  <h1 className="text-2xl font-extrabold text-white tracking-tight">Plonup</h1>
);

export function Footer() {
  return (
    <footer className="bg-[#2a2726] text-zinc-400 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-12 pb-36 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo + opis */}
          <div className="lg:col-span-2 space-y-3">
            <PlonupLogo />
            <p className="text-sm leading-relaxed max-w-sm">
              Plonup to platforma łącząca pasjonatów rolnictwa, przetworów i
              ogrodnictwa w jednym, przyjaznym miejscu.
            </p>
          </div>

          {/* Firma */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-200 uppercase mb-3 tracking-wide">
              Firma
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/poznaj" className="hover:text-white">
                  O nas
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-white">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Wsparcie */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-200 uppercase mb-3 tracking-wide">
              Wsparcie
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/pomoc" className="hover:text-white">
                  Centrum pomocy
                </Link>
              </li>
              <li>
                <Link href="/opinie" className="hover:text-white">
                  Opinie
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white">
                  Załóż konto
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-200 uppercase mb-3 tracking-wide">
              Kontakt
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:kontakt@plonup.pl"
                  className="flex items-center gap-2 hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  kontakt@plonup.pl
                </a>
              </li>
              <li>
                <a
                  href="tel:+48123456789"
                  className="flex items-center gap-2 hover:text-white"
                >
                  <Phone className="h-4 w-4" />
                  +48 123 456 789
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Dolna belka */}
        <div className="mt-10 pt-6 border-t border-zinc-700 text-xs sm:text-sm flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-zinc-500">© {new Date().getFullYear()} Plonup</p>
          <p className="text-zinc-500">Stworzono z 💚 w Polsce</p>
          <div className="space-x-4">
            <Link href="/polityka-prywatnosci" className="hover:text-white">
              Polityka prywatności
            </Link>
            <Link href="/regulamin" className="hover:text-white">
              Regulamin
            </Link>
            <OpenCookieSettingsButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
