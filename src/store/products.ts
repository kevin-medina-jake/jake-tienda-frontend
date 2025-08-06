import { create } from "zustand";
import { IProductFilter } from "@/types/product";

interface IFilters {
  search: string;
  categories: string[];
  brands: string[];
  price: number;
}

interface IState {
  allProducts: IProductFilter[];

  loadingStore: boolean;

  filters: IFilters;
  productsSearch: IProductFilter[];
  productsFilter: IProductFilter[];

  setLoading: (loading: boolean) => void;
  setFilters: (filters: IFilters) => void;

  setAllProducts: (productsFilter: IProductFilter[]) => void;
  setProductsSearch: (productsFilter: IProductFilter[]) => void;

  // resetFilteredProducts: () => void;
  // removeAllProducts: () => void;

  setProductsFilter: (productsFilter: IProductFilter[]) => void;
}

export const useStoreProducts = create<IState>((set, get) => ({
  allProducts: [],
  productsFilter: [],
  productsSearch: [],

  filters: { search: "", categories: [], brands: [], price: 0 },
  loadingStore: true,

  setLoading: (loading) => set({ loadingStore: loading }),
  setFilters: (filters) => set({ filters }),

  setAllProducts: (products) =>
    set({ allProducts: products, productsFilter: products }),

  setProductsSearch: (products) => set({ productsSearch: products }),

  // resetFilteredProducts: () => set({ productsSearch: get().allProducts }),

  // removeAllProducts: () => set({ allProducts: [], productsSearch: [] }),

  setProductsFilter: (products) => set({ productsFilter: products }),
}));
