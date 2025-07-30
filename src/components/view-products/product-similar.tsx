"use client";

import { motion } from "framer-motion";
import { CartProduct } from "../common/cart-product";
import { IProductCart } from "@/types/product";

interface Props {
  products: IProductCart[];
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.slice(0, 8).map((product) => (
          <CartProduct key={product.id} product={product} />
        ))}
      </div>
    </motion.div>
  );
}
