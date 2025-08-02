import {
  INewProducts,
  IProductCart,
  IProductFilter,
  IViewProduct,
} from "@/types/product";

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
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    stock: product.stock,
    description: product.description,
    category: product?.categories[0]?.slug,
    images: product.images.map((image: any) => image.url),
  };
};

export const parseProductCart = (products: any): IProductFilter[] => {
  if (!products) {
    return [];
  }

  const result = products.map((product: any) => {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      slug: product.slug,
      image: product?.images[0]?.url,
      stock: product.stock,
      brand: product?.brand?.name,
      categories: product?.categories.map((category: any) => category.name),
    };
  }) as IProductFilter[];

  return result;
};
