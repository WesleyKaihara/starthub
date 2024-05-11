"use client";

import Title from "@/components/Title";
import { DiscussionService } from "@/services/DiscussaoService";
import { ProjectService } from "@/services/ProjectService";
import Link from "next/link";
import { ReactNode, useEffect, useCallback, useState } from "react";

type Params = {
  projetoId: string;
};

type PageProps = {
  params: Params;
};

export default function Page({ params }: PageProps): ReactNode {
  const [projeto, setProjeto] = useState<any>(null);
  const [discussions, setDiscussions] = useState<any>([]);

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

  const fetchDiscussions = useCallback(async () => {
    try {
      const { data } = await DiscussionService.buscarDiscussoesProjeto(
        +params.projetoId
      );
      setDiscussions(data);
    } catch (error) {
      console.error("Erro ao buscar discussões para do projeto:", error);
    }
  }, [params.projetoId]);

  useEffect(() => {
    fetchProjeto();
    fetchDiscussions();
  }, [fetchProjeto, fetchDiscussions]);

  const truncateContext = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  return (
    <main className="px-4">
      {projeto ? (
        <div>
          <Title>{projeto.name}</Title>
          <p>{projeto.description}</p>
          {discussions.length > 0 ? (
            <section className="mt-10">
              <Title>Discussões</Title>
              <ul>
                {discussions.map((discussion: any) => (
                  <li className='mt-2' key={discussion.id}>
                    <Link href={`/discussao/${discussion.id}`}>
                      <span className="block border rounded-lg py-2 px-4 transition duration-300 ease-in-out hover:bg-gray-200 hover:text-gray-900">
                        <h3 className="text-lg font-semibold mb-2">
                          {discussion.title}
                        </h3>
                        <p className="text-sm">
                          {truncateContext(discussion.context, 300)}
                        </p>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div>Carregando...</div>
      )}
    </main>
  );
}
