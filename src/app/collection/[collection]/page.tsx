export const runtime = 'edge';

import { Pagination } from "@/components/common/pagination";
import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import { defaultSort, sorting } from "@/lib/constants";
import { getCollectionProducts } from "@/lib/shopify";

import type { Metadata } from "next";

function slugToTitle(slug: string) {
  return slug
    .split("-")
    .map((s) => (s ? s[0].toUpperCase() + s.slice(1) : s))
    .join(" ");
}

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const { collection } = await props.params; // 👈 await aquí

  const titleFromSlug = slugToTitle(collection);

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
      canonical: `/collection/${collection}`,
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
      url: `/collection/${collection}`,
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

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { collection } = await props.params; // 👈 await aquí
  const searchParams = await props.searchParams; // 👈 await aquí

  const { sort, after, before, page, title } = (searchParams || {}) as {
    [key: string]: string;
  };

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const currentPage = parseInt(page || "1", 10);

  const { products, pageInfo } = await getCollectionProducts({
    collection,
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
            searchValue={collection}
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
