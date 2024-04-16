"use client";
import { Projeto } from '@/types/Projeto';
import { ProjectService } from "@/services/projectService";
import { useEffect, useState, useCallback } from "react";

export default function StartupsPage() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);

  const fetchProjetos = useCallback(async () => {
    try {
      const { data: projetos } = await ProjectService.listarProjetos();
      console.log(projetos)
      setProjetos(projetos);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    }
  }, []);

  useEffect(() => {
    fetchProjetos();
  }, [fetchProjetos]);

  return (
    <section className="flex flex-col gap-6">
      <h1>Startups</h1>
      {projetos.length > 0 ? (
        <ul>
          {projetos.map((projeto) => (
            <li key={projeto.id}>{projeto.name}</li>
          ))}
        </ul>
      ) : (
        <p>Nenhum projeto encontrado.</p>
      )}
    </section>
  );
}
