"use client";

import { motion } from "framer-motion";
import { CircleDollarSign, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface Props {
  name: string;
  price: number;
  stock: number;
}

export default function ProductInfo({ name, price, stock }: Props) {
  const [quantity, setQuantity] = useState(1);
  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const [paymentMethod, setPaymentMethod] = useState("sin_credito");

  // tarea: hacer que cambie el botón de comprar, si es diferente a sin crédito y
  // que se muestre un botón de WhatsApp que redirija a WhatsApp con el mensaje de la
  // de la selección del método de pago

  // tarea: hacer que el estado quantity se pueda sumar hasta el que llega de stock en los parámetros

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setPaymentMethod(value);

    console.log("Método seleccionado:", value);
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
          >
            +
          </button>
        </div>
      </div>

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
          </optgroup>
        </select>
      </label>

      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <button className="bg-blue-500 flex items-center justify-center gap-2 hover:bg-blue-600 text-white p-3 rounded-sm w-full">
          <CircleDollarSign size={20} />
          Comprar Ahora
        </button>
        <button className="bg-blue-200 hover:bg-blue-300 flex items-center gap-2 justify-center text-gray-900 p-3 rounded-sm w-full">
          <ShoppingCart size={20} />
          Agregar al carrito
        </button>
      </div>
    </motion.div>
  );
}
