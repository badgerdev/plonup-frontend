import { ModerationStatus } from "@/lib/helpers/types";

// 🔹 Widoczne dla użytkownika etykiety
export const MODERATION_STATUS_LABELS: Record<ModerationStatus, string> = {
  pending: "Oczekuje na akceptację",
  script_check_approved: "Oczekuje na akceptację",
  script_check_rejected: "Odrzucone przez skrypt",
  approved: "Zatwierdzone",
  rejected: "Odrzucone",
  needs_fix: "Do poprawy przez użytkownika",
  rejected_spam: "Zablokowane (spam)",
};

// 🔹 Kolory (spójne, pastelowe)
export const MODERATION_STATUS_COLORS: Record<ModerationStatus, string> = {
  pending: "bg-amber-200 border-amber-200 text-amber-800",
  script_check_approved: "bg-amber-200 border-amber-200 text-amber-800",
  script_check_rejected: "bg-pink-200 border-pink-200 text-pink-700",
  approved: "bg-green-200 border-green-200 text-green-700",
  rejected: "bg-rose-300 border-rose-300 text-rose-800",
  needs_fix: "bg-yellow-200 border-yellow-200 text-yellow-800",
  rejected_spam: "bg-red-200 border-red-200 text-red-800",
};

// 🔹 Tooltipy (neutralne UX-owo)
export const MODERATION_STATUS_TOOLTIPS: Record<ModerationStatus, string> = {
  pending: "Twoje ogłoszenie jest w trakcie moderacji.",
  script_check_approved:
    "Automatycznie zaakceptowane przez system — oczekuje na weryfikację moderatora.",
  script_check_rejected:
    "Automatycznie odrzucone przez system — moderator może to jeszcze sprawdzić.",
  approved: "Ogłoszenie zostało zatwierdzone i jest widoczne publicznie.",
  rejected: "Ogłoszenie zostało odrzucone przez moderatora.",
  needs_fix:
    "Ogłoszenie wymaga poprawek — możesz je edytować i wysłać ponownie.",
  rejected_spam: "Ogłoszenie zostało zablokowane jako spam.",
};
