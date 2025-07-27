"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import controladorImg from "@/assets/images/controlador.png";

export default function ProductsGrid() {
  // Simulación de productos
  const products = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Producto ${i + 1}`,
    description: "Esta es una breve descripción sobre el producto.",
    price: (1000000 + i * 50000).toLocaleString("es-CO"),
    image: controladorImg.src,
  }));

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className="border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition flex flex-col"
        >
          {/* Imagen del producto */}
          <div className="w-full h-40 flex items-center justify-center mb-4">
            <Image
              src={product.image}
              alt={product.name}
              width={160}
              height={160}
              className="object-contain"
            />
          </div>

          {/* Información */}
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-sm text-gray-500 mt-2">{product.description}</p>
          <p className="text-cyan-700 font-bold mt-2">${product.price}</p>

          {/* Botones - ahora adaptados para móvil */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
            <button className="bg-cyan-700 text-white py-2 px-4 rounded hover:bg-cyan-800 w-full sm:w-auto">
              Comprar
            </button>
            <button className="border border-cyan-700 text-cyan-700 py-2 px-4 rounded hover:bg-cyan-50 w-full sm:w-auto">
              Agregar
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
