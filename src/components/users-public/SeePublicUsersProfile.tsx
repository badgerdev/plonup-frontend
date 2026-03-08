"use client";

import { useState } from "react"; // ← DODANE
import { ClipboardList, MessageCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PublicUserReviews } from "./reviews/PublicUserReviews";
import { UserAnnouncementsList } from "./UserAnnouncementsList";

import { AnnouncementOut, AnnouncementType } from "@/lib/helpers/types";
import { PublicScoreCard } from "./PublicScoreCard";
import { ScrollToTopButton } from "../shared/ScrollToTopButton";

import { ReportUserButton } from "@/components/report/ReportUserButton"; // ← DODANE
import { ReportModal } from "@/components/report/ReportModal"; // ← DODANE

type Props = {
  user: {
    id: number;
    username: string;
    is_verified: boolean;
    average_rating: number;
    announcements: (AnnouncementOut & {
      announcement_type: AnnouncementType;
    })[];
  };
};

export function SeePublicUsersProfile({ user }: Props) {
  const [reportUserOpen, setReportUserOpen] = useState(false); // ← DODANE

  return (
    <div
      className="max-w-7xl mx-auto px-4 py-24 lg:py-32 space-y-6"
      id="user-announcements-top"
    >
      {/* DESKTOP: grid 2 kolumny */}
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* lewa kolumna */}
        <div className="lg:col-span-1 space-y-8">
          <PublicScoreCard
            userId={user.id}
            username={user.username}
            isVerified={user.is_verified}
          />

          <ReportUserButton onClick={() => setReportUserOpen(true)} />

          <PublicUserReviews
            userId={user.id}
            username={user.username}
            isVerified={user.is_verified}
          />
        </div>

        {/* prawa kolumna */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-4 lg:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 scroll-mt-24">
              Ogłoszenia użytkownika
            </h2>
            <UserAnnouncementsList announcements={user.announcements} />
          </div>
        </div>
      </div>

      {/* MOBILE: Tabs */}
      <div className="lg:hidden flex flex-col gap-6">
        <PublicScoreCard
          userId={user.id}
          username={user.username}
          isVerified={user.is_verified}
        />

        <Tabs defaultValue="announcements" className="w-full">
          <TabsList className="sticky top-22 shadow-2xl border-zinc-800 bg-white z-30 grid grid-cols-2 space-x-2 w-full mb-4 rounded-xl p-1 h-fit">
            <TabsTrigger
              value="announcements"
              className="flex items-center justify-center gap-1 h-9 md:h-10
               rounded-lg text-xs md:text-sm font-medium
               text-zinc-600 hover:text-zinc-900 hover:bg-zinc-300 transition bg-zinc-300
               data-[state=active]:bg-orange-300 data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm"
            >
              <ClipboardList className="w-4 h-4 hidden md:block" />
              Ogłoszenia
            </TabsTrigger>

            <TabsTrigger
              value="reviews"
              className="flex items-center justify-center gap-1 h-9 md:h-10
               rounded-lg text-xs md:text-sm font-medium
               text-zinc-600 hover:text-zinc-900 hover:bg-zinc-300 transition bg-zinc-300
               data-[state=active]:bg-orange-300 data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm"
            >
              <MessageCircle className="w-4 h-4 hidden md:block" />
              Opinie
            </TabsTrigger>
          </TabsList>

          <TabsContent value="announcements">
            <div className="bg-white rounded-xl shadow-lg p-4 lg:p-8 border border-zinc-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Ogłoszenia użytkownika
              </h2>
              <UserAnnouncementsList announcements={user.announcements} />
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <PublicUserReviews
              userId={user.id}
              username={user.username}
              isVerified={user.is_verified}
            />
          </TabsContent>
        </Tabs>

        <ReportUserButton
          onClick={() => setReportUserOpen(true)}
          className="mx-auto mt-4"
        />
      </div>

      <ScrollToTopButton />

      <ReportModal
        isOpen={reportUserOpen}
        onClose={() => setReportUserOpen(false)}
        targetType="user"
        targetId={user.id}
      />
    </div>
  );
}
