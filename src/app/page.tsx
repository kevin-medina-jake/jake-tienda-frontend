import { Bonds } from "@/components/home/bonds";
import { Categories } from "@/components/home/categories";
import { Presentation } from "@/components/home/presentation";
import { Products } from "@/components/home/products";
import  TrustSection from "@/components/home/trust-section";
import { carrouselPresentation } from "@/service/api/carousel-presentation";
import { ICarouselPresentation } from "@/types/home";

export default async function Home() {
  const presentations: ICarouselPresentation[] = await carrouselPresentation();

  return (
    <div className="flex flex-col gap-10 mb-10">
      <Presentation presentations={presentations} />
      <TrustSection />
      <Categories />
      <Products />
      <Bonds />
    </div>
  );
}
