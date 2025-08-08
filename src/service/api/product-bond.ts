import { IProductBond } from "@/types/product";
import { client } from "./strapi";
import { parseProductBond } from "@/lib/parse/parse-product-bond";

export const productBond = async (): Promise<IProductBond> => {
  try {
    const responses = await client.single("product-bond").find({
      populate: ["image", "product"],
      filters: {
        product: {
          $notNull: true,
        },
        image: {
          $notNull: true,
        },
      },
    });

    return parseProductBond(responses.data);
  } catch (error) {
    return {
      id: 0,
      title: "",
      description: "",
      slug: "",
      image: "",
      price: 0,
      stock: 0,
    };
  }
};
