"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { deleteAnnouncement } from "@/lib/helpers/myAnnouncements";

type Props = {
  announcementId: number;
};

const DELAY_FOR_STATUS_CHANGE = 700;

export function DeleteButton({ announcementId }: Props) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        await deleteAnnouncement(announcementId);
        toast.success("Ogłoszenie zostało usunięte.");
        setShowDeleteDialog(false);
        router.refresh();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        toast.error("Wystąpił błąd podczas usuwania ogłoszenia.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, DELAY_FOR_STATUS_CHANGE);
  };

  return (
    <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="w-full justify-start gap-2 hover:cursor-pointer"
          disabled={loading}
        >
          <Trash2 className="h-4 w-4" /> Usuń
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle>Potwierdzenie usunięcia</DialogTitle>
          <DialogDescription>
            Czy na pewno chcesz usunąć to ogłoszenie? Tej operacji nie można
            cofnąć.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => setShowDeleteDialog(false)}
            disabled={loading}
            className="hover:cursor-pointer"
          >
            Anuluj
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
            className="hover:cursor-pointer"
          >
            {loading ? "Usuwanie..." : "Usuń"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
