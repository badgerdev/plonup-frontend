export function getFullImageUrl(path: string) {
  const mediaHost =
    process.env.NEXT_PUBLIC_MEDIA_URL || "http://localhost:8000";
  return `${mediaHost}${path}`;
}
