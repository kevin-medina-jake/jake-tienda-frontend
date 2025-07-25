import Image from "next/image";
import Logo from "@/assets/logo/image.png";

import { Menu, Search, ShoppingCart } from "lucide-react";

export const Navbar = () => {
  return (
    <>
      {/* Desktop Menu And Search Bar */}
      <nav className="bg-white max-w-7xl w-full sm:flex z-50 gap-4 h-[100] justify-between absolute left-1/2 transform -translate-x-1/2 top-0 px-4 py-2 border-b border-gray-400 hidden">
        <section className="flex items-center">
          <Image src={Logo} alt="logo" width={100} height={50} />
        </section>

        <section className="flex-1 xl:px-20 lg:px-10 md:px-5 grid gap-4">
          <div className="relative flex items-center">
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-400 focus:border-blue-50 rounded-full"
              placeholder="Buscar..."
            />
            <Search className="absolute right-4" />
          </div>
          <ul className="flex gap-4">
            <li>Inicio</li>
            <li>Productos</li>
            <li>Marcas</li>
            <li>Sobre Nosotros</li>
          </ul>
        </section>

        <section>
          <button className="p-2">
            <ShoppingCart />
          </button>
        </section>
      </nav>

      {/* Mobile Menu And Search Bar */}
      <nav className="bg-white w-full flex flex-col z-50 gap-4 absolute left-1/2 transform -translate-x-1/2 top-0 p-2 py-2 border-b border-gray-400 sm:hidden">
        <section className="flex justify-between items-center">
          <button className="p-2">
            <Menu />
          </button>

          <div>
            <Image src={Logo} alt="logo" width={70} height={40} />
          </div>

          <button className="p-2">
            <ShoppingCart />
          </button>
        </section>

        <section className="relative px-2 flex items-center">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-400 focus:border-blue-50 rounded-full"
            placeholder="Buscar..."
          />

          <Search className="absolute right-5" />
        </section>
      </nav>
    </>
  );
};
