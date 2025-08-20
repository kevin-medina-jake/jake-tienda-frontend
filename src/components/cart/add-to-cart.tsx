"use client";

import { Product, ProductVariant } from "@/lib/shopify/types";
import { useProduct } from "../product/product-context";
import { useCart } from "./cart-context";
import clsx from "clsx";
import { PlusIcon } from "@heroicons/react/24/outline";
import { addItem } from "./actions";
import { ShoppingCart } from "lucide-react";
import { useActionState } from "react";

function SubmitButton({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
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
      className={clsx(buttonClasses, {
        "hover:bg-blue-300": true,
      })}
    >
      <ShoppingCart size={20} />
      Añadir al carrito
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
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
    await actionWithVariant();
  };

  return (
    <form className="w-full" action={handleSubmit}>
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
      <p className="sr-only" role="status" aria-label="polite">
        {message}
      </p>
    </form>
  );
}
