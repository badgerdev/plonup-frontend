"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

type Props = {
  onAcceptEssential: () => void;
  onAcceptAll: () => void;
  onOpenSettings: () => void;
};

export default function CookieBanner({
  onAcceptEssential,
  onAcceptAll,
  onOpenSettings,
}: Props) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 animate-fade-in-bottom">
      <Card
        className="
          mx-auto max-w-5xl
          rounded-2xl
          border border-border
          bg-background/95 backdrop-blur
          shadow-xl
        "
      >
        <div
          className="
            grid gap-6 p-6
            md:grid-cols-[1fr_auto]
            md:items-center
          "
        >
          {/* TEXT */}
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">🍪 Pliki cookies</p>
            <p>
              Używamy plików cookies niezbędnych do prawidłowego działania
              serwisu. Możesz zaakceptować wszystkie lub dostosować swoje
              preferencje.
            </p>
            <p className="text-xs">
              Więcej informacji znajdziesz w{" "}
              <Link
                href="/polityka-prywatnosci"
                className="underline underline-offset-2 hover:text-foreground text-[var(--accent-main)] font-semibold"
              >
                Polityce prywatności
              </Link>
              .
            </p>
          </div>

          {/* ACTIONS */}
          <div
            className="
              flex flex-col gap-2
              sm:flex-row
              sm:flex-wrap
              md:flex-col
              md:items-end
              md:justify-center
              min-w-[220px]
            "
          >
            <Button
              onClick={onAcceptAll}
              className="w-full sm:w-auto md:w-full"
            >
              Akceptuj wszystkie
            </Button>

            <Button
              variant="outline"
              onClick={onAcceptEssential}
              className="w-full sm:w-auto md:w-full"
            >
              Akceptuj niezbędne (wymagane)
            </Button>

            <button
              type="button"
              onClick={onOpenSettings}
              className="
                mt-1 text-xs
                text-muted-foreground
                hover:text-foreground
                underline underline-offset-4
                self-center md:self-end
              "
            >
              Ustawienia cookies
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
