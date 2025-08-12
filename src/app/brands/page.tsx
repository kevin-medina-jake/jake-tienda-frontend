import { Suspense } from "react";
import type { Metadata } from "next";

import { ProductBrands } from "@/components/brands/productBrands";
import { LoaderSpinner } from "@/components/common/loaderSpinner";

export const metadata: Metadata = {
  title: "Marcas | Jake Tienda Electrónica — Audio Profesional y Tecnología",
  description:
    "Explora nuestras marcas oficiales de audio profesional: Pioneer DJ, JBL, Electro-Voice, Behringer, Yamaha y más. Compra con financiación y envío a toda Colombia.",
  keywords: [
    "marcas de audio",
    "Pioneer DJ",
    "Beta3",
    "Electro-Voice",
    "Behringer",
    "Yamaha Pro Audio",
    "controladoras DJ",
    "parlantes profesionales",
    "tienda de sonido Colombia",
    "Jake Tienda Electrónica",
  ],
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/brands",
  },
  openGraph: {
    title: "Marcas de Audio Profesional | Jake Tienda Electrónica",
    description:
      "Conoce las marcas que distribuimos: Pioneer DJ, Electro-Voice, Beta3 y otras. Compra con crédito y recibe en toda Colombia.",
    url: "/brands", // se resuelve con metadataBase del layout
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
    title: "Marcas | Jake Tienda Electrónica",
    description: "Marcas oficiales de audio profesional en Colombia.",
    images: ["/favicon.svg"],
  },
};

export default async function Page() {
  return (
    <Suspense fallback={<LoaderSpinner />}>
      <ProductBrands />
    </Suspense>
  );
}
