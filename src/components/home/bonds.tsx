import Link from "next/link";
// import Image from "next/image";

import { BookText, Clapperboard, Laptop, Music } from "lucide-react";

import { getPromoBanner } from "@/lib/shopify";

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
export const Bonds = async () => {
  const banner = await getPromoBanner();

  if (!banner) return null;

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-4 px-4">
      <div className="col-span-1 sm:col-span-2 lg:col-span-4">
        <div className="flex flex-col gap-4 rounded-sm bg-gradient-to-br from-blue-800 to-blue-600 p-4 md:flex-row md:p-8">
          <section className="max-w-2xl">
            {/* <Image
              src={banner?.product?.featuredImage?.url}
              alt={banner?.title}
              width={400}
              height={400}
              className="h-full w-full object-cover"
              // unoptimized
            /> */}
            <img
              src={banner?.product?.featuredImage?.url}
              alt={banner?.title}
              className="h-full w-full object-cover"
            />
          </section>

          <section className="flex flex-col justify-center gap-3 text-center sm:text-left">
            <h2 className="text-4xl font-bold text-white md:text-6xl">
              {banner?.title}
            </h2>
            <p className="text-white/90">{banner?.description}</p>
            <div>
              <Link
                href="/search"
                className="mt-4 block w-full rounded-sm bg-white px-12 py-3 text-center font-medium text-black hover:bg-blue-100 md:w-full md:max-w-sm"
              >
                Comprar Ahora
              </Link>
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
    <div className="flex h-full flex-col gap-4 rounded-sm bg-gradient-to-t from-blue-900 to-blue-700 p-4 text-white">
      <Icon size={24} />

      <h2 className="text-xl font-semibold">{bond.title}</h2>
      <ul className="list-disc pl-4">
        {bond.list.map((item, index) => (
          <li key={index}>
            <p className="">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
