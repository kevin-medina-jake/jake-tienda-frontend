"use client";

import { motion } from "framer-motion";

interface Props {
  description: string;
  features: string[];
  specs: string[];
}

export default function ProductDetails({ description, features, specs }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold">Información del producto</h2>
      <h3 className="font-semibold">Descripción</h3>
      <p className="text-gray-700">{description}</p>

      <h3 className="font-semibold">Beneficios</h3>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>

      <h3 className="font-semibold">Especificaciones</h3>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {specs.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </motion.div>
  );
}
