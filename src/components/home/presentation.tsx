"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "@/styles/home/presentation.css";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ICarouselPresentation } from "@/types/home";
import Link from "next/link";

export const Presentation = ({ presentations }: any) => {
  const listPresentation: ICarouselPresentation[] = presentations;

  return (
    <Swiper
      spaceBetween={0}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      loop={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="h-[calc(100vh-150px)]"
    >
      {listPresentation.map((presentation: ICarouselPresentation) => (
        <SwiperSlide key={presentation.id}>
          <Link
            href={"/view-product/" + presentation.slug}
            className="w-full h-full"
          >
            <img
              src={presentation.url}
              alt={presentation.name_image}
              className="w-full h-full object-cover"
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
