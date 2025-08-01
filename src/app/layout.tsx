import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/common/navbar";
import Footer from "@/components/common/footer";

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
    // url: "https://jaketiendaelectronica.com",
    siteName: "Jake Tienda Electrónica",
    images: [
      {
        url: "/logo.svg", // Asegúrate de tener esta imagen en public/
        width: 1200,
        height: 630,
        alt: "Jake Tienda Electrónica",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  // metadataBase: new URL("https://jaketiendaelectronica.com"),
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
      </head>

      <body className={`${poppins.variable} font-poppins antialiased`}>
        <Navbar />
        <main className="relative max-w-8xl w-full mx-auto sm:mt-[100px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
