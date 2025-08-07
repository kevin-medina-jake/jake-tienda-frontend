import { NextResponse } from "next/server";

import { client } from "@/service/api/strapi";
import { parseProductCart } from "@/lib/parse/parse-products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const brand = searchParams.get("brand") || "";
  const category = searchParams.get("category") || "";

  try {
    let filters = {};

    if (brand) {
      filters = {
        brand: { name: { $containsi: brand } },
      };
    }

    if (category) {
      filters = {
        categories: { name: { $containsi: category } },
      };
    }

    const response = await client.collection("products").find({
      filters: filters,
      populate: ["brand", "categories", "images"],
      status: "published",
      sort: "createdAt:desc",
    });

    const result = parseProductCart(response.data);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error en la búsqueda de productos:", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
