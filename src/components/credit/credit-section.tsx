"use client";

import { useEffect, useState, useRef } from "react";
import CreditBlock from "./credit-block";
import { User, Smartphone, XCircle, Clock, MapPin } from "lucide-react";

// Imágenes (reemplaza estas por las definitivas en assets/images)
import bancoBogotaImg from "@/assets/logo/banco-de-bogota.png";
import addiImg from "@/assets/logo/addi.webp";
import goraImg from "@/assets/logo/Gora.png";
import brillaImg from "@/assets/logo/brilla.jpg";

export default function CreditSection() {
  const [activeTitle, setActiveTitle] = useState("Banco de Bogotá");
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  const requisitos = {
    banco: [
      { icon: <User size={28} />, text: "Cédula (foto clara de ambos lados)" },
      { icon: <Smartphone size={28} />, text: "Celular activo y correo personal" },
      { icon: <XCircle size={28} />, text: "Sin reportes en centrales de riesgo" },
      { icon: <Clock size={28} />, text: "Financiación de 12 a 72 cuotas" },
    ],
    addi: [
      { icon: <User size={28} />, text: "Ser mayor de edad" },
      { icon: <Smartphone size={28} />, text: "Número de celular activo" },
      { icon: <Clock size={28} />, text: "Pagos flexibles y aprobación rápida" },
    ],
    gora: [
      { icon: <User size={28} />, text: "Cédula válida" },
      { icon: <Smartphone size={28} />, text: "Correo personal y número activo" },
      { icon: <Clock size={28} />, text: "Opciones para reportados o sin historial" },
    ],
    brilla: [
      { icon: <MapPin size={28} />, text: "Disponible solo para Popayán" },
      { icon: <User size={28} />, text: "Cliente con cupo Brilla activo" },
      { icon: <Clock size={28} />, text: "Cuotas según tu cupo disponible" },
    ],
  };

  const entidades = [
    {
      id: "banco",
      title: "Banco de Bogotá",
      image: bancoBogotaImg,
      description:
        "En Jake Tienda Electrónica te ayudamos a financiar tu compra con Banco de Bogotá. Crédito 100% en línea, seguro y rápido. Si tu crédito es aprobado, enviamos tu pedido a tu ciudad y solo pagas el costo del envío al recibirlo.",
      buttonText: "Solicitar crédito Banco de Bogotá",
      buttonLink: "#",
    },
    {
      id: "addi",
      title: "Addi",
      image: addiImg,
      description:
        "Compra ahora y paga después con cuotas cómodas y aprobación rápida.",
      buttonText: "Solicitar crédito Addi",
      buttonLink: "#",
    },
    {
      id: "gora",
      title: "Gora",
      image: goraImg,
      description:
        "Financiación flexible para clientes sin historial crediticio o reportados.",
      buttonText: "Solicitar crédito Gora",
      buttonLink: "#",
    },
    {
      id: "brilla",
      title: "Brilla",
      image: brillaImg,
      description:
        "Financia tus compras con tu cupo Brilla. Disponible únicamente para clientes de Popayán.",
      buttonText: "Solicitar crédito Brilla",
      buttonLink: "#",
    },
  ];

  // Detectar qué bloque está visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const found = entidades.find(
              (e) => e.id === entry.target.getAttribute("data-id")
            );
            if (found) setActiveTitle(found.title);
          }
        });
      },
      { threshold: 0.6 }
    );

    sectionsRef.current.forEach((sec) => {
      if (sec) observer.observe(sec);
    });

    return () => observer.disconnect();
  }, );

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12 text-black">
      {/* Título principal */}
      <h1 className="text-4xl font-bold text-center text-black mb-20">
        Formas de financiamiento
      </h1>

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Columna izquierda (sticky sin animación, más separada) */}
        <div className="lg:col-span-1">
          <div className="sticky top-40 ml-8">
            <h2 className="text-3xl font-bold text-cyan-600">{activeTitle}</h2>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="lg:col-span-2 flex flex-col space-y-32">
          {entidades.map((entidad, idx) => (
            <div
              key={entidad.id}
              data-id={entidad.id}
              ref={(el) => {
                sectionsRef.current[idx] = el;
              }}
            >
              <CreditBlock
                title={entidad.title}
                image={entidad.image}
                description={entidad.description}
                cards={requisitos[entidad.id as keyof typeof requisitos]}
                buttonText={entidad.buttonText}
                buttonLink={entidad.buttonLink}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
