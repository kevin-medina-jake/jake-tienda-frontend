import { client } from "./strapi";
import { IBestProduct } from "@/types/product";
import { parseBestProduct } from "@/lib/parse-best-product";

export const bestProduct = async (): Promise<IBestProduct> => {
  try {
    const responses = await client.single("best-product").find({
      populate: ["image", "product"],
      filters: {
        image: {
          $notNull: true,
        },
        product: {
          $notNull: true,
        },
      },
    });

    return parseBestProduct(responses.data);
  } catch (error) {
    return {
      id: 0,
      name: "",
      slug: "",
      image: "",
    };
  }
};
