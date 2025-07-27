import Image from "next/image";
import Link from "next/link";

import { Menu, Search, ShoppingCart } from "lucide-react";

import Logo from "@/assets/logo/image.png";

import { brandDropdown } from "@/service/api/brand";
import { IDropDownMenu } from "@/types/navbar";
import { categoryDropdown } from "@/service/api/category";

export const Navbar = async () => {
  const brands = await brandDropdown();

  const categories = await categoryDropdown();

  return (
    <>
      {/* Desktop */}
      <nav className="bg-white max-w-8xl w-full sm:flex z-50 gap-4 h-[100] justify-between fixed left-1/2 transform -translate-x-1/2 top-0 px-4 py-2 border-b border-gray-400 hidden">
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

          <ul className="flex gap-6 items-center">
            <li>
              <Link href="/">Inicio</Link>
            </li>
            <li>
              <Link href="/products">Productos</Link>
            </li>

            {/* Brands */}
            <DropdownMenu drop={brands} url="/products?brand=" />

            {/* Categories */}
            <DropdownMenu drop={categories} url="/products?category=" />

            <li>
              <Link href="/about-us">Sobre Nosotros</Link>
            </li>
          </ul>
        </section>

        <section>
          <button className="p-2">
            <ShoppingCart />
          </button>
        </section>
      </nav>

      {/* Mobile (sin sub-menú) */}
      <nav className="bg-white w-full flex flex-col z-50 gap-4 fixed left-1/2 transform -translate-x-1/2 top-0 p-2 py-2 border-b border-gray-400 sm:hidden">
        <section className="flex justify-between items-center">
          <button className="p-2">
            <Menu />
          </button>
          <Image src={Logo} alt="logo" width={70} height={40} />
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

interface DropdownMenuProps {
  drop: IDropDownMenu[];
  url: string;
}

const DropdownMenu = ({ drop, url }: DropdownMenuProps) => (
  <li className="relative group">
    <span className="cursor-default">
      {url.includes("brand") ? "Marcas" : "Categorías"}
    </span>
    <ul className="absolute top-full left-0 hidden group-hover:block bg-white shadow-md min-w-[120px] z-20">
      {drop.map((item) => (
        <li key={item.id}>
          <Link
            href={`${url}${item.slug}`}
            className="block px-3 py-2 hover:bg-gray-100"
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  </li>
);
