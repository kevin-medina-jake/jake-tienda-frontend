import { INewProducts } from "@/types/product";

export const parseNewProducts = (products: any): INewProducts[] => {
  const result: INewProducts[] = products.map((product: any) => {
    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0].url,
    };
  });

  return result;
};
