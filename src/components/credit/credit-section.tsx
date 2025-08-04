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
      buttonLink: "https://crediconveniodigital.bancodebogota.com.co/pg-landing?productName=LibreDestino&accessedFrom=WEB-ALIADO&utm_content=libre_destino&utm_source=aliadosweb&utm_medium=new_url&sarlaft4=true&newcampaign=false&utm_campaign=jake%20tienda%20electronica&shortlinkId=lwjqqbfe&watermelon=MjIsMjMyLDU3LDc5LDMzLDIwOCw4Niw2NiwyNywxNCw4NCwzMywyMzIsMjI5LDk2LDIyOSwxNDcsMTM4LDEwNiwxNzYsMTY3LDI0NCwxOCwyMjksNTcsMTU2LDY1LDE1Myw0OSwxOSw1Myw5OCw3MywyMTcsMjU0LDUzLDE2Miw5NSw4OCwyMzYsNzksMTc0LDU4LDkxLDE1MywyNDcsOTMsNjcsMjQ3LDYyLDIyNCw3NCwyMSwyMjYsMTEsMzMsMTU1LDQsNzEsMSw3NiwyNDAsODgsMjMyLDYsMTc3LDE5MywxNCwxODksNzAsMjIsMTQzLDE1LDE3NCwyMDksNTMsMjEzLDE0LDYsMTkzLDE4MiwxOTQsOCwxNTcsNTYsMTE1LDEwNiw3NCw2Niw3NCwxMzIsMTA0LDEzMSwyMzQsMjQ2LDI0OSwxMzMsMTk0LDE5NSwxMDMsMTgxLDgyLDIzNSwxMTgsMTQ3LDIxNiwxMjUsMjA4LDE2NiwyMjksMSwxMjQsMjUyLDI0MiwxNTMsMTg1LDU2LDI0MSwxOCw3MCwxNDQsMjI2LDIxMSw0MiwxMjIsOTIsNDUsOTksMTk5LDExMCwxNDYsMTE0LDYzLDE1MSwxMDksMTk5LDI1MCwxMiwyMjcsNzgsMTYsMTUwLDEwNCwxNDQsOTIsMjQ1LDIwLDI1NSwyMDIsMTI4LDQ5LDc2LDg1LDI2LDQ1LDIzNCwxMjMsMzcsMTcyLDE2Myw3MCwxMjQsMTY4LDE3MywxODAsMjE4LDI0OCwxMTksMjA4LDExMSwxODIsOCwxMjAsMywyMDUsMTUsNDksMTAzLDI1NCwyMDUsNjUsNjgsNjYsMjI2LDEwOSwyMTMsMSw3MSwxODMsNjQsNDYsMTkwLDE5NywyNDMsMTQ2LDU0LDMzLDEwMiwyMDAsMTg1LDIsMjEsMjM1LDExNiwxNTYsMTUxLDE1NCw2NSwyNTEsMTE1LDExNCwyMzUsMTAzLDE5OCwxMTEsMjEyLDEyNywyMiw4NiwyMSwyMzMsMjM1LDIzNSw4MywxMzcsMjAyLDM4LDExMCwyMzMsNTcsMTExLDIzLDE4NywxMDAsNjYsOTAsMjEwLDQyLDEwMyw5NCwxMzIsMTg0LDExMSwxMTIsMTY4LDI0LDExOCwyNTIsMTMwLDEyMiw5MywyMDAsMTUxLDEwNywyMDAsMTQxLDI0MSwyMDIsMTc1LDE3NiwxNTgsMzUsMTQ0LDIwOCwyMzUsMTk3LDQwLDE3MSwzOSw1MiwxNDUsOTUsNjEsMTk2LDE5MiwxNjUsMjIyLDg0LDE5MCwyMTksMjI2LDI1MSwyMjMsMTg5LDE4NCw2Miw4MCwxMzYsNDksNiw1NSwyMTMsMTExLDIwNSwyMTYsMjQxLDIxNywxNzgsMjE3LDE2NywxMjgsMjE3LDEyOSwyMTgsMywxODUsMTExLDE2NCwxOTQsMTAyLDE3Niw5NywyMTcsMjM5LDEzNywyNTQsMjAxLDE0NSwxNjIsMTAxLDE0MCwxMTMsOTksMTI2LDI1LDE2NCwxMTMsMjUwLDE5NywyNDksOTksMTY2LDIwMSwxNTksMTg0LDE4NCwyMDgsNjYsMTk3LDIyNiwxODIsMzEsMjQ4LDg2LDQwLDIwMCw2OCwzNiwyNTMsMjgsMjE1LDk5LDExNywxOTksNzIsMTQ2LDIwMCwyMiwxODIsODEsNzUsNjcsMTYyLDEyNCwyNDIsMTI0LDM2LDExNCwxNjIsMTYyLDE0NCwxODksNDcsMjIxLDI0NSw2NiwxNzIsMTM5LDIyMSwxNzYsMjA0LDEsMzEsMTIzLDEwOSw1OSwzOSwxMDMsMTg3LDEyOCwxNzIsMTYwLDM0LDIzNiwyMDMsMjE3LDExNSwxNSwxMjksMTMzLDIsMjM3LDIyNCwxMTYsMTI0LDEyNCwzNywyMjMsMTEzLDE4MSwxOTMsMTQyLDIyNiwyMTIsMjE4LDU3LDU2LDIwNiwxMzYsMzIsMTUsMjIzLDE0MywxNTcsMjA0LDE5MiwxMzIsMTIxLDMsMiwxMjAsMTIyLDE5OSw0MywxNjgsOCw1MCwxNTMsMTYwLDMsMjQsOTYsMTM0LDczLDE2MSwxMDYsNDcsMjAzLDQ3LDEwOSwxMCwyMTcsNzIsMjYsMTk3LDE1LDI0Niw5OCwyNiwyNDgsMTcxLDY4LDEzMCwxNzUsMjM2LDIzMSwxNDQsMTU2LDEzMywyMTEsMTQ2LDEzOSw0NSwyNTMsMTk5LDEzNyw4MCw1NCw1MiwyMzIsMzgsMjksNDgsMTAzLDE5OCwyMTIsMTgwLDI0NiwyMDYsMTMxLDIzMCwyMTMsMTk3LDE4NCwyMzYsMjI5LDIzLDI0OSwxOSwyMjEsOTAsMTQxLDEyOCwyMzEsMjMwLDIxOSwxNDcsNjIsNDcsMTA4LDIxNyw0Nyw2NCwxMjMsMTgyLDExNiw4OCwxMjEsMjAyLDE4OSwyNyw2NywyMSwxMjMsNTgsMTE3LDIxLDIyLDI2LDg4LDE0MiwxNDUsMzYsMTkwLDE2LDE1LDIxMCw0MCwxMjYsMjI4LDE3OSwyLDUwLDI4LDY4LDIwMSw4NywyNDMsMjgsMTMyLDIyMiwyNTUsNDMsODcsMjI2LDE2MSw4MywxNDQsMTMsNzQsMTkwLDEwMiwyMDUsNTgsMyw1Nyw3Nyw1NiwxNTEsNzYsODMsNTQsNzYsMjI4LDExMSwyNTAsMjAxLDE1MywyNTAsMTAzLDE4MSw5OSw3OSw1NSw0OSwxNzAsMjQyLDEzOSwxMTMsMTg1LDczLDY5LDExOSwyMTgsMTk2LDgsNjQsMjMxLDEzLDUzLDE3NiwxMTUsMjMyLDI1MCwxMjUsNDIsMjEsMTY0LDYyLDIxNCwxODUsMTkwLDE0NiwxMjAsNjUsMTAxLDE4Nyw4OCwyNTQsMTAwLDE0MCwxNDYsOTMsMTg5LDExOSwyMjYsMjMyLDE5MCwxOTAsMjM1LDYsNzYsMTUsMTA0LDg0LDE4MiwxMzUsMjExLDIyNSwyNTUsOTksMjMxLDIwLDI1MiwxNTIsMzIsNjYsMTI5LDE3LDE4MiwxNzcsNzMsMjM1LDQsOTUsMzgsNzgsNDUsNDksMTQsMjEyLDIxNSwxMzUsMjA4LDM3LDU3LDIzMCw3LDIyMywxNjIsMTA5LDIxMiw5MiwxNDMsMTAyLDUzLDIzMCw3MiwxOTYsMTcsMjM2LDE0NywyMTMsMTY3LDQzLDE1MiwyNDksMTU5LDE4NSw4MywyNDAsMjYsMjI1LDI0NCwxODEsMjI1LDE2Nyw5NywxMzAsMTM2LDQ0LDczLDIyMywxMDksMTc5LDIxNSwyMTAsMTA3LDg0LDE3MSwyMzIsMTE4LDc1LDE1MSwxNjcsMjA5LDE5Nyw1MiwxNDMsMTMyLDE3Niw5NiwxMzUsMTU2LDE1Miw2NiwyMTYsMTY5LDE5MywyMTYsNjUsMTA5LDEyOCwxMDksMjUsMTU2LDk3LDMsMTc2LDY1LDEwMiw2LDY4LDQxLDc4LDEwNyw0OCwyMDIsMTAzLDM4LDIwOSwyMTAsOSwxNiw3Nyw0MywyMzAsMjM1LDExMiwxLDExMywxNjUsMjEsMTA3LDIwMCwzMyw2MiwxMzIsMjM0LDE1OSwyNDksMTMzLDk3LDExMCw4NSwxMiwxNDIsMTc1LDU2LDI0NywxNzgsMTY1LDc3LDc2LDI0OSw5NywxNDAsNTMsMjE4LDQ4LDI0OSwxODIsMTM5LDE0LDE0MQ%3D%3D",
    },
  {
    id: "addi",
    title: "Addi",
    image: addiImg,
    description:
      "Compra ahora y paga después con cuotas cómodas y aprobación rápida.",
    buttonText: "Escríbenos por WhatsApp",
    buttonLink:
      "https://wa.me/573502397570?text=Hola%2C%20quiero%20información%20sobre%20financiación%20con%20Addi",
  },
  {
    id: "gora",
    title: "Gora",
    image: goraImg,
    description:
      "Financiación flexible para clientes sin historial crediticio o reportados.",
    buttonText: "Escríbenos por WhatsApp",
    buttonLink:
      "https://wa.me/573502397570?text=Hola%2C%20quiero%20información%20sobre%20financiación%20con%20Gora",
  },
  {
    id: "brilla",
    title: "Brilla",
    image: brillaImg,
    description:
      "Financia tus compras con tu cupo Brilla... acércate con tu recibo del gas.",
    buttonText: "Escríbenos por WhatsApp",
    buttonLink:
      "https://wa.me/573502397570?text=Hola%2C%20quiero%20información%20sobre%20financiación%20con%20Brilla",
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
