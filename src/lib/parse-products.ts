import { INewProducts, IViewProduct } from "@/types/product";

export const parseNewProducts = (products: any): INewProducts[] => {
  const result: INewProducts[] = products.map((product: any) => {
    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0].url,
    };
  });

  return result;
};

export const parseViewProduct = (product: any): IViewProduct => {
  console.log("Parsing product:", product);
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    stock: product.stock,
    description: product.description,
    category: product?.category?.map((cat: any) => cat.slug),
    images: product.images.map((image: any) => image.url),
  };

};
