import ProductDetail from "@/components/view-products/product-detail";

export default async function ProductPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  const { slug } = params;

  return <ProductDetail slug={slug} />;
}
