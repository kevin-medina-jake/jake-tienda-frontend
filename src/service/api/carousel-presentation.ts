import { parseCarouselPresentationImage } from "@/lib/parse-carousel-presentation-image";
import { client } from "./strapi";
import { ICarouselPresentation, IPresentationResponse } from "@/types/home";

export const carrouselPresentation = async (): Promise<
  ICarouselPresentation[]
> => {
  const response = (await client.collection("carousel-presentations").find({
    populate: ["Image_or_video"],
  })) as IPresentationResponse;

  const result = parseCarouselPresentationImage(response.data);

  return result as ICarouselPresentation[];
};
