"use client";

import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

interface Props {
  description: string;
}

export function ProductDescription({ description }: Props) {
  return (
    <div className="mt-6 space-y-6">
      <h2 className="mb-4 text-2xl font-bold">Descripción del producto</h2>

      <article className="prose prose-sm max-w-none">
        <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
          {description}
        </Markdown>
      </article>
    </div>
  );
}
