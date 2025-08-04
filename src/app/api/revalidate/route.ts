// import { NextRequest, NextResponse } from "next/server";
// import { revalidatePath } from "next/cache";

// export async function POST(req: NextRequest) {
//   const token = req.nextUrl.searchParams.get("token");
//   if (token !== process.env.REVALIDATE_SECRET) {
//     return NextResponse.json({ message: "Invalid token" }, { status: 401 });
//   }

//   const body = await req.json();
//   const model = body?.model;
//   const slug = body?.entry?.slug;

//   try {
//     switch (model) {
//       case "product":
//         if (slug) revalidatePath(`/view-product/${slug}`);
//         revalidatePath("/products");
//         revalidatePath("/");
//         break;

//       case "category":
//         revalidatePath("/products");
//         revalidatePath("/");
//         break;

//       case "product-bond":
//         revalidatePath("/");
//         break;

//       case "best-product":
//         revalidatePath("/");
//         break;

//       default:
//     }

//     return NextResponse.json({ revalidated: true });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { message: "Error revalidating" },
//       { status: 500 },
//     );
//   }
// }
