import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { PanelMobileTabsList } from "@/components/panel/mobile/PanelMobileTabsList";
import { getMyAnnouncements } from "@/lib/helpers/announcements";
import MyAnnouncementsPreview from "@/components/panel/my-announcements/MyAnnouncementsPreview";
import LatestNotifications from "@/components/panel/LatestNotifications";
import LatestReviews from "@/components/panel/reviews/LatestReviews";
import UserScoreCard from "@/components/panel/UserScoreCard";
import { ScrollToTopButton } from "@/components/shared/ScrollToTopButton";

import { Tabs, TabsContent } from "@/components/ui/tabs";

const ANNOUNCEMENTS_TO_DISPLAY = 5;

export default async function PanelPage() {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  if (!access) {
    redirect("/login");
  }

  const announcements = await getMyAnnouncements(access);
  const latestAnnouncements = announcements.slice(0, ANNOUNCEMENTS_TO_DISPLAY);

  return (
    <div className="space-y-6 p-4">
      {/* Desktop layout */}
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEWA: ogłoszenia */}
        <div className="lg:col-span-2">
          <MyAnnouncementsPreview announcements={latestAnnouncements} />
        </div>

        {/* PRAWA: boxy */}
        <aside className="space-y-6">
          <UserScoreCard />
          <LatestReviews />
          {/* <LatestNotifications /> */}
        </aside>
      </div>

      {/* Mobile layout z tabami */}
      <div className="lg:hidden flex flex-col gap-4">
        <div className="mb-4">
          <UserScoreCard />
        </div>
        <Tabs defaultValue="announcements" className="w-full">
          <PanelMobileTabsList />

          <TabsContent value="announcements">
            <MyAnnouncementsPreview announcements={latestAnnouncements} />
          </TabsContent>

          <TabsContent value="reviews">
            <LatestReviews />
          </TabsContent>

          <TabsContent value="notifications">
            <LatestNotifications />
          </TabsContent>
        </Tabs>
      </div>
      <ScrollToTopButton />
    </div>
  );
}
