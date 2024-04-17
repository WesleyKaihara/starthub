"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function PerfilPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });

  <section className="container mx-auto mt-24">
    <h1 className="text-5xl">Perfil</h1>
  </section>;
}
