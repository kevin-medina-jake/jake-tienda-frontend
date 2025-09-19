import { Pagination } from "@/components/common/pagination";
import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import { defaultSort, sorting } from "@/lib/constants";
import { getCollectionProducts } from "@/lib/shopify";

import type { Metadata } from "next";

// Helper: "controladoras-dj" -> "Controladoras Dj"
function slugToTitle(slug: string) {
  return slug
    .split("-")
    .map((s) => (s ? s[0].toUpperCase() + s.slice(1) : s))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: { collection: string };
}): Promise<Metadata> {
  const titleFromSlug = slugToTitle(params.collection);

  const pageTitle = `${titleFromSlug} | Jake Tienda Electrónica`;
  const description = `Compra ${titleFromSlug} en Jake Tienda Electrónica: parlantes, consolas, controladoras DJ, subwoofers y más. Envío nacional y opciones de financiación.`;

  const ogImage = "/favicong.svg";

  return {
    title: pageTitle,
    description,
    keywords: [
      `${titleFromSlug.toLowerCase()} colombia`,
      "audio profesional",
      "parlantes",
      "controladoras dj",
      "subwoofers",
      "tecnología de sonido",
      "jake tienda electrónica",
    ],
    alternates: {
      canonical: `/collection/${params.collection}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      title: pageTitle,
      description,
      type: "website",
      url: `/collection/${params.collection}`,
      siteName: "Jake Tienda Electrónica",
      locale: "es_CO",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Jake Tienda Electrónica",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [ogImage],
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort, after, before, page, title, collection } = searchParams as {
    [key: string]: string;
  };

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const currentPage = parseInt(page || "1", 10);

  const { products, pageInfo } = await getCollectionProducts({
    collection: params.collection,
    sortKey,
    reverse,
    first: before ? undefined : 18,
    last: before ? 18 : undefined,
    after,
    before,
  });

  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No se han encontrado productos en esta colección`}</p>
      ) : (
        <>
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <ProductGridItems products={products} />
          </Grid>

          <Pagination
            pageInfo={pageInfo}
            currentPage={currentPage}
            searchValue={params.collection}
            sort={sort ?? ""}
            collection={{
              title,
              collection,
            }}
          />
        </>
      )}
    </section>
  );
}
