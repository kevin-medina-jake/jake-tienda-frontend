import { client } from "./strapi";
import { parseCategoryDropDownMenu } from "@/lib/parse-category";
import { IDropDownMenu } from "@/types/navbar";

export const categoryDropdown = async (): Promise<IDropDownMenu[]> => {
  try {
    const response = await client.collection("categories").find({
      populate: ["products"],
    });

    return parseCategoryDropDownMenu(response.data);
  } catch (error) {
    return [];
  }
};
