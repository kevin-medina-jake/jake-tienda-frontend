import { useState, useEffect, useRef } from "react";

export const useDrawer = () => {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const toggleDrawer = () => setOpen(!open);

  return {
    open,
    setOpen,
    drawerRef,
    toggleDrawer,
  };
};
