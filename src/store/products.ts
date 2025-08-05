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

  loading: boolean;

  filters: IFilters;
  filteredProducts: IProductFilter[];
  products: IProductFilter[];

  setLoading: (loading: boolean) => void;
  setFilters: (filters: IFilters) => void;

  setAllProducts: (products: IProductFilter[]) => void;
  setFilteredProducts: (products: IProductFilter[]) => void;

  resetFilteredProducts: () => void;
  removeAllProducts: () => void;

  setProducts: (products: IProductFilter[]) => void;
}

export const useStoreProducts = create<IState>((set, get) => ({
  allProducts: [],
  products: [],

  loading: true,

  filters: { search: "", categories: [], brands: [], price: 0 },
  filteredProducts: [],

  setLoading: (loading) => set({ loading }),
  setFilters: (filters) => set({ filters }),

  setAllProducts: (products) =>
    set({ allProducts: products, filteredProducts: products, products }),

  setFilteredProducts: (products) => set({ filteredProducts: products }),

  resetFilteredProducts: () => set({ filteredProducts: get().allProducts }),

  removeAllProducts: () => set({ allProducts: [], filteredProducts: [] }),

  setProducts: (products) => set({ products }),
}));
