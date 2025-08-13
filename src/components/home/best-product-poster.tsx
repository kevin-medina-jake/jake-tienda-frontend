"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { IBestProduct } from "@/types/product";

type Props = {
  data: IBestProduct;
  /** Fondo: acepta import estático o ruta pública */
  bg?: string | StaticImageData;
  /** CTA opcional (oculto por ahora, lo dejamos por si lo necesitas luego) */
  cta?: string;
  /** Texto inferior del póster */
  tagline?: string;
  className?: string;
};

export default function BestProductPoster({
  data,
  bg,
  cta = "Ver producto",
  tagline = "Descubre los nuevos productos que tenemos para ti",
  className = "",
}: Props) {
  if (!data?.image) return null;

  const { brand, name, slug, image } = data;
  const bgUrl = typeof bg === "string" ? bg : bg?.src;

  return (
    <Link
      href={`/view-product/${slug}`}
      className={`group block w-full ${className}`}
      aria-label={`Ver ${brand ? `${brand} ` : ""}${name}`}
    >
      <article
        className="
          relative flex w-full flex-col overflow-hidden rounded-2xl
          shadow-xl ring-1 ring-black/10
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
        {/* ligero degradado para legibilidad en fondos claros */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5" />

        {/* Encabezado: Marca + Nombre */}
        <header className="px-6 pt-6 sm:px-6 sm:pt-8">
          {brand ? (
            <p className="text-center text-sm font-semibold uppercase italic tracking-wide text-black/80">
              {brand}
            </p>
          ) : null}

          <h3 className="mt-3 text-center font-black tracking-tight text-black leading-none text-4xl sm:text-4xl lg:text-5xl">
            {name}
          </h3>
        </header>

        {/* Imagen del producto */}
        <div className="relative mx-auto mt-2 w-[92%] flex-1 aspect-[5/4] sm:aspect-[4/3] lg:aspect-[16/9]">
          <Image
            src={image}
            alt={`${brand ? brand + " " : ""}${name}`}
            fill
            priority
            sizes="(max-width: 740px) 92vw, (max-width: 1024px) 40vw, 25vw"
            className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>

        {/* Texto inferior (responsive) */}
        <footer className="px-6 pb-6 pt-3 sm:px-3 sm:pb-7">
          <p className="text-center font-semibold text-black text-lg sm:text-1xl lg:text-1xl leading-snug">
            {tagline}
          </p>
        </footer>
      </article>
    </Link>
  );
}
