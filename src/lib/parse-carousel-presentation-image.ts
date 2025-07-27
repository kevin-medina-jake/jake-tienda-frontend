import { ICarouselPresentation } from "@/types/home";

export const parseCarouselPresentationImage = (
  presentations: any
): ICarouselPresentation[] => {
  const result = presentations.map((presentation: any) => {
    return {
      id: presentation.id,
      name_image: presentation.name_image,
      isImage: presentation.Image_or_video[0].mime === "image/png",
      url: presentation.Image_or_video[0].url,
    };
  });

  return result;
};
