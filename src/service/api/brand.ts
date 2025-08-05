import { client } from "./strapi";
import {
  parseBrandsDropDownMenu,
  parseBrandWithImage,
} from "@/lib/parse/parse-brands";
import { IDropDownMenu } from "@/types/navbar";

export const brandDropdown = async (): Promise<IDropDownMenu[]> => {
  try {
    const response = await client.collection("brands").find({
      sort: "name:asc",
      populate: ["products"],
      status: "published",
      filters: {
        products: {
          $notNull: true,
        },
      },
    });

    return parseBrandsDropDownMenu(response.data);
  } catch (error) {
    return [];
  }
};

export const brandWithImage = async () => {
  try {
    const response = await client.collection("brands").find({
      populate: ["products", "logo"],
      status: "published",
      filters: {
        logo: {
          $notNull: true,
        },
        products: {
          $notNull: true,
        },
      },
    });

    return parseBrandWithImage(response.data);
  } catch (error) {
    return [];
  }
};
