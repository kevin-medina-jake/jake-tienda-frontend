"use client";

import Image, { StaticImageData } from "next/image";
import CreditCard from "./credit-card";
import { ReactElement } from "react";

interface Props {
  title: string;
  image: StaticImageData;
  description: string;
  cards: { icon: ReactElement; text: string }[];
  buttonText: string;
  buttonLink: string;
}

export default function CreditBlock({
  title,
  image,
  description,
  cards,
  buttonText,
  buttonLink,
}: Props) {
  return (
    <section className="space-y-6">
      {/* Imagen */}
      <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg">
        <Image
          src={image ?? "/not-found.png"}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Descripción */}
      <p className="text-gray-800 text-lg leading-relaxed">{description}</p>

      {/* Título de Requisitos */}
      <h3 className="text-xl font-semibold text-black mt-6">Requisitos</h3>

      {/* Lista de requisitos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, idx) => (
          <CreditCard key={idx} icon={card.icon} text={card.text} />
        ))}
      </div>

      {/* Botón */}
      <div className="flex justify-center mt-6">
        <a
          href={buttonLink}
          className="bg-green-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          {buttonText}
        </a>
      </div>
    </section>
  );
}
