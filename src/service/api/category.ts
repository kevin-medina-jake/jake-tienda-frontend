import { client } from "./strapi";
import { parseCategoryDropDownMenu } from "@/lib/parse-category";
import { IDropDownMenu } from "@/types/navbar";

export const categoryDropdown = async (): Promise<IDropDownMenu[]> => {
  const response = await client.collection("categories").find({
    populate: ["products"],
  });

  const result = parseCategoryDropDownMenu(response.data);

  return result;
};
