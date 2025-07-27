import { IDropDownMenu } from "@/types/navbar";

export const parseCategoryDropDownMenu = (categories: any) => {
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
