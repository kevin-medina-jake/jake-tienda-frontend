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
    { name: "Crédito", href: "/credit" },
    { name: "Sobre Nosotros", href: "/about-us" },
  ];

  return (
    <>
      {/* Desktop */}
      <nav className="max-w-8xl fixed top-0 left-1/2 z-50 hidden h-[100px] w-full -translate-x-1/2 transform gap-4 border-b border-transparent bg-transparent px-4 py-2 backdrop-blur-sm transition-all duration-300 ease-in-out hover:border-gray-300 hover:bg-white/95 sm:flex">
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

        <section className="grid flex-1 gap-4 md:px-5 lg:px-10 xl:px-20">
          <SearchProducts />

          <ul className="flex items-center gap-6 text-sm lg:text-base">
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
      <nav className="fixed top-0 left-1/2 z-50 flex w-full -translate-x-1/2 transform flex-col gap-4 border-b border-gray-400 bg-white p-2 py-2 sm:hidden">
        <section className="flex items-center justify-between">
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
  <li className="group relative">
    <span className="flex cursor-default items-center gap-1">
      {name} <ChevronDown size={14} />
    </span>
    <ul className="absolute top-full left-0 z-20 hidden bg-white shadow-md group-hover:block">
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
