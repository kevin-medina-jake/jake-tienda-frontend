import { IBestProduct } from "@/types/product";
import { client } from "./strapi";

export const bestProduct = async (): Promise<IBestProduct[]> => {
  try {
    const response = await client.single("best-products").find({
      //   status: "published",
      //   populate: ["image"],
    });

    console.log(response);

    return [];
  } catch (error) {
    return [];
  }
};
