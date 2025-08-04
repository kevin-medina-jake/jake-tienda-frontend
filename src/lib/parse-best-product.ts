import { Data, IBestProduct } from "@/types/product";

export const parseBestProduct = (bestProduct: Data): IBestProduct => {
  return {
    id: bestProduct.id,
    name: bestProduct.name,
    slug: bestProduct.product.slug,
    image: bestProduct.image.url,
  };
};
