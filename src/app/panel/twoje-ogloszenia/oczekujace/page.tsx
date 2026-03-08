import { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ScrollToTopButton } from "@/components/shared/ScrollToTopButton";
import PendingAnnouncementsList from "@/components/panel/my-announcements/PendingAnnouncementsList";

export const metadata: Metadata = {
  title: "Oczekujące ogłoszenia | Plonup",
};

export default async function PendingAnnouncementsPage() {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  if (!access) {
    redirect("/login");
  }

  return (
    <div className="max-w-4xl mx-auto">
      <PendingAnnouncementsList />
      <ScrollToTopButton />
    </div>
  );
}
