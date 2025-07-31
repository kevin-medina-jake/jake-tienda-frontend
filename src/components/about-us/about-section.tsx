"use client";

import Image from "next/image";
import bannerImg from "@/assets/images/fondo 4.jpg";
import founderImg from "@/assets/images/github.jpg";

export default function AboutSection() {
  return (
    <div className="flex flex-col space-y-16">
      {/* Banner principal - Corregido para usar 'fill' */}
      <div className="relative w-full h-64 md:h-96 hidden md:block overflow-hidden">
        <Image
          src={bannerImg ?? "/not-found.png"}
          alt="Jake Tienda Electrónica"
          fill
          className="object-cover h-auto"
        />
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col space-y-16 px-6 lg:px-20 py-16 max-w-7xl mx-auto">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div
            className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-md"
            style={{
              WebkitMaskImage:
                "radial-gradient(circle at center, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 80%)",
              maskImage:
                "radial-gradient(circle at center, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 80%)",
              animation: "pulseFadeIn 1.5s ease-out forwards",
            }}
          >
            <Image
              src={founderImg ?? "/not-found.png"}
              alt="Fundador de Jake"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover scale-105 h-auto"
            />
            <style jsx>{`
              @keyframes pulseFadeIn {
                0% {
                  opacity: 0;
                  transform: scale(0.95);
                }
                50% {
                  opacity: 1;
                  transform: scale(1.02);
                }
                100% {
                  opacity: 1;
                  transform: scale(1);
                }
              }
            `}</style>
          </div>
          <div className="flex flex-col justify-center text-center lg:text-left">
            <h2 className="text-4xl font-bold text-gray-900">Jake De Dios</h2>
            <p className="mt-2 text-gray-500 text-lg">Fundador</p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              En Jake, somos apasionados por el sonido y la tecnología. Desde
              nuestra sede en Popayán, hemos ayudado durante años a DJs,
              músicos, negocios y amantes del audio a encontrar el equipo
              perfecto para llevar su música e ideas al siguiente nivel.
            </p>
          </div>
        </section>

        {/* Ubicación con mapa */}
        <section className="flex flex-col space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Nuestra Ubicación
          </h2>
          <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.587848039343!2d-76.60877962590218!3d2.441957256997495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e300305377f724b%3A0x63424d553b655517!2sCl.%206%20%2310-9%2C%20Comuna%205%2C%20Popay%C3%A1n%2C%20Cauca!5e0!3m2!1ses-419!2sco!4v1722459032607!5m2!1ses-419!2sco"
              width="100%"
              height="100%"
              loading="lazy"
              className="border-0"
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-center text-gray-600 text-lg">
            Dirección: <strong>Calle 6 #10-09, Centro de Popayán</strong>
          </p>
        </section>

        {/* Misión y Visión */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-md rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-black mb-4">Misión</h3>
            <p className="text-gray-600">
              Ayudar a nuestros clientes a llevar su música e ideas al siguiente
              nivel, ofreciendo equipos de calidad, asesoría profesional y
              opciones de financiamiento accesibles.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-black mb-4">Visión</h3>
            <p className="text-gray-600">
              Ser la tienda de sonido y tecnología más confiable en Colombia,
              reconocida por la calidad de nuestros productos, servicio y
              soporte para cada cliente.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
