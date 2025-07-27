import { client } from "./strapi";
import { parseBrandsDropDownMenu } from "@/lib/parse-brands";
import { IDropDownMenu } from "@/types/navbar";

export const brandDropdown = async (): Promise<IDropDownMenu[]> => {
  const response = await client.collection("brands").find({
    populate: ["products"],
  });

  const result = parseBrandsDropDownMenu(response.data);

  return result;
};
