import React from "react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ref: React.RefObject<HTMLDivElement | null>;
  animationDirection?: string;
  width?: string;
  outDirection?: string;
}

export const Drawer = ({
  open,
  onClose,
  children,
  ref,
  animationDirection = "animate-fade-right",
  width = "w-72",
  outDirection = "justify-start",
}: DrawerProps) => {
  if (!open) return null;

  return (
    <div className={`fixed inset-0 z-50 flex h-screen ${outDirection}`}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <aside
        ref={ref}
        className={`animate-once animate-duration-300 animate-ease-in-out relative flex h-full flex-col bg-blue-50 p-4 ${animationDirection} ${width}`}
      >
        {children}
      </aside>
    </div>
  );
};
