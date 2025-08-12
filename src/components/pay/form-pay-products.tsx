"use client";

import { useState } from "react";

import Image from "next/image";

import {
  useStoreShoppingCart,
  IShoppingCartProduct,
  ICartState,
} from "@/store/shopping-cart";
import { useStore } from "@/hooks/useStore";

interface BuyerInfoFormProps {
  buyerInfo: IBuyerInfo;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BuyerInfoForm: React.FC<BuyerInfoFormProps> = ({
  buyerInfo,
  onChange,
}) => (
  <div className="grid grid-cols-1 gap-y-4">
    <h2 className="text-xl font-medium">Información del Comprador</h2>
    <input
      type="email"
      name="email"
      placeholder="Correo electrónico"
      value={buyerInfo.email}
      onChange={onChange}
      className="rounded-md border p-2"
    />
    <input
      type="text"
      name="firstName"
      placeholder="Primer Nombre"
      value={buyerInfo.firstName}
      onChange={onChange}
      className="rounded-md border p-2"
    />
    <input
      type="text"
      name="lastName"
      placeholder="Primer Apellido"
      value={buyerInfo.lastName}
      onChange={onChange}
      className="rounded-md border p-2"
    />
    <input
      type="text"
      name="address"
      placeholder="Dirección"
      value={buyerInfo.address}
      onChange={onChange}
      className="rounded-md border p-2"
    />
    <input
      type="text"
      name="city"
      placeholder="Ciudad"
      value={buyerInfo.city}
      onChange={onChange}
      className="rounded-md border p-2"
    />
    <input
      type="text"
      name="country"
      placeholder="País"
      value={buyerInfo.country}
      onChange={onChange}
      className="rounded-md border p-2"
    />
    <input
      type="text"
      name="department"
      placeholder="Departamento"
      value={buyerInfo.department}
      onChange={onChange}
      className="rounded-md border p-2"
    />
    <input
      type="text"
      name="document"
      placeholder="Cedula o DNI"
      value={buyerInfo.document}
      onChange={onChange}
      className="rounded-md border p-2"
    />
    <input
      type="tel"
      name="telephone"
      placeholder="Teléfono"
      value={buyerInfo.telephone}
      onChange={onChange}
      className="rounded-md border p-2"
    />
  </div>
);

interface OrderSummaryProps {
  products: IShoppingCartProduct[];
  totalPrice: number;
}

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

interface SubmitButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, disabled }) => (
  <button
    className="mt-6 w-full cursor-pointer rounded-lg bg-blue-800 py-4 text-xl font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
    onClick={onClick}
    disabled={disabled}
  >
    {disabled ? "Procesando..." : "Pagar con PayU"}
  </button>
);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuyerInfo({ ...buyerInfo, [e.target.name]: e.target.value });
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
      // form.action = "https://checkout.payulatam.com/ppp-web-gateway-payu/";
      form.action =
        "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/";

      Object.keys(payuData).forEach((key) => {
        const hiddenField = document.createElement("input");
        hiddenField.type = "hidden";
        hiddenField.name = key;
        hiddenField.value = payuData[key];
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
      <div className="grid gap-8">
        <BuyerInfoForm buyerInfo={buyerInfo} onChange={handleInputChange} />
        <OrderSummary products={productsCart} totalPrice={getTotalPrice()} />
        <SubmitButton onClick={handlePaymentSubmit} disabled={isLoading} />
      </div>
    </div>
  );
};
