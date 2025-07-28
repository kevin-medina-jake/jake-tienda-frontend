import { client } from "./strapi";

import { parseNewProducts } from "@/lib/parse-products";
import { INewProducts } from "@/types/product";

export const newProducts = async (): Promise<INewProducts[]> => {
  try {
    const response = await client.collection("products").find({
      sort: "createdAt:desc",
      status: "published",
      populate: ["images"],
    });

    return parseNewProducts(response.data);
  } catch (error) {
    return [];
  }
};

export const getViewProduct = async (slug: string) => {
  try {
    const response = await client.collection("products").find({
      sort: "createdAt:desc",
      status: "published",
      populate: ["images"],
    });

    return parseNewProducts(response.data);
  } catch (error) {
    return [];
  }
};
