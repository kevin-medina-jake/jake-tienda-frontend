import { NextResponse } from "next/server";

import { client } from "@/service/api/strapi";
import { parseProductCart } from "@/lib/parse/parse-products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const response = await client.collection("products").find({
      filters: {
        $or: [
          { name: { $containsi: query } },
          { brand: { name: { $containsi: query } } },
          { categories: { name: { $containsi: query } } },
        ],
      },
      populate: ["brand", "categories", "images"],
    });

    const result = parseProductCart(response.data);
    return NextResponse.json(result);
  } catch (error) {
    return new NextResponse("Server Error", { status: 500 });
  }
}
