"use client";

import { ICategoryCart } from "@/types/category";
import { motion } from "framer-motion";

import Link from "next/link";

export const CarouselBrands = ({ brands }: { brands: ICategoryCart[] }) => {
  const loopedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="overflow-hidden">
      <div className="relative w-full overflow-hidden py-2">
        <motion.div
          className="flex gap-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          }}
          style={{ width: `${loopedBrands.length * 200}px` }}
        >
          {loopedBrands.map((brand, idx) => (
            <Link
              key={idx}
              href={brand.path + "?title=Marca" + "&collection=" + brand.title}
              className="relative h-24 w-48 flex-shrink-0 items-center justify-center transition-transform hover:scale-105"
            >
              <img
                src={brand.image ?? "/not-found.png"}
                alt={brand.title}
                className="h-full w-full object-contain"
                width={200}
                height={96}
                loading="lazy"
                style={{ objectFit: "contain" }}
              />
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
