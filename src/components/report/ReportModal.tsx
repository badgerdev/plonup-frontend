"use client";

import { useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import { REPORT_CATEGORIES } from "@/lib/constants/reportCategories";
import { ReportTargetType, ReportCategory } from "@/lib/helpers/types";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info } from "lucide-react";
import { authFetch } from "@/lib/authFetch";

const schema = z.object({
  category: z.string().min(1, "Wybierz kategorię."),
  reason: z.string().min(20, "Opis musi mieć min. 20 znaków.").max(300),
});

type Props = {
  isOpen: boolean;
  onClose: () => void;
  targetType: ReportTargetType;
  targetId: number;
};

export function ReportModal({ isOpen, onClose, targetType, targetId }: Props) {
  const [category, setCategory] = useState<ReportCategory>("spam");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const validate = () => {
    const result = schema.safeParse({ category, reason });
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return false;
    }
    return true;
  };

  const submitReport = async () => {
    try {
      setLoading(true);

      const res = await authFetch("/api/report", {
        method: "POST",
        body: JSON.stringify({
          target_type: targetType,
          target_id: targetId,
          category,
          reason,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.detail || "Wystąpił błąd.");
        return;
      }

      toast.success("Zgłoszenie zostało wysłane.");
      setReason("");
      setCategory("spam");
      onClose();
    } finally {
      setLoading(false);
      setConfirmOpen(false);
    }
  };

  return (
    <>
      {/* GŁÓWNY MODAL */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md space-y-6">
          <DialogHeader>
            <DialogTitle>Zgłoś naruszenie</DialogTitle>
            <DialogDescription>
              Opisz krótko problem i wybierz kategorię. Zgłoszenia trafiają do
              moderatorów.
            </DialogDescription>
          </DialogHeader>

          {/* CATEGORY SELECT */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Kategoria</label>
            <Select
              value={category}
              onValueChange={(v) => setCategory(v as ReportCategory)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Wybierz kategorię" />
              </SelectTrigger>
              <SelectContent>
                {REPORT_CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* TEXTAREA */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Powód zgłoszenia</label>
            <Textarea
              rows={4}
              placeholder="Opisz krótko problem (min. 20 znaków)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          {/* INFO */}
          <p className="text-xs text-gray-500 flex gap-2 items-center">
            <Info className="size-4 shrink-0" />
            Prosimy nie zgłaszaj z byle powodu.
            <br />
            Nadużywanie systemu zgłoszeń może skutkować blokadą konta.
          </p>

          {/* BUTTON → OTWIERA POTWIERDZENIE */}
          <Button
            className="w-full"
            onClick={() => {
              if (validate()) setConfirmOpen(true);
            }}
          >
            Wyślij zgłoszenie
          </Button>
        </DialogContent>
      </Dialog>

      {/* POTWIERDZENIE SHADCN */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Potwierdź wysłanie zgłoszenia</AlertDialogTitle>
            <AlertDialogDescription>
              Czy na pewno chcesz wysłać to zgłoszenie? Zostanie ono przekazane
              moderatorom.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Anuluj</AlertDialogCancel>
            <AlertDialogAction disabled={loading} onClick={submitReport}>
              {loading ? "Wysyłanie..." : "Wyślij"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
