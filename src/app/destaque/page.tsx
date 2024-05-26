"use client";

import CardService from "@/components/Cards/CardService";
import FullWidthContainer from "@/components/FullWidthContainer";
import ServiceCard from "@/components/ServiceCard";
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
      <FullWidthContainer
        title="DICA: Esteja Aberto ao Feedback"
        description="Feedback é uma ferramenta valiosa para o crescimento de sua startup. Esteja aberto a receber críticas construtivas de clientes, mentores, investidores e outros stakeholders. Use esse feedback para iterar e melhorar continuamente seu produto ou serviço, adaptando-se às necessidades do mercado."
      />
      <section className="mt-20 px-4">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl mb-4">
            Serviços
          </h1>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl font-bold mb-8">
            em Destaque
          </h2>
          <p className="text-center max-w-lg text-lg mb-8">
            Crie seu próprio caminho na tecnologia com o StartHub. Suas ideias
            podem se tornar realidade: desenvolva soluções para transformar o
            mundo.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-screen-lg">
            <ServiceCard
              title="Dados relevantes para a ideia"
              description="Receba recomendações de tópicos que podem ser importantes para o sucesso do seu negócio, com a reflexão sobre os pontos apresentados sua visão sobre a empresa pode mudar"
              features={[
                "Inteligência Artificial",
                "Maior Assertividade",
                "Reflexão",
              ]}
              serviceName="dados-relevantes"
            />
            <ServiceCard
              title="Geração de Nomes"
              description="Receba recomendações especializadas para impulsionar o desenvolvimento, marketing, finanças e muito mais. Economize tempo e recursos, concentrando-se nas soluções certas para o crescimento do seu negócio."
              features={["Maior relevância", "Criatividade"]}
              serviceName="gerar-nomes"
            />
          </div>
        </div>
      </section>
      <FullWidthContainer
        title="DICA: Esteja Aberto ao Feedback"
        description="Feedback é uma ferramenta valiosa para o crescimento de sua startup. Esteja aberto a receber críticas construtivas de clientes, mentores, investidores e outros stakeholders. Use esse feedback para iterar e melhorar continuamente seu produto ou serviço, adaptando-se às necessidades do mercado."
      />
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
