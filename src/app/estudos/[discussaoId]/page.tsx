"use client";

import Title from "@/components/Title";
import { DiscussionService } from "@/services/DiscussaoService";
import { ReactNode, useEffect, useCallback, useState } from "react";

type Params = {
  discussaoId: number;
};

type PageProps = {
  params: Params;
};

export default function Page({ params }: PageProps): ReactNode {
  const [discussao, setDiscussao] = useState<any>(null);
  const [interactions, setInteractions] = useState<any>([]);
  const [newInteraction, setNewInteraction] = useState<string>("");

  const fetchDiscussion = useCallback(async () => {
    try {
      const { data } = await DiscussionService.buscarDiscussaoPorId(
        +params.discussaoId
      );
      setDiscussao(data);
    } catch (error) {
      console.error("Erro ao buscar a discussão:", error);
    }
  }, [params.discussaoId]);

  const fetchInteractions = useCallback(async () => {
    try {
      const { data } = await DiscussionService.buscarInteracoesDiscussao(
        +params.discussaoId
      );
      setInteractions(data);
    } catch (error) {
      console.error("Erro ao buscar as interações da discussão:", error);
    }
  }, [params.discussaoId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    fetchDiscussion();
    fetchInteractions();
  }, [fetchInteractions, fetchDiscussion]);

  return (
    <>
      {discussao ? (
        <div>
          <Title>{discussao.title}</Title>
          <p>{discussao.context}</p>
          <form onSubmit={handleSubmit} className="mt-4 flex">
            <input
              type="text"
              value={newInteraction}
              onChange={(e) => setNewInteraction(e.target.value)}
              className="w-full border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Adicione sua experiência e/ou opnião sobre o tema"
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-r-md focus:outline-none"
            >
              Interagir
            </button>
          </form>
          <div className="mt-4">
            {interactions.map((interaction: any) => (
              <div
                key={interaction.id}
                className="border border-gray-200 rounded-md p-4 mb-4"
              >
                <p>{interaction.message}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Carregando...</div>
      )}
    </>
  );
}
