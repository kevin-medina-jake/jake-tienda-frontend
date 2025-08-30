import Link from "next/link";

import { getProductRecommendations } from "@/lib/shopify";
import { GridTileImage } from "../grid/tile";
import { ProductCard } from "../layout/product-grid-items";

export const RelatedProducts = async ({ id }: { id: string }) => {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts) return null;
  if (relatedProducts.length === 0) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Productos Relacionados</h2>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};
