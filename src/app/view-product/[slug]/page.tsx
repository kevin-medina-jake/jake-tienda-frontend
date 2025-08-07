export const revalidate = 30;

import type { Metadata } from "next";
import type { IViewProduct } from "@/types/product";

import { getViewProduct } from "@/service/api/product";
import { ProductDetail } from "@/components/view-products/product-detail";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  try {
    const product = (await getViewProduct(params.slug)) as IViewProduct | null;

    if (!product) {
      return {
        title: "Producto no encontrado | Jake Tienda Electrónica",
        description: "Este producto no se encuentra disponible actualmente.",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const plainTextDescription =
      product.description
        ?.replace(/[#>*_\-\[\]()]/g, "")
        .split("\n")
        .find((line) => line.trim().length > 40) || "";

    const title = `${product.name} | Jake Tienda Electrónica`;
    const description =
      plainTextDescription ||
      `Compra ${product.name} con financiación y envío nacional.`;

    const imageUrl = product.images?.[0]?.startsWith("http")
      ? product.images[0]
      : `https://jaketiendaelectronica.com${product.images?.[0]}`;

    const fullUrl = `https://jaketiendaelectronica.com/view-product/${params.slug}`;

    return {
      title,
      description,
      keywords: [
        product.name,
        "tecnología de sonido",
        "productos para DJ",
        "audio profesional",
        "tienda de sonido",
      ],
      openGraph: {
        title,
        description,
        url: fullUrl,
        siteName: "Jake Tienda Electrónica",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
        locale: "es_CO",
        type: "website",
      },
      metadataBase: new URL("https://jaketiendaelectronica.com"),
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch {
    return {
      title: "Producto | Jake Tienda Electrónica",
      description: "Consulta nuestros productos de sonido profesional.",
    };
  }
}

export default async function ProductPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;

  return <ProductDetail slug={slug} />;
}
