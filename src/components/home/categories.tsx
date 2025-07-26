import Images from "@/assets/home/carrousel/image copy 2.png";

export const Categories = () => {
  return (
    <section className="flex flex-col gap-4 px-4">
      <div>
        <h2 className="text-2xl font-semibold text-center">Categories</h2>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2  gap-4 py-4 ">
        <CardCategory />
        <CardCategory />
        <CardCategory />
        <CardCategory />
      </div>

      <div className="grid place-content-center pb-4">
        <button className="px-10 py-3 bg-blue-100 rounded-full font-medium">
          Ver Todos
        </button>
      </div>
    </section>
  );
};

const CardCategory = () => {
  return (
    <article className="flex flex-col gap-4 bg-gray-100 rounded-sm overflow-hidden">
      <div>
        <img
          src={Images.src}
          alt="Slide 1"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-2">
        <h3 className="text-xl font-semibold">Category</h3>
      </div>

      <div className="px-2 pb-4">
        <button className="bg-blue-200 w-full h-10 font-medium rounded-full">
          Ver Catalogo
        </button>
      </div>
    </article>
  );
};
