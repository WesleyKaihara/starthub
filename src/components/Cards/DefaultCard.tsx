import {
  chakra,
  Box,
  Stack,
  Text,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
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
      as="a"
      href={href}
      borderWidth="1px"
      _hover={{ shadow: "lg", cursor: "pointer" }}
      rounded="md"
      overflow="hidden"
      bg={useColorModeValue("white", "gray.800")}
      textDecoration="none"
    >
      <Image src={imageUrl} objectFit="cover" w="100%" h="200" />
      <Box p={{ base: 3, sm: 5 }}>
        <Box mb={2}>
          <chakra.h3
            fontSize={{ base: "lg", sm: "2xl", md: "xl"}}
            fontWeight="bold"
            lineHeight="1.2"
            mb={2}
          >
            {title}
          </chakra.h3>
          <Text noOfLines={2}>{description}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default DefaultCard;
