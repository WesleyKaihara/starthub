"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function PerfilPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });

  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.href = "/";
  };

  return (
    <section className="container mx-auto mt-24">
      <h1 className="text-5xl">Perfil</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Sair
      </button>
    </section>
  );
}
