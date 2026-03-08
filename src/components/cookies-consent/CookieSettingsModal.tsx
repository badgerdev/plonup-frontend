"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import { CookieConsent } from "@/lib/cookies-consent/consentTypes";
import { COOKIE_SECTIONS } from "@/lib/cookies-consent/consentTexts";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (data: Omit<CookieConsent, "timestamp">) => void;
  currentConsent: CookieConsent | null;
};

export default function CookieSettingsModal({
  open,
  onClose,
  onSave,
  currentConsent,
}: Props) {
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!open) return;
    setAnalytics(currentConsent?.analytics ?? false);
    setMarketing(currentConsent?.marketing ?? false);
  }, [open, currentConsent]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-[var(--accent-light)]">
        <DialogHeader>
          <DialogTitle>Ustawienia cookies</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 text-sm">
          {/* ESSENTIAL */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-medium">
                {COOKIE_SECTIONS.essential.title}
              </span>
              <span className="text-[var(--accent-light-green)] text-xs font-semibold">
                Zawsze aktywne
              </span>
            </div>
            <p className="text-muted-foreground text-xs">
              {COOKIE_SECTIONS.essential.description}
            </p>
          </div>

          {/* ANALYTICS */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">
                {COOKIE_SECTIONS.analytics.title}
              </span>
              <Switch checked={analytics} onCheckedChange={setAnalytics} />
            </div>
            <p className="text-muted-foreground text-xs">
              {COOKIE_SECTIONS.analytics.description}
            </p>
          </div>

          {/* MARKETING */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">
                {COOKIE_SECTIONS.marketing.title}
              </span>
              <Switch checked={marketing} onCheckedChange={setMarketing} />
            </div>
            <p className="text-muted-foreground text-xs">
              {COOKIE_SECTIONS.marketing.description}
            </p>
          </div>
        </div>

        <Button
          className="w-full mt-6"
          onClick={() =>
            onSave({
              essential: true,
              analytics,
              marketing,
            })
          }
        >
          Zapisz ustawienia
        </Button>
      </DialogContent>
    </Dialog>
  );
}
