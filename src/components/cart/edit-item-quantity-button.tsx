import { CartItem } from "@/lib/shopify/types";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { updateItemQuantity } from "./actions";
import { useActionState } from "react";

function SubmitButton({
  type,
  isDisabled = false,
}: {
  type: "plus" | "minus";
  isDisabled?: boolean;
}) {
  return (
    <button
      type="submit"
      aria-label={
        type === "plus" ? "Increase item quantity" : "Reduce item quantity"
      }
      disabled={isDisabled}
      className={clsx(
        "ease flex h-full max-w-[36px] min-w-[36px] flex-none cursor-pointer items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80",
        {
          "ml-auto": type === "minus",
          "!cursor-not-allowed opacity-60": isDisabled,
        },
      )}
    >
      {type === "plus" ? (
        <PlusIcon className="h-4 w-4" color={isDisabled ? "red" : "black"} />
      ) : (
        <MinusIcon className="h-4 w-4" />
      )}
    </button>
  );
}

export function EditItemQuantityButton({
  item,
  type,
  optimisticUpdate,
}: {
  item: CartItem;
  type: "plus" | "minus";
  optimisticUpdate: any;
}) {
  const [message, formAction] = useActionState(updateItemQuantity, null);
  const payload = {
    merchandiseId: item.merchandise.id,
    quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
  };

  const isDisabled =
    payload.quantity >
    item?.merchandise?.product?.variants?.edges[0]?.node?.quantityAvailable;

  const actionWithVariant = formAction.bind(null, payload);
  return (
    <form
      action={async () => {
        optimisticUpdate(payload.merchandiseId, type);
        await actionWithVariant();
      }}
    >
      <SubmitButton type={type} isDisabled={isDisabled} />
      <p aria-label="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
