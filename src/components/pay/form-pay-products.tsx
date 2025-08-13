"use client";

import { useState } from "react";
import Image from "next/image";

import {
  useStoreShoppingCart,
  IShoppingCartProduct,
  ICartState,
} from "@/store/shopping-cart";
import { useStore } from "@/hooks/useStore";

import { DEPARTMENTS, getCitiesByDepartment } from "@/data/colombia";

interface BuyerInfoFormProps {
  buyerInfo: IBuyerInfo;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onDepartmentChange: (dept: string) => void;
}

interface OrderSummaryProps {
  products: IShoppingCartProduct[];
  totalPrice: number;
}

interface SubmitButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export interface IBuyerInfo {
  email: string;
  firstName: string;
  lastName: string;
  city: string;
  address: string;
  country: string;
  department: string;
  telephone: string;
  document: string;
}

const Label = ({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) => (
  <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
    {children}
  </label>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={[
      "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm",
      "focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none",
      props.className ?? "",
    ].join(" ")}
  />
);

const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    {...props}
    className={[
      "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm",
      "focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none",
      props.className ?? "",
    ].join(" ")}
  />
);

const BuyerInfoForm: React.FC<BuyerInfoFormProps> = ({
  buyerInfo,
  onChange,
  onDepartmentChange,
}) => {
  const cities = buyerInfo.department
    ? getCitiesByDepartment(buyerInfo.department)
    : [];

  return (
    <div className="">
      <h2 className="mb-4 text-xl font-medium">Información del Comprador</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="col-span-1">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={buyerInfo.email}
            onChange={onChange}
            autoComplete="email"
            placeholder="tucorreo@gmail.com"
            required
          />
        </div>

        <div className="col-span-1">
          <Label htmlFor="document">Cédula o DNI</Label>
          <Input
            id="document"
            name="document"
            inputMode="numeric"
            pattern="[0-9]*"
            value={buyerInfo.document}
            onChange={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(
                /[^\d]/g,
                "",
              );
              onChange(e);
            }}
            placeholder="1030********"
            required
          />
        </div>

        <div className="col-span-1">
          <Label htmlFor="firstName">Primer Nombre</Label>
          <Input
            id="firstName"
            name="firstName"
            value={buyerInfo.firstName}
            onChange={onChange}
            autoComplete="given-name"
            placeholder="Mig..."
            required
          />
        </div>

        <div className="col-span-1">
          <Label htmlFor="lastName">Primer Apellido</Label>
          <Input
            id="lastName"
            name="lastName"
            value={buyerInfo.lastName}
            onChange={onChange}
            autoComplete="family-name"
            placeholder="Alv..."
            required
          />
        </div>

        <div className="col-span-1 text-gray-500">
          <span className="text-sm">País</span>
          <Input
            id="country"
            disabled
            aria-disabled="true"
            name="country"
            value="Colombia"
            required
          />
        </div>

        <div className="col-span-1">
          <Label htmlFor="department">Departamento</Label>
          <Select
            id="department"
            name="department"
            value={buyerInfo.department}
            onChange={(e) => {
              onDepartmentChange(e.target.value); // limpia city
              onChange(e); // mantiene tu handler genérico
            }}
            required
          >
            <option value="" disabled>
              Selecciona un departamento
            </option>
            {DEPARTMENTS.map((dpt) => (
              <option key={dpt} value={dpt}>
                {dpt}
              </option>
            ))}
          </Select>
        </div>

        <div className="col-span-1">
          <Label htmlFor="city">Municipio / Ciudad</Label>
          <Select
            id="city"
            name="city"
            value={buyerInfo.city}
            onChange={onChange}
            disabled={!buyerInfo.department || cities.length === 0}
            required
          >
            {!buyerInfo.department ? (
              <option value="">Selecciona primero un departamento</option>
            ) : cities.length > 0 ? (
              <>
                <option value="" disabled>
                  Selecciona un municipio
                </option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </>
            ) : (
              <option value="">Sin municipios para este departamento</option>
            )}
          </Select>
        </div>

        <div className="col-span-1">
          <Label htmlFor="telephone">Teléfono</Label>
          <Input
            id="telephone"
            name="telephone"
            inputMode="tel"
            pattern="[0-9]*"
            value={buyerInfo.telephone}
            onChange={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(
                /[^\d]/g,
                "",
              );
              onChange(e);
            }}
            placeholder="3001234567"
            autoComplete="tel"
            required
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <Label htmlFor="address">Dirección</Label>
          <Input
            id="address"
            name="address"
            value={buyerInfo.address}
            onChange={onChange}
            autoComplete="shipping address-line1"
            placeholder="Ej: Calle 12 # 34 - 56, Apto 301"
            required
          />
        </div>
      </div>
    </div>
  );
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
  products,
  totalPrice,
}) => (
  <div>
    <h2 className="pb-4 text-xl font-medium">Resumen del pedido</h2>
    <ul>
      {products.map((product) => (
        <li
          key={product.id}
          className="flex items-center gap-4 border-b border-gray-200 py-4"
        >
          <Image
            src={product.image ?? "/not-found.png"}
            alt={product.name}
            width={70}
            height={70}
            className="rounded-md object-cover"
          />
          <section className="flex w-full items-start justify-between gap-4">
            <div>
              <p className="text-lg font-medium">{product.name}</p>
              <p className="text-gray-600">Cantidad: {product.quantity}</p>
            </div>
            <p className="text-lg font-medium">
              ${(product.price * product.quantity).toLocaleString("es-CO")}
            </p>
          </section>
        </li>
      ))}
    </ul>
    <div className="mt-4 flex justify-between pt-4">
      <p className="text-xl font-medium">Total</p>
      <p className="text-xl font-bold">${totalPrice.toLocaleString("es-CO")}</p>
    </div>
  </div>
);

/* =========================
   Botón de pago (igual)
========================= */
const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, disabled }) => (
  <button
    className="mt-6 w-full cursor-pointer rounded-lg bg-blue-800 py-4 text-xl font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
    onClick={onClick}
    disabled={disabled}
  >
    {disabled ? "Procesando..." : "Pagar con PayU"}
  </button>
);

export const FormPayProducts = () => {
  const [buyerInfo, setBuyerInfo] = useState<IBuyerInfo>({
    email: "jmalvarez@unimayor.edu.co",
    firstName: "Johan",
    lastName: "Alvarez",
    city: "Popayán",
    address: "Bosques de la Sierra",
    country: "Colombia",
    department: "Cauca",
    document: "123456789",
    telephone: "123456789",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { products, getTotalPrice } = useStoreShoppingCart();

  // Acepta <input> y <select>
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setBuyerInfo({ ...buyerInfo, [e.target.name]: e.target.value });
  };

  // Limpia 'city' cuando cambia el dpto
  const handleDepartmentChange = (dept: string) => {
    setBuyerInfo((prev) => ({ ...prev, department: dept, city: "" }));
  };

  const handlePaymentSubmit = async () => {
    if (products.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch("/api/payu/initiate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products, buyerInfo }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "No se pudo preparar el pago.");
      }

      const payuData = await response.json();

      const form = document.createElement("form");
      form.method = "POST";
      // form.action = "https://checkout.payulatam.com/ppp-web-gateway-payu/"; // Producción
      form.action =
        "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/"; // Sandbox

      Object.keys(payuData).forEach((key) => {
        const hiddenField = document.createElement("input");
        hiddenField.type = "hidden";
        hiddenField.name = key;
        hiddenField.value = (payuData as Record<string, string>)[key];
        form.appendChild(hiddenField);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error: any) {
      alert(`Error: ${error.message}`);
      setIsLoading(false);
    }
  };

  const cartStore = useStore<ICartState, ICartState>(
    useStoreShoppingCart,
    (state: ICartState) => state,
  );

  if (!cartStore) return null;

  const { products: productsCart } = cartStore;

  return (
    <div className="w-full p-4">
      <div className="grid gap-8 pb-8">
        <BuyerInfoForm
          buyerInfo={buyerInfo}
          onChange={handleInputChange}
          onDepartmentChange={handleDepartmentChange}
        />
        <OrderSummary products={productsCart} totalPrice={getTotalPrice()} />
        <SubmitButton onClick={handlePaymentSubmit} disabled={isLoading} />
      </div>
    </div>
  );
};
