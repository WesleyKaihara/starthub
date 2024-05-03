"use client";

import FullScreenBanner from "@/components/Banners/HomeBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import IconWithText from "@/components/Solutions/SolutionItem";

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
        <div className="container mx-auto flex flex-col lg:flex-row lg:justify-center lg:space-x-16">
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
            text="Inovação é a chama que alimenta o progresso, impulsionando-nos além das  fronteiras do conhecido para explorar o potencial do inexplorado."
          />
          <div className="lg:hidden mt-8"></div>{" "}
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
            text="Ao testarmos nossas ideias, tornamo-nos mais claros sobre o que queremos  alcançar, o que nos dá mais confiança para seguir em frente e alcançar  nossos objetivos."
          />
          <div className="lg:hidden mt-8"></div>{" "}
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
            text="É a chave que abre as portas para novas oportunidades e o combustível  que alimenta o crescimento sustentável, capacitando a startup a  enfrentar os desafios do mercado com confiança e visão."
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
