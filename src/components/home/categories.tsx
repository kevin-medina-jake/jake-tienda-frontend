import Link from "next/link";

import { categoryCart } from "@/service/api/category";
import { ICategoryCart } from "@/types/category";

export const Categories = async () => {
  const categories = (await categoryCart()) as ICategoryCart[];

  if (categories.length === 0) return null;

  return (
    <section className="flex flex-col gap-4 px-4 max-w-7xl mx-auto w-full">
      <div>
        <h2 className="text-2xl font-semibold text-center">Categorías</h2>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2  gap-4 py-4 ">
        {categories
          .filter((category) => category.isImportant)
          .slice(0, 8)
          .map((category: ICategoryCart) => (
            <CardCategory key={category.id} category={category} />
          ))}
      </div>
    </section>
  );
};

const CardCategory = ({ category }: { category: ICategoryCart }) => {
  return (
    <article className="flex flex-col gap-4 bg-blue-50 rounded-sm overflow-hidden">
      <div>
        <img
          src={category?.image}
          alt="Slide 1"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-2">
        <h3 className="text-xl font-semibold">{category.name}</h3>
      </div>

      <div className="px-2 pb-4">
        <Link
          href={"/products?category=" + category.name}
          className="bg-blue-400 text-white flex items-center justify-center h-10 font-medium rounded-sm"
        >
          <span>Ver Catalogo</span>
        </Link>
      </div>
    </article>
  );
};
