import { NextResponse } from "next/server";
import crypto from "crypto";
import { calculateMD5 } from "@/lib/payu/signature";

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

    // --- Validación Importante ---
    // En un entorno de producción, deberías recalcular el precio total aquí
    // consultando tu base de datos con los IDs de los productos para
    // evitar que el cliente manipule el precio.
    const amount = products
      .reduce((sum, p) => sum + p.price * p.quantity, 0)
      .toString();

    const apiKey = process.env.PAYU_API_KEY;
    const merchantId = process.env.PAYU_MERCHANT_ID;
    const accountId = process.env.PAYU_ACCOUNT_ID;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!apiKey || !merchantId || !accountId || !baseUrl) {
      throw new Error(
        "Credenciales de PayU o URL base no configuradas en el servidor.",
      );
    }

    const referenceCode = `JAKE_ORD_${Date.now()}`;
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
      test: "1", // 1 para Sandbox (pruebas), 0 para Producción
      buyerEmail: buyerInfo.buyerEmail,
      buyerFullName: buyerInfo.buyerFullName,
      telephone: buyerInfo.telephone,
      responseUrl: `${baseUrl}/pay/response`, // Página a la que vuelve el usuario
      confirmationUrl: `${baseUrl}/api/payu/confirm`, // Webhook para confirmar el pago
    };

    return NextResponse.json(payuData);
  } catch (error: any) {
    console.error("Error al iniciar el pago de PayU:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
