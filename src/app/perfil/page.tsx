"use client";

import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Stack,
  useToast,
  Container,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import OfferCard from "@/components/Cards/OfferCard";
import { UserService } from "@/services/UserService";
import useAxiosAuth from '@/lib/hooks/useAxiosAuth';

export default function Profile() {
  const { data: session } = useSession();
  const toast = useToast();
  const axiosAuth = useAxiosAuth();

  const fetchPost = async () => {
    const res = await axiosAuth.get("/user");
    console.log(res.data)
  };
 
  const [name, setName] = useState(session?.user?.name || "");

  const handleSave = async () => {
    try {
      const res = await UserService.updateUser();

      if (res.ok) {
        toast({
          title: "Sucesso",
          description: "Perfil atualizado com sucesso.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Erro",
          description: "Falha ao atualizar o perfil.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar o perfil.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="6xl" py={5}>
      <OfferCard
        title="Minhas Startups"
        subTitle="Salve as informações da sua startup para usar os serviços da plataforma"
        features={["Análises mais precisas", "Utilização simplificada"]}
        buttonTxt="Adicionar uma startup"
        link="/startups/cadastro"
        secondLink="/minhas-startups"
        secondButtonTxt="Minhas Startups"
      />
      <Box mt={10}>
        <Heading as="h1" mb={6}>
          Perfil
        </Heading>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input value={session?.user?.email ?? ""} isReadOnly />
          </FormControl>
          <Button colorScheme="purple" onClick={handleSave} maxW="lg">
            Salvar
          </Button>
          <Button colorScheme="purple" onClick={fetchPost} maxW="lg">
            Salvar
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
