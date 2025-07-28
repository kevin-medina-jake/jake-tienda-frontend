import { parseNewProducts } from "@/lib/parse-products";
import { client } from "./strapi";

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
