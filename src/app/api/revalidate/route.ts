import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (token !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const body = await req.json();
  const model = body?.model; // ej. "best-product"
  const slug = body?.entry?.slug; // ej. "t-shirt"

  try {
    if (slug) {
      revalidatePath(`/products/${slug}`);
    }
    revalidatePath("/products");
    revalidatePath("/");
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 },
    );
  }
}
