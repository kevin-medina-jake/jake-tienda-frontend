import { IProductCart, IViewProduct } from "@/types/product";
import ProductInfo from "./product-info";
import ProductSimilar from "./product-similar";
import { getViewProduct } from "@/service/api/product";
import ProductCarousel from "./product-carousel";
import ProductDetails from "./product-details";
import { productCategory } from "@/service/api/category";

export default async function ProductDetail({ slug }: { slug?: string }) {
  if (!slug) {
    return <div>Producto no encontrado.</div>;
  }

  const product = (await getViewProduct(slug)) as IViewProduct;

  if (!product) {
    return <div>Producto no encontrado.</div>;
  }

  let categoryProducts: IProductCart[] = [];
  if (product.category) {
    categoryProducts = await productCategory(product.category, product.id);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-20 py-10 space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <ProductCarousel images={product.images} />
        <ProductInfo
          name={product.name}
          price={product.price}
          stock={product.stock}
        />
      </div>

      {product.description && (
        <ProductDetails description={product.description} />
      )}

      {categoryProducts.length > 0 && (
        <ProductSimilar products={categoryProducts} />
      )}
    </div>
  );
}
