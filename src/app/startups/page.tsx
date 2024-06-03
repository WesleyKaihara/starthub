"use client";

import { Projeto } from "@/types/Projeto";
import { ProjectService } from "@/services/ProjectService";
import { useEffect, useState, useCallback } from "react";
import CardProjeto from "@/components/CardProjeto";
import Title from "@/components/Title";
import Banner from "@/components/Banner";
import { Container } from "@chakra-ui/react";
import PulseCards from "@/components/Loading/PulseCards";
import OfferCard from '@/components/Cards/OfferCard';

export default function StartupsPage() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProjetos = useCallback(async () => {
    try {
      setLoading(true);
      const { data: projetos } = await ProjectService.listarProjetos();
      setProjetos(projetos);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjetos();
  }, [fetchProjetos]);

  const handleButtonClick = (projetoId: number) => {
    window.location.href = `/startups/${projetoId}`;
  };

  return (
    <Container maxW="6xl" py={5}>
      <OfferCard
        title="Adicionar uma Startup"
        subTitle="Salve as informações da sua startup para usar os serviços da plataforma"
        features={["Análises mais precisas", "Reutilização simplificada"]}
        buttonTxt="Adicionar minha startup"
        link='/startups/cadastro'
      />
      {!loading ? (
        <section className="my-10">
          <Title>Startups</Title>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
            {projetos.length > 0 ? (
              projetos.map((projeto) => (
                <CardProjeto
                  key={projeto.id}
                  imageSrc={projeto.image}
                  title={projeto.name}
                  description={projeto.description}
                  buttonText="Mais detalhes"
                  buttonOnClick={() => handleButtonClick(projeto.id)}
                  cardOnClick={() => handleButtonClick(projeto.id)}
                />
              ))
            ) : (
              <>
                <PulseCards />
                <PulseCards />
                <PulseCards />
                <PulseCards />
              </>
            )}
          </div>
        </section>
      ) : (
        <PulseCards />
      )}
    </Container>
  );
}
