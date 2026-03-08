// FOR PUBLIC ANNOUNCEMENTS ONLY!!!
export async function getAnnouncements() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/announcements`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Nie udało się pobrać ogłoszeń.");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ getAnnouncements error:", error);
    return [];
  }
}

// CURRENT USER Announcements from BACKEND!
export async function getMyAnnouncements(access: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/announcements/my-announcements`,
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Nie udało się pobrać ogłoszeń");
    return await res.json();
  } catch (err) {
    console.error("❌ getMyAnnouncements error:", err);
    return [];
  }
}
