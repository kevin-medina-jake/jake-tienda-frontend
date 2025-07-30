import { productBond } from "@/service/api/product-bond";
import { IProductBond } from "@/types/product";
import { BookText, Clapperboard, Laptop, Music } from "lucide-react";

const bonds  = [
  {
    id: "music-video-dj",
    title: "Música + Video DJ (Pack Full Combo)",
    list: [
      "12 GB de música lista para mezclar (salsa, electrónica, reguetón, mezcla armónica).",
      "Compatible con cualquier controladora DJ.",
      "Perfecto para tus primeras fiestas y eventos.",
    ],
    Icon: Music,
    styles: "row-start-2 ",
  },
  {
    id: "audio-equipmentt",
    title: "Videoclips Musicales HD (Pack Pro)",
    list: [
      "Más de 2.000 GB de videoclips para DJs profesionales.",
      "Todos los géneros (urbana, crossover, electrónica).",
      "Optimizado para pantallas y cabinas.",
    ],
    Icon: Clapperboard,
    styles: "sm:row-start-2 row-start-3",
  },
   {
    id: "audio-equipmenttttt",
    title: "Programas Profesionales de Mezcla",
    list: [
      "Virtual DJ 8 Full.v",
      "Serato DJ Full.",
      "Traktor DJ 3 Full (Windows 10 y 11 – 64 bits).",
    ],
    Icon: Laptop,
    styles: "lg:row-start-2 md:row-start-3 row-start-5",
  },
  {
    id: "audio-equipmenttt",
    title: "Cursos Online de DJ (100% Gratis)",
    list: [
      "Curso DJ Principiante.",
      "Curso de Virtual DJ & Traktor.",
      "Curso DJ Básico.",
    ],
    Icon: BookText,
    styles: "lg:row-start-2 md:row-start-3 row-start-4",
  },
 
];
export const Bonds = async () => {
  const productBondInfo = (await productBond()) as IProductBond;

  if (
    !productBondInfo.id ||
    !productBondInfo.title ||
    !productBondInfo.description ||
    !productBondInfo.image
  ) {
    return <></>;
  }

  return (
    <div className="grid gap-4 max-w-7xl mx-auto w-full px-4">
      <div className="col-span-1 sm:col-span-2 lg:col-span-4">
        <div className="flex md:flex-row flex-col md:p-8 p-4 bg-blue-100 rounded-sm gap-4">
          <section className="max-w-2xl">
            <img
              src={productBondInfo.image}
              alt={productBondInfo.title}
              className="w-full h-full object-cover"
            />
          </section>

          <section className="flex flex-col justify-center gap-4">
            <h2 className="text-2xl md:text-4xl font-semibold">
              {productBondInfo.title}
            </h2>
            <p className="text-gray-700">{productBondInfo.description}</p>
            <div>
              <button className="bg-blue-300 w-full sm:w-max px-10 py-3 font-medium rounded-full">
                Comprar Ahora
              </button>
            </div>
          </section>
        </div>
      </div>

     {bonds.map((bond) => (
        <div
          key={bond.id}
          className={bond.styles}
        >
          <CardBond bond={bond} />
        </div>
      ))}
    </div>
  );
};

const CardBond = ({ bond }: { bond: typeof bonds[number] }) => {
  const Icon = bond.Icon;
  return (
    <div className="flex flex-col justify-center gap-4 p-4 rounded-sm bg-blue-100">
      <Icon size={24} />

      <h2 className="text-xl font-semibold">
        {bond.title}
      </h2>
      <ul className="list-disc text-gray-700 pl-4">
        {bond.list.map((item, index) => (
          <li key={index}>
            <p className="text-gray-700">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
