import clsx from "clsx";
// import Image from "next/image";
import Label from "../label";

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  src,
  alt,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: "bottom" | "center";
  };
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={clsx(
        "group flex h-full w-full items-center justify-center overflow-hidden border bg-[rgb(235,235,235)] hover:border-blue-600",
        {
          relative: label,
          "border-2 border-blue-600": active,
          "border-neutral-200": !active,
        },
      )}
    >
      {src ? (
        // <Image
        //   className={clsx("relative h-full w-full object-contain", {
        //     "transition duration-300 ease-in-out group-hover:scale-105":
        //       isInteractive,
        //   })}
        //   {...props}
        //   // unoptimized
        // />
        <img
          src={src}
          alt={alt}
          className={clsx("relative h-full w-full object-contain", {
            "transition duration-300 ease-in-out group-hover:scale-105":
              isInteractive,
          })}
        />
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </div>
  );
}
