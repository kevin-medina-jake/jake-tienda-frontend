"use client";

import { Product, ProductVariant } from "@/lib/shopify/types";
import { useProduct } from "../product/product-context";
import { useCart } from "./cart-context";
import clsx from "clsx";
import { PlusIcon } from "@heroicons/react/24/outline";
import { addItem } from "./actions";
import { CheckCircle, ShoppingCart } from "lucide-react";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import LoadingDots from "../loading-dots";

function SubmitButton({
  availableForSale,
  selectedVariantId,
  isCart,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  isCart: boolean;
}) {
  const buttonClasses =
    "relative flex w-full items-center justify-center gap-2 rounded-sm bg-blue-200 p-3 text-gray-900 tracking-wide cursor-pointer";
  const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Agotado
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Añadir al carrito
      </button>
    );
  }

  return (
    <button
      aria-label="Add to cart"
      disabled={isCart}
      className={clsx(buttonClasses, {
        "hover:bg-blue-300": isCart === false,
        "!cursor-not-allowed bg-green-300": isCart,
      })}
    >
      {isCart ? <CheckCircle size={20} /> : <ShoppingCart size={20} />}
      {isCart ? "Ya esta en el carrito" : "Añadir al carrito"}
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem, cart } = useCart();
  const { state } = useProduct();
  const [message, formAction] = useActionState(addItem, null);
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()],
    ),
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const actionWithVariant = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId,
  )!;

  const handleSubmit = async () => {
    addCartItem(finalVariant, product);
    actionWithVariant();
  };

  const isCart =
    cart?.lines.some((line) => line.merchandise.id === selectedVariantId) ||
    false;

  return (
    <form className="w-full" action={handleSubmit}>
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
        isCart={isCart}
      />
      {message && (
        <p
          className="block w-full bg-red-500 p-2 text-white"
          role="status"
          aria-label="polite"
        >
          {message}
        </p>
      )}
    </form>
  );
}
