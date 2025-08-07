"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";

import { usePortalDrawer } from "@/hooks/use-portal-drawer";
import { IRoutes } from "./navbar";

import { Menu, X } from "lucide-react";

export const MobileMenu = ({ routes }: { routes: IRoutes[] }) => {
  const [open, setOpen] = useState(false);
  const Portal = usePortalDrawer("mobile-menu");
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
      <button
        onClick={() => setOpen(true)}
        className="cursor-pointer p-2 sm:hidden"
      >
        <Menu />
      </button>

      {open && (
        <Portal>
          <div className="fixed inset-0 z-50 bg-black/50 sm:hidden">
            <aside
              ref={asideRef}
              className="fixed top-0 left-0 flex h-full w-64 flex-col gap-4 bg-blue-50 p-4 shadow-lg"
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
                    className="hover:underline"
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
