import { create } from "zustand";

import { IProductCart } from "@/types/product";

interface IState {
  allProducts: IProductCart[];
  setAllProducts: (newAllProducts: IProductCart[]) => void;
  removeAllProducts: () => void;
  updateAllProducts: (newAllProducts: IProductCart[]) => void;
}

const useStoreProducts = create<IState>((set) => ({
  allProducts: [],
  setAllProducts: (newAllProducts) => set({ allProducts: newAllProducts }),
  removeAllProducts: () => set({ allProducts: [] }),
  updateAllProducts: (newAllProducts) => set({ allProducts: newAllProducts }),
}));
