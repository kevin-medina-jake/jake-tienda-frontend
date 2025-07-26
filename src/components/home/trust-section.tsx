import { Car } from "lucide-react";

export const TrustSection = () => {
  return (
    <section className="flex items-center w-full flex-wrap justify-between min-h-40">
      <div className="flex gap-4 items-center p-4 w-max">
        <section>
          <Car size={50} />
        </section>

        <section>
          <h2 className="text-xl font-bold">Trust</h2>
          <p className="text-gray-600">lorem ipsum dolor sit consectetur.</p>
        </section>
      </div>

      <div className="flex gap-4 items-center p-4 w-max">
        <section>
          <Car size={50} />
        </section>

        <section>
          <h2 className="text-xl font-bold">Trust</h2>
          <p className="text-gray-600">lorem ipsum dolor.</p>
        </section>
      </div>

      <div className="flex gap-4 items-center p-4 w-max">
        <section>
          <Car size={50} />
        </section>

        <section>
          <h2 className="text-xl font-bold">Trust</h2>
          <p className="text-gray-600">lorem ipsum consectetur.</p>
        </section>
      </div>

      <div className="flex gap-4 items-center p-4 w-max">
        <section>
          <Car size={50} />
        </section>

        <section>
          <h2 className="text-xl font-bold">Trust</h2>
          <p className="text-gray-600">lorem ipsum dolor sit consectetur.</p>
        </section>
      </div>
    </section>
  );
};
