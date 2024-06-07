"use client";
import { useSession } from "next-auth/react";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { ProjectService } from "@/services/ProjectService";
import { Projeto } from "@/types/Projeto";
import { AnalysisService } from "@/services/AnalysisService";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Progress,
  Select,
  Text,
  Textarea,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Divider,
  Flex,
} from "@chakra-ui/react";

interface TopicoRelevante {
  title: string;
  description: string;
}

const steps = [
  { step: 1, label: "Introdução" },
  { step: 2, label: "Descrição do Projeto" },
  { step: 3, label: "Tópicos Relevantes" },
];

export default function Page(): ReactNode {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [topicosRelevantes, setTopicosRelevantes] = useState<TopicoRelevante[]>(
    []
  );
  const [currentStep, setCurrentStep] = useState<number>(1);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login?callbackUrl=/ferramentas/gerar-nomes");
    },
  });

  const fetchProjects = useCallback(async (userId: number) => {
    try {
      const { data } = await ProjectService.buscarProjetosUsuario(
        Number(userId)
      );
      setProjetos(data);
    } catch (error) {
      console.error("Erro ao buscar projetos do usuário:", error);
    }
  }, []);

  useEffect(() => {
    if (session?.user.id) {
      fetchProjects(Number(session?.user.id));
    }
  }, [fetchProjects, session?.user.id]);

  const handleSelectProject = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProject(event.target.value);
  };

  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedProject.trim()) {
      setError("Por favor, preencha a descrição do projeto.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await AnalysisService.listarTopicosEstudo(
        selectedProject
      );
      setTopicosRelevantes(data.importanceData);
      setCurrentStep(3);
    } catch (error) {
      console.error("Erro ao gerar sugestões de nomes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStart = () => {
    setCurrentStep(2);
  };

  const handleRestart = () => {
    setSelectedProject("");
    setTopicosRelevantes([]);
    setCurrentStep(1);
  };

  return (
    <Container maxW="6xl" px={{ base: 6 }} py={10}>
      <Box mb={4}>
        <Box position="relative" pt={1}>
          <Box
            display="flex"
            mb={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Text
              as="span"
              fontSize="xs"
              fontWeight="semibold"
              py={1}
              px={2}
              bg="purple.200"
              color="purple.600"
              borderRadius="full"
            >
              Passo {currentStep}/{steps.length}
            </Text>
          </Box>
          <Progress
            value={(currentStep / steps.length) * 100}
            size="sm"
            colorScheme="purple"
          />
        </Box>
      </Box>

      <Box
        w="full"
        bg="gray.100"
        p={4}
        rounded="md"
        minH="500px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {![1, 3].includes(currentStep) && (
          <>
            <Heading as="h1" size="lg" my={4} textAlign={{ base: "center" }}>
              Serviço de Sugestões para Rentabilizar Projetos
            </Heading>
            <Text color="gray.700" mb={6} textAlign="justify">
              Nosso serviço utiliza inteligência artificial para ajudar você a
              encontrar as melhores formas de rentabilizar seu projeto. Siga os
              passos para selecionar seu projeto, descrever sua ideia e obter
              sugestões de tópicos relevantes.
            </Text>
            <Divider mb={6} />
          </>
        )}
        {currentStep === 1 && (
          <Box textAlign="center">
            <Heading size="lg" mb={4}>
              Bem-vindo ao nosso serviço de sugestões de tópicos para pesquisas!
            </Heading>
            <Text color="gray.700" mb={6}>
              Nosso serviço utiliza inteligência artificial para ajudar você a
              encontrar os melhores nomes para o seu projeto. Siga os passos
              para selecionar seu projeto, descrever sua ideia e obter sugestões
              de nomes criativas e relevantes.
            </Text>
            <Button colorScheme="purple" onClick={handleStart}>
              Iniciar
            </Button>
          </Box>
        )}

        {currentStep === 2 && (
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel htmlFor="select">
                  Selecione uma opção (opcional):
                </FormLabel>
                <Select
                  id="select"
                  placeholder="Selecionar projeto existente"
                  onChange={handleSelectProject}
                >
                  {projetos.map((projeto) => (
                    <option key={projeto.id} value={projeto.description}>
                      {projeto.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="message">Descrição do projeto:</FormLabel>
                <Textarea
                  id="message"
                  value={selectedProject}
                  placeholder="Descreva seu projeto aqui..."
                  onChange={(event) => setSelectedProject(event.target.value)}
                  rows={12}
                />
              </FormControl>

              {error && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle mr={2}>Erro:</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                colorScheme="purple"
                isLoading={loading}
                type="submit"
                isDisabled={loading || selectedProject.trim().length < 15}
              >
                {loading ? "Processando..." : "Enviar"}
              </Button>
            </VStack>
          </form>
        )}

        {currentStep === 3 && (
          <>
            <Heading as="h2" size="xl" my={4}>
              Dados relevantes e tópicos para pesquisas
            </Heading>
            <Text color="gray.700" mb={6} mx={2} textAlign="justify">
              {selectedProject}
            </Text>
            {topicosRelevantes.map((topico, index) => (
              <Box
                key={index}
                borderWidth={1}
                borderRadius="md"
                p={6}
                mb={4}
                w="full"
                bg="white"
                shadow="md"
              >
                <Text>
                  <strong>Nome:</strong> {topico.title}
                </Text>
                <Text>
                  <strong>Descrição:</strong> {topico.description}
                </Text>
              </Box>
            ))}
            <Flex mt={6} justifyContent="space-between" width="full">
              <Button colorScheme="purple" onClick={handleRestart}>
                Iniciar novamente
              </Button>
              <Button
                colorScheme="purple"
                onClick={() => (window.location.href = "/ferramentas")}
              >
                Ver todas as ferramentas
              </Button>
            </Flex>
          </>
        )}
      </Box>
    </Container>
  );
}
