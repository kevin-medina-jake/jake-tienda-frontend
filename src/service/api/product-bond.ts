import { IProductBond } from "@/types/product";
import { client } from "./strapi";
import { parseProductBond } from "@/lib/parse-product-bond";

export const productBond = async (): Promise<IProductBond> => {
  try {
    const responses = await client.single("product-bond").find({
      populate: ["image", "product"],
    });

    return parseProductBond(responses.data);
  } catch (error) {
    return {
      id: 0,
      title: "",
      description: "",
      slug: "",
      image: "",
    };
  }
};
