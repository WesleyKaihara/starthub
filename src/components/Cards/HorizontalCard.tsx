import * as React from "react";
import {
  chakra,
  HStack,
  VStack,
  Text,
  Link,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";

interface CardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}
const HorizontalCard: React.FC<CardProps> = ({
  id,
  title,
  image,
  link,
  description,
}) => {
  const textColor = useColorModeValue("gray.500", "gray.200");
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <VStack mt={2}>
      <chakra.div onClick={toggleOpen} key={id} width="100%">
        <HStack
          p={4}
          bg={useColorModeValue("white", "gray.800")}
          rounded="xl"
          borderWidth="1px"
          borderColor={useColorModeValue("gray.100", "gray.700")}
          textAlign="left"
          w="full"
          align="start"
          spacing={4}
          cursor="pointer"
          _hover={{ shadow: "lg" }}
        >
          <Image
            src={image}
            width={33}
            height={33}
            rounded="md"
            objectFit="cover"
            alt="cover image"
            fallbackSrc="https://via.placeholder.com/150"
          />
          <VStack align="start" justifyContent="flex-start">
            <VStack spacing={0} align="start">
              <HStack>
                <Text
                  as={Link}
                  href={link}
                  fontWeight="bold"
                  fontSize="md"
                  noOfLines={1}
                  onClick={(e) => e.stopPropagation()}
                >
                  {title}
                </Text>
                {/* <HStack spacing="1">
                  {technologies.map((tech, index) => (
                    <Tag key={index} size="sm" colorScheme="gray">
                      {tech}
                    </Tag>
                  ))}
                </HStack> */}
              </HStack>

              {!isOpen && (
                <Text fontSize="sm" color={textColor} noOfLines={{ base: 2 }}>
                  {description}
                </Text>
              )}

              {isOpen && (
                <Text fontSize="sm" color={textColor}>
                  {description}
                </Text>
              )}
            </VStack>
          </VStack>
        </HStack>
      </chakra.div>
    </VStack>
  );
};

export default HorizontalCard;
