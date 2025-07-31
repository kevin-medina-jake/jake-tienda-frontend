import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function usePortalMenu(id: string = "portal-root") {
  const [mounted, setMounted] = useState(false);
  const elRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let el = document.getElementById(id);
    let created = false;

    if (!el) {
      el = document.createElement("div");
      el.id = id;
      document.body.appendChild(el);
      created = true;
    }

    elRef.current = el;
    setMounted(true);

    return () => {
      if (created && el?.parentNode) {
        el.parentNode.removeChild(el);
      }
    };
  }, [id]);

  const Portal = ({ children }: { children: React.ReactNode }) => {
    if (!mounted || !elRef.current) return null;
    return createPortal(children, elRef.current);
  };

  return Portal;
}
