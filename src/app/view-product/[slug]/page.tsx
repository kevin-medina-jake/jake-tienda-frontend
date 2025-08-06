export const revalidate = 30;

import ProductDetail from "@/components/view-products/product-detail";
import { getViewProduct } from "@/service/api/product";
import type { Metadata } from "next";
import type { IViewProduct } from "@/types/product";

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

    return {
      title: `${product.name} | Jake Tienda Electrónica`,
      description: `Compra ${product.name} con financiación y envío en toda Colombia. Tecnología de sonido profesional.`,
      openGraph: {
        title: `${product.name} | Jake Tienda Electrónica`,
        description: `Explora el ${product.name} con crédito o pago inmediato. Ideal para DJs, negocios y eventos.`,
        url: `https://jaketiendaelectronica.com/view-product/${params.slug}`, // actualiza en producción
        siteName: "Jake Tienda Electrónica",
        images: [
          {
            url: product.images?.[0] || "/logo.svg", // corregido si es string
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
        locale: "es_CO",
        type: "website", // corregido: no se permite "product"
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
