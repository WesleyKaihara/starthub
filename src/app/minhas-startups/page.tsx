"use client";

import OfferCard from "@/components/Cards/OfferCard";
import Title from "@/components/Title";
import { Container, useToast, Button, Box, SimpleGrid } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { Projeto } from "@/types/Projeto";
import { ProjectService } from "@/services/ProjectService";
import { useSession } from "next-auth/react";
import CardProjeto from "@/components/CardProjeto";
import PulseCards from "@/components/Loading/PulseCards";

export default function MinhasStartups() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = "/login?callbackUrl=/minhas-startups";
    },
  });

  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const toast = useToast();

  const fetchProjects = useCallback(
    async (userId: number) => {
      try {
        const { data } = await ProjectService.buscarProjetosUsuario(userId);
        setProjetos(data);
      } catch (error: any) {
        toast({
          title: "Erro ao buscar projetos do usuário.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  useEffect(() => {
    if (session?.user.id) {
      fetchProjects(Number(session.user.id));
    }
  }, [fetchProjects, session?.user.id]);

  const handleButtonClick = (projetoId: number) => {
    window.location.href = `/startups/${projetoId}`;
  };

  const handleCreateStartup = () => {
    window.location.href = "/startups/cadastro";
  };

  const handleDeleteButtonClick = async (projetoId: number) => {
    await ProjectService.deletarProjeto(projetoId);
    fetchProjects(Number(session?.user.id));
  };

  return (
    <Container maxW="6xl" py={5}>
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
      <Box mt={10}>
        <Title>Minhas Startups</Title>
        {isLoading ? (
          <PulseCards />
        ) : (
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4} mt={4}>
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
                  showDeleteButton={true}
                  deleteButtonOnClick={() =>
                    handleDeleteButtonClick(projeto.id)
                  }
                />
              ))
            ) : (
              <Box>
                <Button colorScheme="purple" onClick={handleCreateStartup}>
                  Adicionar uma Startup
                </Button>
              </Box>
            )}
          </SimpleGrid>
        )}
      </Box>
    </Container>
  );
}
