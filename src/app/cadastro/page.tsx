"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { UserService } from "@/services/UserService";
import {
  Container,
  Box,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Image,
  VStack,
  InputGroup,
  InputRightElement,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const SignIn: React.FC = () => {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await UserService.cadastrarUsuario({
        name: nome,
        email,
        password,
      });

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        throw new Error("Ocorreu um problema com o servidor. Tente novamente");
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      setErrorMessage("Ocorreu um erro ao cadastrar usuário. Tente novamente");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (nome.trim().length <= 5) {
      newErrors.nome = "Nome deve ser composto por mais de 5 palavras.";
    }

    const nomeParts = nome.split(" ");
    if (nomeParts.length < 2 || nomeParts.some((part) => part.length < 2)) {
      setErrorMessage("Por favor, insira seu nome completo.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      newErrors.email = "E-mail inválido.";
    }

    if (!password) {
      newErrors.password = "Senha é obrigatória.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setNome(value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignUpRedirect = () => {
    router.push("/login");
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Container
      minH="100vh"
      minWidth="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      backgroundImage="url('/background/purple-animated-bg.svg')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
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
          <Link href="/">
            <Image src="/logo-starthub.png" alt="logo" w={12} h={12} mb={2} />
          </Link>
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
          Iniciar uma conta
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="nome" isInvalid={!!errors.nome}>
              <FormLabel>Nome Completo</FormLabel>
              <Input
                type="text"
                placeholder="Nome Sobrenome"
                value={nome}
                onChange={handleNameChange}
                required
              />
              {errors.nome && (
                <FormErrorMessage>{errors.nome}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="email" isInvalid={!!errors.email}>
              <FormLabel>E-mail</FormLabel>
              <Input
                type="email"
                placeholder="nome@email.com"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {errors.email && (
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="password" isInvalid={!!errors.password}>
              <FormLabel>Senha</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    h="1.75rem"
                    size="sm"
                    variant="ghost"
                    aria-label={
                      showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={handleTogglePasswordVisibility}
                  />
                </InputRightElement>
              </InputGroup>
              {errors.password && (
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              id="confirmPassword"
              isInvalid={!!errors.confirmPassword}
            >
              <FormLabel>Confirmar Senha</FormLabel>
              <InputGroup>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    h="1.75rem"
                    size="sm"
                    variant="ghost"
                    aria-label={
                      showConfirmPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                    icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={handleToggleConfirmPasswordVisibility}
                  />
                </InputRightElement>
              </InputGroup>
              {errors.confirmPassword && (
                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
              )}
            </FormControl>
            <Button
              type="submit"
              colorScheme="purple"
              w="full"
              isLoading={loading}
            >
              {loading ? "Carregando..." : "Cadastrar"}
            </Button>
            {errorMessage && <Text color="red.500">{errorMessage}</Text>}
            <Text fontSize="sm" color="gray.500">
              Já possui uma conta?{" "}
              <Button
                variant="link"
                colorScheme="purple"
                onClick={handleSignUpRedirect}
              >
                Entrar
              </Button>
            </Text>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;
