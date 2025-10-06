import type { Metadata } from "next";

import { Hero } from "@/components/home/hero/hero";
import { Bonds } from "@/components/home/bonds";
import { NewProducts } from "@/components/home/new-products/new-products";
import { Categories } from "@/components/home/categories";
import { Brands } from "@/components/home/brands/brands";

export const runtime = "edge";

export const metadata: Metadata = {
  title:
    "Jake Tienda Electrónica | Controladoras, Consolas, Parlantes, Subwoofers y Tecnología en Colombia",
  description:
    "Compra parlantes, bajos, controladoras DJ, consolas y audio profesional con financiación y envío nacional. Tienda de sonido en Popayán.",
  keywords: [
    "tienda de sonido",
    "parlantes Colombia",
    "controladoras DJ",
    "subwoofers Popayán",
    "JBL a crédito",
    "tienda de tecnología audio",
    "Jake tienda electrónica",
  ],
  openGraph: {
    title: "Jake Tienda Electrónica | Sonido Profesional en Colombia",
    description:
      "Explora nuestra tienda de parlantes, consolas, controladoras DJ y bajos. Créditos fáciles y envíos rápidos.",
    url: "https://jaketiendaelectronica.com",
    siteName: "Jake Tienda Electrónica",
    images: [
      {
        url: "/favicon.svg",
        width: 1200,
        height: 630,
        alt: "Jake Tienda Electrónica",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
};

export default async function Home() {
  return (
    <div className="mb-10 flex flex-col gap-8">
      <Hero />
      <Brands />
      <Categories />
      <NewProducts />
      <Bonds />
    </div>
  );
}
