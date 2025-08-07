import { NextResponse } from "next/server";
import { calculateMD5 } from "@/lib/payu/signature";
import { client } from "@/service/api/strapi";
import { parseProductCart } from "@/lib/parse/parse-products";

interface RequestBody {
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  buyerInfo: {
    buyerEmail: string;
    buyerFullName: string;
    telephone: string;
    description: string;
  };
}

export async function POST(request: Request) {
  try {
    const { products, buyerInfo }: RequestBody = await request.json();

    const productIds = products.map((p) => p.id);

    const strapiResponse = await client.collection("products").find({
      filters: {
        id: {
          $in: productIds,
        },
        stock: {
          $gt: 0,
        },
      },
      status: "published",
      fields: ["price", "stock"],
    });

    const isProductsResponse =
      strapiResponse.data.flat().length > 0 ? strapiResponse.data.flat() : [];

    if (isProductsResponse.length === 0) {
      return NextResponse.json(
        { error: "No se encontraron productos." },
        {
          status: 400,
        },
      );
    }

    const validatedProducts = isProductsResponse.filter(
      (product: any) => product.stock > 0,
    );

    let totalAmount = 0;

    for (const product of products) {
      const dbProduct = validatedProducts.find(
        (p: any) => Number(p.id) === Number(product.id),
      );

      if (!dbProduct || dbProduct.stock < product.quantity) {
        return NextResponse.json(
          {
            error: `Producto con ID ${product.id} no válido o sin stock suficiente.`,
          },
          { status: 400 },
        );
      }

      totalAmount += dbProduct.price * product.quantity;
    }

    const amount = totalAmount.toString();

    const apiKey = process.env.PAYU_API_KEY;
    const merchantId = process.env.PAYU_MERCHANT_ID;
    const accountId = process.env.PAYU_ACCOUNT_ID;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!apiKey || !merchantId || !accountId || !baseUrl) {
      throw new Error(
        "Credenciales de PayU o URL base no configuradas en el servidor.",
      );
    }

    const referenceCode = `JAKE_ORD_${Date.now()}_${Math.floor(
      Math.random() * 100,
    )}`;
    const currency = "COP";

    const signature = calculateMD5(
      apiKey,
      merchantId,
      referenceCode,
      amount,
      currency,
    );

    const payuData = {
      merchantId,
      accountId,
      description: buyerInfo.description || "Compra en Jake Tienda Electrónica",
      referenceCode,
      amount,
      tax: "0", // Ajusta los impuestos según tu lógica de negocio
      taxReturnBase: "0",
      currency,
      signature,
      test: "0", // 1 para Sandbox (pruebas), 0 para Producción
      buyerEmail: buyerInfo.buyerEmail,
      buyerFullName: buyerInfo.buyerFullName,
      telephone: buyerInfo.telephone,
      responseUrl: `${baseUrl}/pay/result`, // Página a la que vuelve el usuario
      confirmationUrl: `${baseUrl}/api/payu/confirm`, // Webhook para confirmar el pago
    };

    return NextResponse.json(payuData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
