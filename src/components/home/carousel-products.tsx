"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "@/styles/home/carrousel-products.css";

// import required modules
import { Pagination } from "swiper/modules";
import { INewProducts } from "@/types/product";
import Link from "next/link";

export const CarouselProducts = ({
  products,
}: {
  products: INewProducts[];
}) => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={4}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 4,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 4,
          },
        }}
        modules={[Pagination]}
        loop={true}
        className="h-96"
      >
        {products.slice(0, 8).map((product) => (
          <SwiperSlide key={product.id}>
            <div className="w-full h-full flex flex-col bg-blue-50 p-4">
              <section className="rounded-sm overflow-hidden flex-1 grid place-content-center w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </section>

              <section className="pb-2">
                <p>{product.name}</p>

                <div className="flex gap-2 py-2">
                  <button className="bg-blue-200 w-full flex items-center border border-blue-200 justify-center h-10 font-medium rounded-full text-sm">
                    Añadir
                  </button>

                  <Link
                    href={"/product/view-product/" + product.slug}
                    className="border border-blue-200 flex items-center w-full justify-center h-10 font-medium rounded-full text-sm"
                  >
                    <span>Ver Producto</span>
                  </Link>
                </div>
              </section>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
