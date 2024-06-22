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
import { useSession, signOut } from "next-auth/react";
import OfferCard from "@/components/Cards/OfferCard";

export default function Profile() {
  const { data: session } = useSession();
  const toast = useToast();

  const [name, setName] = useState(session?.user?.name || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = async () => {
    if (password && password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          ...(password && { password }),
        }),
      });

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

  const handleSignOut = async () => {
    await signOut();
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
          <FormControl>
            <FormLabel>Nova Senha</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nova Senha"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Confirmar Nova Senha</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar Nova Senha"
            />
          </FormControl>
          <Button colorScheme="purple" onClick={handleSave} maxW="lg">
            Salvar
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
