"use client";

import { useEffect, useCallback, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { DiscussionService } from "@/services/DiscussaoService";
import Title from "@/components/Title";
import { Container, Textarea, Button, Box, Flex } from "@chakra-ui/react";
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
  const [userColors, setUserColors] = useState<{ [key: number]: string }>({});
  const { data: session } = useSession();
  const [visibleInteractions, setVisibleInteractions] = useState<number>(3);
  const [validationError, setValidationError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchDiscussion();
    fetchInteractions();
  }, [fetchInteractions, fetchDiscussion]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      signIn();
      return;
    }

    if (newInteraction.length < 10) {
      setValidationError("A interação deve ter pelo menos 10 caracteres.");
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
      setValidationError(null);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserColor = (userId: number) => {
    if (!userColors[userId]) {
      const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
      setUserColors((prevState) => ({
        ...prevState,
        [userId]: color,
      }));
    }
    return userColors[userId];
  };

  const loadMoreInteractions = () => {
    setVisibleInteractions((prev) => prev + 3);
  };

  return (
    <Container maxW="6xl" px={{ base: 6 }} py={10}>
      <OfferCard
        title="Ferramentas StartHub"
        subTitle="Utilize as ferramentas da plataforma para melhorar os resultados de sua startup"
        features={[
          "Inteligência Artificial",
          "Sugestões para seu projeto",
          "Realização de análises",
        ]}
        buttonTxt="Saiba Mais"
        link="/ferramentas"
      />
      {discussao ? (
        <Box mt={10}>
          <Title>{discussao.title}</Title>
          <p className="text-justify">{discussao.context}</p>
          <form onSubmit={handleSubmit} className="mt-4">
            <Textarea
              value={newInteraction}
              onChange={(e) => setNewInteraction(e.target.value)}
              maxLength={750}
              resize="none"
              placeholder="Adicione sua experiência e/ou opinião sobre o tema"
              mb={2}
              h={{ base: "300px", md: "150px"}}
            />
            <Flex justify="flex-end">
              <Button
                type="submit"
                colorScheme="purple"
                disabled={!session}
                mr={2}
              >
                {session ? "Interagir" : "Faça login para interagir"}
              </Button>
            </Flex>
          </form>
          {validationError && (
            <p className="text-red-500 mt-1">{validationError}</p>
          )}
          <Box mt={4}>
            {interactions
              .slice(0, visibleInteractions)
              .map((interaction: any) => (
                <Box
                  key={interaction.id}
                  borderWidth="1px"
                  borderRadius="md"
                  p={4}
                  mb={4}
                  display="flex"
                  alignItems="flex-start"
                >
                  <Box
                    w="10"
                    h="10"
                    borderRadius="full"
                    mr={2}
                    bg={getUserColor(interaction.user.id)}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box color="white">
                      {interaction.user.name.charAt(0).toUpperCase()}
                    </Box>
                  </Box>
                  <Box flex="1">
                    <p>{interaction.message}</p>
                  </Box>
                </Box>
              ))}
          </Box>
          {visibleInteractions < interactions.length && (
            <Button
              onClick={loadMoreInteractions}
              colorScheme="purple"
              fontWeight="bold"
              mt={4}
            >
              Carregar Mais
            </Button>
          )}
        </Box>
      ) : (
        <PulseCards />
      )}
    </Container>
  );
}
