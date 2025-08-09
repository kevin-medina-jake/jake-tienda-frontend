import React from "react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ref: React.RefObject<HTMLDivElement | null>;
}

export const Drawer = ({ open, onClose, children, ref }: DrawerProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex h-screen justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <aside
        ref={ref}
        className="animate-fade-left animate-once animate-duration-300 animate-ease-in-out relative flex h-full w-full max-w-lg flex-col bg-blue-50 p-4"
      >
        {children}
      </aside>
    </div>
  );
};
