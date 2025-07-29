"use client";

import { IProductCategory } from "@/types/category";
import { motion } from "framer-motion";

interface Props {
  products: IProductCategory[];
}

export default function ProductSimilar({ products }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-6">Productos Similares</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-6 text-center shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-semibold">Encabezado o título</h3>
            <p className="text-sm text-gray-500 mt-2">
              Esta es una breve descripción sobre la Card.
            </p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Acción
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
