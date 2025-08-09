"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePortalDrawer } from "@/hooks/use-portal-drawer";
import { IDropDownMenu } from "@/types/navbar";
import {
  Menu,
  X,
  Home,
  PackageSearch,
  Grid2X2,
  BadgeCheck,
  CreditCard,
  Info,
  ChevronDown,
} from "lucide-react";

type MobileRoute = {
  name: string;
  href: string;
  dropdown?: IDropDownMenu[];
};

type ExpandState = Record<string, boolean>;

export const MobileMenu = ({ routes }: { routes: MobileRoute[] }) => {
  const [open, setOpen] = useState(false);
  const [expand, setExpand] = useState<ExpandState>({});
  const Portal = usePortalDrawer("mobile-menu");
  const asideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (event: MouseEvent) => {
      if (!open) return;
      if (
        asideRef.current &&
        !asideRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = (key: string) =>
    setExpand((prev) => ({ ...prev, [key]: !prev[key] }));

  const iconFor = (label: string) => {
    const name = label.toLowerCase();
    if (name.includes("inicio")) return <Home size={18} />;
    if (name.includes("producto")) return <PackageSearch size={18} />;
    if (name.includes("categor")) return <Grid2X2 size={18} />;
    if (name.includes("marca")) return <BadgeCheck size={18} />;
    if (name.includes("crédito") || name.includes("credito"))
      return <CreditCard size={18} />;
    if (name.includes("sobre") || name.includes("acerca"))
      return <Info size={18} />;
    return <PackageSearch size={18} />;
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="cursor-pointer p-2 sm:hidden"
        aria-label="Abrir menú"
      >
        <Menu />
      </button>

      <Portal>
        <div
          className={`fixed inset-0 z-50 transition-opacity duration-300 sm:hidden ${
            open
              ? "pointer-events-auto bg-black/50 opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        />
        <aside
          ref={asideRef}
          className={`animate-fade-right animate-duration-300 animate-ease-out fixed top-0 left-0 z-50 h-full w-72 bg-white p-4 shadow-lg transition-transform duration-300 sm:hidden ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="mb-2 flex justify-end">
            <button onClick={() => setOpen(false)} aria-label="Cerrar menú">
              <X />
            </button>
          </div>

          <nav className="flex flex-col">
            {routes.map((route) => {
              const hasChildren =
                Array.isArray(route.dropdown) && route.dropdown.length > 0;

              if (!hasChildren) {
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className="flex items-center gap-3 rounded-md px-3 py-3 text-sm hover:bg-blue-50"
                    onClick={() => setOpen(false)}
                  >
                    <span className="text-blue-700">{iconFor(route.name)}</span>
                    <span>{route.name}</span>
                  </Link>
                );
              }

              const isOpen = !!expand[route.name];

              return (
                <div key={route.name} className="flex flex-col">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-sm hover:bg-blue-50"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggle(route.name);
                    }}
                    aria-expanded={isOpen}
                    aria-controls={`section-${route.name}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-blue-700">
                        {iconFor(route.name)}
                      </span>
                      <span>{route.name}</span>
                    </span>
                    <ChevronDown
                      size={18}
                      className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div
                    id={`section-${route.name}`}
                    className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                      isOpen ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="ml-9 max-h-72 overflow-auto border-l border-blue-100 pl-3">
                      {route.dropdown!.map((item) => (
                        <li key={item.id}>
                          <Link
                            href={`${route.href}${item.name ?? item.name}`}
                            className="block rounded-md px-2 py-2 text-sm hover:bg-blue-50"
                            onClick={() => setOpen(false)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </nav>
        </aside>
      </Portal>
    </>
  );
};
