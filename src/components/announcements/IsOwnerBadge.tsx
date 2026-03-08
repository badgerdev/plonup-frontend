"use client";

import { useAuth } from "@/hooks/auth/useAuth";

type Props = {
  announcementUserId: number;
};

export function IsOwnerBadge({ announcementUserId }: Props) {
  const { user, loading } = useAuth();

  if (loading) return null; // albo spinner/skeleton jeśli chcesz
  if (!user || user.id !== announcementUserId) return null;

  return (
    <a
      href={`/panel/twoje-ogloszenia/${announcementUserId}`}
      className="text-sm text-muted-foreground hover:underline"
    >
      Zarządzaj ogłoszeniem
    </a>
  );
}
