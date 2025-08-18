import { Header } from "@/components/collection/header";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pt-6 pb-4 text-black md:flex-row">
        {/* <div className="order-first flex-none md:w-max">
          <Collections />
        </div> */}
        <div className="order-last min-h-screen w-full md:order-none">
          {children}
        </div>
        {/* <div className="order-none flex-none md:order-last md:w-max">
          <FilterList list={sorting} title="Ordenar por" />
        </div> */}
      </div>
    </>
  );
}
