import { ShoppingCartProduct } from "@/components/common/shopping-cart-product";
import { InfoShoppingCart } from "@/components/pay/info-shopping-cart";
import { Circle, CircleCheckIcon } from "lucide-react";

export default function Page() {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-10">
      <section className="flex items-center justify-evenly pt-12 text-lg">
        <div className="flex items-center justify-center gap-2 text-blue-500">
          <CircleCheckIcon size={24} />
          <p>Finalizar Compra</p>
        </div>

        <div className="flex items-center justify-center gap-2 text-gray-500">
          <Circle size={24} />
          <p>Resultado de la compra</p>
        </div>
      </section>

      <section className="grid grid-cols-2">
        <div></div>

        <InfoShoppingCart />
      </section>
    </div>
  );
}
