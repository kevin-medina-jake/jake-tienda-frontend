"use client";

import { usePortalMenu } from "@/hooks/use-portal-menu";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const routes = [
  { name: "Inicio", href: "/" },
  { name: "Productos", href: "/products" },
  { name: "Sobre Nosotros", href: "/about-us" },
  { name: "Crédito", href: "/credit" },
];

export const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const Portal = usePortalMenu("mobile-menu");
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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");

    const handleResize = () => {
      if (mediaQuery.matches) {
        setOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <>
      <button onClick={() => setOpen(true)} className="p-2 sm:hidden">
        <Menu />
      </button>

      {open && (
        <Portal>
          <div className="fixed inset-0 z-50 bg-black/50 sm:hidden">
            <aside
              ref={asideRef}
              className="fixed left-0 top-0 h-full w-64 bg-blue-50 shadow-lg flex flex-col p-4 gap-4 animate-slide-in-left"
            >
              <div className="flex justify-end">
                <button onClick={() => setOpen(false)}>
                  <X />
                </button>
              </div>

              <nav className="flex flex-col gap-3">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className="text-blue-700 hover:underline"
                    onClick={() => setOpen(false)}
                  >
                    {route.name}
                  </Link>
                ))}
              </nav>
            </aside>
          </div>
        </Portal>
      )}
    </>
  );
};
