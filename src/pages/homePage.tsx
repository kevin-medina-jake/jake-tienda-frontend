import { Bonds } from "@/components/home/bonds";
import { Categories } from "@/components/home/categories";
import { Presentation } from "@/components/home/presentation";
import { Products } from "@/components/home/products";
import { TrustSection } from "@/components/home/trust-section";
import { brandWithImage } from "@/service/api/brand";
import { carrouselPresentation } from "@/service/api/carousel-presentation";
import { ICarouselPresentation } from "@/types/home";
import { IBrandWithImage } from "@/types/navbar";

export const HomePage = async () => {
  const presentations: ICarouselPresentation[] = await carrouselPresentation();
  const brands: IBrandWithImage[] = await brandWithImage();

  return (
    <div className="mb-10 flex flex-col gap-8">
      <Presentation presentations={presentations} />
      <TrustSection brands={brands} />
      <Categories />
      <Products />
      <Bonds />
    </div>
  );
};
