// components/panel/my-announcements/EditAnnouncementForm.tsx
"use client";

import { useEffect, useState } from "react";
import { EditAnnouncementPrivateForm } from "./EditAnnouncementPrivateForm";
import { EditAnnouncementBusinessForm } from "./EditAnnouncementBusinessForm";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  id: number;
};

export function EditAnnouncementForm({ id }: Props) {
  const [type, setType] = useState<"private" | "business" | null>(null);
  const [moderationStatus, setModerationStatus] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchType = async () => {
      try {
        const res = await fetch(`/api/my-announcements/${id}`);
        const data = await res.json();
        setType(data.announcement_type);
        setModerationStatus(data.moderation_status);
      } catch {
        toast.error("Nie udało się pobrać ogłoszenia.");
        router.push("/panel/twoje-ogloszenia");
      } finally {
        setLoading(false);
      }
    };
    fetchType();
  }, [id, router]);

  if (loading || !type) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Ładowanie danych...
      </div>
    );
  }

  return type === "private" ? (
    <EditAnnouncementPrivateForm
      id={id}
      moderationStatus={
        moderationStatus === "approved" || moderationStatus === "needs_fix"
          ? moderationStatus
          : undefined
      }
    />
  ) : (
    <EditAnnouncementBusinessForm
      id={id}
      moderationStatus={
        moderationStatus === "approved" || moderationStatus === "needs_fix"
          ? moderationStatus
          : undefined
      }
    />
  );
}
