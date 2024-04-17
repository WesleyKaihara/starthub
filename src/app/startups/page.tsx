"use client";

import { Projeto } from "@/types/Projeto";
import { ProjectService } from "@/services/projectService";
import { useEffect, useState, useCallback } from "react";
import CardProjeto from "@/components/CardProjeto";
import Title from '@/components/Title';

export default function StartupsPage() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);

  const fetchProjetos = useCallback(async () => {
    try {
      const { data: projetos } = await ProjectService.listarProjetos();
      setProjetos(projetos);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    }
  }, []);

  useEffect(() => {
    fetchProjetos();
  }, [fetchProjetos]);

  const handleButtonClick = (projetoId: number) => {
    window.location.href = `/startups/${projetoId}`;
  };

  return (
    <section className="container mx-auto p-6 mt-12">      <Title>Em destaque</Title>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {projetos.length > 0 ? (
          projetos.map((projeto) => (
            <CardProjeto
              key={projeto.id}
              imageSrc="https://via.placeholder.com/300"
              title={projeto.name}
              description={projeto.description}
              buttonText="Mais detalhes"
              buttonOnClick={() => handleButtonClick(projeto.id)}
            />
          ))
        ) : (
          <p>Nenhum projeto encontrado.</p>
        )}
      </div>
    </section>
  );
}
