import { client } from "./strapi";

import {
  parseNewProducts,
  parseProductCart,
  parseViewProduct,
} from "@/lib/parse/parse-products";
import { INewProducts } from "@/types/product";

export const newProducts = async (): Promise<INewProducts[]> => {
  try {
    const response = await client.collection("products").find({
      sort: "createdAt:desc",
      status: "published",
      populate: ["images"],
      filters: {
        images: {
          $notNull: true,
        },
      },
    });

    return parseNewProducts(response.data);
  } catch (error) {
    return [];
  }
};

export const getViewProduct = async (slug: string) => {
  try {
    const response = await client.collection("products").find({
      filters: {
        slug: slug,
        images: {
          $notNull: true,
        },
      },
      populate: ["images", "categories"],
      status: "published",
    });

    const result = parseViewProduct(response.data.flat()[0]);

    return result;
  } catch (error) {
    return [];
  }
};

export const getFilterProducts = async ({
  page = 1,
  pageSize = 12,
}: {
  page?: number;
  pageSize?: number;
}) => {
  try {
    const response = await client.collection("products").find({
      sort: "createdAt:desc",
      status: "published",
      populate: ["images", "categories", "brand"],
      pagination: {
        page,
        pageSize,
      },
      filters: {
        images: {
          $notNull: true,
        },
        stock: {
          $gt: 0,
        },
      },
    });

    const result = parseProductCart(response.data);
    return result;
  } catch (error) {
    return [];
  }
};
