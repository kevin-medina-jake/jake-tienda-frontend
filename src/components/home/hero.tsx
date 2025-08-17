import {
  CreditCard,
  Percent,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="mx-auto grid h-full min-h-[calc(100vh-270px)] w-full max-w-7xl place-content-center overflow-hidden px-4 pt-4 sm:min-h-[calc(100vh-250px))]">
      <div className="grid gap-8 lg:grid-cols-2">
        <InfoHero />
      </div>
    </section>
  );
};

function InfoHero() {
  return (
    <div className="order-2 flex flex-col justify-center gap-6 lg:order-1">
      <span className="hidden w-fit rounded-full bg-blue-600/10 px-3 py-1 text-xs font-medium text-blue-700 lg:block">
        Tienda #1 en Electrónica
      </span>

      <h1 className="hidden text-4xl leading-tight font-extrabold text-gray-900 md:text-5xl lg:block lg:text-7xl xl:text-8xl">
        Jake Tienda Electrónica
      </h1>

      <section className="grid place-items-center gap-6 lg:place-items-start">
        <p className="w-full max-w-xl text-sm text-gray-600 sm:text-center sm:text-base lg:text-left">
          Audio profesional, controladoras DJ, subwoofers y tecnología.
          <br />
          Compra con financiación y envío a toda Colombia.
        </p>

        <div className="flex flex-wrap gap-3 text-sm sm:text-base">
          <Link
            href="/products"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white shadow-sm transition hover:bg-blue-700 sm:w-max"
          >
            <ShoppingBag size={18} />
            Explorar productos
          </Link>
          <Link
            href="/credit"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-50 sm:w-max"
          >
            <CreditCard size={18} />
            Opciones de financiación
          </Link>
        </div>

        <ul className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
          <li className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-blue-600" />
            Garantía extendida
          </li>
          <li className="flex items-center gap-2">
            <Truck size={18} className="text-blue-600" />
            Envío Rápidos
          </li>
          <li className="flex items-center gap-2">
            <Percent size={18} className="text-blue-600" />
            Financiación 0%
          </li>
        </ul>
      </section>
    </div>
  );
}
