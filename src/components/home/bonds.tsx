"use client";

import Image from "next/image";

import {
  BadgeCheck,
  BookText,
  Clapperboard,
  Laptop,
  Music,
  ShoppingCart,
} from "lucide-react";

import { IProductBond } from "@/types/product";
import { useStoreShoppingCart } from "@/store/shopping-cart";

const bonds = [
  {
    id: "1",
    title: "Música + Video DJ (Pack Full Combo)",
    list: [
      "12 GB de música lista para mezclar (salsa, electrónica, reguetón, mezcla armónica).",
      "Compatible con cualquier controladora DJ.",
      "Perfecto para tus primeras fiestas y eventos.",
    ],
    Icon: Music,
    styles: "",
  },
  {
    id: "2",
    title: "Videoclips Musicales HD (Pack Pro)",
    list: [
      "Más de 2.000 GB de videoclips para DJs profesionales.",
      "Todos los géneros (urbana, crossover, electrónica).",
      "Optimizado para pantallas y cabinas.",
    ],
    Icon: Clapperboard,
    styles: "",
  },
  {
    id: "3",
    title: "Programas Profesionales de Mezcla",
    list: [
      "Virtual DJ 8 Full.v",
      "Serato DJ Full.",
      "Traktor DJ 3 Full (Windows 10 y 11 – 64 bits).",
    ],
    Icon: Laptop,
    styles: "",
  },
  {
    id: "4",
    title: "Cursos Online de DJ (100% Gratis)",
    list: [
      "Curso DJ Principiante.",
      "Curso de Virtual DJ & Traktor.",
      "Curso DJ Básico.",
    ],
    Icon: BookText,
    styles: "",
  },
];
export const Bonds = ({
  productBondInfo,
}: {
  productBondInfo: IProductBond;
}) => {
  const { addProduct, products } = useStoreShoppingCart();

  if (
    !productBondInfo.id ||
    !productBondInfo.title ||
    !productBondInfo.description ||
    !productBondInfo.image ||
    !productBondInfo.price ||
    !productBondInfo.stock
  ) {
    return <></>;
  }

  const isProductInShoppingCart = products.some(
    (item) => item.id === productBondInfo.id.toString(),
  );

  const handleAddToCart = () => {
    addProduct({
      id: productBondInfo.id.toString(),
      name: productBondInfo.title,
      price: productBondInfo.price,
      stock: productBondInfo.stock,
      image: productBondInfo.image,
    });
  };

  const handleCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    alert("En el carrito");
  };

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-4 px-4">
      <div className="col-span-1 sm:col-span-2 lg:col-span-4">
        <div className="flex flex-col gap-4 rounded-sm bg-blue-50 p-4 md:flex-row md:p-8">
          <section className="max-w-2xl">
            <Image
              src={productBondInfo.image}
              alt={productBondInfo.title}
              width={400}
              height={400}
              className="h-full w-full object-cover"
            />
          </section>

          <section className="flex flex-col justify-center gap-3 text-center sm:text-left">
            <h2 className="text-2xl font-semibold md:text-4xl">
              {productBondInfo.title}
            </h2>
            <p className="text-gray-700">{productBondInfo.description}</p>
            <div>
              {isProductInShoppingCart ? (
                <button
                  onClick={handleCheck}
                  className="flex w-max items-center justify-center gap-2 rounded-sm bg-green-200 p-3 px-6 text-gray-900"
                >
                  <BadgeCheck size={20} />
                  Ya en el carrito
                </button>
              ) : (
                <button
                  onClick={() => handleAddToCart()}
                  className="flex w-max items-center justify-center gap-2 rounded-sm bg-blue-200 p-3 px-6 text-gray-900 hover:bg-blue-300"
                >
                  <ShoppingCart size={20} />
                  Agregar al carrito
                </button>
              )}
            </div>
          </section>
        </div>
      </div>

      {bonds.map((bond) => (
        <div key={bond.id} className={bond.styles}>
          <CardBond bond={bond} />
        </div>
      ))}
    </div>
  );
};

const CardBond = ({ bond }: { bond: (typeof bonds)[number] }) => {
  const Icon = bond.Icon;
  return (
    <div className="flex h-full flex-col gap-4 rounded-sm bg-blue-50 p-4">
      <Icon size={24} />

      <h2 className="text-xl font-semibold">{bond.title}</h2>
      <ul className="list-disc pl-4 text-gray-700">
        {bond.list.map((item, index) => (
          <li key={index}>
            <p className="text-gray-700">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
