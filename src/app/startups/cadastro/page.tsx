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
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";

interface StartupData {
  name: string;
  description: string;
  image: File | null;
  previewImage: string | null;
  private: boolean;
}

const StartupForm: React.FC = () => {
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
    },
  });

  const previewImage = watch("previewImage");
  const descriptionLength = watch("description")?.length || 0;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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

  const onSubmit = async (data: StartupData) => {
    if (!data.image) {
      setError("image", {
        type: "manual",
        message: "Por favor, selecione uma imagem",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("file", data.image);
    formData.append("private", "false");

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
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        p={6}
        bg={useColorModeValue("gray.100", "gray.700")}
        shadow="lg"
        rounded="lg"
      >
        <Flex direction={{ base: "column", md: "row" }} gap={4}>
          <Box flex="1">
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
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
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
          </Box>
          <Box
            flex="1"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <FormControl id="image" isInvalid={!!errors.image}>
              <Box
                position="relative"
                w="96"
                h="96"
                onClick={handleClickUpload}
                cursor="pointer"
                borderWidth={1}
                borderRadius="lg"
                overflow="hidden"
              >
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt="Imagem da Startup"
                    objectFit="cover"
                    w="full"
                    h="full"
                  />
                ) : (
                  <Image
                    src="/logo-starthub.png"
                    alt="Upload Icon"
                    objectFit="cover"
                    w="full"
                    h="full"
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
              </Box>
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
          </Box>
        </Flex>
        <Button
          type="submit"
          mt={6}
          px={8}
          bgGradient="linear(to-br, #735EF3, #998FF0)"
          color="white"
          _hover={{ bgGradient: "linear(to-br, #4432B0, #998FF0)" }}
          w={{ base: "full", md: "64" }}
        >
          Salvar
        </Button>
      </Box>
    </Container>
  );
};

export default StartupForm;
