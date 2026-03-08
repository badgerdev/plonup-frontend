"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useVerifyEmailModal } from "@/store/useVerifyEmailModal";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

/**
 * 🟠 Globalny modal informujący użytkownika,
 * że musi zweryfikować swój adres e-mail.
 *
 * Odpala się przy próbie wykonania akcji:
 * - like
 * - opinia
 * - zgłoszenie
 */
export default function VerifyEmailModal() {
  const { isOpen, close } = useVerifyEmailModal();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-[#9A5B0A]">
            <AlertTriangle className="w-6 h-6 text-[#D47F2A]" />
            Zweryfikuj adres e-mail
          </DialogTitle>

          <DialogDescription className="text-sm text-zinc-700 mt-2">
            Aby korzystać z tej funkcji Plonup, musisz najpierw potwierdzić swój
            adres e-mail. Dzięki temu dbamy o bezpieczeństwo naszej
            społeczności.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={close}>
            Zamknij
          </Button>

          <Button
            asChild
            className="bg-[var(--accent-main)] hover:bg-[var(--accent-hover)] text-white"
            onClick={close}
          >
            <Link href="/potwierdz">Zweryfikuj teraz</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
