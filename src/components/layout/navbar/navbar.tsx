import Link from "next/link";

import Logo from "@/assets/logo/image.png";
import { ChevronDown } from "lucide-react";

import { IDropDownMenu } from "@/types/navbar";

import { MobileMenu } from "../../common/movil-menu-drawer";
import CartModal from "../../cart/modal";
import { getMenu } from "@/lib/shopify";
import { Suspense } from "react";
import { SearchProducts } from "./search-products";

export const Navbar = async () => {
  const menuResponse = await getMenu("main-menu");

  const menu = [
    ...menuResponse,
    { title: "Crédito", path: "/credit" },
    { title: "Sobre Nosotros", path: "/about-us" },
  ];

  return (
    <>
      {/* Desktop */}
      <nav className="max-w-8xl fixed top-0 left-1/2 z-50 hidden h-[100px] w-full -translate-x-1/2 transform gap-4 border-b border-transparent bg-transparent px-4 pt-2 backdrop-blur-sm transition-all duration-300 ease-in-out hover:border-gray-300 hover:bg-white/95 sm:flex">
        <section className="flex items-center">
          <Link href="/">
            <img
              src={typeof Logo.src === "string" ? Logo.src : "/not-found.png"}
              alt="logo"
              width={100}
              height={50}
              loading="lazy"
              style={{ objectFit: "contain" }}
            />
          </Link>
        </section>

        <section className="grid flex-1 gap-4 md:px-5 lg:px-10 xl:px-20">
          <Suspense fallback={<div className="h-[42px] w-full"></div>}>
            <SearchProducts />
          </Suspense>

          <ul className="flex h-full text-sm lg:text-base">
            {menu.map((route) => {
              if (route.children && route.children.length > 0) {
                return (
                  <DropdownMenu
                    name={route.title}
                    drop={route.children}
                    key={route.title}
                  />
                );
              }

              return (
                <li key={route.title} className="h-full pr-6">
                  <Link href={route.path} className="h-full whitespace-nowrap">
                    {route.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="h-[44px] w-[48px]">
          <CartModal />
        </section>
      </nav>

      {/* Mobile */}
      <nav className="fixed top-0 left-1/2 z-50 flex w-full -translate-x-1/2 transform flex-col gap-4 border-b border-gray-400 bg-white p-2 py-2 sm:hidden">
        <section className="flex items-center justify-between">
          <div>
            <MobileMenu routes={menu} />
          </div>

          <Link href="/">
            <img
              src={typeof Logo.src === "string" ? Logo.src : "/not-found.png"}
              alt="logo"
              width={70}
              height={40}
              loading="lazy"
              style={{ objectFit: "contain" }}
            />
          </Link>

          <div className="h-[44px] w-[48px]">
            <CartModal />
          </div>
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
}

const DropdownMenu = ({ name, drop }: DropdownMenuProps) => (
  <li className="group">
    <span className="flex cursor-default items-center gap-1 pr-6 group-hover:text-blue-800">
      {name} <ChevronDown size={14} />
    </span>
    <div className="animate-fade-up animate-once animate-duration-100 animate-ease-out absolute top-full right-0 left-0 z-20 hidden w-full border-t border-b border-gray-300 bg-blue-50 pb-8 shadow-2xl group-hover:block">
      <h2 className="border-b border-gray-300 px-10 py-8 text-2xl font-medium md:px-20 lg:px-40">
        {name}
      </h2>

      <ul className="flex flex-wrap gap-4 px-10 py-4 md:px-20 lg:px-40">
        {drop.map((item) => (
          <li key={item.title}>
            <Link
              href={item.path + "?title=" + name + "&collection=" + item.title}
              className="block w-full px-5 py-2 hover:bg-blue-200"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </li>
);
