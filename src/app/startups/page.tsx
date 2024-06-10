"use client";

import { Projeto } from "@/types/Projeto";
import { ProjectService } from "@/services/ProjectService";
import { useEffect, useState, useCallback } from "react";
import CardProjeto from "@/components/CardProjeto";
import Title from "@/components/Title";
import {
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import PulseCards from "@/components/Loading/PulseCards";
import OfferCard from "@/components/Cards/OfferCard";
import { SearchIcon } from "@chakra-ui/icons";

export default function StartupsPage() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [filteredProjetos, setFilteredProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchProjetos = useCallback(async () => {
    try {
      const { data: projetos } = await ProjectService.listarProjetos();
      setProjetos(projetos);
      setFilteredProjetos(projetos);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjetos();
  }, [fetchProjetos]);

  const handleButtonClick = (projetoId: number) => {
    window.location.href = `/startups/${projetoId}`;
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredProjetos(
      projetos.filter(
        (projeto) =>
          projeto.name.toLowerCase().includes(query) ||
          projeto.description.toLowerCase().includes(query)
      )
    );
  };

  return (
    <Container maxW="6xl" py={5}>
      <OfferCard
        title="Minhas Startups"
        subTitle="Salve as informações da sua startup para usar os serviços da plataforma"
        features={["Análises mais precisas", "Utilização simplificada"]}
        buttonTxt="Adicionar uma startup"
        link="/startups/cadastro"
        secondLink='/minhas-startups'
        secondButtonTxt='Minhas Startups'
      />
      {loading ? (
        <PulseCards />
      ) : (
        <section className="my-10">
          <Title>Startups</Title>
          <InputGroup my={5}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Buscar por nome ou descrição"
              value={searchQuery}
              onChange={handleSearch}
            />
          </InputGroup>
          {filteredProjetos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
              {filteredProjetos.map((projeto) => (
                <CardProjeto
                  key={projeto.id}
                  imageSrc={projeto.image}
                  title={projeto.name}
                  description={projeto.description}
                  buttonText="Mais detalhes"
                  buttonOnClick={() => handleButtonClick(projeto.id)}
                  cardOnClick={() => handleButtonClick(projeto.id)}
                />
              ))}
            </div>
          ) : (
            <Text fontSize="xl" color="gray.500" textAlign="center" mt={10}>
              Nenhuma startup encontrada.
            </Text>
          )}
        </section>
      )}
    </Container>
  );
}
