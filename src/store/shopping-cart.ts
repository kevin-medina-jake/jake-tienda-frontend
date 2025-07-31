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
  totalProducts: number;
  totalPrice: number;
};

export const useStoreShoppingCart = create<ICartState>((set, get) => ({
  products: [],

  addProduct: (item) => {
    const existingItem = get().products.find((i) => i.id === item.id);

    if (existingItem) {
      set({
        products: get().products.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({
        products: [...get().products, { ...item, quantity: 1 }],
      });
    }
  },

  removeProduct: (id) => {
    set({
      products: get().products.filter((item) => item.id !== id),
    });
  },

  clearShoppingCart: () => {
    set({ products: [] });
  },

  increaseQuantity: (id) => {
    set({
      products: get().products.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    });
  },

  decreaseQuantity: (id) => {
    set({
      products: get()
        .products.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0),
    });
  },

  get totalProducts() {
    return get().products.reduce((sum, item) => sum + item.quantity, 0);
  },

  get totalPrice() {
    return get().products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  },
}));
