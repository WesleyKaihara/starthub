"use client";
import { ReactNode, useState } from "react";
import { AnalysisService } from "@/services/AnalysisService";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Progress,
  Spinner,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

interface NameSuggestion {
  name: string;
  description: string;
}

const steps = [
  { step: 1, label: "Introdução" },
  { step: 2, label: "Descrição do Projeto" },
  { step: 3, label: "Sugestões de Nomes" },
];

export default function Page(): ReactNode {
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [nameSuggestions, setNameSuggestions] = useState<NameSuggestion[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedProject.trim()) {
      setError("Por favor, preencha a descrição do projeto.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await AnalysisService.gerarSugestoesNomes(
        selectedProject
      );
      setNameSuggestions(data.names);
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
    setNameSuggestions([]);
    setCurrentStep(1);
  };

  return (
    <Container maxW="6xl" px={{ base: 6 }} py={10}>
      <Flex direction="column" align="center" minH="100vh" w="full">
        <Box w="full" mx="auto" mb={4}>
          <Box pt={1}>
            <Flex mb={2} alignItems="center" justifyContent="space-between">
              <Text
                fontSize="xs"
                fontWeight="semibold"
                color="purple.600"
                bg="purple.200"
                py={1}
                px={2}
                rounded="full"
              >
                Passo {currentStep}/{steps.length}
              </Text>
            </Flex>
            <Progress
              value={(currentStep / steps.length) * 100}
              size="xs"
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
                Serviço de Sugestões de Nomes
              </Heading>
              <Text color="gray.700" mb={6} textAlign="justify">
                Nosso serviço utiliza inteligência artificial para ajudar você a
                encontrar os melhores nomes para o seu projeto. Siga os passos
                para selecionar seu projeto, descrever sua ideia e obter
                sugestões de nomes criativos e relevantes.
              </Text>
              <Divider mb={6} />
            </>
          )}

          {currentStep === 1 && (
            <Box textAlign="center">
              <Heading as="h2" size="lg" mb={4}>
                Bem-vindo ao nosso serviço de sugestões de nomes
              </Heading>
              <Text color="gray.700" mb={6}>
                Para começar, clique no botão abaixo e siga as instruções.
              </Text>
              <Button colorScheme="purple" onClick={handleStart}>
                Iniciar
              </Button>
            </Box>
          )}

          {currentStep === 2 && (
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>
                    Descrição do projeto (mínimo 50 caracteres):
                  </FormLabel>
                  <Textarea
                    placeholder="Descreva seu projeto aqui..."
                    value={selectedProject}
                    onChange={(event) => {
                      setSelectedProject(event.target.value);
                      setError("");
                    }}
                    rows={8}
                  />
                </FormControl>
                {error && <Text color="red.500">{error}</Text>}
                <Button
                  type="submit"
                  colorScheme="purple"
                  isLoading={loading}
                  w={{ base: "full", md: "md" }}
                  isDisabled={loading || selectedProject.trim().length < 50}
                >
                  {loading ? <Spinner /> : "Enviar"}
                </Button>
              </VStack>
            </form>
          )}
          {currentStep === 3 && (
            <>
              <Heading as="h2" size="xl" my={4}>
                Sugestões para ferramentas
              </Heading>
              <Text color="gray.700" mb={6} textAlign="justify">
                {selectedProject}
              </Text>
              {nameSuggestions.map((name, index) => (
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
                    <strong>Nome:</strong> {name.name}
                  </Text>
                  <Text>
                    <strong>Descrição:</strong> {name.description}
                  </Text>
                </Box>
              ))}
              <Flex
                mt={6}
                flexDirection={{ base: "column", md: "row" }}
                justifyContent={{ base: "center", md: "space-between" }}
                width="full"
              >
                <Button
                  colorScheme="purple"
                  mb={{ base: 4, md: 0 }}
                  onClick={handleRestart}
                >
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
      </Flex>
    </Container>
  );
}
