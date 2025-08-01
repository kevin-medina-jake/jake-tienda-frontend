"use client";

import { ShoppingCart, Trash, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ImageL from "@/assets/home/bonds/image.png";
import { usePortalDrawer } from "@/hooks/use-portal-drawer";
import {
  IShoppingCartProduct,
  useStoreShoppingCart,
} from "@/store/shopping-cart";

export const ShoppingCartDrawer = () => {
  const [open, setOpen] = useState(false);
  const Portal = usePortalDrawer("shopping-cart");
  const asideRef = useRef<HTMLDivElement>(null);

  const { products, getTotalPrice, getTotalProducts, clearShoppingCart } =
    useStoreShoppingCart();

  const hasItems = getTotalProducts() > 0;

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

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="py-2 px-3 relative cursor-pointer"
      >
        <ShoppingCart />
        {hasItems && (
          <span className="absolute -top-1 -right-1 px-1 bg-green-300 rounded-full text-xs">
            {getTotalProducts()}
          </span>
        )}
      </button>

      {open && (
        <Portal>
          <div className="fixed inset-0 z-50 bg-black/50">
            <aside
              ref={asideRef}
              className="fixed right-0 top-0 h-full max-w-lg w-full bg-blue-50 flex flex-col p-4 gap-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg flex gap-2 items-center text-black">
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
                <div className="flex-1 flex flex-col justify-center items-center text-center gap-3 text-black">
                  <ShoppingCart size={64} className="opacity-30" />
                  <h3 className="text-lg font-semibold">
                    Tu carrito está vacío
                  </h3>
                  <p className="text-sm text-gray-500">
                    Agrega productos para comenzar a comprar.
                  </p>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-2 px-4 py-2 border border-blue-300 rounded hover:bg-blue-100 text-sm font-medium cursor-pointer"
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
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded p-2 font-medium">
                      Proceder al Pago
                    </button>
                    <button
                      onClick={clearShoppingCart}
                      className="w-full border border-blue-300 hover:bg-blue-100 rounded p-2 text-sm"
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
    <li className="border border-blue-300 rounded-sm p-2 flex gap-4 items-center bg-white text-black">
      <Image
        src={product.image ?? ImageL}
        alt={product.name}
        width={100}
        height={100}
        className="rounded-sm object-cover"
      />
      <div className="flex flex-col flex-1 gap-1">
        <span className="font-bold text-lg">{product.name}</span>
        <span className="text-sm text-medium">
          ${product.price.toLocaleString("es-CO")}
        </span>
        <div className="flex items-center justify-between gap-2 mt-2">
          <div className="flex gap-3 items-center">
            <button
              className="border border-blue-100 rounded size-8 hover:bg-blue-200 grid place-content-center cursor-pointer"
              onClick={handleDecreaseQuantity}
            >
              <span>-</span>
            </button>
            <span className="text-sm font-semibold">{product.quantity}</span>
            <button
              className="border border-blue-100 rounded size-8 hover:bg-blue-200 grid place-content-center cursor-pointer"
              onClick={handleIncreaseQuantity}
            >
              <span>+</span>
            </button>
          </div>
          <button
            onClick={handleRemoveProduct}
            className="flex items-center hover:text-red-500 cursor-pointer"
          >
            <Trash size={18} />
          </button>
        </div>
      </div>
    </li>
  );
};
