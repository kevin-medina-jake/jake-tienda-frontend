"use client";

import controladorImg from "@/assets/images/controlador.png";
import ProductCarousel from "./product-carousel";
import ProductInfo from "./product-info";
import ProductDetails from "./product-details";
import ProductSimilar from "./product-similar";

const product = {
  name: "DDJ-FLX",
  price: 1200000,
  images: [controladorImg.src, controladorImg.src, controladorImg.src],
  description:
    "La DDJ-FLX es la controladora perfecta para DJs que quieren mezclar con total libertad. Compatible con Rekordbox y Serato, ofrece funciones creativas que te permiten pasar de sets básicos a presentaciones dinámicas en vivo.",
  features: [
    "Permite mezclar con transiciones suaves gracias al Merge FX.",
    "Pads de rendimiento para Hot Cues, Sampler y efectos dinámicos.",
    "Diseño portátil y ligero para cabinas, bares o fiestas.",
    "Conectividad plug & play para laptops y smartphones.",
  ],
  specs: [
    "Software compatible: Rekordbox, Serato DJ Lite/Pro.",
    "Número de canales: 2.",
    "Entradas: 1 micrófono (jack 1/4''), 1 auxiliar (RCA).",
    "Salidas: Master (RCA), auriculares (jack 1/4'' y 1/8'').",
    "Tarjeta de sonido: 24 bits / 44.1 kHz.",
    "Alimentación: USB (sin fuente externa).",
    "Dimensiones: 482 mm × 59 mm × 272 mm.",
    "Peso: 2.1 kg.",
  ],
};

export default function ProductDetail() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-20 py-10 space-y-16">
      {/* Sección principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <ProductCarousel images={product.images} />
        <ProductInfo name={product.name} price={product.price} />
      </div>

      {/* Detalles */}
      <ProductDetails
        description={product.description}
        features={product.features}
        specs={product.specs}
      />

      {/* Productos Similares */}
      <ProductSimilar />
    </div>
  );
}
