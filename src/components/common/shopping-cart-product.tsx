import {
  IShoppingCartProduct,
  useStoreShoppingCart,
} from "@/store/shopping-cart";
import { Trash } from "lucide-react";
import Image from "next/image";

export const ShoppingCartProduct = ({
  product,
}: {
  product: IShoppingCartProduct;
}) => {
  const { decreaseQuantity, increaseQuantity, removeProduct } =
    useStoreShoppingCart();

  const handleDecreaseQuantity = () => decreaseQuantity(product.id);
  const handleIncreaseQuantity = () => {
    if (product.quantity < product.stock) increaseQuantity(product.id);
  };
  const handleRemoveProduct = () => removeProduct(product.id);

  const isTotalProducts = product.quantity >= product.stock;
  const style = isTotalProducts ? "opacity-50" : "hover:bg-blue-200";

  return (
    <li className="flex items-center gap-4 rounded-sm border border-blue-300 bg-white p-2 text-black">
      <Image
        src={product.image ?? "/not-found.png"}
        alt={product.name}
        width={100}
        height={100}
        className="rounded-sm object-cover"
      />
      <div className="flex flex-1 flex-col gap-1">
        <span className="text-lg font-bold">{product.name}</span>
        <span className="text-medium text-sm">
          ${product.price.toLocaleString("es-CO")}
        </span>
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            {product.stock > 1 ? (
              <>
                <button
                  className="grid size-8 cursor-pointer place-content-center rounded border border-blue-100 hover:bg-blue-200"
                  onClick={handleDecreaseQuantity}
                >
                  -
                </button>
                <span className="text-sm font-semibold">
                  {product.quantity}
                </span>
                <button
                  className={`grid size-8 cursor-pointer place-content-center rounded border border-blue-100 ${style}`}
                  onClick={handleIncreaseQuantity}
                  disabled={isTotalProducts}
                >
                  +
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs">Cantidad:</span>
                <span className="text-sm font-semibold">
                  {product.quantity}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={handleRemoveProduct}
            className="flex cursor-pointer items-center hover:text-red-500"
          >
            <Trash size={18} />
          </button>
        </div>
      </div>
    </li>
  );
};
