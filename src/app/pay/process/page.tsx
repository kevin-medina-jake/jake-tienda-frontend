import { FormPayProducts } from "@/components/pay/form-pay-products";
import { InfoShoppingCart } from "@/components/pay/info-shopping-cart";
import { Circle, CircleCheckIcon } from "lucide-react";

export default function Page() {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-10 px-4">
      <section className="flex flex-wrap items-center justify-evenly gap-2 pt-12 text-lg">
        <div className="flex items-center justify-center gap-2 whitespace-nowrap text-blue-500">
          <CircleCheckIcon size={24} />
          <p>Finalizar Compra</p>
        </div>

        <div className="flex items-center justify-center gap-2 whitespace-nowrap text-gray-500">
          <Circle size={24} />
          <p>Resultado de la compra</p>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <FormPayProducts />

        <div className="row-start-1 md:col-start-2">
          <InfoShoppingCart />
        </div>
      </section>
    </div>
  );
}
