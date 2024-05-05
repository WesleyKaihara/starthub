"use client";

import FullScreenBanner from "@/components/Banners/HomeBanner";
import Footer from "@/components/Footer";
import FullWidthContainer from "@/components/FullWidthContainer";
import Header from "@/components/Header";
import HighlightedNumber from '@/components/HighlightedNumber';
import IconWithText from "@/components/Solutions/SolutionItem";
import TitleWithSubtitle from "@/components/Title/TitleWithSubtitle";

export default async function Home() {
  return (
    <>
      <Header />
      <FullScreenBanner>
        <h1 className="text-5xl">Tem uma idéia?</h1>
        <p className="text-3xl mt-5">
          Grandes ideias começam pequenas, mas só crescem com determinação e
          paixão
        </p>
      </FullScreenBanner>
      <section className="container mx-auto my-24">
        <TitleWithSubtitle
          subtitle="NOSSAS SOLUÇÕES"
          title="Atividades e Conhecimentos"
        />
        <div className="container mx-auto mt-10">
          <div className="flex flex-col lg:flex-row justify-center lg:space-x-15">
            <IconWithText
              icon={
                <img
                  src="/luz-acessa.png"
                  alt="Lâmpada Acessa - Inovação"
                  className="w-16 h-16 lg:w-24 lg:h-24"
                />
              }
              borderColor="#FFC700"
              title="Inovação"
              text="Inovação é a chama que alimenta o progresso, impulsionando-nos além das fronteiras do conhecido para explorar o potencial do inexplorado."
            />
            <IconWithText
              icon={
                <img
                  src="/aprovado.png"
                  alt="Aprovado - Validação"
                  className="w-16 h-16 lg:w-24 lg:h-24"
                />
              }
              borderColor="#00CD15"
              title="Validação"
              text="Ao testarmos nossas ideias, tornamo-nos mais claros sobre o que queremos alcançar, o que nos dá mais confiança para seguir em frente e alcançar nossos objetivos."
            />
            <IconWithText
              icon={
                <img
                  src="/cerebro.png"
                  alt="Cérebro - Conhecimento"
                  className="w-16 h-16 lg:w-24 lg:h-24"
                />
              }
              borderColor="#FF208B"
              title="Conhecimento"
              text="É a chave que abre as portas para novas oportunidades e o combustível que alimenta o crescimento sustentável, capacitando a startup a enfrentar os desafios do mercado com confiança e visão."
            />
          </div>
        </div>
      </section>
      <HighlightedNumber
        title="Estatísticas (CB Insights)"
        description="das Startups falham"
        targetNumber={90} 
      />

      <FullWidthContainer
        title="DICA: Aprenda com o Fracasso"
        description="O fracasso faz parte do processo de aprendizado. Em vez de desanimar, use cada falha como uma oportunidade de aprendizado para se tornar mais forte e mais preparado para os desafios futuros."
      />
      <Footer />
    </>
  );
}
