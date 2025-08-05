// import { Circle, CircleCheckIcon } from "lucide-react";

// export default function Page() {
//   return (
//     <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-10 px-4">
//       <section className="flex items-center justify-evenly pt-12 text-lg">
//         <div className="flex items-center justify-center gap-2 text-gray-500">
//           <Circle size={24} />
//           <p>Finalizar Compra</p>
//         </div>

//         <div className="flex items-center justify-center gap-2 text-blue-500">
//           <CircleCheckIcon size={24} />
//           <p>Resultado de la compra</p>
//         </div>
//       </section>

//       <section className="grid grid-cols-2 gap-8">
//         {/* <FormPayProducts /> */}

//         {/* <InfoShoppingCart /> */}
//       </section>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStoreShoppingCart } from "@/store/shopping-cart";

export default function PayResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearShoppingCart: clearCart } = useStoreShoppingCart();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  useEffect(() => {
    // Parámetros que envía PayU
    const txState = searchParams.get("transactionState");
    const reference = searchParams.get("referenceCode");

    // 4 = Aprobado en sandbox
    if (txState === "4") {
      clearCart(); // vacía el carrito
      setStatus("success");
    } else {
      setStatus("error");
    }
  }, [searchParams, clearCart]);

  if (status === "loading") return <p>Verificando pago…</p>;
  if (status === "success")
    return (
      <div>
        <h1>¡Pago exitoso!</h1>
        <button onClick={() => router.push("/")}>Seguir comprando</button>
      </div>
    );

  return (
    <div>
      <h1>Pago no completado</h1>
      <button onClick={() => router.push("/pay/process")}>Reintentar</button>
    </div>
  );
}
