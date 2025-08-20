"use client";

import { useState } from "react";

import { ShoppingCart, MessageCircle } from "lucide-react";
import { Image, Product } from "@/lib/shopify/types";
import Price from "../price";
import { AddToCart } from "../cart/add-to-cart";
import VariantSelector from "./variant-selector";
import Link from "next/link";

const getWhatsAppUrl = (productName: string, method: string) => {
  const message = `Hola, estoy interesado en el producto ${productName} y quiero pagarlo con ${method}`;
  return `https://wa.me/573502397570?text=${encodeURIComponent(message)}`;
};

export const ProductInfo = ({ product }: { product: Product }) => {
  // const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("sin_credito");

  // const increment = () => {
  //   // setQuantity((prev) => (prev < stock ? prev + 1 : prev));
  // };

  // const decrement = () => {
  //   setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  // };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
  };

  // const handleAddToCart = () => {};

  // const handleCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.stopPropagation();
  //   e.preventDefault();

  //   alert("En el carrito");
  // };

  return (
    <div className="flex w-full flex-col space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
      <Price
        className="text-2xl font-semibold text-gray-700"
        amount={product.priceRange.maxVariantPrice.amount}
        currencyCode={product.priceRange.maxVariantPrice.currencyCode}
      />

      <VariantSelector options={product.options} variants={product.variants} />

      {/* {stock > 1 && (
        <div className="flex items-center space-x-3">
          <span className="font-medium">Cantidad</span>
          <div className="flex items-center rounded border">
            <button
              onClick={decrement}
              className="bg-gray-100 px-3 py-1 hover:bg-gray-200"
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={increment}
              className="bg-gray-100 px-3 py-1 hover:bg-gray-200"
              disabled={quantity >= stock}
            >
              +
            </button>
          </div>
        </div>
      )} */}

      <label className="flex flex-col gap-1 text-sm font-medium">
        Método de pago
        <select
          name="paymentMethod"
          className="rounded border border-gray-300 p-2"
          onChange={handleChange}
          value={paymentMethod}
        >
          <optgroup label="Pago sin crédito">
            <option value="sin_credito">PayU</option>
          </optgroup>
          <optgroup label="Pago con crédito">
            <option value="addi">Addi</option>
            <option value="brilla">Brilla</option>
            <option value="gora">Gora</option>
            <option value="banco_bogota">Banco de Bogotá</option>
          </optgroup>
        </select>
      </label>

      <div className="flex w-full flex-col gap-4 sm:flex-row">
        {paymentMethod !== "sin_credito" ? (
          <Link
            href={getWhatsAppUrl(product.title, paymentMethod)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-sm bg-green-500 p-3 text-center text-white hover:bg-green-600"
          >
            <MessageCircle size={20} />
            WhatsApp
          </Link>
        ) : (
          <AddToCart product={product} />
        )}
      </div>
    </div>
  );
};
