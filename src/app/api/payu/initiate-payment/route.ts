import { NextResponse } from "next/server";
import { calculateMD5 } from "@/lib/payu/signature";
import { client } from "@/service/api/strapi";
import { IBuyerInfo } from "@/components/pay/form-pay-products";
import { generatePayuExtras, IProduct } from "@/lib/payu/generatePayuExtras";

interface RequestBody {
  products: IProduct[];
  buyerInfo: IBuyerInfo;
}

export async function POST(request: Request) {
  try {
    const { products, buyerInfo }: RequestBody = await request.json();

    if (!products || products.length === 0) {
      return NextResponse.json(
        { error: "No se encontraron productos en la solicitud." },
        { status: 400 },
      );
    }

    const requiredBuyerFields = [
      "email",
      "firstName",
      "lastName",
      "address",
      "city",
      "country",
      "department",
      "telephone",
      "document",
    ];
    const missingBuyerFields = requiredBuyerFields.filter(
      (field) => !buyerInfo[field as keyof IBuyerInfo],
    );

    if (missingBuyerFields.length > 0) {
      return NextResponse.json(
        {
          error: `Faltan los siguientes datos del comprador: ${missingBuyerFields.join(", ")}`,
        },
        { status: 400 },
      );
    }

    const productIds = products.map((p) => Number(p.id));

    const strapiResponse = await client.collection("products").find({
      filters: {
        id: { $in: productIds },
        stock: { $gt: 0 },
      },
      status: "published",
      fields: ["price", "stock"],
    });

    const isProductsResponse = strapiResponse?.data?.flat() || [];

    if (isProductsResponse.length === 0) {
      return NextResponse.json(
        {
          error:
            "No se encontraron productos válidos o con stock suficiente en la base de datos.",
        },
        { status: 400 },
      );
    }

    let totalAmount = 0;
    const dbProductsMap = new Map(
      isProductsResponse.map((p: any) => [Number(p.id), p]),
    );

    for (const product of products) {
      const dbProduct = dbProductsMap.get(Number(product.id));

      if (!dbProduct || dbProduct.stock < product.quantity) {
        return NextResponse.json(
          {
            error: `Producto con ID ${product.id} no válido, sin stock o la cantidad solicitada excede el stock disponible.`,
          },
          { status: 400 },
        );
      }

      totalAmount += dbProduct.price * product.quantity;
    }

    const apiKey = process.env.PAYU_API_KEY;
    const merchantId = process.env.PAYU_MERCHANT_ID;
    const accountId = process.env.PAYU_ACCOUNT_ID;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!apiKey || !merchantId || !accountId || !baseUrl) {
      return NextResponse.json(
        { error: "Credenciales de PayU no configuradas." },
        { status: 500 },
      );
    }

    const referenceCode = `JAKE_ORD_${Date.now()}_${Math.floor(Math.random() * 100)}`;
    const currency = "COP";
    const signature = calculateMD5(
      apiKey,
      merchantId,
      referenceCode,
      totalAmount.toString(),
      currency,
    );

    const { extra1, extra2 } = generatePayuExtras(products);
    const description = `Pedido de ${products.length} producto/s`;

    const payuData = {
      merchantId,
      accountId,
      description,
      referenceCode,
      amount: totalAmount.toString(),
      tax: "0",
      taxReturnBase: "0",
      currency,
      signature,
      test: "1",
      buyerEmail: buyerInfo.email,
      buyerFullName: `${buyerInfo.firstName} ${buyerInfo.lastName}`,
      shippingAddress: buyerInfo.address,
      shippingCity: buyerInfo.city,
      shippingCountry: buyerInfo.country,
      shippingState: buyerInfo.department,
      buyerDocument: buyerInfo.document,
      telephone: buyerInfo.telephone,
      extra1,
      extra2,
      responseUrl: `${baseUrl}/pay/result`,
      confirmationUrl: `${baseUrl}/api/payu/confirm`,
    };

    console.log("PayU Data:", payuData);

    return NextResponse.json(payuData);
  } catch (error: any) {
    console.error("Error en la API de PayU:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
