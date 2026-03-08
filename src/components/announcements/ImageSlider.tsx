"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: { image_url: string }[];
};

export function ImageSlider({ images }: Props) {
  if (!images?.length) return null;

  return (
    <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] rounded-[16px] overflow-hidden border border-[var(--border)] shadow-sm">
      <Swiper
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-[var(--accent-main)]",
          bulletActiveClass:
            "swiper-pagination-bullet-active !bg-[var(--accent-main)]",
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        modules={[Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        className="w-full h-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full">
              <img
                src={`http://localhost:8000${img.image_url}`}
                alt={`Zdjęcie ${index + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </SwiperSlide>
        ))}

        {/* custom arrows */}
        <div className="swiper-button-prev-custom absolute top-1/2 left-4 -translate-y-1/2 bg-white/50 backdrop-blur-sm hover:bg-white/70 p-2 rounded-full z-10 cursor-pointer shadow-md">
          <ChevronLeft className="w-5 h-5 text-[var(--accent-dark)]" />
        </div>
        <div className="swiper-button-next-custom absolute top-1/2 right-4 -translate-y-1/2 bg-white/50 backdrop-blur-sm hover:bg-white/70 p-2 rounded-full z-10 cursor-pointer shadow-md">
          <ChevronRight className="w-5 h-5 text-[var(--accent-dark)]" />
        </div>
      </Swiper>
    </div>
  );
}
