// lib/parse/parse-best-product.ts
import { IBestProduct } from "@/types/product";

const makeAbsolute = (url: string | undefined): string => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  const base = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";
  return `${base.replace(/\/$/, "")}${url}`;
};

export const parseBestProduct = (bp: any): IBestProduct => {
  // Soporta shape plano (tu ejemplo) y el de Strapi con "data/attributes"
  const product   = bp?.product?.data?.attributes ?? bp?.product ?? {};
  const brandName = product?.brand?.data?.attributes?.name ?? product?.brand?.name ?? "";

  const name = bp?.name ?? product?.name ?? "";
  const slug = bp?.product?.data?.attributes?.slug ?? bp?.product?.slug ?? "";
  const img  = bp?.image?.data?.attributes?.url ?? bp?.image?.url ?? "";

  return {
    id: bp?.id ?? product?.id ?? 0,
    name,
    slug,
    image: makeAbsolute(img),
    brand: brandName,
  };
};
