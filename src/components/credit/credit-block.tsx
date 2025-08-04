"use client";

import Image, { StaticImageData } from "next/image";
import CreditCard from "./credit-card";
import { ReactElement } from "react";
import Link from "next/link";

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
      <div className="mt-4 flex justify-center">
     <Link
        href={buttonLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block"
      >
        <button className="rounded bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700">
          {buttonText}
        </button>
      </Link>
      </div>
    </section>
  );
}
