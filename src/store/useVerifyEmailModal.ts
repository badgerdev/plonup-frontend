"use client";

import { create } from "zustand";

type VerifyEmailModalStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

/**
 * 🟠 Globalny store do modala weryfikacji e-mail.
 * Wywołujemy go wszędzie tam, gdzie user NIEZWERYFIKOWANY
 * próbuje kliknąć: like, opinię, zgłoszenie itd.
 */
export const useVerifyEmailModal = create<VerifyEmailModalStore>((set) => ({
  isOpen: false,

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
