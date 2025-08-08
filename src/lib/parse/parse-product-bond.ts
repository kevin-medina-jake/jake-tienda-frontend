import { IProductBond } from "@/types/product";

export const parseProductBond = (productBond: any): IProductBond => {
  return {
    id: productBond.id,
    title: productBond.title,
    description: productBond.description,
    slug: productBond.product.slug,
    image: productBond.image.url,
    price: productBond.product.price,
    stock: productBond.product.stock,
  };
};
