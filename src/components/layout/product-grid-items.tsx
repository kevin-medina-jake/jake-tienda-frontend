import Link from "next/link";
import Grid from "../grid";
import { Product } from "@/lib/shopify/types";
import { GridTileImage } from "../grid/tile";
import Image from "next/image";
import Price from "../price";

export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      key={product.id}
      href={`/product/${product.handle}`}
      prefetch={true}
      aria-label={`Ver ${product.title}`}
      className="group relative h-full w-full overflow-hidden rounded-sm border border-blue-400 p-6 transition hover:border-blue-700"
    >
      <article className="flex h-full flex-col justify-between gap-2 sm:gap-4">
        <header className="grid aspect-square place-items-center">
          <Image
            src={product.featuredImage.url ?? "/not-found.png"}
            alt="image"
            width={300}
            height={300}
          />
        </header>
        <main>
          <h3 className="line-clamp-3 text-left text-sm font-medium text-blue-600 sm:text-base">
            {product.title}
          </h3>
        </main>
        <footer>
          <Price
            className="text-left text-xs font-medium text-black sm:text-sm md:text-base"
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            currencyCodeClassName="hidden src[275px]/label:inline"
          />
        </footer>
      </article>
    </Link>
  );
};
