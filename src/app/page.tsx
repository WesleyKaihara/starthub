"use client";

import Header from "@/components/Header";

export default async function Home() {
  return (
    <>
      <Header />
      <section className="container mx-auto mt-24">
        <h1 className="text-5xl">Home</h1>
        <p>Empresas que ajudaram no projeto</p>
        <p>Serviços</p>
        <p>Benefícios</p>
        <p>Sobre</p>
      </section>
    </>
  );
}
