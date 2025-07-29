"use client";

import { ReactElement } from "react";

interface Props {
  icon: ReactElement;
  text: string;
}

export default function CreditCard({ icon, text }: Props) {
  return (
    <div className="flex flex-col items-center justify-center bg-[#1f2433] text-white rounded-xl p-4 shadow-md hover:shadow-lg transition">
      <div className="mb-3">{icon}</div>
      <p className="text-center text-sm font-medium">{text}</p>
    </div>
  );
}
