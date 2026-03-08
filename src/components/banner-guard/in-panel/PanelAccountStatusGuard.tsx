"use client";

import { useAuth } from "@/hooks/auth/useAuth";
import PanelAccountDeletionBanner from "./PanelAccountDeletionBanner";
import PanelVerificationBanner from "./PanelVerificationBanner";

export default function PanelAccountStatusGuard() {
  const { user, loading } = useAuth();

  if (loading || !user) return null;

  // 🟥 PRIORYTET 1 — konto w trakcie usuwania
  if (user.is_deleted) {
    return <PanelAccountDeletionBanner />;
  }

  // 🟠 PRIORYTET 2 — brak weryfikacji e-mail
  if (!user.is_verified) {
    return <PanelVerificationBanner />;
  }

  return null;
}
