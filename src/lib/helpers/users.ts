// Public
export async function getUserProfile(userId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`,
      {
        cache: "no-store",
        credentials: "include",
      }
    );
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}

// private (token required)
export async function getUserScore(access: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me/score`,
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
        cache: "no-store",
        next: { revalidate: 360 },
      }
    );
    if (!res.ok) throw new Error("Nie udało się pobrać danych użytkownika");
    return await res.json();
  } catch (err) {
    console.error("❌ getUserScore error:", err);
    return { average_rating: 0, reviews_count: 0 };
  }
}

export async function getMyReviews(access: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/me`,
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Nie udało się pobrać opinii");
    return await res.json();
  } catch (err) {
    console.error("❌ getMyReviews error:", err);
    return [];
  }
}
