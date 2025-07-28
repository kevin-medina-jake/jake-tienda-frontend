import { ICategoryCart } from "@/types/category";
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
    };
  }) as ICategoryCart[];

  return result;
};
