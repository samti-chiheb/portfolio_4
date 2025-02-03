import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex h-[75vh] flex-col items-center justify-center px-4">
      <h1 className="mx-auto text-[30vmin] font-black text-slate-200">404</h1>
      <p className="mx-auto text-3xl font-medium text-center text-slate-200">
        {"Oups, nous n'avons pas pu trouver cette page."}
      </p>
      <Link
        href="/"
        className="border-3 mt-8 rounded border-slate-900 bg-slate-50 px-8 py-4 text-2xl font-medium text-slate-900"
      >
        {"Retourner à l'accueil"}
      </Link>
    </div>
  );
}
