"use client";

import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "@/styles/home/presentation.css";

export const CarouselHero = ({ hero }: { hero: any[] }) => {
  return (
    <div className="relative order-1 block overflow-hidden lg:order-2">
      <div className="grid gap-4 pb-4 sm:place-items-center lg:hidden">
        <span className="w-fit rounded-full bg-blue-600/10 px-3 py-1 text-xs font-medium text-blue-700">
          Tienda #1 en Electrónica
        </span>

        <h1 className="text-5xl leading-tight font-extrabold text-gray-900 sm:text-center sm:text-5xl md:text-6xl">
          Jake Tienda Electrónica
        </h1>
      </div>

      <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10 md:h-[360px] lg:h-[480px] xl:h-[560px]">
        <Swiper
          spaceBetween={0}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop
          modules={[Autoplay, Pagination, Navigation]}
          className="swiper swiper-slide"
        >
          {hero.map((p) => (
            <SwiperSlide key={p.id}>
              <Link
                href={`/product/${p.handle}`}
                className="block h-full w-full"
              >
                <Image
                  src={p?.image?.image?.url ?? "not-found.png"}
                  alt={p.id}
                  width={1000}
                  height={600}
                  loading="eager"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
