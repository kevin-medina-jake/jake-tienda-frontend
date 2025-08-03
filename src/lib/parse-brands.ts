import { IDropDownMenu } from "@/types/navbar";

export const parseBrandsDropDownMenu = (brands: any) => {
  const result = brands
    .map((brand: any) => {
      return {
        id: brand.id,
        name: brand.name,
        slug: brand.slug,
        url_product: brand?.products[0]?.slug,
      };
    })
    .filter((item: any) => item !== undefined) as IDropDownMenu[];

  return result;
};

export const parseBrandWithImage = (brands: any) => {
  const result = brands
    .map((brand: any) => {
      return {
        id: brand.id,
        name: brand.name,
        slug: brand.slug,
        image: brand?.logo?.url,
        url_product: brand?.products[0]?.slug,
      };
    })
    .filter((item: any) => item !== undefined);

  return result;
};
