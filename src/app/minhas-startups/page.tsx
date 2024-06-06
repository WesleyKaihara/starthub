"use client";

import DefaultCard from "@/components/Cards/DefaultCard";
import OfferCard from "@/components/Cards/OfferCard";
import Title from "@/components/Title";
import { Container } from "@chakra-ui/react";

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
    <Container maxW="6xl" py={5}>
      <OfferCard
        title="Ferramentas StartHub"
        subTitle="Utilize as ferramentas da plataforma para melhorar os resultados de sua startup"
        features={[
          "Inteligência Artificial",
          "Sugestões para seu projeto",
          "Realização de análises",
        ]}
        buttonTxt="Saiba Mais"
        link="/ferramentas"
      />
      <section className="mt-10">
        <Title>Minhas Startups</Title>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {cardsData.map((card, index) => (
            <DefaultCard
              key={index}
              imageUrl={card.imageUrl}
              title={card.title}
              description={card.description}
              href={card.href}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}
