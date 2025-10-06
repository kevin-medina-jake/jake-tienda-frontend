export const runtime = 'edge';

export const metadata = {
  title: "Sobre nosotros | Jake Tienda Electrónica",
  description:
    "Conoce la historia de Jake Tienda Electrónica: expertos en audio profesional, tecnología y soluciones con financiación en Colombia. Atención personalizada y envío nacional.",
  keywords: [
    "Jake Tienda Electrónica",
    "quiénes somos",
    "tienda de sonido Popayán",
    "tecnología de audio en Colombia",
    "audio profesional",
    "controladoras DJ Colombia",
    "historia Jake Tienda",
    "tecnología financiada",
    "parlantes Popayán",
    "equipo de sonido Colombia",
  ],
  openGraph: {
    title: "Sobre Jake Tienda Electrónica",
    description:
      "Especialistas en tecnología de sonido profesional. Te contamos nuestra historia, visión y cómo ayudamos a nuestros clientes en Colombia.",
    url: "https://jaketiendaelectronica.com/about-us", // ⚠️ Reemplaza por tu dominio real
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

import AboutSection from "@/components/about-us/about-section";

export default function AboutUsPage() {
  return <AboutSection />;
}
