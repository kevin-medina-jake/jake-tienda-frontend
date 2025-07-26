import { Bonds } from "@/components/home/bonds";
import { Categories } from "@/components/home/categories";
import { Presentation } from "@/components/home/presentation";
import { TrustSection } from "@/components/home/trust-section";

export default function Home() {
  return (
    <div className="h-full">
      <Presentation />
      <TrustSection />
      <Categories />
      <Bonds />
    </div>
  );
}
