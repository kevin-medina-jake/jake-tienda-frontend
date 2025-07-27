import { client } from "./strapi";
import { parseBrandsDropDownMenu } from "@/lib/parse-brands";
import { IDropDownMenu } from "@/types/navbar";

export const brandDropdown = async (): Promise<IDropDownMenu[]> => {
  try {
    const response = await client.collection("brands").find({
      populate: ["products"],
    });

    return parseBrandsDropDownMenu(response.data);
  } catch (error) {
    return [];
  }
};
