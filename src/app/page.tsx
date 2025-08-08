export const revalidate = 30;

import type { Metadata } from "next";

import HomePage from "@/pages/homePage";

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
  return <HomePage />;
}
