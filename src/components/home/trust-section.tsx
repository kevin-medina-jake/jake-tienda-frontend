"use client";

import { IBrandWithImage } from "@/types/navbar";

import Image from "next/image";
import Link from "next/link";

export const TrustSection = ({ brands }: { brands: IBrandWithImage[] }) => {
  const loopedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="overflow-hidden">
      <div className="relative w-full overflow-hidden py-2">
        <div className="flex gap-16">
          {loopedBrands.map((brand, idx) => (
            <Link
              key={idx}
              href={"/products?brand=" + brand.name}
              className="flex h-24 w-48 flex-shrink-0 items-center justify-center transition-transform hover:scale-105"
            >
              <Image
                src={brand.logo ?? "/not-found.png"}
                alt={brand.name}
                width={160}
                height={80}
                className="object-contain"
                priority={idx < brands.length}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
