"use client";

import { useState } from "react";
import { AnnouncementDetail } from "@/lib/helpers/types";
import { MapPin, Building2, Grid2X2Check } from "lucide-react";
import { TypeBadge } from "../badgesUi/TypeBadge";
import { ListingTypeBadge } from "../badgesUi/ListingTypeBadge";

import { ReportAnnouncementButton } from "@/components/report/ReportAnnouncementButton";
import { ReportModal } from "@/components/report/ReportModal";

interface Props {
  announcement: AnnouncementDetail;
}

export function AnnouncementDetailsSection({ announcement }: Props) {
  const [reportOpen, setReportOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg p-3 space-y-6">
      <div className="bg-gray-100 rounded-lg p-4 mb-4">
        <h3 className="font-semibold mb-2">Typ ogłoszenia:</h3>
        <div className="flex flex-col w-[70%] md:w-auto md:flex-row md:items-center gap-2">
          <ListingTypeBadge type={announcement.listing_type} />
          <TypeBadge type={announcement.announcement_type} />
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-4 mb-4">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 flex items-center justify-center text-[var(--accent-main)] bg-white rounded-full shadow-sm">
            <Grid2X2Check className="w-5 h-5" />
          </div>
          <div className="ml-2">
            <div className="text-sm text-muted-foreground">Kategoria</div>
            <div className="font-medium text-foreground">
              {announcement.category}
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-8 h-8 flex items-center justify-center text-[var(--accent-main)] bg-white rounded-full shadow-sm">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="ml-2">
            <div className="text-sm text-muted-foreground">Lokalizacja</div>
            <div className="font-medium text-foreground">
              {announcement.location}, {announcement.postal_code}
              {announcement.announcement_type !== "private" && (
                <span className="block">ul. {announcement.address}</span>
              )}
            </div>
          </div>
        </div>

        {announcement.announcement_type === "business" && (
          <div className="flex items-center mt-3">
            <div className="w-8 h-8 flex items-center justify-center text-[var(--accent-main)] bg-white rounded-full shadow-sm">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="ml-2">
              <div className="text-sm text-muted-foreground">Nazwa firmy</div>
              <div className="font-medium text-foreground">
                {announcement.company_name}
              </div>
            </div>
          </div>
        )}
        <div className="mt-6 flex justify-end w-full">
          <ReportAnnouncementButton onClick={() => setReportOpen(true)} />
        </div>
      </div>

      <ReportModal
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
        targetType="announcement"
        targetId={announcement.id}
      />
    </div>
  );
}
