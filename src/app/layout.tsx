import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://jaketiendaelectronica.com"),
  applicationName: "Jake Tienda Electrónica",
  title: {
    default:
      "Jake Tienda Electrónica | Audio Profesional y Tecnología en Colombia",
    template: "%s | Jake Tienda Electrónica",
  },
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
  referrer: "origin-when-cross-origin",
  themeColor: "#0ea5e9",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      "es-CO": "/",
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Jake Tienda Electrónica | Tecnología y Sonido Profesional",
    description:
      "Controladoras, Parlantes, Cabinas y más. Compra con crédito y recibe en toda Colombia.",
    url: "https://jaketiendaelectronica.com",
    siteName: "Jake Tienda Electrónica",
    images: [
      {
        url: "/not-found.png",
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
    title: "Jake Tienda Electrónica | Tecnología y Sonido Profesional",
    description:
      "Controladoras, Parlantes, Cabinas y más. Compra con crédito y recibe en toda Colombia.",
    images: ["/not-found.png"],
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Jake Tienda Electrónica",
              url: "https://jaketiendaelectronica.com/",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://jaketiendaelectronica.com/products?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>

      <body className={`${poppins.variable} font-poppins antialiased`}>
        <Navbar />

        <main className="max-w-8xl relative mx-auto mt-[117px] h-full min-h-[calc(100vh-117px)] w-full sm:mt-[100px] sm:h-full sm:min-h-[calc(100vh-100px)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
