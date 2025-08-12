import { client } from "./strapi";
import { IBestProduct } from "@/types/product";
import { parseBestProduct } from "@/lib/parse/parse-best-product";

export const bestProduct = async (): Promise<IBestProduct> => {
  try {
    const res = await client.single("best-product").find({
      populate: {
        image: true,
        product: { populate: { brand: true } },
      },
      status: "published",
    });

    return parseBestProduct(res.data);
  } catch {
    return { id: 0, name: "", slug: "", image: "", brand: "" };
  }
};
