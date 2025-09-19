import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://jaketiendaelectronica.com",
  ),
  title: {
    default: "Jake Tienda Electrónica | Audio profesional en Colombia",
    template: "%s | Jake Tienda Electrónica",
  },
  description:
    "Parlantes, controladoras DJ, consolas y subwoofers. Audio profesional con financiación y envíos a toda Colombia.",
  keywords: [
    "tienda de sonido",
    "audio profesional",
    "controladoras DJ",
    "parlantes",
    "subwoofers",
    "Popayán",
    "Colombia",
    "JBL",
    "Pioneer DJ",
  ],
  alternates: {
    canonical: "/",
    languages: { "es-CO": "/" },
  },
  openGraph: {
    type: "website",
    siteName: "Jake Tienda Electrónica",
    locale: "es_CO",
    title: "Jake Tienda Electrónica | Audio profesional en Colombia",
    description:
      "Tecnología y sonido profesional: parlantes, consolas, DJ y subwoofers. Financiación y envíos en Colombia.",
    url: "/",
    images: [
      {
        url: "/favicon.svg",
        width: 1200,
        height: 630,
        alt: "Jake Tienda Electrónica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jake Tienda Electrónica",
    description:
      "Parlantes, controladoras DJ y audio profesional con financiación.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0ea5e9",
  colorScheme: "light",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full">
        <div className="mx-8 max-w-2xl py-20 sm:mx-auto">{children}</div>
      </div>
    </>
  );
}
