"use client";

import { motion } from "framer-motion";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

interface Props {
  description: string;
}

export default function ProductDetails({ description }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold">Información del producto</h2>
      <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown>
    </motion.div>
  );
}
