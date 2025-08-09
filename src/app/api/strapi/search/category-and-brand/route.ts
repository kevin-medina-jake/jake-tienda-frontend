import { NextResponse } from "next/server";

import { client } from "@/service/api/strapi";
import { parseProductCart } from "@/lib/parse/parse-products";
import { pageSize } from "@/config/infoConst";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const brand = searchParams.get("brand") || "";
  const category = searchParams.get("category") || "";
  const page = searchParams.get("page") || 1;

  try {
    let filters = {};

    if (brand) {
      filters = {
        brand: { name: { $eq: brand } },
      };
    }

    if (category) {
      filters = {
        categories: { name: { $eq: category } },
      };
    }

    const response = await client.collection("products").find({
      filters: filters,
      populate: ["brand", "categories", "images"],
      status: "published",
      sort: "createdAt:desc",
      pagination: {
        page: Number(page),
        pageSize: pageSize,
      },
    });

    const result = parseProductCart(response.data);

    return NextResponse.json({
      products: result,
      meta: response.meta.pagination,
    });
  } catch (error) {
    console.error("Error en la búsqueda de productos:", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
