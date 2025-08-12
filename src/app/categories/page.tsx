import { Suspense } from "react";
import type { Metadata } from "next";

import { ProductCategoires } from "@/components/categories/productCategoires";
import { LoaderSpinner } from "@/components/common/loaderSpinner";

export const metadata: Metadata = {
  title:
    "Categorías | Jake Tienda Electrónica — Audio Profesional y Tecnología",
  description:
    "Explora nuestras categorías de audio: parlantes, subwoofers, controladoras DJ, consolas, micrófonos y más. Envío a toda Colombia y opciones de financiación.",
  keywords: [
    "categorías de audio",
    "parlantes",
    "subwoofers",
    "controladoras DJ",
    "consolas de audio",
    "micrófonos",
    "sonido profesional",
    "tecnología de sonido",
    "Jake Tienda Electrónica",
  ],
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/categories",
  },
  openGraph: {
    title:
      "Categorías de Productos | Jake Tienda Electrónica",
    description:
      "Descubre nuestras categorías:productos DJ, sonido activo, sonido pasivo, microfonos y más. Compra con crédito y recibe en toda Colombia.",
    url: "/categories", 
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
  twitter: {
    card: "summary_large_image",
    title:
      "Categorías | Jake Tienda Electrónica",
    description:
      "Explora categorías de audio profesional y tecnología.",
    images: ["/favicon.svg"],
  },
};

export default async function Page() {
  return (
    <Suspense fallback={<LoaderSpinner />}>
      <ProductCategoires />
    </Suspense>
  );
}
