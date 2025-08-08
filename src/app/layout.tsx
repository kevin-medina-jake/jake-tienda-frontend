import type { Metadata } from "next";

import { Poppins } from "next/font/google";

import { Navbar } from "@/components/common/navbar";
import Footer from "@/components/common/footer";

import "@/styles/globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jake Tienda Electrónica | Audio Profesional y Tecnología en Colombia",
  description:
    "Compra parlantes, controladoras DJ, consolas, subwoofers y tecnología de sonido profesional. Financiación disponible y envío en Colombia.",
  keywords: [
    "parlantes profesionales",
    "sonido DJ",
    "financiación de audio",
    "envío a Colombia",
    "parlantes a crédito",
    "controladoras DJ",
    "subwoofers",
    "controladoras DJ a crédito",
    "tienda de sonido Popayán",
    "tienda de tecnología audio",
    "audio profesional Colombia",
    "tecnología de sonido",
    "financiación de audio",
    "parlantes JBL",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Jake Tienda Electrónica | Tecnología y Sonido Profesional",
    description:
      "controladoras, Parlantes, Cabinas y más. Compra con crédito y recibe en toda Colombia.",
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
  metadataBase: new URL("https://jaketiendaelectronica.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Jake Tienda Electrónica",
              url: "https://jaketiendaelectronica.com",
              logo: "https://jaketiendaelectronica.com/favicon.svg",
            }),
          }}
        />
      </head>

      <body className={`${poppins.variable} font-poppins antialiased`}>
        <Navbar />

        <main className="max-w-8xl relative mx-auto mt-[117px] min-h-[calc(100vh-117px)] w-full sm:mt-[100px] sm:min-h-[calc(100vh-100px))]">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
