"use client";

import { motion } from "framer-motion";
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

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex flex-col space-y-6"
    >
      <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
      <p className="text-2xl text-gray-700 font-semibold">
        ${price?.toLocaleString("es-CO")}
      </p>

      {/* Selector de cantidad */}
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

      {/* Botones */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg"
      >
        Comprar Ahora
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="bg-blue-200 hover:bg-blue-300 text-gray-900 py-3 rounded-lg"
      >
        Agregar al carrito
      </motion.button>

      {/* Opciones de crédito */}
      <div>
        <p className="font-medium mb-2">Comprar con crédito</p>
        <div className="flex flex-wrap gap-4">
          <span className="px-4 py-2 bg-purple-100 rounded-full font-medium cursor-pointer hover:bg-purple-200">
            Addi
          </span>
          <span className="px-4 py-2 bg-green-100 rounded-full font-medium cursor-pointer hover:bg-green-200">
            Gora
          </span>
          <span className="px-4 py-2 bg-red-100 rounded-full font-medium cursor-pointer hover:bg-red-200">
            Banco Bogotá
          </span>
        </div>
      </div>
    </motion.div>
  );
}
