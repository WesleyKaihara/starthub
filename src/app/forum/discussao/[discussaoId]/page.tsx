"use client";

import { useEffect, useCallback, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { DiscussionService } from "@/services/DiscussaoService";
import Title from "@/components/Title";
import { Container } from "@chakra-ui/react";
import PulseCards from "@/components/Loading/PulseCards";
import OfferCard from "@/components/Cards/OfferCard";

type Params = {
  discussaoId: number;
};

type PageProps = {
  params: Params;
};

export default function Page({ params }: PageProps) {
  const [discussao, setDiscussao] = useState<any>(null);
  const [interactions, setInteractions] = useState<any>([]);
  const [newInteraction, setNewInteraction] = useState<string>("");
  const { data: session } = useSession();

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
      setInteractions(data.reverse());
    } catch (error) {
      console.error("Erro ao buscar as interações da discussão:", error);
    }
  }, [params.discussaoId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      signIn();
      return;
    }

    try {
      await DiscussionService.adicionarInteracao(
        Number(params.discussaoId),
        newInteraction,
        Number(session?.user.id)
      );
      setNewInteraction("");
      fetchInteractions();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDiscussion();
    fetchInteractions();
  }, [fetchInteractions, fetchDiscussion]);

  const userColors: { [key: number]: string } = {};

  const getUserColor = (userId: number) => {
    if (!userColors[userId]) {
      userColors[userId] =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
    return userColors[userId];
  };

  return (
    <Container maxW="6xl" px={{ base: 6 }} py={10}>
      <OfferCard
        title="Ferramentas StartHub"
        subTitle="Utilize as ferramentas da plataforma para melhorar os resultados de sua startup"
        features={["Inteligência Artificial", "Sugestões para seu projeto", "Realização de análises"]}
        buttonTxt="Saiba Mais"
        link='/ferramentas'
      />
      {discussao ? (
        <div className="mt-10">
          <Title>{discussao.title}</Title>
          <p>{discussao.context}</p>
          <form
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col sm:flex-row"
          >
            <input
              type="text"
              value={newInteraction}
              onChange={(e) => setNewInteraction(e.target.value)}
              className="w-full border border-gray-300 rounded-t-md sm:rounded-t-none sm:rounded-l-md px-4 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Adicione sua experiência e/ou opinião sobre o tema"
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-b-md sm:rounded-b-none sm:rounded-r-md focus:outline-none whitespace-nowrap"
            >
              {session ? "Interagir" : "Faça login para interagir"}
            </button>
          </form>
          <div className="mt-4">
            {interactions.map((interaction: any) => (
              <div
                key={interaction.id}
                className="border border-gray-200 rounded-md p-4 mb-4 flex items-start"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mr-2"
                  style={{ backgroundColor: getUserColor(interaction.user.id) }}
                >
                  <span className="text-white">
                    {interaction.user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <p>{interaction.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <PulseCards />
      )}
    </Container>
  );
}
