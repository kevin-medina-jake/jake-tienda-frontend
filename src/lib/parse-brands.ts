import { IDropDownMenu } from "@/types/navbar";

export const parseBrandsDropDownMenu = (brands: any) => {
  const result = brands
    .map((brand: any) => {
      if (brand.products.length === 0) return;
      return {
        id: brand.id,
        name: brand.name,
        slug: brand.slug,
        url_product: brand?.products[0]?.slug,
      };
    })
    .filter((item: any) => item !== undefined);

  return result;
};
