import { client } from "./strapi";
import { IBestProduct } from "@/types/product";

export const bestProduct = async (): Promise<IBestProduct[]> => {
  try {
    const responses = await client.single("best-product").find({
      populate: ["image"],
    });

    return [];
  } catch (error) {
    return [];
  }
};
