"use client";

import Title from "@/components/Title";
import { ProjectService } from "@/services/ProjectService";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Box,
  Image,
  Flex,
  useColorModeValue,
  FormErrorMessage,
  Text,
  Progress,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface StartupData {
  name: string;
  description: string;
  image: File | null;
  previewImage: string | null;
  private: boolean;
  userId: number | null;
}

const StartupForm: React.FC = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login?callbackUrl=/startups/cadastro");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
    clearErrors,
  } = useForm<StartupData>({
    defaultValues: {
      name: "",
      description: "",
      image: null,
      previewImage: null,
      private: false,
      userId: session?.user.id,
    },
  });

  const [step, setStep] = useState(1);
  const previewImage = watch("previewImage");
  const descriptionLength = watch("description")?.length || 0;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.includes("image/png")) {
        setError("image", {
          type: "manual",
          message: "Por favor, selecione um arquivo PNG",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("image", file);
        setValue("previewImage", reader.result as string);
        clearErrors("image");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const validateStep = () => {
    if (step === 1 && !watch("name")) {
      setError("name", {
        type: "manual",
        message: "Nome é obrigatório",
      });
      return false;
    }

    if (
      step === 2 &&
      (!watch("description") ||
        descriptionLength < 50 ||
        descriptionLength > 250)
    ) {
      setError("description", {
        type: "manual",
        message: "Descrição deve ter entre 50 e 250 caracteres",
      });
      return false;
    }

    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = async (data: StartupData) => {
    if (!data.image) {
      setError("image", {
        type: "manual",
        message: "Por favor, selecione uma imagem",
      });
      return;
    }

    if (!session?.user.id) {
      console.error("User ID is undefined");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("file", data.image);
    formData.append("private", data.private.toString());
    formData.append("userId", session.user.id.toString());

    try {
      await ProjectService.cadastrarProjeto(formData);

      setValue("name", "");
      setValue("description", "");
      setValue("image", null);
      setValue("previewImage", null);

      window.location.href = "/startups";
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };

  return (
    <Container maxW="6xl" py={5}>
      <Title>Cadastrar uma Startup</Title>
      <Progress value={(step / 3) * 100} mb={6} colorScheme="purple" />

      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        p={6}
        bg={useColorModeValue("gray.100", "gray.700")}
        shadow="lg"
        rounded="lg"
        minH="500px"
      >
        {step === 1 && (
          <Box>
            <FormControl id="name" mb={6} isInvalid={!!errors.name}>
              <FormLabel fontSize="xl" fontWeight="bold">
                Nome
              </FormLabel>
              <Input
                type="text"
                {...register("name", {
                  required: "Nome é obrigatório",
                  minLength: {
                    value: 5,
                    message: "Nome deve ter no mínimo 5 caracteres",
                  },
                })}
                placeholder="Informe o nome do seu produto (Pode ser alterado posteriormente)"
                width="full"
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              onClick={nextStep}
              mt={6}
              bgGradient="linear(to-br, #735EF3, #998FF0)"
              color="white"
              _hover={{ bgGradient: "linear(to-br, #4432B0, #998FF0)" }}
            >
              Próximo
            </Button>
          </Box>
        )}

        {step === 2 && (
          <Box>
            <FormControl
              id="description"
              mb={6}
              isInvalid={!!errors.description}
            >
              <Flex justifyContent="space-between">
                <FormLabel fontSize="xl" fontWeight="bold">
                  Descrição
                </FormLabel>
                <Text fontSize="md" color="gray.600">
                  {descriptionLength}/250
                </Text>
              </Flex>
              <Textarea
                {...register("description", {
                  required: "Descrição é obrigatória",
                  minLength: {
                    value: 50,
                    message: "Descrição deve ter no mínimo 50 caracteres",
                  },
                  maxLength: {
                    value: 250,
                    message: "Descrição pode ter no máximo 250 caracteres",
                  },
                })}
                placeholder="Escreva uma descrição sobre seu produto..."
                rows={15}
              />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>
            <Flex justifyContent="space-between">
              <Button
                onClick={prevStep}
                mt={6}
                bgGradient="linear(to-br, #735EF3, #998FF0)"
                color="white"
                _hover={{ bgGradient: "linear(to-br, #4432B0, #998FF0)" }}
              >
                Anterior
              </Button>
              <Button
                onClick={nextStep}
                mt={6}
                bgGradient="linear(to-br, #735EF3, #998FF0)"
                color="white"
                _hover={{ bgGradient: "linear(to-br, #4432B0, #998FF0)" }}
              >
                Próximo
              </Button>
            </Flex>
          </Box>
        )}

        {step === 3 && (
          <Box>
            <FormControl id="image" isInvalid={!!errors.image} textAlign="center">
              <Flex
                position="relative"
                w="96"
                h="96"
                onClick={handleClickUpload}
                cursor="pointer"
                borderWidth={1}
                borderRadius="lg"
                overflow="hidden"
                align="center"
                justify="center"
                mx="auto"
              >
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt="Imagem da Startup"
                    objectFit="cover"
                    maxW="full"
                    maxH="full"
                    mx="auto"
                  />
                ) : (
                  <Image
                    src="/logo-starthub.png"
                    alt="Upload Icon"
                    objectFit="cover"
                    maxW="full"
                    maxH="full"
                    mx="auto"
                  />
                )}
                <Box
                  position="absolute"
                  top={2}
                  left={2}
                  bg="white"
                  fontSize="xs"
                  px={2}
                  py={1}
                  borderRadius="md"
                >
                  Tamanho recomendado: 300x300
                </Box>
              </Flex>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                display="none"
              />
              <FormErrorMessage>
                {errors.image && errors.image.message}
              </FormErrorMessage>
            </FormControl>
            <Flex justifyContent="space-between">
              <Button
                onClick={prevStep}
                mt={6}
                bgGradient="linear(to-br, #735EF3, #998FF0)"
                color="white"
                _hover={{ bgGradient: "linear(to-br, #4432B0, #998FF0)" }}
              >
                Anterior
              </Button>
              <Button
                type="submit"
                mt={6}
                bgGradient="linear(to-br, #735EF3, #998FF0)"
                color="white"
                _hover={{ bgGradient: "linear(to-br, #4432B0, #998FF0)" }}
              >
                Salvar
              </Button>
            </Flex>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default StartupForm;
