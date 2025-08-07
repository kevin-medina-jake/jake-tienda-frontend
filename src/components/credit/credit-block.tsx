"use client";

import { ReactElement } from "react";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import CreditCard from "./credit-card";

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
      <div className="relative h-64 w-full overflow-hidden rounded-xl shadow-lg">
        <Image
          src={image ?? "/not-found.png"}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Descripción */}
      <p className="text-lg leading-relaxed text-gray-800">{description}</p>

      {/* Título de Requisitos */}
      <h3 className="mt-6 text-xl font-semibold text-black">Requisitos</h3>

      {/* Lista de requisitos */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
