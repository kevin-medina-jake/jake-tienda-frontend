"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "@/styles/home/carrousel-products.css";

import { Product } from "@/lib/shopify/types";
import { GridTileImage } from "@/components/grid/tile";
import Link from "next/link";

export const CarouselProducts = ({ products }: { products: Product[] }) => {
  return (
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
        1008: {
          slidesPerView: 3,
          spaceBetween: 4,
        },
      }}
      modules={[Pagination]}
      loop={true}
      className="h-full !pb-10"
    >
      {products.slice(0, 8).map((product) => (
        <SwiperSlide key={product.id}>
          <Link
            href={`/product/${product.handle}`}
            prefetch={true}
            aria-label={`Ver ${product.title}`}
            className="h-full w-full"
          >
            <GridTileImage
              alt={product.title}
              label={{
                title: product.title,
                amount: product.priceRange.maxVariantPrice.amount,
                currencyCode: product.priceRange.maxVariantPrice.currencyCode,
              }}
              src={product.featuredImage?.url}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
