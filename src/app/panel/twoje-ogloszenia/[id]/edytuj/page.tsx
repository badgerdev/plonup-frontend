import { EditAnnouncementForm } from "@/components/panel/my-announcements/EditAnnouncementForm";
import { notFound } from "next/navigation";

export default async function EditAnnouncementPage(context: {
  params: { id: string };
}) {
  const { id } = await context.params;
  const numericId = Number(id);
  if (isNaN(numericId)) return notFound();

  return (
    <section className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edytuj ogłoszenie</h1>
      <EditAnnouncementForm id={numericId} />
    </section>
  );
}
