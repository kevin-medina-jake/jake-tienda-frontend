import Images from "@/assets/home/bonds/image.png";
import { Music } from "lucide-react";

export const Bonds = () => {
  return (
    <div className="grid gap-4 max-w-7xl mx-auto w-full px-4">
      <div className="col-span-1 sm:col-span-2 lg:col-span-4">
        <div className="flex md:flex-row flex-col md:p-8 p-4 bg-blue-100 rounded-sm gap-4">
          <section className="max-w-2xl">
            <img
              src={Images.src}
              alt="Slide 1"
              className="w-full h-full object-cover"
            />
          </section>

          <section className="flex flex-col justify-center gap-4">
            <h2 className="text-2xl md:text-4xl font-semibold">
              ¡Nuestros bonos son los mejores!
            </h2>
            <p className="text-gray-700">
              Llévate estos bonos gratis al comprar tu controladora DJ
            </p>
            <div>
              <button className="bg-blue-300 w-full sm:w-max px-10 py-3 font-medium rounded-full">
                Comprar Ahora
              </button>
            </div>
          </section>
        </div>
      </div>
      <div className="row-start-2">
        <CardBond />
      </div>
      <div className="sm:row-start-2 row-start-3">
        <CardBond />
      </div>
      <div className="lg:row-start-2 md:row-start-3 row-start-4">
        <CardBond />
      </div>
      <div className="lg:row-start-2 md:row-start-3 row-start-5">
        <CardBond />
      </div>
    </div>
  );
};

const CardBond = () => {
  return (
    <div className="flex flex-col justify-center gap-4 p-4 rounded-sm bg-blue-100">
      <Music size={24} />

      <h2 className="text-xl font-semibold">
        Música + Video DJ (Pack Full Combo)
      </h2>
      <ul className="list-disc text-gray-700 pl-4">
        <li>
          <p className="text-gray-700">
            Llévate estos bonos gratis al comprar tu controladora DJ
          </p>
        </li>
        <li>
          <p className="text-gray-700">
            Llévate estos bonos gratis al comprar tu controladora DJ
          </p>
        </li>
        <li>
          <p className="text-gray-700">
            Llévate estos bonos gratis al comprar tu controladora DJ
          </p>
        </li>
      </ul>
    </div>
  );
};
