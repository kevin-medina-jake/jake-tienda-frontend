"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Importamos los logos desde assets
import PioneerImg from "@/assets/logo/Pioneer.png";
import betaImg from "@/assets/logo/beta3.png";
import ProDjImg from "@/assets/logo/ProDj.png";
import ElectroVoiceImg from "@/assets/logo/ElectroVoice.jpg";
import alphaThetaImg from "@/assets/logo/alphaTheta.png";
import audioCenterImg from "@/assets/logo/audio-center.png";
import MaxLinImg from "@/assets/logo/MaxLin.jpg";

const brands = [
  { name: "Pioneer DJ", logo: PioneerImg, link: "/marcas/klark-teknik" },
  { name: "Beta 3", logo: betaImg, link: "/marcas/boya" },
  { name: "ProDJ", logo: ProDjImg, link: "/marcas/adam-hall" },
  { name: "JBL", logo: ElectroVoiceImg, link: "/marcas/prodj" },
  { name: "AlphaTheta", logo: alphaThetaImg, link: "/marcas/prodj-lighting" },
  { name: "audio-center", logo: audioCenterImg, link: "/marcas/pioneer" },
  { name: "Behringer", logo: MaxLinImg, link: "/marcas/behringer" },
];

export default function TrustSection() {
  const loopedBrands = [...brands, ...brands];

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
            <a
              key={idx}
              href={brand.link}
              className="flex-shrink-0 w-48 h-24 flex items-center justify-center hover:scale-105 transition-transform"
            >
              <Image
                src={brand.logo ?? "/not-found.png"}
                alt={brand.name}
                width={160}
                height={80}
                className="object-contain"
                priority={idx < brands.length}
              />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
