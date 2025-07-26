import Images from "@/assets/home/bonds/image.png";

export const Bonds = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-4 gap-4 max-w-7xl mx-auto w-full">
      <div className="col-span-4 row-span-2">
        <div className="flex p-8 bg-gray-100 rounded-sm gap-4">
          <section className="max-w-2xl">
            <img src={Images.src} alt="Slide 1" className="w-full h-full" />
          </section>

          <section className="flex flex-col justify-center gap-4">
            <h2 className="text-4xl font-semibold">
              ¡Nuestros bonos son los mejores!
            </h2>
            <p className="text-gray-700">
              Llévate estos bonos gratis al comprar tu controladora DJ
            </p>
            <div>
              <button className="bg-blue-200 px-10 py-3 font-medium rounded-full">
                Comprar Ahora
              </button>
            </div>
          </section>
        </div>
      </div>
      <div className="row-span-2 col-start-2 row-start-3">2</div>
      <div className="row-span-2 col-start-3 row-start-3">3</div>
      <div className="row-span-2 col-start-1 row-start-3">4</div>
      <div className="row-span-2 row-start-3">5</div>
    </div>
  );
};
