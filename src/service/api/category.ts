import { client } from "./strapi";
import {
  parseCategoryCart,
  parseCategoryDropDownMenu,
} from "@/lib/parse-category";
import { parseProductCart } from "@/lib/parse-products";
import { ICategoryCart } from "@/types/category";
import { IDropDownMenu } from "@/types/navbar";

export const categoryDropdown = async (): Promise<IDropDownMenu[]> => {
  try {
    const response = await client.collection("categories").find({
      populate: ["products"],
      status: "published",
    });

    return parseCategoryDropDownMenu(response.data);
  } catch (error) {
    return [];
  }
};

export const categoryCart = async (): Promise<ICategoryCart[]> => {
  try {
    const response = await client.collection("categories").find({
      populate: ["image"],
    });

    const result = parseCategoryCart(response.data);

    return result;
  } catch (error) {
    return [];
  }
};

export const productCategory = async (slug: string, productId: number) => {
  try {
    const response = await client.collection("categories").find({
      filters: {
        slug: slug,
      },
      populate: ["products.images"],
      status: "published",
    });

    const result = parseProductCart(response.data[0].products).filter(
      (product) => product.id !== productId
    );

    return result;
  } catch (error) {
    return [];
  }
};
