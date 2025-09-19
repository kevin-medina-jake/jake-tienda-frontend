// app/collection/[collection]/layout.tsx
import type { Metadata } from "next";
import { Header } from "@/components/collection/header";

// Helper: "controladoras-dj" -> "Controladoras Dj"
function slugToTitle(slug: string) {
  return slug
    .split("-")
    .map((s) => (s ? s[0].toUpperCase() + s.slice(1) : s))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: { collection: string };
}): Promise<Metadata> {
  const titleFromSlug = slugToTitle(params.collection);

  const pageTitle = `${titleFromSlug} | Jake Tienda Electrónica`;
  const description = `Compra ${titleFromSlug} en Jake Tienda Electrónica: parlantes, consolas, controladoras DJ, subwoofers y más. Envío nacional y opciones de financiación.`;


  const ogImage = "/favicong.svg";

  return {
    title: pageTitle,
    description,
    keywords: [
      `${titleFromSlug.toLowerCase()} colombia`,
      "audio profesional",
      "parlantes",
      "controladoras dj",
      "subwoofers",
      "tecnología de sonido",
      "jake tienda electrónica",
    ],
    alternates: {
      canonical: `/collection/${params.collection}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      title: pageTitle,
      description,
      type: "website",
      url: `/collection/${params.collection}`,
      siteName: "Jake Tienda Electrónica",
      locale: "es_CO",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "Jake Tienda Electrónica" }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [ogImage],
    },
  };
}

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pt-6 pb-4 text-black md:flex-row">
        {children}
      </div>
    </>
  );
}
