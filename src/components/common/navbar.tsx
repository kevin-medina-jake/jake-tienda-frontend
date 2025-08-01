import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo/image.png";
import { brandDropdown } from "@/service/api/brand";
import { IDropDownMenu } from "@/types/navbar";
import { categoryDropdown } from "@/service/api/category";
import { SearchProducts } from "./search-products";
import { MobileMenu } from "./movil-menu-drawer";
import { ShoppingCartDrawer } from "./shopping-cart-drawer";
import { ChevronDown } from "lucide-react";

export interface IRoutes {
  name: string;
  href: string;
  dropdown?: IDropDownMenu[];
}

export const Navbar = async () => {
  const [brands, categories] = await Promise.allSettled([
    brandDropdown(),
    categoryDropdown(),
  ]);

  const routes: IRoutes[] = [
    { name: "Inicio", href: "/" },
    { name: "Productos", href: "/products" },
    {
      name: "Marcas",
      href: "/products?brand=",
      dropdown: brands.status === "fulfilled" ? brands.value : [],
    },
    {
      name: "Categorías",
      href: "/products?category=",
      dropdown: categories.status === "fulfilled" ? categories.value : [],
    },
    { name: "Sobre Nosotros", href: "/about-us" },
    { name: "Crédito", href: "/credit" },
  ];

  return (
    <>
      {/* Desktop */}
      <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-8xl sm:flex z-50 gap-4 px-4 py-2 h-[100px] transition-all duration-300 ease-in-out bg-transparent hover:bg-white/95 border-b hover:border-gray-300 border-transparent hidden backdrop-blur-sm">
        <section className="flex items-center">
          <Link href="/">
            <Image
              src={Logo ?? "/not-found.png"}
              alt="logo"
              width={100}
              height={50}
            />
          </Link>
        </section>

        <section className="flex-1 xl:px-20 lg:px-10 md:px-5 grid gap-4">
          <SearchProducts />

          <ul className="flex gap-6 items-center text-sm lg:text-base">
            {routes.map((route) => {
              if (route.dropdown) {
                return (
                  <DropdownMenu
                    name={route.name}
                    drop={route.dropdown}
                    url={route.href}
                    key={route.name}
                  />
                );
              }

              return (
                <li key={route.name}>
                  <Link href={route.href} className="whitespace-nowrap">
                    {route.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <ShoppingCartDrawer />
        </section>
      </nav>

      {/* Mobile (sin sub-menú) */}
      <nav className="bg-white w-full flex flex-col z-50 gap-4 fixed left-1/2 transform -translate-x-1/2 top-0 p-2 py-2 border-b border-gray-400 sm:hidden">
        <section className="flex justify-between items-center">
          <MobileMenu routes={routes.filter((r) => !r.dropdown)} />

          <Link href="/">
            <Image
              src={Logo ?? "/not-found.png"}
              alt="logo"
              width={70}
              height={40}
            />
          </Link>
          <ShoppingCartDrawer />
        </section>

        <section className="px-2">
          <SearchProducts />
        </section>
      </nav>
    </>
  );
};

interface DropdownMenuProps {
  name: string;
  drop: IDropDownMenu[];
  url: string;
}

const DropdownMenu = ({ name, drop, url }: DropdownMenuProps) => (
  <li className="relative group">
    <span className="cursor-default flex items-center gap-1">
      {name} <ChevronDown size={14} />
    </span>
    <ul className="absolute top-full left-0 hidden group-hover:block bg-white shadow-md z-20">
      {drop.map((item) => (
        <li key={item.id}>
          <Link
            href={`${url}${item.name}`}
            className="block px-3 py-2 hover:bg-gray-100"
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  </li>
);
