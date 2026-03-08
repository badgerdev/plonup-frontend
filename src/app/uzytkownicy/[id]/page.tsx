import { getUserProfile } from "@/lib/helpers/users";
import { notFound } from "next/navigation";
import { SeePublicUsersProfile } from "@/components/users-public/SeePublicUsersProfile";

export default async function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const user = await getUserProfile(id);
  if (!user) return notFound();

  return <SeePublicUsersProfile user={user} />;
}
