"use client";

import { ShoppingCart, Trash, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ICartState,
  IShoppingCartProduct,
  useStoreShoppingCart,
} from "@/store/shopping-cart";
import { useStore } from "@/hooks/useStore";

export const ShoppingCartDrawer = () => {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const cartStore = useStore<ICartState, ICartState>(
    useStoreShoppingCart,
    (state: any) => state,
  );

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (!cartStore) return null;

  const { products, getTotalPrice, getTotalProducts, clearShoppingCart } =
    cartStore;

  const totalProducts = getTotalProducts();
  const hasItems = totalProducts > 0;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative cursor-pointer px-3 py-2"
      >
        <ShoppingCart />
        {hasItems && (
          <span className="absolute -top-1 -right-1 rounded-full bg-green-300 px-1 text-xs">
            {totalProducts}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex h-screen justify-end">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          <aside
            ref={drawerRef}
            className="relative flex h-full w-full max-w-lg flex-col bg-blue-50 p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-black">
                <ShoppingCart />
                Carrito de Compras{" "}
                <span className="font-medium">({totalProducts})</span>
              </h2>
              <button onClick={() => setOpen(false)} className="cursor-pointer">
                <X />
              </button>
            </div>

            {products.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center text-black">
                <ShoppingCart size={64} className="opacity-30" />
                <h3 className="text-lg font-semibold">Tu carrito está vacío</h3>
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
                <ul className="flex-1 space-y-2 overflow-y-auto pb-2">
                  {products.map((product) => (
                    <CartProduct key={product.id} product={product} />
                  ))}
                </ul>

                <div className="mt-auto space-y-3 border-t border-blue-200 text-black">
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
      )}
    </>
  );
};

const CartProduct = ({ product }: { product: IShoppingCartProduct }) => {
  const { decreaseQuantity, increaseQuantity, removeProduct } =
    useStoreShoppingCart();

  const handleDecreaseQuantity = () => decreaseQuantity(product.id);
  const handleIncreaseQuantity = () => {
    if (product.quantity < product.stock) increaseQuantity(product.id);
  };
  const handleRemoveProduct = () => removeProduct(product.id);

  const isTotalProducts = product.quantity >= product.stock;
  const style = isTotalProducts ? "opacity-50" : "hover:bg-blue-200";

  return (
    <li className="flex items-center gap-4 rounded-sm border border-blue-300 bg-white p-2 text-black">
      <Image
        src={product.image ?? "/not-found.png"}
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
            {product.stock > 1 ? (
              <>
                <button
                  className="grid size-8 cursor-pointer place-content-center rounded border border-blue-100 hover:bg-blue-200"
                  onClick={handleDecreaseQuantity}
                >
                  -
                </button>
                <span className="text-sm font-semibold">
                  {product.quantity}
                </span>
                <button
                  className={`grid size-8 cursor-pointer place-content-center rounded border border-blue-100 ${style}`}
                  onClick={handleIncreaseQuantity}
                  disabled={isTotalProducts}
                >
                  +
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs">Cantidad:</span>
                <span className="text-sm font-semibold">
                  {product.quantity}
                </span>
              </div>
            )}
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
