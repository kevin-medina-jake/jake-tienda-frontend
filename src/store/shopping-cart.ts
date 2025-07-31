import { create } from "zustand";

export type IShoppingCartProduct = {
  id: string;
  name: string;
  price: number;
  stock: number;
  quantity: number;
  image?: string;
};

type ICartState = {
  products: IShoppingCartProduct[];
  addProduct: (item: Omit<IShoppingCartProduct, "quantity">) => void;
  removeProduct: (id: string) => void;
  clearShoppingCart: () => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  getTotalProducts: () => number;
  getTotalPrice: () => number;
};

export const useStoreShoppingCart = create<ICartState>((set, get) => ({
  products: [],

  addProduct: (item) => {
    const existingItem = get().products.find((i) => i.id === item.id);

    if (existingItem) {
      set((state) => ({
        products: state.products.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      }));
    } else {
      set((state) => ({
        products: [...state.products, { ...item, quantity: 1 }],
      }));
    }
  },

  removeProduct: (id) => {
    set((state) => ({
      products: state.products.filter((item) => item.id !== id),
    }));
  },

  clearShoppingCart: () => {
    set({ products: [] });
  },

  increaseQuantity: (id) => {
    set((state) => ({
      products: state.products.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));
  },

  decreaseQuantity: (id) => {
    set((state) => ({
      products: state.products
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0),
    }));
  },

  getTotalProducts: () => {
    return get().products.reduce((sum, item) => sum + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  },
}));
