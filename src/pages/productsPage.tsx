import { Products } from "@/components/products/products";

export const ProductsPage = () => {
  return <Products />;
};

// function ProductsContent() {
// const { setAllProducts, filters, setLoading, allProducts } =
//   useStoreProducts();
// const { handleCategories, handleBrands } = useFilterProducts();
// const searchParams = useSearchParams();
// const getProductsBySearchParams = async ({
//   name,
//   search,
// }: {
//   name: string;
//   search: string;
// }) => {
//   setLoading(true);
//   try {
//     const res = await fetch(
//       `/api/strapi/products?${name}=${encodeURIComponent(search)}`,
//     );
//     const data = await res.json();
//     setAllProducts(data);
//   } catch (err) {
//     setAllProducts([]);
//   } finally {
//     setLoading(false);
//   }
// };
// const getProductsByPageAndPageSize = async ({
//   page,
//   pageSize,
// }: {
//   page: number;
//   pageSize: number;
// }) => {
//   setLoading(true);
//   try {
//     const res = await fetch(
//       `/api/strapi/all-products?page=${page}&page-size=${pageSize}`,
//     );
//     const data = await res.json();
//     setAllProducts(data);
//   } catch (err) {
//     setAllProducts([]);
//   } finally {
//     setLoading(false);
//   }
// };
// useEffect(() => {
//   if (
//     filters.search.length > 0 ||
//     filters.brands.length > 0 ||
//     filters.categories.length > 0 ||
//     allProducts.length > 0
//   )
//     return;
//   const brand = searchParams.get("brand");
//   const category = searchParams.get("category");
//   if (!brand && !category) return;
//   const page = searchParams.get("page");
//   const currentPage = page && !isNaN(Number(page)) ? Number(page) : 1;
//   getProductsByPageAndPageSize({ page: currentPage, pageSize: 12 });
// }, []);
// useEffect(() => {
//   const category = searchParams.get("category");
//   if (!category) return;
//   handleCategories({ categories: category.split(",") });
//   getProductsBySearchParams({ name: "category", search: category });
// }, [searchParams]);
// useEffect(() => {
//   const brand = searchParams.get("brand");
//   if (!brand) return;
//   handleBrands({ brands: brand.split(",") });
//   getProductsBySearchParams({ name: "brand", search: brand });
// }, [searchParams]);
// return <ProductsPage />;
// }
