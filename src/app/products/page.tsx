import type { Metadata } from "next";

import { defaultSort, sorting } from "@/lib/constants";
import { getProducts } from "@/lib/shopify";
import { ProductsGrid } from "@/components/products/products-grid";

export const metadata: Metadata = {
  title:
    "Productos | Jake Tienda Electrónica - Controladoras, Parlantes, Cabinas, Consolas y más",
  description:
    "Explora nuestro catálogo de parlantes, subwoofers, controladoras DJ y consolas. Compra tecnología de audio profesional con financiación y envío en Colombia.",
  keywords: [
    "productos de sonido",
    "parlantes a crédito",
    "controladoras DJ Colombia",
    "subwoofers Popayán",
    "consolas de audio",
    "tecnología para DJs",
    "Jake Tienda Electrónica",
  ],
  openGraph: {
    title: "Catálogo de Productos | Jake Tienda Electrónica",
    description:
      "Descubre nuestros parlantes, controladoras DJ, consolas y subwoofers. Compra con crédito y recibe en toda Colombia.",
    url: "https://jaketiendaelectronica.com/products",
    siteName: "Jake Tienda Electrónica",
    images: [
      {
        url: "/favicon.svg",
        width: 1200,
        height: 630,
        alt: "Jake Tienda Electrónica",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function SearchPage(props: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue } = searchParams;
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length > 1 ? "results" : "result";

  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {products.length === 0
            ? "There are no products that match"
            : `Showing ${products.length} ${resultsText} for `}
          <span>&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {products.length > 0 ? (
        // <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        // <ProductGridItems products={products} />
        // </Grid>
        <div className="relative flex min-h-[50vh] w-full gap-6">
          {/* <ProductsFilter /> */}
          <ProductsGrid
            products={products}
            // currentPage={currentPage}
            // setPage={setPage}
            // pagination={pagination}
          />
        </div>
      ) : null}
    </>
  );
}
