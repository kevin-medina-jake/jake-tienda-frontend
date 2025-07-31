import ProductsFilter from "./products-filter";
import ProductsGrid from "./products-grid";
import { ProductsFilterMovilDrawer } from "../common/products-filter-movil-drawer";

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 w-full min-h-[calc(100vh-447px)]">
      <ProductsFilterMovilDrawer />

      <div className="w-full flex gap-6">
        <div className="relative hidden sm:block w-64 flex-shrink-0">
          <ProductsFilter />
        </div>

        <ProductsGrid />
      </div>
    </div>
  );
}
