"use client";

import Title from "@/components/Title";
import { ProjectService } from "@/services/projectService";
import { ReactNode, useEffect, useCallback, useState } from "react";

type Params = {
  projetoId: string;
};

type PageProps = {
  params: Params;
};

export default function Page({ params }: PageProps): ReactNode {
  const [projeto, setProjeto] = useState<any>(null);

  const fetchProjeto = useCallback(async () => {
    try {
      const { data } = await ProjectService.buscarProjetoPorId(
        +params.projetoId
      );
      setProjeto(data);
    } catch (error) {
      console.error("Erro ao buscar o projeto:", error);
    }
  }, [params.projetoId]);

  useEffect(() => {
    fetchProjeto();
  }, [fetchProjeto]);

  return (
    <>
      {projeto ? (
        <div>
          <Title>{projeto.name}</Title>
          <p>{projeto.description}</p>
          <section className='mt-10'>
            <Title>Discussões</Title>
          </section>
        </div>
      ) : (
        <div>Carregando...</div>
      )}
    </>
  );
}
