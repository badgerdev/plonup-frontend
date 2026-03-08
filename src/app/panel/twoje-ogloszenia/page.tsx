import MyAnnouncementsFullList from "@/components/panel/my-announcements/MyAnnouncementsFullList";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ScrollToTopButton } from "@/components/shared/ScrollToTopButton";

export const metadata: Metadata = {
  title: "Twoje ogłoszenia | Plonup",
};

export default async function MyAnnouncementsPage() {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  if (!access) {
    redirect("/login");
  }

  return (
    <div className="max-w-4xl mx-auto">
      <MyAnnouncementsFullList />
      <ScrollToTopButton />
    </div>
  );
}
