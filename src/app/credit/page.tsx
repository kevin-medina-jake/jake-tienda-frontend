export const metadata = {
  title: "Compra a crédito | Jake Tienda Electrónica",
  description:
    "Financia tus bajos, cabinas o controladoras DJ con Banco de Bogotá, Brilla, Addi, Gora y más. Créditos fáciles y rápidos en Colombia.",
  keywords: [
    "comprar parlantes a crédito",
    "financiar sonido",
    "crédito Banco de Bogotá",
    "Brilla crédito tecnología",
    "Addi equipos DJ",
    "Gora crédito",
    "tecnología financiada",
    "Jake Tienda Electrónica",
    "controladoras DJ a cuotas",
    "Cabinas con financiación",
  ],
  openGraph: {
    title: "Financia tu sonido en Jake Tienda Electrónica",
    description:
      "Compra sonido profesional con opciones de crédito accesibles. Trabajamos con Banco de Bogotá, Addi, Brilla y más. Entregas en toda Colombia.",
    url: "https://jaketiendaelectronica.com/credit", // ❗ Cambia esto por tu dominio real
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

import CreditSection from "@/components/credit/credit-section";

export default function CreditPage() {
  return <CreditSection />;
}
