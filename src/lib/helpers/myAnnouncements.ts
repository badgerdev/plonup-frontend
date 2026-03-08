import { authFetch } from "../authFetch";

export async function updateAnnouncementStatus(
  id: number,
  status: "active" | "paused" | "archived"
) {
  const res = await authFetch(`/api/my-announcements/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(
      error?.detail || "Nie udało się zmienić statusu ogłoszenia."
    );
  }

  return res.json();
}

export async function deleteAnnouncement(id: number) {
  const res = await authFetch(`/api/my-announcements/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.detail || "Nie udało się usunąć ogłoszenia.");
  }

  return res.json();
}
