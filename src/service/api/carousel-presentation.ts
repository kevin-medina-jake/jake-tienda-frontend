import { parseCarouselPresentationImage } from "@/lib/parse/parse-carousel-presentation-image";
import { client } from "./strapi";
import { ICarouselPresentation, IPresentationResponse } from "@/types/home";

export const carrouselPresentation = async (): Promise<
  ICarouselPresentation[]
> => {
  const response = (await client.collection("carousel-presentations").find({
    populate: ["image_or_video", "product"],
    status: "published",
    filters: {
      image_or_video: {
        $notNull: true,
      },
      product: {
        $notNull: true,
      },
    },
  })) as IPresentationResponse;

  const result = parseCarouselPresentationImage(response.data);

  return result as ICarouselPresentation[];
};
