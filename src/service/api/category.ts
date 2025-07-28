import { client } from "./strapi";
import {
  parseCategoryCart,
  parseCategoryDropDownMenu,
} from "@/lib/parse-category";
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
