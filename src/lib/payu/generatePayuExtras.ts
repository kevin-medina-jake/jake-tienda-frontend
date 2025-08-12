export interface IProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const generatePayuExtras = (products: IProduct[]) => {
  const extra1 = products
    .map((product) => `${product.id}(x${product.quantity})`)
    .join(", ");

  const extra2 = products
    .map((product) => `${product.name}(x${product.quantity})`)
    .join(", ");

  return {
    extra1: `IDs: ${extra1}`,
    extra2: extra2,
  };
};
