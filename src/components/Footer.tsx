import {
  Box,
  Stack,
  HStack,
  VStack,
  Link,
  Divider,
  Image,
  Text,
  LinkProps
} from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box p={{ base: 5, md: 8 }} maxW="6xl" marginInline="auto">
      <Stack
        spacing={{ base: 8, md: 0 }}
        justifyContent="space-between"
        direction={{ base: 'column', md: 'row' }}
      >
        <Box maxW="400px">
          <Link href="/">
            <Image w="100px" src="/fullname-logo.png" alt="TemplatesKart" />
          </Link>
          <Text mt={2} color="gray.500" fontSize="md">
            Mais facilidade e organização durante o processo de idealização e validação de sua Startup
          </Text>
        </Box>
        <HStack
          spacing={12}
          display={{ base: 'none', sm: 'flex' }}
          justifyContent={{ sm: 'space-between', md: 'normal' }}
        >
          <VStack spacing={3} alignItems="flex-start">
            <Text fontSize="md" fontWeight="bold">
              Comunidade
            </Text>
            <VStack spacing={2} alignItems="flex-start" color="gray.500">
              <CustomLink href="/forum">Fórum</CustomLink>
              <CustomLink href="/startups">Startups</CustomLink>
            </VStack>
          </VStack>
          <VStack spacing={3} alignItems="flex-start">
            <Text fontSize="md" fontWeight="bold">
              Startups
            </Text>
            <VStack spacing={2} alignItems="flex-start" color="gray.500">
              <CustomLink href="/startups/cadastro">Cadastrar</CustomLink>
              <CustomLink href="/minhas-startups">Minhas Startups</CustomLink>
            </VStack>
          </VStack>
        </HStack>
      </Stack>

      <Divider my={4} />
    </Box>
  );
};

const CustomLink = ({ children, ...props }: LinkProps) => {
  return (
    <Link fontSize="sm" _hover={{ textDecoration: 'underline' }} {...props}>
      {children}
    </Link>
  );
};

export default Footer;
