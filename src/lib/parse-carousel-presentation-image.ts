import { ICarouselPresentation } from "@/types/home";

export const parseCarouselPresentationImage = (
  presentations: any
): ICarouselPresentation[] => {
  const result = presentations.map((presentation: any) => {
    console.log(presentation);
    return {
      id: presentation.id,
      name_image: presentation.name_image,
      isImage: presentation.image_or_video?.mime === "image/png",
      url: presentation.image_or_video?.url,
      slug: presentation.product?.slug,
    };
  });

  return result;
};
