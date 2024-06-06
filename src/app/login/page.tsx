"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import {
  Container,
  Box,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  Image,
  VStack,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setErrorMessage(
        "Credenciais inválidas. Por favor, verifique seu e-mail e senha."
      );
      console.error("Erro de autenticação:", result.error);
      setPassword("");
    } else {
      window.location.href = "startups";
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUpRedirect = () => {
    window.location.href = "/cadastro";
  };

  return (
    <Container
      minH="100vh"
      minWidth="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      bgImage="url('/background/purple-animated-bg.svg')"
      bgSize="cover"
      bgPos="center"
      bgRepeat="no-repeat"
    >
      <Box
        w="full"
        maxW="md"
        bg="white"
        opacity="0.9"
        borderRadius="lg"
        shadow="md"
        p={6}
      >
        <VStack spacing={4} mb={6} textAlign="center">
          <Image src="/logo-starthub.png" alt="logo" w={12} h={12} mb={2} />
          <Heading as="h1" fontSize="2xl" fontWeight="bold" color="gray.900">
            StartHub
          </Heading>
        </VStack>
        <Heading
          as="h2"
          fontSize="xl"
          fontWeight="bold"
          color="gray.900"
          textAlign="center"
          mb={4}
        >
          Acessar minha conta
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="email">
              <FormLabel>E-mail</FormLabel>
              <Input
                type="email"
                placeholder="nome@email.com"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Senha</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <InputRightElement>
                  <IconButton
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    icon={showPassword ? <HiEyeOff /> : <HiEye />}
                    onClick={handleTogglePasswordVisibility}
                    variant="ghost"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button type="submit" colorScheme="purple" w="full">
              Entrar
            </Button>
            {errorMessage && <Text color="red.500">{errorMessage}</Text>}
            <Text fontSize="sm" color="gray.500">
              Não tem uma conta?{" "}
              <Button
                variant="link"
                colorScheme="purple"
                onClick={handleSignUpRedirect}
              >
                Cadastrar
              </Button>
            </Text>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;
