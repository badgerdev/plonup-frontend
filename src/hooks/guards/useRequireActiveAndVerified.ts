"use client";

import { useAuth } from "@/hooks/auth/useAuth";
import { useVerifyEmailModal } from "@/store/useVerifyEmailModal";
import { toast } from "sonner";

/**
 * 🧠 Hook SPRAWDZA CZY:
 * 1 - konto nie jest usuwane !!!
 * 2 zweryfikowanego maila
 * 3 zalogowania
 *
 * stany:
 * 1) brak usera → zwróć false (komponent sam wyświetla toast)
 * 2) user niezweryfikowany → otwórz modal
 * 3) user zweryfikowany → wykonaj callback
 */
export function useRequireActiveAndVerified() {
  const { user } = useAuth();
  const { open } = useVerifyEmailModal();

  return function require(action: () => void): boolean {
    // 1️⃣ niezalogowany
    if (!user) {
      toast.warning("Musisz się zalogować", {
        action: {
          label: "Zaloguj się",
          onClick: () => (window.location.href = "/login"),
        },
      });
      return false;
    }

    // 🟥 2️⃣ konto w trakcie usuwania — NAJWYŻSZY PRIORYTET
    if (user.is_deleted) {
      toast.error(
        "Konto jest w trakcie usuwania. Ta akcja została zablokowana."
      );
      return false;
    }

    // 🟠 3️⃣ brak weryfikacji e-mail
    if (!user.is_verified) {
      open();
      return false;
    }

    // ✅ 4️⃣ OK
    action();
    return true;
  };
}
