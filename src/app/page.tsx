import { Bonds } from "@/components/home/bonds";
import { Categories } from "@/components/home/categories";
import { Presentation } from "@/components/home/presentation";
import { Products } from "@/components/home/products";
import { TrustSection } from "@/components/home/trust-section";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 mb-10">
      <Presentation />
      <TrustSection />
      <Categories />
      <Products />
      <Bonds />
    </div>
  );
}
