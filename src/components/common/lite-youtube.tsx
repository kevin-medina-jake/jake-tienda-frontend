"use client";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

type Aspect = "16:9" | "9:16";

interface LiteYouTubeProps {
  /** ID del video (lo que va después de v= o después del último / en youtu.be). */
  id: string;
  /** Título accesible (aria-label) */
  title?: string;
  /** Relación de aspecto. Por defecto 16:9. */
  aspect?: Aspect;
  /** Calidad del póster inicial (preview). */
  poster?: "default" | "hqdefault" | "mqdefault" | "sddefault" | "maxresdefault";
  /** Parámetros extra del player (ej: "start=30&mute=1") */
  params?: string;
  /** Clases extra del contenedor (opcional) */
  className?: string;
}

/**
 * Wrapper responsivo para react-lite-youtube-embed
 * Soporta 16:9 y 9:16 (formato shorts) sin iframes pesados.
 */
export default function LiteYouTube({
  id,
  title = "YouTube video",
  aspect = "16:9",
  poster = "maxresdefault",
  params,
  className,
}: LiteYouTubeProps) {
  // 16:9 => 56.25%
  // 9:16 => 177.78%
  const paddingTop = aspect === "9:16" ? "177.78%" : "56.25%";

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        paddingTop,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <LiteYouTubeEmbed
          id={id}
          title={title}
          poster={poster}
          // react-lite-youtube-embed permite añadir params al URL
          params={params}
          // Importante: el componente ya es accesible y lazy por defecto
        />
      </div>
    </div>
  );
}
