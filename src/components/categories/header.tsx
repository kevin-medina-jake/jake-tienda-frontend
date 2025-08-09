export const Header = ({ title, name }: { title: string; name: string }) => {
  return (
    <section className="bg-gradient-to-r from-blue-800 to-blue-500">
      <div className="mx-auto w-full max-w-7xl rounded-xs p-4 px-4 pt-16 pb-3">
        <span className="text-sm font-medium text-white sm:text-lg">
          {name}
        </span>
        <h1 className="h-12 text-2xl font-medium text-white sm:text-5xl">
          {title ?? "Sin Categoría"}
        </h1>
      </div>
    </section>
  );
};
