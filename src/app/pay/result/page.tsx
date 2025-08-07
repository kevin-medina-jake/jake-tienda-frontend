"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Circle, CircleCheckIcon } from "lucide-react";

function ResponseContent() {
  const searchParams = useSearchParams();

  const transactionState = searchParams.get("transactionState");
  const referenceCode = searchParams.get("referenceCode");
  const tx_value = searchParams.get("TX_VALUE");

  let statusTitle = "";
  let statusMessage = "";
  let statusColor = "text-gray-800";

  switch (transactionState) {
    case "4":
      statusTitle = "¡Pago Aprobado!";
      statusMessage =
        "Gracias por tu compra. Hemos recibido tu pago y tu pedido está siendo procesado. Recibirás una confirmación por correo electrónico en breve.";
      statusColor = "text-green-600";
      break;
    case "6":
      statusTitle = "Pago Rechazado";
      statusMessage =
        "Lamentablemente, tu pago ha sido rechazado. Por favor, intenta con otro medio de pago o contacta a tu banco para más información.";
      statusColor = "text-red-600";
      break;
    case "7":
      statusTitle = "Pago Pendiente";
      statusMessage =
        "Tu pago está pendiente de confirmación por parte de la entidad financiera. Te notificaremos por correo electrónico cuando el estado cambie.";
      statusColor = "text-orange-500";
      break;
    case "5":
      statusTitle = "Transacción Expirada";
      statusMessage =
        "El tiempo para completar el pago ha expirado. Por favor, intenta realizar la compra de nuevo.";
      statusColor = "text-red-600";
      break;
    default:
      statusTitle = "Estado de la Transacción Desconocido";
      statusMessage =
        "Estamos procesando la respuesta de tu transacción. Si tienes alguna duda, contacta a nuestro soporte.";
      break;
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col gap-10 px-4">
      <section className="flex flex-wrap items-center justify-evenly gap-2 pt-12 text-lg">
        <div className="flex items-center justify-center gap-2 whitespace-nowrap text-gray-500">
          <Circle size={24} />
          <p>Finalizar Compra</p>
        </div>

        <div className="flex items-center justify-center gap-2 whitespace-nowrap text-blue-500">
          <CircleCheckIcon size={24} />
          <p>Resultado de la compra</p>
        </div>
      </section>

      <div className="flex h-[50vh] flex-col items-center justify-center text-center">
        <div className="w-full max-w-xl rounded-xl bg-white">
          <h1 className={`mb-4 text-2xl font-bold sm:text-4xl ${statusColor}`}>
            {statusTitle}
          </h1>
          <p className="mb-2 text-lg text-gray-700">
            Referencia de tu pedido:{" "}
            <strong className="font-mono">{referenceCode}</strong>
          </p>
          {tx_value && (
            <p className="mb-6 text-lg text-gray-700">
              Monto:{" "}
              <strong className="font-mono">
                ${parseFloat(tx_value).toLocaleString("es-CO")}
              </strong>
            </p>
          )}
          <p className="mb-8 text-gray-600">{statusMessage}</p>
          <Link
            href="/"
            className="inline-block rounded-lg bg-blue-800 px-8 py-3 font-bold text-white transition-colors hover:bg-blue-700"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PayResponsePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Cargando resultado...
        </div>
      }
    >
      <ResponseContent />
    </Suspense>
  );
}
