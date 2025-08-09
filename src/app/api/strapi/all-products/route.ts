import { NextResponse } from "next/server";

import { client } from "@/service/api/strapi";
import { parseProductCart } from "@/lib/parse/parse-products";
import { pageSize } from "@/config/infoConst";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || 1;

  try {
    const response = await client.collection("products").find({
      sort: "createdAt:desc",
      status: "published",
      populate: ["images", "categories", "brand"],
      pagination: {
        page: Number(page),
        pageSize: pageSize,
      },
      filters: {
        images: {
          $notNull: true,
        },
        stock: {
          $gt: 0,
        },
      },
    });

    const result = parseProductCart(response.data);

    return NextResponse.json({
      products: result,
      meta: response.meta.pagination,
    });
  } catch (error) {
    return new NextResponse("Server Error", { status: 500 });
  }
}
