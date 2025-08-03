import { ICategoryCart } from "@/types/category";
import { IDropDownMenu } from "@/types/navbar";

export const parseCategoryDropDownMenu = (categories: any): IDropDownMenu[] => {
  const result = categories
    .map((category: any) => {
      if (category.products.length === 0) return;
      return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        url_product: category?.products[0]?.slug,
      };
    })
    .filter((item: any) => item !== undefined);
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
