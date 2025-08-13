import { client } from "./strapi";
import { parseCarouselPresentationImage } from "@/lib/parse/parse-carousel-presentation-image";
import { ICarouselPresentation, IPresentationResponse } from "@/types/home";

export const carrouselPresentation = async (): Promise<
  ICarouselPresentation[]
> => {
  try {
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
  } catch (error) {
    console.error("Error en la API de Carrusel de Presentaciones:", error);
    return [];
  }
};
