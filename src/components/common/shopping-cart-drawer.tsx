"use client";

import { ShoppingCart, Trash, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ImageL from "@/assets/home/bonds/image.png";
import { usePortalDrawer } from "@/hooks/use-portal-drawer";
import {
  ICartState,
  IShoppingCartProduct,
  useStoreShoppingCart,
} from "@/store/shopping-cart";
import { useStore } from "@/hooks/useStore";

export const ShoppingCartDrawer = () => {
  const [open, setOpen] = useState(false);
  const Portal = usePortalDrawer("shopping-cart");
  const asideRef = useRef<HTMLDivElement>(null);

  const cartStore = useStore<ICartState, ICartState>(
    useStoreShoppingCart,
    (state) => state,
  );

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        asideRef.current &&
        !asideRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (!cartStore) return null;

  const { products, getTotalPrice, getTotalProducts, clearShoppingCart } =
    cartStore;

  const hasItems = getTotalProducts() > 0;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative cursor-pointer px-3 py-2"
      >
        <ShoppingCart />
        {hasItems && (
          <span className="absolute -top-1 -right-1 rounded-full bg-green-300 px-1 text-xs">
            {getTotalProducts()}
          </span>
        )}
      </button>

      {open && (
        <Portal>
          <div className="fixed inset-0 z-50 bg-black/50">
            <aside
              ref={asideRef}
              className="fixed top-0 right-0 flex h-full w-full max-w-lg flex-col gap-4 bg-blue-50 p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-black">
                  <ShoppingCart />
                  Carrito de Compras{" "}
                  <span className="font-medium">({getTotalProducts()})</span>
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="cursor-pointer"
                >
                  <X />
                </button>
              </div>

              {products.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center text-black">
                  <ShoppingCart size={64} className="opacity-30" />
                  <h3 className="text-lg font-semibold">
                    Tu carrito está vacío
                  </h3>
                  <p className="text-sm text-gray-500">
                    Agrega productos para comenzar a comprar.
                  </p>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-2 cursor-pointer rounded border border-blue-300 px-4 py-2 text-sm font-medium hover:bg-blue-100"
                  >
                    Seguir comprando
                  </button>
                </div>
              ) : (
                <>
                  <ul className="space-y-2 overflow-y-auto">
                    {products.map((product) => (
                      <CartProduct key={product.id} product={product} />
                    ))}
                  </ul>

                  <div className="mt-auto space-y-3 border-t border-blue-200 pt-4 text-black">
                    <div className="flex justify-between text-base">
                      <span>Total:</span>
                      <span className="font-semibold">
                        ${getTotalPrice().toLocaleString("es-CO")}
                      </span>
                    </div>
                    <button className="w-full rounded bg-blue-600 p-2 font-medium text-white hover:bg-blue-700">
                      Proceder al Pago
                    </button>
                    <button
                      onClick={clearShoppingCart}
                      className="w-full rounded border border-blue-300 p-2 text-sm hover:bg-blue-100"
                    >
                      Vaciar Carrito
                    </button>
                  </div>
                </>
              )}
            </aside>
          </div>
        </Portal>
      )}
    </>
  );
};

const CartProduct = ({ product }: { product: IShoppingCartProduct }) => {
  const { decreaseQuantity, increaseQuantity, removeProduct } =
    useStoreShoppingCart();

  const handleDecreaseQuantity = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    decreaseQuantity(product.id);
  };

  const handleIncreaseQuantity = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    increaseQuantity(product.id);
  };

  const handleRemoveProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    removeProduct(product.id);
  };

  return (
    <li className="flex items-center gap-4 rounded-sm border border-blue-300 bg-white p-2 text-black">
      <Image
        src={product.image ?? ImageL}
        alt={product.name}
        width={100}
        height={100}
        className="rounded-sm object-cover"
      />
      <div className="flex flex-1 flex-col gap-1">
        <span className="text-lg font-bold">{product.name}</span>
        <span className="text-medium text-sm">
          ${product.price.toLocaleString("es-CO")}
        </span>
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <button
              className="grid size-8 cursor-pointer place-content-center rounded border border-blue-100 hover:bg-blue-200"
              onClick={handleDecreaseQuantity}
            >
              <span>-</span>
            </button>
            <span className="text-sm font-semibold">{product.quantity}</span>
            <button
              className="grid size-8 cursor-pointer place-content-center rounded border border-blue-100 hover:bg-blue-200"
              onClick={handleIncreaseQuantity}
            >
              <span>+</span>
            </button>
          </div>
          <button
            onClick={handleRemoveProduct}
            className="flex cursor-pointer items-center hover:text-red-500"
          >
            <Trash size={18} />
          </button>
        </div>
      </div>
    </li>
  );
};
