import clsx from "clsx";
import Image from "next/image";
import Label from "../label";

export function GridTileImage({
  isInteractive = true,
  active,
  label,
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
} & React.ComponentProps<typeof Image>) {
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
      {props.src ? (
        <img
          className={clsx("relative h-full w-full object-contain", {
            "transition duration-300 ease-in-out group-hover:scale-105":
              isInteractive,
          })}
          src={typeof props.src === "string" ? props.src : undefined}
          alt={props.alt ?? "Image"}
          width={props.width ?? 400}
          height={props.height ?? 400}
          loading="lazy"
          style={{ objectFit: "contain" }}
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
