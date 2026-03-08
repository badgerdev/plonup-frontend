"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CustomStar } from "../../shared/CustomStar";
import { authFetch } from "@/lib/authFetch";

type Props = {
  userId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReviewAdded: (success: boolean) => void;
  buttonText?: string;
};

export function ReviewDialog({
  userId,
  open,
  onOpenChange,
  onReviewAdded,
}: Props) {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating < 1) return;

    setLoading(true);
    try {
      const res = await authFetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target_user_id: userId,
          rating,
          comment,
        }),
      });

      if (res.ok) {
        onReviewAdded(true);
      } else {
        const data = await res.json();
        if (data?.detail?.includes("Już wystawiłeś")) {
          onReviewAdded(false);
        }
      }
    } catch (err) {
      console.error("❌ Błąd wysyłania opinii:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Wystaw opinię</DialogTitle>
        </DialogHeader>

        {/* Gwiazdki */}
        <div className="flex justify-center gap-2 my-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <CustomStar
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className={`w-8 h-8 cursor-pointer transition-colors ${
                (hover || rating) >= star
                  ? "text-[#904e0c] fill-[#e48628]"
                  : "text-gray-600 fill-gray-50"
              }`}
            />
          ))}
        </div>

        {/* Textarea */}
        <Textarea
          placeholder="Napisz swoją opinię (opcjonalnie)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mb-2 focus-visible:border-1 focus-visible:border-orange-300 focus-visible:ring-orange-300"
          maxLength={777}
        />
        <p className="text-xs text-gray-500 text-right">{comment.length}/777</p>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={loading || rating < 1}
            className="bg-[var(--accent-main)] hover:bg-[var(--accent-main-hover)] text-white"
          >
            {loading ? "Wysyłanie..." : "Wyślij opinię"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
