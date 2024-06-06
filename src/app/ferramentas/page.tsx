"use client";

import DefaultCard from "@/components/Cards/DefaultCard";
import ServiceCard from "@/components/Cards/ServiceCard";
import Title from "@/components/Title";
import { Container, Box, Heading, Text, Grid } from "@chakra-ui/react";

const cardsData = [
  {
    imageUrl: "/logo-starthub.png",
    title: "Rentabilizar ideia",
    description:
      "Receba recomendações de formas para gerar valor com sua ideia",
    href: "/ferramentas/rentabilizar-ideia",
  },
  {
    imageUrl: "/logo-starthub.png",
    title: "Aumentar produtividade",
    description:
      "Levantamento de ferramentas que podem aumentar a produtividade da sua startup",
    href: "/ferramentas/ferramentas-externas",
  },
  {
    imageUrl: "/logo-starthub.png",
    title: "Pense fora da caixa",
    description:
      "Serão geradas ideia para ajudar na desenvolvimento de ideias inovadoras para seu projeto",
    href: "/ferramentas/pensar-fora-da-caixa",
  },
  {
    imageUrl: "/logo-starthub.png",
    title: "Tópicos de Estudo",
    description:
      "Levantamento de informações que podem auxiliar na tomada de decisões do Empreendedor",
    href: "/ferramentas/dados-relevantes",
  },
  {
    imageUrl: "/logo-starthub.png",
    title: "Geração de nomes",
    description:
      "Tenha um nome que represente a sua ideia de maneira clara e marcante",
    href: "/ferramentas/gerar-nomes",
  },
];

export default function Home() {
  return (
    <Container maxW="6xl">
      <Box px={4}>
        <Box textAlign="center" display={{ base: "none", md: "block" }}>
          <Heading
            as="h1"
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "4xl" }}
            mb={4}
          >
            Serviços
          </Heading>
          <Heading
            as="h2"
            fontSize={{ base: "5xl", sm: "6xl", md: "7xl", lg: "6xl" }}
            fontWeight="bold"
            mb={8}
          >
            em Destaque
          </Heading>
          <Text textAlign="center" mx="auto" maxW="xl" fontSize="lg" mb={8}>
            Crie seu próprio caminho na tecnologia com o StartHub. Suas ideias
            podem se tornar realidade: desenvolva soluções para transformar o
            mundo.
          </Text>
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "1fr",
              md: "1fr",
              lg: "repeat(2, 1fr)",
            }}
            gap={4}
            w="full"
            maxW="screen-lg"
          >
            <ServiceCard
              title="Dados relevantes para a ideia"
              description="Receba recomendações de tópicos que podem ser importantes para o sucesso do seu negócio, com a reflexão sobre os pontos apresentados sua visão sobre a empresa pode mudar"
              features={[
                "Inteligência Artificial",
                "Maior Assertividade",
                "Reflexão",
              ]}
              serviceName="dados-relevantes"
            />
            <ServiceCard
              title="Geração de Nomes"
              description="Receba recomendações especializadas para impulsionar o desenvolvimento, marketing, finanças e muito mais. Economize tempo e recursos, concentrando-se nas soluções certas para o crescimento do seu negócio."
              features={["Maior relevância", "Criatividade"]}
              serviceName="gerar-nomes"
            />
          </Grid>
        </Box>
      </Box>
      <Box px={4}>
        <Title>Nossos Serviços</Title>
        <Box p={4}>
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "1fr 1fr",
              md: "repeat(3, 1fr)",
            }}
            gap={8}
          >
            {cardsData.map((card, index) => (
              <DefaultCard
                key={index}
                imageUrl={card.imageUrl}
                title={card.title}
                description={card.description}
                href={card.href}
              />
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
