import { NextRequest, NextResponse } from "next/server";
import {
  HIDDEN_PRODUCT_TAG,
  SHOPIFY_GRAPHQL_API_ENDPOINT,
  TAGS,
} from "../constants";
import { isShopifyError } from "../type-guards";
import { ensureStartWith } from "../utils";
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation,
} from "./mutations/cart";
import { getCartQuery } from "./queries/cart";
import {
  getCollectionProductsQuery,
  getCollectionsByCategoryAndBrandQuery,
  getCollectionsQuery,
} from "./queries/collection";
import { getMenuQuery } from "./queries/menu";
import {
  getNewProductsQuery,
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery,
} from "./queries/product";
import {
  Cart,
  Collection,
  Connection,
  Image,
  Menu,
  Page,
  Product,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCollection,
  ShopifyCollectionProductsOperation,
  ShopifyCollectionsOperation,
  ShopifyCreateCartOperation,
  ShopifyMenuOperation,
  ShopifyPageOperation,
  ShopifyPagesOperation,
  ShopifyProduct,
  ShopifyProductOperation,
  ShopifyProductRecommendationsOperation,
  ShopifyProductsOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation,
} from "./types";
import { revalidatePath, revalidateTag } from "next/cache";
import { getPageQuery, getPagesQuery } from "./queries/page";
import { getPromoBannerQuery } from "./queries/bond";
import { getHeroItemsQuery } from "./queries/hero";
import { getBestProductPosterQuery } from "./queries/best-product";
import { ICategoryCart } from "@/types/category";

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartWith(process.env.SHOPIFY_STORE_DOMAIN, "https://")
  : "";
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;
export async function shopifyFetch<T>({
  cache = "force-cache",
  headers,
  query,
  tags,
  variables,
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  try {
    console.log("---------------------------------------------------------");
    console.log("endpoint", endpoint);
    console.log("SHOPIFY_STORE_DOMAIN:", process.env.SHOPIFY_STORE_DOMAIN);

    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": key,
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
      ...(tags && { next: { tags } }),
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (error) {
    if (isShopifyError(error)) {
      throw {
        cause: error.cause?.toString() || "unknown",
        status: error.status || 500,
        message: error.message,
        query,
      };
    }

    throw {
      error,
      query,
    };
  }
}

function removeEdgesAndNodes<T>(array: Connection<T> | null | undefined): T[] {
  if (!array || !array.edges) return [];
  return array.edges.map((edge) => edge?.node);
}

function reshapeImages(images: Connection<Image>, productTitle: string) {
  const flattened = removeEdgesAndNodes(images);

  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)?.[1];

    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`,
    };
  });
}
function reshapeProduct(
  product: ShopifyProduct,
  filterHiddenProducts: boolean = true,
) {
  if (
    !product ||
    (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))
  ) {
    return undefined;
  }

  const { images, variants, ...rest } = product;

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants),
  };
}

function reshapeProducts(products: ShopifyProduct[]) {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
}

export async function getMenu(handle: string): Promise<Menu[]> {
  const res = await shopifyFetch<ShopifyMenuOperation>({
    query: getMenuQuery,
    tags: [TAGS.collections],
    variables: { handle },
  });

  function normalizeItem(item: {
    title: string;
    url: string;
    items?: any[];
  }): Menu {
    return {
      title: item.title,
      path: item.url
        .replace(domain, "")
        .replace("/collections", "/search")
        .replace("/pages", ""),
      children: item.items?.map(normalizeSubItem) || [],
    };
  }

  function normalizeSubItem(item: {
    title: string;
    url: string;
    items?: any[];
  }): Menu {
    return {
      title: item.title,
      path: item.url
        .replace(domain, "")
        .replace("/collections", "/collection")
        .replace("/pages", ""),
      children: item.items?.map(normalizeItem) || [],
    };
  }

  return res.body?.data?.menu?.items.map(normalizeItem) || [];
}

interface ShopifyMenuItem {
  id: string;
  title: string;
  url: string;
  items?: ShopifyMenuItem[];
  resource?: {
    handle?: string;
    image?: { url: string; altText?: string };
  };
}

const normalizeChild = (item: ShopifyMenuItem): ICategoryCart => ({
  id: item.id,
  title: item.title,
  path: item.url
    .replace(domain, "")
    .replace("/collections", "/collection")
    .replace("/pages", ""),
  image: item.resource?.image?.url || null,
  altText: item.resource?.image?.altText || null,
});

function getMenuItems(
  res: any,
  menuTitle: "Categorías" | "Categorias" | "Marcas",
): ICategoryCart[] {
  const menu = (res.body?.data?.menu?.items as ShopifyMenuItem[]).find(
    (item) => item.title === menuTitle,
  );

  if (!menu) return [];

  return (
    menu.items
      ?.map(normalizeChild)
      .filter((item) => !item.path.includes("/frontpage")) || []
  );
}

export async function getCollectionCategoriesAndBrands(
  handle: string,
): Promise<{ categories: ICategoryCart[]; brands: ICategoryCart[] }> {
  const res = await shopifyFetch<ShopifyMenuOperation>({
    query: getCollectionsByCategoryAndBrandQuery,
    tags: [TAGS.collections],
    variables: { handle },
  });

  return {
    categories:
      getMenuItems(res, "Categorías") || getMenuItems(res, "Categorias"),
    brands: getMenuItems(res, "Marcas"),
  };
}

function reshapeCollection(
  collection: ShopifyCollection,
): Collection | undefined {
  if (!collection) return undefined;

  return {
    ...collection,
    path: `/search/${collection.handle}`,
  };
}

function reshapeCollections(collections: ShopifyCollection[]) {
  const reshapedCollections = [];

  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection);

      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection);
      }
    }
  }

  return reshapedCollections;
}

export async function getCollections(): Promise<Collection[]> {
  const res = await shopifyFetch<ShopifyCollectionsOperation>({
    query: getCollectionsQuery,
    tags: [TAGS.collections],
  });

  const shopifyCollections = removeEdgesAndNodes(res?.body?.data?.collections);
  const collections = [
    {
      handle: "",
      title: "Todas",
      description: "All products",
      seo: {
        title: "Todas",
        description: "All products",
      },
      path: "/search",
      updatedAt: new Date().toISOString(),
    },
    // Filter out the hidden products
    ...reshapeCollections(shopifyCollections).filter(
      (collection) => !collection.handle.startsWith("hidden"),
    ),
  ];

  return collections;
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey,
  first,
  last,
  after,
  before,
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
  first?: number;
  last?: number;
  after?: string;
  before?: string;
}): Promise<{ products: Product[]; pageInfo: any }> {
  const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
    query: getCollectionProductsQuery,
    tags: [TAGS.collections, TAGS.products],
    variables: {
      handle: collection,
      reverse,
      sortKey: sortKey === "CREATED_AT" ? "CREATED" : sortKey,
      first,
      last,
      after,
      before,
    },
  });

  if (!res.body.data.collection) {
    return { products: [], pageInfo: {} };
  }

  return {
    products: reshapeProducts(
      removeEdgesAndNodes(res.body.data.collection.products),
    ),
    pageInfo: res.body.data.collection.products.pageInfo,
  };
}

// export async function getCollectionProducts({
//   collection,
//   reverse,
//   sortKey,
// }: {
//   collection: string;
//   reverse?: boolean;
//   sortKey?: string;
// }): Promise<Product[]> {
//   const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
//     query: getCollectionProductsQuery,
//     tags: [TAGS.collections, TAGS.products],
//     variables: {
//       handle: collection,
//       reverse,
//       sortKey: sortKey === "CREATED_AT" ? "CREATED" : sortKey,
//     },
//   });

//   if (!res.body.data.collection) {
//     return [];
//   }

//   return reshapeProducts(
//     removeEdgesAndNodes(res.body.data.collection.products),
//   );
// }

export async function getProduct(handle: string): Promise<Product | undefined> {
  const res = await shopifyFetch<ShopifyProductOperation>({
    query: getProductQuery,
    tags: [TAGS.products],
    variables: {
      handle,
    },
  });
  return reshapeProduct(res.body.data.product, false);
}

export async function getProductRecommendations(
  productId: string,
): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
    query: getProductRecommendationsQuery,
    tags: [TAGS.products],
    variables: {
      productId,
    },
  });

  return reshapeProducts(res.body.data.productRecommendations);
}

function reshapeCart(cart: ShopifyCart): Cart {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: "0.0",
      currencyCode: "USD",
    };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines),
  };
}

export async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
    cache: "no-store",
  });

  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function getCart(
  cartId: string | undefined,
): Promise<Cart | undefined> {
  if (!cartId) return undefined;

  const res = await shopifyFetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: { cartId },
    tags: [TAGS.cart],
  });

  if (!res.body.data.cart) {
    return undefined;
  }

  return reshapeCart(res.body.data.cart);
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[],
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds,
    },
    cache: "no-store",
  });

  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines,
    },
    cache: "no-store",
  });

  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines,
    },
    cache: "no-cache",
  });

  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function revalidate(req: NextRequest): Promise<NextResponse> {
  const topic = req.headers.get("x-shopify-topic") || "unknown";
  const secret = req.nextUrl.searchParams.get("secret");

  const collectionWebhooks = [
    "collections/create",
    "collections/delete",
    "collections/update",
  ];
  const productWebhooks = [
    "products/create",
    "products/delete",
    "products/update",
  ];

  const isCollectionUpdate = collectionWebhooks.includes(topic);
  const isProductUpdate = productWebhooks.includes(topic);

  if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    console.error("Invalid revalidation secret.");
    return NextResponse.json({ status: 200 });
  }

  if (!isCollectionUpdate && !isProductUpdate) {
    return NextResponse.json({ status: 200 });
  }

  if (isCollectionUpdate) {
    revalidateTag(TAGS.collections);
    revalidatePath("/");
  }
  if (isProductUpdate) {
    revalidateTag(TAGS.products);
    revalidatePath("/");
  }

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}

export async function getPage(handle: string): Promise<Page> {
  const res = await shopifyFetch<ShopifyPageOperation>({
    query: getPageQuery,
    cache: "no-store",
    variables: { handle },
  });

  return res.body.data.pageByHandle;
}

export async function getPages(): Promise<Page[]> {
  const res = await shopifyFetch<ShopifyPagesOperation>({
    query: getPagesQuery,
    cache: "no-store",
  });

  return removeEdgesAndNodes(res.body.data.pages);
}

// mi toque

export async function getPromoBanner() {
  const res = await shopifyFetch({
    query: getPromoBannerQuery,
    tags: [TAGS.collections, TAGS.products],
  });

  const metaobject = res.body.data.metaobjects.edges[0]?.node;

  if (!metaobject) return null;

  const fields = metaobject.fields.reduce((acc, field) => {
    acc[field.key] = {
      value: field.value,
      reference: field.reference,
    };
    return acc;
  }, {});

  return {
    id: metaobject.id,
    title: fields.title.value,
    description: fields.description.value,
    product: fields.product_promo_banner.reference,
  };
}

export async function getHeroItems() {
  const res = await shopifyFetch({
    query: getHeroItemsQuery,
    tags: [TAGS.collections, TAGS.products],
  });

  const edges = res.body.data.metaobjects.edges;

  if (!edges?.length) return [];

  return edges.map(({ node }) => {
    const fields = node.fields.reduce((acc, field) => {
      acc[field.key] = field.reference ?? field.value;
      return acc;
    }, {});

    return {
      id: node.id,
      image: fields.image,
      handle: fields.product_selected?.handle,
    };
  });
}

export async function getBestProductPoster() {
  const res = await shopifyFetch({
    query: getBestProductPosterQuery,
    tags: [TAGS.products, TAGS.collections],
  });

  const edges = res.body.data.metaobjects.edges;

  if (!edges?.length) return null;

  const node = edges[0].node;

  const fields = node.fields.reduce((acc, field) => {
    acc[field.key] = field.reference ?? field.value;
    return acc;
  }, {});

  const product = fields.product;

  return {
    id: node.id,
    product: product
      ? {
          handle: product.handle,
          title: product.title,
          tags: product.tags,
          image: product.featuredImage,
        }
      : null,
  };
}

export async function getNewProducts(): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getNewProductsQuery,
    tags: [TAGS.products],
  });

  return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

export async function searchProducts({
  query,
  first,
}: {
  query?: string;
  first?: number;
}): Promise<Product[]> {
  if (!query) return [];

  const [productsResult, collectionProductsResult] = await Promise.all([
    shopifyFetch<any>({
      query: getProductsQuery,
      tags: [TAGS.collections, TAGS.products],
      variables: { query, first },
    }),
    shopifyFetch<any>({
      query: getCollectionProductsQuery,
      tags: [TAGS.collections, TAGS.products],
      variables: {
        handle: query.toLowerCase().replace(/\s+/g, "-"),
        first,
      },
    }),
  ]);

  const directProducts = reshapeProducts(
    productsResult.body.data?.products
      ? removeEdgesAndNodes(productsResult.body.data.products)
      : [],
  );

  const productsFromCollection = reshapeProducts(
    collectionProductsResult.body.data?.collection?.products
      ? removeEdgesAndNodes(
          collectionProductsResult.body.data.collection.products,
        )
      : [],
  );

  const allProducts = [...directProducts, ...productsFromCollection];
  const uniqueProductsMap = new Map<string, Product>();

  allProducts.forEach((product) => {
    if (!uniqueProductsMap.has(product.id)) {
      uniqueProductsMap.set(product.id, product);
    }
  });

  return Array.from(uniqueProductsMap.values());
}

export async function getProducts({
  query,
  reverse,
  sortKey,
  first,
  after,
  before,
  last,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
  first?: number;
  after?: string;
  before?: string;
  last?: number;
}) {
  if (!query) {
    const res = await shopifyFetch<any>({
      query: getProductsQuery,
      variables: { query, reverse, sortKey, first, after, before, last },
      tags: [TAGS.products, TAGS.collections],
    });

    return {
      products: reshapeProducts(removeEdgesAndNodes(res.body.data.products)),
      pageInfo: res.body.data.products.pageInfo,
    };
  }

  const [productsResult, collectionProductsResult] = await Promise.all([
    shopifyFetch<any>({
      query: getProductsQuery,
      tags: [TAGS.collections, TAGS.products],
      variables: { query, first, reverse, sortKey },
    }),
    shopifyFetch<any>({
      query: getCollectionProductsQuery,
      tags: [TAGS.collections, TAGS.products],
      variables: {
        handle: query.toLowerCase().replace(/\s+/g, "-"),
        first,
        reverse,
        sortKey: sortKey === "CREATED_AT" ? "CREATED" : sortKey,
      },
    }),
  ]);

  const directProducts = reshapeProducts(
    productsResult.body.data?.products
      ? removeEdgesAndNodes(productsResult.body.data.products)
      : [],
  );

  const productsFromCollection = reshapeProducts(
    collectionProductsResult.body.data?.collection?.products
      ? removeEdgesAndNodes(
          collectionProductsResult.body.data.collection.products,
        )
      : [],
  );

  const allProducts = [...directProducts, ...productsFromCollection];
  const uniqueProductsMap = new Map<string, Product>();

  allProducts.forEach((product) => {
    if (!uniqueProductsMap.has(product.id)) {
      uniqueProductsMap.set(product.id, product);
    }
  });

  const mergedPageInfo = {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: null,
    endCursor: null,
  };

  return {
    products: Array.from(uniqueProductsMap.values()),
    pageInfo: mergedPageInfo,
  };
}
