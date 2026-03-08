"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  MAX_IMAGE_SIZE_MB,
  MAX_IMAGE_SIZE_BYTES,
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGES,
} from "@/lib/constants/images";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

type Props = {
  id: number;
};

type ImageItem = {
  id: number;
  image: string;
};

export function EditAnnouncementImages({ id }: Props) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`/api/my-announcements/${id}`);
        const data = await res.json();

        const processed = (data.images || []).map(
          (img: { id: number; image?: string; image_url?: string }) => ({
            id: img.id,
            image: img.image?.startsWith("http")
              ? img.image
              : `${API_BASE}${img.image || img.image_url || ""}`,
          })
        );

        setImages(processed);
      } catch {
        toast.error("Nie udało się pobrać zdjęć.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [id]);

  const handleDelete = async (imageId: number) => {
    if (images.length <= 1) {
      toast.warning("Ogłoszenie musi zawierać przynajmniej jedno zdjęcie.");
      return;
    }

    const res = await fetch(`/api/my-announcements/images/${imageId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      toast.error("Nie udało się usunąć zdjęcia.");
      return;
    }

    setImages((prev) => prev.filter((img) => img.id !== imageId));
    toast.success("Zdjęcie usunięte.");
  };

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Dozwolone formaty to JPG i PNG");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      toast.error(`Maksymalny rozmiar zdjęcia to ${MAX_IMAGE_SIZE_MB}MB`);
      return;
    }

    if (images.length >= MAX_IMAGES) {
      toast.warning(`Możesz dodać maksymalnie ${MAX_IMAGES} zdjęcia.`);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);

    const res = await fetch(`/api/my-announcements/images/${id}`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      toast.error("Nie udało się dodać zdjęcia.");
      setUploading(false);
      return;
    }

    const newImage = await res.json();

    setImages((prev) => [
      ...prev,
      {
        id: newImage.id,
        image: URL.createObjectURL(file),
      },
    ]);

    toast.success("Zdjęcie dodane.");
    setUploading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Ładowanie zdjęć...
      </div>
    );
  }

  return (
    <section className="mt-10 py-20">
      <h2 className="text-lg font-semibold mb-2">Zdjęcia ogłoszenia</h2>
      <p className="text-sm text-muted-foreground mb-2">
        Możesz dodać maksymalnie {MAX_IMAGES} zdjęcia. Musisz mieć co najmniej
        1.
      </p>

      <div className="text-sm text-muted-foreground mb-4">
        {images.length}/{MAX_IMAGES} zdjęcia
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative aspect-square rounded-md overflow-hidden border"
          >
            <Image
              src={img.image}
              alt="Zdjęcie"
              fill
              className="object-cover"
              unoptimized
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(img.id)}
              className="absolute top-1 right-1 bg-white/70 hover:bg-white p-1 rounded-full"
              title="Usuń zdjęcie"
            >
              <Trash className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        ))}
      </div>

      {images.length < MAX_IMAGES && (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleAddImage}
            disabled={uploading}
          />
        </div>
      )}

      <Separator className="mt-6" />
    </section>
  );
}
