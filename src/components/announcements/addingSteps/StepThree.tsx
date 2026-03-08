"use client";

import { useRef } from "react";
import Image from "next/image";
import { useAnnouncementStore } from "@/store/announcement";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import FormStepNav from "../FormStepNav";
import {
  MAX_IMAGE_SIZE_MB,
  MAX_IMAGE_SIZE_BYTES,
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGES,
} from "@/lib/constants/images";
import { FormStepNavMobile } from "../FormStepNavMobile";

const StepThree = () => {
  const { images, setField } = useAnnouncementStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);

    const validFiles = newFiles.filter((file) => {
      const isValidType = ALLOWED_IMAGE_TYPES.includes(file.type);
      const isValidSize = file.size <= MAX_IMAGE_SIZE_BYTES;

      if (!isValidType) {
        toast.error(`${file.name} – tylko JPG i PNG są dozwolone`);
      } else if (!isValidSize) {
        toast.error(
          `${file.name} – maksymalny rozmiar to ${MAX_IMAGE_SIZE_MB}MB`
        );
      }

      return isValidType && isValidSize;
    });

    setField("images", [...images, ...validFiles].slice(0, MAX_IMAGES));
  };

  const handleRemove = (index: number) => {
    const updated = [...images];
    updated.splice(index, 1);
    setField("images", updated);
  };

  const handleOpenFileDialog = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const emptySlots = MAX_IMAGES - images.length;

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-2xl px-4 sm:px-6 space-y-8">
        {/* Sticky nav (mobile only) */}
        <div className="sticky top-22 z-40 lg:hidden">
          <FormStepNavMobile nextDisabled={images.length === 0} />
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Dodaj zdjęcia
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Możesz dodać maksymalnie {MAX_IMAGES} zdjęcia. Pierwsze zdjęcie
            będzie miniaturą.
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="grid md:grid-cols-3 gap-4 min-h-[148px]">
          {images.map((file, i) => (
            <div
              key={i}
              className="relative group border rounded overflow-hidden"
            >
              <Image
                src={URL.createObjectURL(file)}
                alt={`preview-${i}`}
                width={300}
                height={200}
                className="w-full h-32 object-cover"
              />
              <button
                onClick={() => handleRemove(i)}
                className="absolute top-1 right-1 bg-white/90 border border-gray-300 text-gray-600 rounded-full p-1 hover:bg-red-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {[...Array(emptySlots)].map((_, i) => (
            <div
              key={`placeholder-${i}`}
              onClick={handleOpenFileDialog}
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 h-32 rounded cursor-pointer hover:bg-gray-50 transition"
            >
              <Plus className="w-6 h-6 text-gray-400" />
              <p className="text-sm text-gray-400 mt-1">Dodaj zdjęcie</p>
            </div>
          ))}
        </div>

        {/* Static nav (desktop only) */}
        <div className="hidden lg:block pt-6">
          <FormStepNav nextDisabled={images.length === 0} />
        </div>
      </div>
    </div>
  );
};

export default StepThree;
