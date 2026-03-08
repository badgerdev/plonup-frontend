"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowUpToLine } from "lucide-react";
import { updateAnnouncementStatus } from "@/lib/helpers/myAnnouncements";

type Props = {
  announcementId: number;
};
const DELAY_FOR_STATUS_CHANGE = 700;

export function RestoreButton({ announcementId }: Props) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleRestore = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        await updateAnnouncementStatus(announcementId, "active");
        toast.success("Ogłoszenie przywrócone jako aktywne ✅");
        setOpen(false);
        router.refresh();
      } catch (err) {
        console.error(err);
        toast.error("Nie udało się przywrócić ogłoszenia.");
      } finally {
        setLoading(false);
      }
    }, DELAY_FOR_STATUS_CHANGE);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start gap-2 hover:cursor-pointer"
        >
          <ArrowUpToLine className="h-4 w-4" />
          Przywróć ogłoszenie
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Przywrócić ogłoszenie?</DialogTitle>
          <DialogDescription>
            Zostanie oznaczone jako <b className="text-green-600">aktywne</b> i
            ponownie <b>widoczne publicznie.</b>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="hover:cursor-pointer"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Anuluj
          </Button>
          <Button
            onClick={handleRestore}
            disabled={loading}
            className="hover:cursor-pointer"
          >
            {loading ? "Przywracanie..." : "Przywróć"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
