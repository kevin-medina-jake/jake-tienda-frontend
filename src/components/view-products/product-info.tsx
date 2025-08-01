"use client";

import {
  useStoreShoppingCart,
} from "@/store/shopping-cart";
import { motion } from "framer-motion";
import { CircleDollarSign, ShoppingCart, MessageCircle } from "lucide-react"; // Puedes cambiar el ícono por 'Whatsapp' si tienes uno personalizado
import { useState } from "react";

interface Props {
  id: number;
  image: string;
  name: string;
  price: number;
  stock: number;
}

const getWhatsAppUrl = (productName: string, method: string) => {
  const message = `Hola, estoy interesado en el producto ${productName} y quiero pagarlo con ${method}`;
  return `https://wa.me/573502397570?text=${encodeURIComponent(message)}`; // Reemplaza por tu número real
};

export default function ProductInfo({ id, name, price, stock, image }: Props) {
  const { addProduct } = useStoreShoppingCart();

  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("sin_credito");

  const increment = () => {
    setQuantity((prev) => (prev < stock ? prev + 1 : prev));
  };

  const decrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleAddToCart = () => {
    addProduct({
      id: id.toString(),
      name,
      price,
      stock,
      image,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.2 }}
      className="flex flex-col space-y-6 w-full"
    >
      <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
      <p className="text-2xl text-gray-700 font-semibold">
        ${price?.toLocaleString("es-CO")}
      </p>

      {stock > 1 && (
        <div className="flex items-center space-x-3">
          <span className="font-medium">Cantidad</span>
          <div className="flex items-center border rounded">
            <button
              onClick={decrement}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={increment}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
              disabled={quantity >= stock}
            >
              +
            </button>
          </div>
        </div>
      )}

      <label className="flex flex-col gap-1 text-sm font-medium">
        Método de pago
        <select
          name="paymentMethod"
          className="border border-gray-300 rounded p-2"
          onChange={handleChange}
          value={paymentMethod}
        >
          <optgroup label="Pago sin crédito">
            <option value="sin_credito">PayU</option>
          </optgroup>
          <optgroup label="Pago con crédito">
            <option value="abby">Abby</option>
            <option value="brilla">Brilla</option>
            <option value="gora">Gora</option>
            <option value="banco_bogota">Banco de Bogotá</option>
          </optgroup>
        </select>
      </label>

      <div className="flex flex-col sm:flex-row gap-4 w-full">
        {paymentMethod !== "sin_credito" ? (
          <a
            href={getWhatsAppUrl(name, paymentMethod)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 flex items-center justify-center gap-2 hover:bg-green-600 text-white p-3 rounded-sm w-full text-center"
          >
            <MessageCircle size={20} />
            WhatsApp
          </a>
        ) : (
          <button className="bg-blue-500 flex items-center justify-center gap-2 hover:bg-blue-600 text-white p-3 rounded-sm w-full">
            <CircleDollarSign size={20} />
            Comprar Ahora
          </button>
        )}
        <button
          onClick={() => handleAddToCart()}
          className="bg-blue-200 hover:bg-blue-300 flex items-center gap-2 justify-center text-gray-900 p-3 rounded-sm w-full"
        >
          <ShoppingCart size={20} />
          Agregar al carrito
        </button>
      </div>
    </motion.div>
  );
}
