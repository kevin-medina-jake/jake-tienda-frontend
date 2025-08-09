"use client";

import Link from "next/link";
import { ICartState, useStoreShoppingCart } from "@/store/shopping-cart";
import { useStore } from "@/hooks/useStore";

import { ShoppingCart, X } from "lucide-react";
import { ShoppingCardProduct } from "./shoppingCardProduct";
import { Drawer } from "../common/drawer";
import { useDrawer } from "@/hooks/useDrawer";

export const ShoppingCartDrawer = () => {
  const { open, toggleDrawer, setOpen, drawerRef } = useDrawer();

  const cartStore = useStore<ICartState, ICartState>(
    useStoreShoppingCart,
    (state: ICartState) => state,
  );

  if (!cartStore) return null;

  const { products, getTotalPrice, getTotalProducts, clearShoppingCart } =
    cartStore;

  const totalProducts = getTotalProducts();
  const hasItems = totalProducts > 0;

  return (
    <>
      <button
        onClick={toggleDrawer}
        className="relative cursor-pointer px-3 py-2"
      >
        <ShoppingCart />
        {hasItems && (
          <span className="absolute -top-1 -right-1 rounded-full bg-green-300 px-1 text-xs">
            {totalProducts}
          </span>
        )}
      </button>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        ref={drawerRef}
        width="w-full max-w-lg"
        animationDirection="animate-fade-left"
        outDirection="justify-end"
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
                <ShoppingCardProduct key={product.id} product={product} />
              ))}
            </ul>

            <div className="mt-auto space-y-3 border-t border-blue-200 text-black">
              <div className="flex justify-between text-base">
                <span>Total:</span>
                <span className="font-semibold">
                  ${getTotalPrice().toLocaleString("es-CO")}
                </span>
              </div>
              <Link
                href="/pay/process"
                className="block w-full rounded bg-blue-600 p-2 text-center font-medium text-white hover:bg-blue-700"
                onClick={() => setOpen(false)}
              >
                Proceder al Pago
              </Link>
              <Link
                href="https://crediconveniodigital.bancodebogota.com.co/pg-landing?productName=LibreDestino&accessedFrom=WEB-ALIADO&utm_content=libre_destino&utm_source=aliadosweb&utm_medium=new_url&sarlaft4=true&newcampaign=false&utm_campaign=jake%20tienda%20electronica&shortlinkId=lwjqqbfe&watermelon=MjIsMjMyLDU3LDc5LDMzLDIwOCw4Niw2NiwyNywxNCw4NCwzMywyMzIsMjI5LDk2LDIyOSwxNDcsMTM4LDEwNiwxNzYsMTY3LDI0NCwxOCwyMjksNTcsMTU2LDY1LDE1Myw0OSwxOSw1Myw5OCw3MywyMTcsMjU0LDUzLDE2Miw5NSw4OCwyMzYsNzksMTc0LDU4LDkxLDE1MywyNDcsOTMsNjcsMjQ3LDYyLDIyNCw3NCwyMSwyMjYsMTEsMzMsMTU1LDQsNzEsMSw3NiwyNDAsODgsMjMyLDYsMTc3LDE5MywxNCwxODksNzAsMjIsMTQzLDE1LDE3NCwyMDksNTMsMjEzLDE0LDYsMTkzLDE4MiwxOTQsOCwxNTcsNTYsMTE1LDEwNiw3NCw2Niw3NCwxMzIsMTA0LDEzMSwyMzQsMjQ2LDI0OSwxMzMsMTk0LDE5NSwxMDMsMTgxLDgyLDIzNSwxMTgsMTQ3LDIxNiwxMjUsMjA4LDE2NiwyMjksMSwxMjQsMjUyLDI0MiwxNTMsMTg1LDU2LDI0MSwxOCw3MCwxNDQsMjI2LDIxMSw0MiwxMjIsOTIsNDUsOTksMTk5LDExMCwxNDYsMTE0LDYzLDE1MSwxMDksMTk5LDI1MCwxMiwyMjcsNzgsMTYsMTUwLDEwNCwxNDQsOTIsMjQ1LDIwLDI1NSwyMDIsMTI4LDQ5LDc2LDg1LDI2LDQ1LDIzNCwxMjMsMzcsMTcyLDE2Myw3MCwxMjQsMTY4LDE3MywxODAsMjE4LDI0OCwxMTksMjA4LDExMSwxODIsOCwxMjAsMywyMDUsMTUsNDksMTAzLDI1NCwyMDUsNjUsNjgsNjYsMjI2LDEwOSwyMTMsMSw3MSwxODMsNjQsNDYsMTkwLDE5NywyNDMsMTQ2LDU0LDMzLDEwMiwyMDAsMTg1LDIsMjEsMjM1LDExNiwxNTYsMTUxLDE1NCw2NSwyNTEsMTE1LDExNCwyMzUsMTAzLDE5OCwxMTEsMjEyLDEyNywyMiw4NiwyMSwyMzMsMjM1LDIzNSw4MywxMzcsMjAyLDM4LDExMCwyMzMsNTcsMTExLDIzLDE4NywxMDAsNjYsOTAsMjEwLDQyLDEwMyw5NCwxMzIsMTg0LDExMSwxMTIsMTY4LDI0LDExOCwyNTIsMTMwLDEyMiw5MywyMDAsMTUxLDEwNywyMDAsMTQxLDI0MSwyMDIsMTc1LDE3NiwxNTgsMzUsMTQ0LDIwOCwyMzUsMTk3LDQwLDE3MSwzOSw1MiwxNDUsOTUsNjEsMTk2LDE5MiwxNjUsMjIyLDg0LDE5MCwyMTksMjI2LDI1MSwyMjMsMTg5LDE4NCw2Miw4MCwxMzYsNDksNiw1NSwyMTMsMTExLDIwNSwyMTYsMjQxLDIxNywxNzgsMjE3LDE2NywxMjgsMjE3LDEyOSwyMTgsMywxODUsMTExLDE2NCwxOTQsMTAyLDE3Niw5NywyMTcsMjM5LDEzNywyNTQsMjAxLDE0NSwxNjIsMTAxLDE0MCwxMTMsOTksMTI2LDI1LDE2NCwxMTMsMjUwLDE5NywyNDksOTksMTY2LDIwMSwxNTksMTg0LDE4NCwyMDgsNjYsMTk3LDIyNiwxODIsMzEsMjQ4LDg2LDQwLDIwMCw2OCwzNiwyNTMsMjgsMjE1LDk5LDExNywxOTksNzIsMTQ2LDIwMCwyMiwxODIsODEsNzUsNjcsMTYyLDEyNCwyNDIsMTI0LDM2LDExNCwxNjIsMTYyLDE0NCwxODksNDcsMjIxLDI0NSw2NiwxNzIsMTM5LDIyMSwxNzYsMjA0LDEsMzEsMTIzLDEwOSw1OSwzOSwxMDMsMTg3LDEyOCwxNzIsMTYwLDM0LDIzNiwyMDMsMjE3LDExNSwxNSwxMjksMTMzLDIsMjM3LDIyNCwxMTYsMTI0LDEyNCwzNywyMjMsMTEzLDE4MSwxOTMsMTQyLDIyNiwyMTIsMjE4LDU3LDU2LDIwNiwxMzYsMzIsMTUsMjIzLDE0MywxNTcsMjA0LDE5MiwxMzIsMTIxLDMsMiwxMjAsMTIyLDE5OSw0MywxNjgsOCw1MCwxNTMsMTYwLDMsMjQsOTYsMTM0LDczLDE2MSwxMDYsNDcsMjAzLDQ3LDEwOSwxMCwyMTcsNzIsMjYsMTk3LDE1LDI0Niw5OCwyNiwyNDgsMTcxLDY4LDEzMCwxNzUsMjM2LDIzMSwxNDQsMTU2LDEzMywyMTEsMTQ2LDEzOSw0NSwyNTMsMTk5LDEzNyw4MCw1NCw1MiwyMzIsMzgsMjksNDgsMTAzLDE5OCwyMTIsMTgwLDI0NiwyMDYsMTMxLDIzMCwyMTMsMTk3LDE4NCwyMzYsMjI5LDIzLDI0OSwxOSwyMjEsOTAsMTQxLDEyOCwyMzEsMjMwLDIxOSwxNDcsNjIsNDcsMTA4LDIxNyw0Nyw2NCwxMjMsMTgyLDExNiw4OCwxMjEsMjAyLDE4OSwyNyw2NywyMSwxMjMsNTgsMTE3LDIxLDIyLDI2LDg4LDE0MiwxNDUsMzYsMTkwLDE2LDE1LDIxMCw0MCwxMjYsMjI4LDE3OSwyLDUwLDI4LDY4LDIwMSw4NywyNDMsMjgsMTMyLDIyMiwyNTUsNDMsODcsMjI2LDE2MSw4MywxNDQsMTMsNzQsMTkwLDEwMiwyMDUsNTgsMyw1Nyw3Nyw1NiwxNTEsNzYsODMsNTQsNzYsMjI4LDExMSwyNTAsMjAxLDE1MywyNTAsMTAzLDE4MSw5OSw3OSw1NSw0OSwxNzAsMjQyLDEzOSwxMTMsMTg1LDczLDY5LDExOSwyMTgsMTk2LDgsNjQsMjMxLDEzLDUzLDE3NiwxMTUsMjMyLDI1MCwxMjUsNDIsMjEsMTY0LDYyLDIxNCwxODUsMTkwLDE0NiwxMjAsNjUsMTAxLDE4Nyw4OCwyNTQsMTAwLDE0MCwxNDYsOTMsMTg5LDExOSwyMjYsMjMyLDE5MCwxOTAsMjM1LDYsNzYsMTUsMTA0LDg0LDE4MiwxMzUsMjExLDIyNSwyNTUsOTksMjMxLDIwLDI1MiwxNTIsMzIsNjYsMTI5LDE3LDE4MiwxNzcsNzMsMjM1LDQsOTUsMzgsNzgsNDUsNDksMTQsMjEyLDIxNSwxMzUsMjA4LDM3LDU3LDIzMCw3LDIyMywxNjIsMTA5LDIxMiw5MiwxNDMsMTAyLDUzLDIzMCw3MiwxOTYsMTcsMjM2LDE0NywyMTMsMTY3LDQzLDE1MiwyNDksMTU5LDE4NSw4MywyNDAsMjYsMjI1LDI0NCwxODEsMjI1LDE2Nyw5NywxMzAsMTM2LDQ0LDczLDIyMywxMDksMTc5LDIxNSwyMTAsMTA3LDg0LDE3MSwyMzIsMTE4LDc1LDE1MSwxNjcsMjA5LDE5Nyw1MiwxNDMsMTMyLDE3Niw5NiwxMzUsMTU2LDE1Miw2NiwyMTYsMTY5LDE5MywyMTYsNjUsMTA5LDEyOCwxMDksMjUsMTU2LDk3LDMsMTc2LDY1LDEwMiw2LDY4LDQxLDc4LDEwNyw0OCwyMDIsMTAzLDM4LDIwOSwyMTAsOSwxNiw3Nyw0MywyMzAsMjM1LDExMiwxLDExMywxNjUsMjEsMTA3LDIwMCwzMyw2MiwxMzIsMjM0LDE1OSwyNDksMTMzLDk3LDExMCw4NSwxMiwxNDIsMTc1LDU2LDI0NywxNzgsMTY1LDc3LDc2LDI0OSw5NywxNDAsNTMsMjE4LDQ4LDI0OSwxODIsMTM5LDE0LDE0MQ%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <button className="w-full rounded bg-orange-400 p-2 font-medium text-white hover:bg-orange-600">
                  Financiar con Banco de Bogotá
                </button>
              </Link>
              <button
                onClick={clearShoppingCart}
                className="w-full rounded border border-blue-300 p-2 text-sm hover:bg-blue-100"
              >
                Vaciar Carrito
              </button>
            </div>
          </>
        )}
      </Drawer>
    </>
  );
};
