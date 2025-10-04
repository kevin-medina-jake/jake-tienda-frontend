"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Landmark, MessageCircle } from "lucide-react";

import { Product } from "@/lib/shopify/types";
import Price from "../price";
import { AddToCart } from "../cart/add-to-cart";
import VariantSelector from "./variant-selector";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || "573103876150";
const BANCO_BOGOTA_URL =
  process.env.NEXT_PUBLIC_BANCO_BOGOTA_URL ||
  "https://slm.bancodebogota.com/lwjqqbfe";

const FINANCE_RATE = 0.107;

type Method = "sin_credito" | "brilla" | "gora" | "banco_bogota";
type CreditMethod = Exclude<Method, "sin_credito">;

const METHOD_LABELS: Record<Method, string> = {
  banco_bogota: "Banco de Bogotá",
  sin_credito: "Paga con ( ADDI • Tarjeta • PSE • Nequi )",
  brilla: "Brilla",
  gora: "Gora",
};

function buildWhatsAppUrl(opts: {
  productName: string;
  method: CreditMethod;
  baseAmount: number;
  currency: string;
  financedAmount?: number;
}) {
  const { productName, method, baseAmount, currency, financedAmount } = opts;
  const methodLabel = METHOD_LABELS[method] ?? method;

  let body =
    `Hola, estoy interesado en el producto "${productName}" ` +
    `y quiero pagarlo con ${methodLabel}. ` +
    `Precio de lista: ${baseAmount.toLocaleString("es-CO", { style: "currency", currency })}`;

  if (financedAmount) {
    body += ` Total estimado con financiación (10.7%): ${financedAmount.toLocaleString("es-CO", { style: "currency", currency })}`;
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`;
}

export const ProductInfo = ({ product }: { product: Product }) => {
  const [paymentMethod, setPaymentMethod] = useState<Method>("sin_credito");
  const [creditMethod, setCreditMethod] =
    useState<CreditMethod>("banco_bogota");

  const baseAmount = useMemo(
    () => parseFloat(product.priceRange.maxVariantPrice.amount),
    [product.priceRange.maxVariantPrice.amount],
  );
  const currency = product.priceRange.maxVariantPrice.currencyCode;

  const isMarkupMethod = paymentMethod === "brilla";

  const displayAmountNumber = useMemo(
    () =>
      isMarkupMethod
        ? +(baseAmount * (1 + FINANCE_RATE)).toFixed(2)
        : baseAmount,
    [isMarkupMethod, baseAmount],
  );

  const financingTotalNumber = useMemo(
    () => +(baseAmount * (1 + FINANCE_RATE)).toFixed(2),
    [baseAmount],
  );

  const creditAction =
    creditMethod === "banco_bogota"
      ? {
          type: "external" as const,
          href: BANCO_BOGOTA_URL,
          label: "Solicitar crédito en Banco de Bogotá",
          icon: <Landmark size={20} />,
        }
      : {
          type: "whatsapp" as const,
          href: buildWhatsAppUrl({
            productName: product.title,
            method: creditMethod,
            baseAmount,
            currency,
            financedAmount:
              creditMethod === "brilla"
                ? +(baseAmount * (1 + FINANCE_RATE)).toFixed(2)
                : undefined,
          }),
          label:
            creditMethod === "brilla"
              ? "Solicitar con Brilla (WhatsApp)"
              : "Solicitar con Gora (WhatsApp)",
          icon: <MessageCircle size={20} />,
        };

  return (
    <div className="flex w-full flex-col space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

      {/* Precios superiores */}
      <div className="space-y-1">
        {paymentMethod === "sin_credito" && (
          <Price
            className="text-sm text-gray-500 line-through"
            amount={financingTotalNumber.toFixed(2)}
            currencyCode={currency}
          />
        )}

        <Price
          className="text-2xl font-semibold text-gray-800"
          amount={displayAmountNumber.toFixed(2)}
          currencyCode={currency}
        />

        {paymentMethod === "sin_credito" ? (
          <p className="text-xs font-medium text-emerald-700">
            Descuento del 10.7% pagando en línea
          </p>
        ) : isMarkupMethod ? (
          <p className="text-xs text-blue-700">
            Total estimado con financiación
          </p>
        ) : null}
      </div>

      <VariantSelector options={product.options} variants={product.variants} />

      {/* === BLOQUE 1: Pago sin crédito + Carrito === */}
      <div className="flex flex-col gap-3 rounded border border-gray-300 p-3">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            name="paymentType"
            value="sin_credito"
            checked={paymentMethod === "sin_credito"}
            onChange={() => setPaymentMethod("sin_credito")}
            className="h-4 w-4"
            aria-label="Seleccionar pago sin crédito"
          />
          <span className="text-sm font-medium">
            {METHOD_LABELS.sin_credito}
          </span>
        </div>

        <div className="flex w-full">
          <AddToCart product={product} />
        </div>
      </div>

      {/* === BLOQUE 2: Pago con crédito (select + botón) === */}
      <div className="flex flex-col gap-3 rounded border border-gray-300 p-3">
        <label className="text-sm font-medium">Pago con crédito</label>

        <select
          name="financeMethod"
          className="rounded border border-gray-300 p-2"
          value={creditMethod}
          onChange={(e) => {
            const val = e.target.value as CreditMethod;
            setCreditMethod(val);
            setPaymentMethod(val);
          }}
        >
          <option value="banco_bogota">{METHOD_LABELS.banco_bogota}</option>
          <option value="brilla">{METHOD_LABELS.brilla}</option>
          <option value="gora">{METHOD_LABELS.gora}</option>
        </select>

        <div className="flex w-full">
          <Link
            href={creditAction.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex w-full items-center justify-center gap-2 rounded-sm p-3 text-center text-white transition ${
              creditAction.type === "external"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {creditAction.icon}
            {creditAction.label}
          </Link>
        </div>
      </div>
    </div>
  );
};
