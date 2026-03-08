import { notFound } from "next/navigation";
import { AnnouncementDetailLayout } from "@/components/announcements/AnnouncementDetailLayout";
import { getAccessTokenFromCookies } from "@/lib/helpers/auth-cookies/cookies";

type Props = {
  params: { id: string };
};

export default async function PublicAnnouncementDetail({ params }: Props) {
  const { id } = await params;
  const parsedId = Number(id);
  if (isNaN(parsedId)) return notFound();

  const access = await getAccessTokenFromCookies();
  console.log(access, "access z detail page public");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/announcements/${parsedId}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(access ? { Authorization: `Bearer ${access}` } : {}),
      },
      cache: "no-store",
    }
  );

  if (!res.ok) return notFound();

  const announcement = await res.json();

  return (
    <section className="py-12 px-4">
      <AnnouncementDetailLayout announcement={announcement} />
    </section>
  );
}
