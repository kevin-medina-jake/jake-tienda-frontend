import { NextResponse } from "next/server";
import { client } from "@/service/api/strapi";
import { parseProductCart } from "@/lib/parse/parse-products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  try {
    let filters = {};

    if (query) {
      // 1. Divide la cadena de búsqueda en palabras
      const searchWords = query.toLowerCase().split(" ").filter(Boolean);

      // 2. Construye los filtros dinámicamente
      if (searchWords.length > 0) {
        // Usa $and para que el producto deba coincidir con todas las palabras clave
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

    // 3. Realiza la llamada a Strapi con los filtros construidos
    const response = await client.collection("products").find({
      filters: filters, // Pasa el objeto de filtros dinámico
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
