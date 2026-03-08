import Image from "next/image";
import { getFullImageUrl } from "@/lib/helpers/getFullImageUrl";

type ImageItem = {
  id: number;
  image_url: string;
};

type Props = {
  images: ImageItem[];
  title: string;
  announcementId: number;
};

export function AnnouncementImagesPreview({ images, title }: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Zdjęcia</h2>

      {images && images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative aspect-square rounded-md overflow-hidden border shadow-sm"
            >
              <Image
                src={getFullImageUrl(img.image_url)}
                alt={title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="aspect-square bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
          Brak zdjęć
        </div>
      )}
    </div>
  );
}
