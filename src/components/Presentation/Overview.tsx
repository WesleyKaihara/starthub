import {
  chakra,
  Container,
  Stack,
  HStack,
  VStack,
  Flex,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";

const overviewList = [
  {
    id: 1,
    label: "Acessar conta na plataforma",
    subLabel:
      "Faça login rapidamente e comece a usar todos os recursos disponíveis.",
  },
  {
    id: 2,
    label: "Cadastrar sua Startup",
    subLabel:
      "Registre sua empresa e obtenha acesso a ferramentas exclusivas para startups.",
  },
  {
    id: 3,
    label: "Escolher uma ferramenta",
    subLabel:
      "Selecione entre diversas ferramentas que melhor atendem às necessidades da sua startup.",
  },
  {
    id: 4,
    label: "Preencher os dados",
    subLabel:
      "Complete o formulário com informações detalhadas para melhorar sua experiência.",
  },
];

const OverviewSection = () => {
  return (
    <Container maxW="6xl" py={20}>
      <chakra.h2 fontSize="4xl" fontWeight="bold" textAlign="center" mb={2}>
        Como funciona?
      </chakra.h2>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 0, md: 20 }}
        justifyContent="center"
        alignItems="center"
      >
        <VStack
          spacing={4}
          alignItems="flex-start"
          mb={{ base: 5, md: 0 }}
          maxW="md"
        >
          {overviewList.map((data) => (
            <Box key={data.id}>
              <HStack spacing={4}>
                <Flex
                  fontWeight="bold"
                  boxShadow="md"
                  color="white"
                  bgGradient="linear(to-br, #735EF3, #998FF0)"
                  rounded="full"
                  justifyContent="center"
                  alignItems="center"
                  w={16}
                  h={16}
                >
                  {data.id}
                </Flex>
                <Text fontSize="xl">{data.label}</Text>
              </HStack>
              <Text fontSize="md" color="gray.500" ml={20}>
                {data.subLabel}
              </Text>
            </Box>
          ))}
        </VStack>
        <Image
          boxSize={{ base: "auto", md: "lg" }}
          objectFit="contain"
          src="/images/layouts/ferramentas.png"
          rounded="lg"
        />
      </Stack>
    </Container>
  );
};

export default OverviewSection;
