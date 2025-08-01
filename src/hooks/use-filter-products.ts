import { useEffect } from "react";
import { useStoreProducts } from "@/store/products";
import { IProductFilter } from "@/types/product";

export const useFilterProducts = () => {
  const { allProducts, setFilteredProducts, filters, setFilters } =
    useStoreProducts();

  const handleSearch = ({ search }: { search: string }) => {
    const newFilter = {
      ...filters,
      search,
    };

    setFilters(newFilter);
  };

  const handleCategories = ({ categories }: { categories: string[] }) => {
    const newFilter = {
      ...filters,
      categories,
    };

    setFilters(newFilter);
  };

  const handleBrands = ({ brands }: { brands: string[] }) => {
    const newFilter = {
      ...filters,
      brands,
    };

    setFilters(newFilter);
  };

  const handlePrice = ({ price }: { price: number }) => {
    const newFilter = {
      ...filters,
      price,
    };

    setFilters(newFilter);
  };

  const filterProducts = () => {
    const newProducts = allProducts.filter((product: IProductFilter) => {
      const item: string = filters.search.toLowerCase().trim();
      const newValue = item.split(" ");

      const filterLetters = newValue.length > 3;

      const matchesSearch = filterLetters
        ? product?.name?.toLowerCase().includes(item) ||
          product?.categories
            ?.map((category: any) => category)
            .some((category: string) =>
              category.toLowerCase().includes(item)
            ) ||
          product?.brand?.toLowerCase().includes(item)
        : newValue.some(
            (word) =>
              product?.name?.toLowerCase().includes(word) ||
              product?.categories
                ?.map((category: any) => category)
                .some((category: string) =>
                  category.toLowerCase().includes(word)
                ) ||
              product?.brand?.toLowerCase().includes(item)
          );

      const matchesCategories =
        filters.categories.length === 0 ||
        (product.categories?.length > 0 &&
          product.categories.some((cat: string) =>
            filters.categories.includes(cat)
          ));

      const matchesBrands =
        filters.brands.length === 0 ||
        filters.brands.some((value: string) => product.brand?.includes(value));

      const matchesPrice = product.price >= filters.price;

      return (
        matchesSearch && matchesBrands && matchesCategories && matchesPrice
      );
    });

    setFilteredProducts(newProducts);
  };

  useEffect(() => {
    filterProducts();
  }, [filters]);

  return {
    handleSearch,
    handleBrands,
    handleCategories,
    handlePrice,
  };
};
