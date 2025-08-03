import Link from "next/link";

import { categoryCart } from "@/service/api/category";
import { ICategoryCart } from "@/types/category";

export const Categories = async () => {
  const categories = (await categoryCart()) as ICategoryCart[];

  if (categories.length === 0) return null;

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4">
      <div>
        <h2 className="py-10 text-center text-3xl font-bold">Categorías</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 py-4 md:grid-cols-3 lg:grid-cols-5">
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
    <Link
      href={"/products?category=" + category.name}
      className="aspect-square overflow-hidden border border-gray-100 p-2 transition-all duration-100 ease-in-out hover:border-blue-300 hover:shadow-xs"
    >
      <article className="flex flex-col gap-4 overflow-hidden rounded-sm">
        <div>
          <img
            src={category?.image}
            alt="Slide 1"
            className="h-full w-full object-cover"
          />
        </div>

        <h3 className="text-center text-xl font-semibold">{category.name}</h3>
      </article>
    </Link>
  );
};
