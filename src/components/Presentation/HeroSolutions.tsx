import { Fragment } from "react";
import {
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  Flex,
  Box,
} from "@chakra-ui/react";

const features = [
  {
    title: "Inteligência Artificial",
    detail: "Obtenha insights valiosos e refine sua proposta de negócio",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="feather feather-cpu"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
        <rect x="9" y="9" width="6" height="6"></rect>
        <line x1="9" y1="1" x2="9" y2="4"></line>
        <line x1="15" y1="1" x2="15" y2="4"></line>
        <line x1="9" y1="20" x2="9" y2="23"></line>
        <line x1="15" y1="20" x2="15" y2="23"></line>
        <line x1="20" y1="9" x2="23" y2="9"></line>
        <line x1="20" y1="14" x2="23" y2="14"></line>
        <line x1="1" y1="9" x2="4" y2="9"></line>
        <line x1="1" y1="14" x2="4" y2="14"></line>
      </svg>
    ),
  },
  {
    title: "Conexão",
    detail:
      "Compartilhe experiências, tire dúvidas e encontre soluções colaborativas para os desafios do seu negócio.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="feather feather-users"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
  },
  {
    title: "Divulgação",
    detail:
      "Exponha seu produto ou serviço e receba feedback valioso da comunidade para melhorar e crescer seu negócio.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="feather feather-radio"
      >
        <circle cx="12" cy="12" r="2"></circle>
        <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>
      </svg>
    ),
  },
];
const HeroSection = () => {
  return (
    <Fragment>
      <Container maxW="6xl" px={{ base: 6 }} py={10}>
        <Stack direction={{ base: "column", md: "row" }}>
          <Stack direction="column" spacing={8} justifyContent="center">
            <chakra.h1
              fontSize={{ base: "3xl", md: "5xl" }}
              lineHeight={1.2}
              fontWeight="bold"
              textAlign={{ base: "center", sm: "left" }}
            >
              Utilização de
              <chakra.span
                bgGradient="linear(to-br, #735EF3, #998FF0)"
                bgClip="text"
              >
                {" "}
                Inteligência Artificial{" "}
              </chakra.span>{" "}
              para idealização de Startups
            </chakra.h1>
            <Text
              color={useColorModeValue("gray.500", "gray.400")}
              fontSize="lg"
              textAlign={{ base: "justify", sm: "left" }}
              fontWeight="400"
              maxW="950px"
            >
              Tenha um portfólio de ferramentas com inteligência artificial para
              auxiliar no processo de idealização e validação da sua ideia de
              startup. Além disso, aproveite nosso fórum para discussões sobre
              temáticas diversas e uma área dedicada para a apresentação de
              startups
            </Text>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={{ base: 5, md: 16 }}
              flexWrap="wrap"
            >
              {features.map((feature, index) => (
                <Stack
                  key={index}
                  direction={{ base: "row", md: "column" }}
                  spacing={2}
                >
                  <Flex
                    p={8}
                    maxH="100px"
                    w="max-content"
                    color="white"
                    bgGradient="linear(to-br, #735EF3, #998FF0)"
                    rounded="md"
                  >
                    {feature.icon}
                  </Flex>
                  <Stack direction="column" spacing={2}>
                    <Text fontSize="md" fontWeight="500">
                      {feature.title}
                    </Text>
                    <Text
                      fontSize="sm"
                      color="gray.400"
                      maxW={{ base: "100%", md: "200px" }}
                      textAlign="justify"
                    >
                      {feature.detail}
                    </Text>
                  </Stack>
                </Stack>
              ))}
            </Stack>
            <Stack
              direction={{ base: "column", sm: "row" }}
              spacing={{ base: 0, sm: 2 }}
              flexWrap="wrap"
            >
              <chakra.button
                h={12}
                px={6}
                bgGradient="linear(to-br, #735EF3, #998FF0)"
                color="white"
                _hover={{ bgGradient: "linear(to-br, #4432B0, #998FF0)" }}
                variant="solid"
                size="lg"
                rounded="md"
                fontWeight="bold"
                mb={{ base: 2, sm: 0 }}
                onClick={() => (window.location.href = "/ferramentas")}
              >
                <chakra.span> Saiba mais </chakra.span>
              </chakra.button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
      <Box overflow="hidden">
        <svg
          fill={useColorModeValue("#f7fafc", "#171923")}
          width="150%"
          height="56px"
          transform="scaleX(-1)"
          filter="drop-shadow(10px 5px 5px rgba(0, 0, 0, 0.05))"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={`M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 
            250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 
            3V0H0v27.35a600.21 600.21 0 00321.39 29.09z`}
          ></path>
        </svg>
      </Box>
    </Fragment>
  );
};

export default HeroSection;
