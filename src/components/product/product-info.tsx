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

type Method = "sin_credito" | "addi" | "brilla" | "gora" | "banco_bogota";

const METHOD_LABELS: Record<Method, string> = {
  sin_credito: "Pago en línea (Tarjeta • PSE • Nequi)",
  addi: "Addi",
  brilla: "Brilla",
  gora: "Gora",
  banco_bogota: "Banco de Bogotá",
};

function buildWhatsAppUrl(opts: {
  productName: string;
  method: Method;
  baseAmount: number;
  currency: string;
  financedAmount?: number;
}) {
  const { productName, method, baseAmount, currency, financedAmount } = opts;
  const methodLabel = METHOD_LABELS[method] ?? method;

  let body =
    `Hola, estoy interesado en el producto "${productName}" ` +
    `y quiero pagarlo con ${methodLabel}. ` +
    `Precio de lista: ${baseAmount.toLocaleString("es-CO", { style: "currency", currency })}.`;

  if (financedAmount) {
    body += ` Total estimado con financiación (10.7%): ${financedAmount.toLocaleString("es-CO", { style: "currency", currency })}.`;
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`;
}

export const ProductInfo = ({ product }: { product: Product }) => {
  const [paymentMethod, setPaymentMethod] = useState<Method>("sin_credito");

  const baseAmount = useMemo(
    () => parseFloat(product.priceRange.maxVariantPrice.amount),
    [product.priceRange.maxVariantPrice.amount],
  );
  const currency = product.priceRange.maxVariantPrice.currencyCode;

  const isFinanced = paymentMethod === "addi" || paymentMethod === "brilla";
  const financedAmount = isFinanced
    ? parseFloat((baseAmount * (1 + FINANCE_RATE)).toFixed(2))
    : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value as Method);
  };

  const action = (() => {
    if (paymentMethod === "sin_credito") {
      return { type: "cart" as const };
    }
    if (paymentMethod === "banco_bogota") {
      return {
        type: "external" as const,
        href: BANCO_BOGOTA_URL,
        label: "Solicitar crédito en Banco de Bogotá",
        icon: <Landmark size={20} />,
      };
    }
    return {
      type: "whatsapp" as const,
      href: buildWhatsAppUrl({
        productName: product.title,
        method: paymentMethod,
        baseAmount,
        currency,
        financedAmount: isFinanced ? financedAmount : undefined,
      }),
      label: "WhatsApp",
      icon: <MessageCircle size={20} />,
    };
  })();

  return (
    <div className="flex w-full flex-col space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

      <Price
        className="text-2xl font-semibold text-gray-700"
        amount={product.priceRange.maxVariantPrice.amount}
        currencyCode={currency}
      />

      {isFinanced && financedAmount !== undefined && (
        <div className="rounded-md border border-blue-200 bg-blue-50 p-3 text-sm">
          <p className="font-medium text-blue-900">
            Total estimado con financiación (10.7%):
          </p>
          <Price
            className="text-xl font-semibold text-blue-900"
            amount={financedAmount.toFixed(2)}
            currencyCode={currency}
          />
          <p className="mt-1 text-xs text-blue-900/80">
            * Valor informativo. El total definitivo puede variar según la
            evaluación del aliado.
          </p>
        </div>
      )}

      <VariantSelector options={product.options} variants={product.variants} />

      <label className="flex flex-col gap-1 text-sm font-medium">
        Método de pago
        <select
          name="paymentMethod"
          className="rounded border border-gray-300 p-2"
          onChange={handleChange}
          value={paymentMethod}
        >
          <optgroup label="Pago sin crédito">
            <option value="sin_credito">{METHOD_LABELS.sin_credito}</option>
          </optgroup>

          <optgroup label="Pago con crédito">
            <option value="addi">{METHOD_LABELS.addi}</option>
            <option value="brilla">{METHOD_LABELS.brilla}</option>
            <option value="gora">{METHOD_LABELS.gora}</option>
            <option value="banco_bogota">{METHOD_LABELS.banco_bogota}</option>
          </optgroup>
        </select>
      </label>

      <div className="flex w-full flex-col gap-4 sm:flex-row">
        {action.type === "cart" ? (
          <AddToCart product={product} />
        ) : (
          <Link
            href={action.href!}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex w-full items-center justify-center gap-2 rounded-sm p-3 text-center text-white transition ${
              action.type === "external"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {action.icon}
            {action.label}
          </Link>
        )}
      </div>
    </div>
  );
};
