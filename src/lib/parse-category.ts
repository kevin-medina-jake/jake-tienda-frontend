import { ICategoryCart, IProductCategory } from "@/types/category";
import { IDropDownMenu } from "@/types/navbar";

export const parseCategoryDropDownMenu = (categories: any): IDropDownMenu[] => {
  const result = categories.map((category: any) => {
    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      url_product: category?.products[0]?.slug,
    };
  }) as IDropDownMenu[];

  return result;
};

export const parseCategoryCart = (categories: any): ICategoryCart[] => {
  const result = categories.map((category: any) => {
    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      image: category?.image?.url,
      isImportant: category.isImportant,
    };
  }) as ICategoryCart[];

  return result;
};

export const parseProductCategory = (products: any): IProductCategory[] => {
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
    };
  }) as IProductCategory[];

  return result;
};
