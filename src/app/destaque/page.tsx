"use client";

import FullWidthContainer from "@/components/FullWidthContainer";
import ImageContent from "@/components/ImageContent";
import ServiceCard from "@/components/ServiceCard";
import TitleWithSubtitle from "@/components/Title/TitleWithSubtitle";

export default async function Destaque() {
  return (
    <main>
      <section className="flex justify-center mb-16 px-4">
        <div className="container mx-20">
          <ImageContent imageUrl="startup_banner.jpg">
            <TitleWithSubtitle
              subtitle="NOSSOS SERVIÇOS"
              title="Atividades e Conhecimentos"
            />
          </ImageContent>
        </div>
      </section>
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
              title="Sugestões de Ferramentas"
              description="Receba recomendações especializadas para impulsionar o desenvolvimento, marketing, finanças e muito mais. Economize tempo e recursos, concentrando-se nas soluções certas para o crescimento do seu negócio."
              features={[
                "Inteligência Artificial",
                "Economia de Tempo",
                "Maior Assertividade",
              ]}
              serviceName='sugestao-ferramentas'
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
    </main>
  );
}
