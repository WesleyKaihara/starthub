import {
  chakra,
  Box,
  Stack,
  Text,
  Image,
  Button,
  ButtonProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
  href: string;
}

const DefaultCard: React.FC<CardProps> = ({
  imageUrl,
  title,
  description,
  href,
}) => {
  return (
    <Box
      borderWidth="1px"
      _hover={{ shadow: "lg" }}
      rounded="md"
      overflow="hidden"
      bg={useColorModeValue("white", "gray.800")}
    >
      <Image src={imageUrl} objectFit="cover" w="100%" h="150"/>
      <Box p={{ base: 3, sm: 5 }}>
        <Box mb={6}>
          <chakra.h3
            fontSize={{ base: "lg", sm: "2xl" }}
            fontWeight="bold"
            lineHeight="1.2"
            mb={2}
          >
            {title}
          </chakra.h3>
          <Text noOfLines={2}>{description}</Text>
        </Box>
        <Stack
          justifyContent="space-between"
          direction={{ base: "column", sm: "row" }}
          spacing={{ base: 2, sm: 0 }}
        >
          <CustomButton
            colorScheme="teal"
            variant="solid"
            bgGradient="linear(to-br, #735EF3, #998FF0)"
            _hover={{ bgGradient: "linear(to-br, #4432B0, #998FF0)" }}
            onClick={() => window.location.href = href}
          >
            Adquirir
          </CustomButton>
        </Stack>
      </Box>
    </Box>
  );
};

const CustomButton = ({
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <Button
      textTransform="uppercase"
      lineHeight="inherit"
      rounded="md"
      {...props}
      fontSize={{ base: "sm", sm: "sm" }}
    >
      {children}
    </Button>
  );
};

export default DefaultCard;
