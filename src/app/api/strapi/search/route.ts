import { NextResponse } from "next/server";
import { client } from "@/service/api/strapi";
import { parseProductCart } from "@/lib/parse/parse-products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  try {
    let filters = {};

    if (query) {
      const searchWords = query.toLowerCase().split(" ").filter(Boolean);

      if (searchWords.length > 0) {
        filters = {
          $and: searchWords.map((word) => ({
            $or: [
              { name: { $containsi: word } },
              { brand: { name: { $containsi: word } } },
              { categories: { name: { $containsi: word } } },
            ],
          })),
        };
      }
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
