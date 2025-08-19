import { searchProducts } from "@/lib/shopify";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  try {
    const products = await searchProducts({ query });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error en la búsqueda de productos:", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
