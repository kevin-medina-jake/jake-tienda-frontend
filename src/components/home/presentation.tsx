"use client";

import Link from "next/link";

import { ICarouselPresentation } from "@/types/home";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "@/styles/home/presentation.css";

export const Presentation = ({
  presentations,
}: {
  presentations: ICarouselPresentation[];
}) => {
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
      className="h-screen sm:h-[calc(100vh-250px)]"
    >
      {presentations.map((presentation: ICarouselPresentation) => (
        <SwiperSlide key={presentation.id}>
          <Link
            href={"/view-product/" + presentation.slug}
            className="h-full w-full"
          >
            <img
              src={presentation.url}
              alt={presentation.name_image}
              className="h-full w-full object-cover"
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
