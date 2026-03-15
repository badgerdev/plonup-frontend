"use client";

import { useAuth } from "@/hooks/auth/useAuth";
import AddAnnouncementForm from "@/components/announcements/AddAnnouncementForm";
import { AccountDeletionBanner } from "@/components/banner-guard/in-announcement-add/AccountDeletionBanner";
import { VerificationRequiredBanner } from "./VerificationRequiredBanner";

export default function AddAnnouncementClientGuard() {
  const { user, loading } = useAuth();

  if (loading || !user) return null;

  // 🟥 PRIORYTET 1 — konto w trakcie usuwania
  if (user.is_deleted) {
    return (
      <div className="flex w-full md:justify-center md:items-start">
        <AccountDeletionBanner user={user} />
      </div>
    );
  }

  // 🟠 PRIORYTET 2 — brak weryfikacji
  if (!user.is_verified) {
    return (
      <div className="flex w-full md:justify-center md:items-start">
        <VerificationRequiredBanner />
      </div>
    );
  }

  // 🟢 OK
  return <AddAnnouncementForm />;
}
