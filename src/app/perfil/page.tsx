"use client";

import { useCallback, useEffect, useState } from "react";
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
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

interface UserData {
  id: number | null;
  name: string;
  email: string;
}

export default function Profile() {
  const toast = useToast();
  const axiosAuth = useAxiosAuth();
  const { status } = useSession();

  const userService = new UserService(axiosAuth);

  const [userData, setUserData] = useState<UserData>({
    id: null,
    name: "",
    email: "",
  });

  const fetchUser = useCallback(async () => {
    try {
      const res = await axiosAuth.get("/user");
      const userDataFromApi: UserData = {
        id: res.data.id,
        name: res.data.name,
        email: res.data.email,
      };
      setUserData(userDataFromApi);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao carregar perfil.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [axiosAuth, toast]);

  useEffect(() => {
    if (status !== "loading") {
      fetchUser();
    }
  }, [fetchUser, status]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, name: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await userService.updateUser(Number(userData.id), {
        name: userData.name,
      });

      console.log(res);

      toast({
        title: "Sucesso",
        description: "Perfil atualizado com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
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
              value={userData.name}
              onChange={handleNameChange}
              placeholder="Nome"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input value={userData.email} isReadOnly />
          </FormControl>
          <Button colorScheme="purple" onClick={handleSave} maxW="lg">
            Salvar
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
