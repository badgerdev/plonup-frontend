import { RequireAuth } from "@/components/auth/RequireAuth";
import StepsIndicator from "@/components/announcements/StepsIndicator";
import AddAnnouncementClientGuard from "@/components/banner-guard/in-announcement-add/AddAnnouncementClientGuard";

export default function AddAnnouncementPage() {
  return (
    <RequireAuth>
      {/* Mobile steps */}
      <div className="md:hidden px-4 pt-22">
        <StepsIndicator />
      </div>

      <div className="flex flex-col md:flex-row gap-8 px-4 py-4 md:py-32 lg:max-w-6xl mx-auto min-h-screen border-t-2 mt-4 md:border-t-0">
        {/* Desktop steps */}
        <div className="hidden md:block w-60">
          <StepsIndicator />
        </div>

        {/* 🧠 CAŁA logika kliencka */}
        <AddAnnouncementClientGuard />
      </div>
    </RequireAuth>
  );
}
