// components/home/best-product-poster.tsx
"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { IBestProduct } from "@/types/product";


type Props = {
  data: IBestProduct;
  bg?: string | StaticImageData;   // <- acepta string o import estático
  cta?: string;
  className?: string;
};

export default function BestProductPoster({
  data,
  bg,
  cta = "Ver producto",
  className = "",
}: Props) {
  if (!data?.image) return null;

  const { brand, name, slug, image } = data;

  // Obtiene la URL correcta según el tipo de `bg`
  const bgUrl =
    typeof bg === "string" ? bg : bg?.src; // StaticImageData tiene `.src`

  return (
    <Link
      href={`/view-product/${slug}`}
      className={`group block w-full ${className}`}
      aria-label={`Ver ${brand ? `${brand} ` : ""}${name}`}
    >
      <article
        className="
          relative overflow-hidden rounded-2xl
          ring-1 ring-black/10 shadow-xl
          flex flex-col
          min-h-[520px] sm:min-h-[540px] lg:min-h-[560px]
        "
        style={
          bgUrl
            ? {
                backgroundImage: `url(${bgUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5" />

        <header className="px-6 pt-6 sm:px-6 sm:pt-8">
          {brand ? (
            <p className="text-sm font-semibold uppercase text-black/80 tracking-wide text-center">
              {brand}
            </p>
          ) : null}
          <h3 className="mt-3 font-black leading-none text-black text-4xl sm:text-4xl lg:text-5xl tracking-tight text-center">
            {name}
          </h3>
        </header>

        <div className=" mx-auto mt-1 w-[92%] flex-3 aspect-[5/4] sm:aspect-[4/3] lg:aspect-[16/9]">
          <Image
            src={image}
            alt={`${brand ? brand + " " : ""}${name}`}
            fill
            priority
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 40vw, 25vw"
            className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>

        
      </article>
    </Link>
  );
}
