"use client";

import { ShoppingCart, Trash, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ImageL from "@/assets/home/bonds/image.png";
import { usePortalDrawer } from "@/hooks/use-portal-drawer";

export const ShoppingCartDrawer = () => {
  const [open, setOpen] = useState(false);
  const Portal = usePortalDrawer("shopping-cart");
  const asideRef = useRef<HTMLDivElement>(null);

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
      <button onClick={() => setOpen(true)} className="p-2">
        <ShoppingCart />
      </button>

      {open && (
        <Portal>
          <div className="fixed inset-0 z-50 bg-black/50">
            <aside
              ref={asideRef}
              className="fixed right-0 top-0 h-full max-w-lg w-full bg-blue-50 flex flex-col p-4 gap-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg flex gap-2 items-center">
                  <ShoppingCart />
                  Carrito de Compras <span className="font-medium">(1)</span>
                </h2>
                <button onClick={() => setOpen(false)}>
                  <X />
                </button>
              </div>

              {/* Producto */}
              <div className="border border-blue-200 rounded-lg p-3 flex gap-3 items-center bg-white">
                <Image
                  src={ImageL ?? "/not-found.png"}
                  alt="Producto"
                  width={50}
                  height={50}
                  className="rounded object-cover"
                />
                <div className="flex flex-col flex-1">
                  <span className="font-medium">Parlante</span>
                  <span className="text-sm">$4.000</span>
                  <div className="flex items-center justify-between gap-2 mt-2">
                    <div className="flex gap-2">
                      <button className="border border-blue-200 rounded px-2">
                        −
                      </button>
                      <span>1</span>
                      <button className="border border-blue-200 rounded px-2">
                        +
                      </button>
                    </div>
                    <button className="flex items-center">
                      <Trash size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-auto space-y-3 border-t border-blue-200 pt-4">
                <div className="flex justify-between text-base">
                  <span>Total:</span>
                  <span className=" font-semibold">$4.000</span>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded p-2 font-medium">
                  Proceder al Pago
                </button>
                <button className="w-full border border-blue-300 hover:bg-blue-100 rounded p-2 text-sm ">
                  Vaciar Carrito
                </button>
              </div>
            </aside>
          </div>
        </Portal>
      )}
    </>
  );
};
