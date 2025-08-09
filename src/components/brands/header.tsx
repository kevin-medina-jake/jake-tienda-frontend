export const Header = ({ title }: { title: string }) => {
  return (
    <section className="bg-blue-800">
      <div className="mx-auto w-full max-w-7xl rounded-xs p-4 px-4 pt-16 pb-3">
        <span className="text-lg font-medium text-white">Marcas</span>
        <h1 className="h-12 text-5xl font-medium text-white">
          {title ?? "Sin Categoría"}
        </h1>
      </div>
    </section>
  );
};
