import { getCollectionCategoriesAndBrands } from "@/lib/shopify";
import { CarouselBrands } from "./carousel-brands";

export const Brands = async () => {
  const { brands } = await getCollectionCategoriesAndBrands("main-menu");

  return <CarouselBrands brands={brands} />;
};
