// Permite usar <lite-youtube /> en JSX con TypeScript
import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lite-youtube": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        videoid: string;           // requerido
        playlabel?: string;        // accesibilidad
        params?: string;           // query extra (opcional)
        posterquality?:
          | "default"
          | "hqdefault"
          | "mqdefault"
          | "sddefault"
          | "maxresdefault";
      };
    }
  }
}

export {};
