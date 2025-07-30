"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Importamos los logos desde assets
import PioneerImg from "@/assets/logo/Pioneer.png";
import betaImg from "@/assets/logo/beta3.png";
import jblImg from "@/assets/logo/JBL.png";
import alphaThetaImg from "@/assets/logo/alphaTheta.png";
import pioneerImg from "@/assets/logo/Pioneer.png";
import behringerImg from "@/assets/logo/Behringer.jpg";

const brands = [
  { name: "Pioneer DJ", logo: PioneerImg, link: "/marcas/klark-teknik" },
  { name: "Beta 3", logo: betaImg, link: "/marcas/boya" },
  { name: "JBL", logo: jblImg, link: "/marcas/prodj" },
  { name: "AlphaTheta", logo: alphaThetaImg, link: "/marcas/prodj-lighting" },
  { name: "Pioneer DJ", logo: pioneerImg, link: "/marcas/pioneer" },
  { name: "Behringer", logo: behringerImg, link: "/marcas/behringer" },
];

export default function TrustSection() {
  // Duplicamos la lista para el efecto infinito (loop continuo)
  const loopedBrands = [...brands, ...brands];

  return (
    <section className="overflow-hidden">
     

      {/* Contenedor animado con scroll infinito */}
      <div className="relative w-full overflow-hidden">
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
            <a
              key={idx}
              href={brand.link}
              className="flex-shrink-0 w-48 h-24 flex items-center justify-center hover:scale-105 transition-transform"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={160}
                height={80}
                className="object-contain"
                priority={idx < brands.length} // Prioridad para los primeros
              />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
