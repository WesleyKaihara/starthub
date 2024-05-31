"use client";

import CardService from "@/components/Cards/CardService";
import Title from "@/components/Title";

const cardsData = [
  {
    imageUrl: "/logo-starthub.png",
    title: "Rentabilizar ideia",
    description:
      "Receba recomendações de formas para gerar valor com sua ideia",
    href: "/ferramentas/rentabilizar-ideia",
  },
  {
    imageUrl: "/logo-starthub.png",
    title: "Aumentar produtividade",
    description:
      "Levantamento de ferramentas que podem aumentar a produtividade da sua startup",
    href: "/ferramentas/ferramentas-externas",
  },
  {
    imageUrl: "/logo-starthub.png",
    title: "Pense fora da caixa",
    description:
      "Serão geradas ideia para ajudar na desenvolvimento de ideias inovadoras para seu projeto",
    href: "/ferramentas/pensar-fora-da-caixa",
  },
  {
    imageUrl: "/logo-starthub.png",
    title: "Tópicos de Estudo",
    description:
      "Levantamento de informações que podem auxiliar na tomada de decisões do Empreendedor",
    href: "/ferramentas/dados-relevantes",
  },
  {
    imageUrl: "/logo-starthub.png",
    title: "Geração de nomes",
    description:
      "Tenha um nome que represente a sua ideia de maneira clara e marcante",
    href: "/ferramentas/gerar-nomes",
  },
];

export default async function Destaque() {
  return (
    <main>
      <section className="mt-20 px-4 container mx-auto">
        <Title>Nossos Serviços</Title>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cardsData.map((card, index) => (
              <CardService
                key={index}
                imageUrl={card.imageUrl}
                title={card.title}
                description={card.description}
                href={card.href}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
