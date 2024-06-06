"use client";

import React from "react";
import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  UnorderedList,
  ListItem,
  useTheme,
} from "@chakra-ui/react";

interface CardProps {
  title: string;
  serviceName: string;
  description: string;
  features?: string[];
}

const ServiceCard: React.FC<CardProps> = ({
  title,
  description,
  features,
  serviceName,
}) => {
  const limitedFeatures = features ? features.slice(0, 3) : [];
  const theme = useTheme();

  return (
    <Box mb={8} h="400px">
      <Box
        bg="#735EF3"
        p={8}
        rounded="xl"
        transition="all 0.3s"
        h="200px"
        borderBottomLeftRadius="50px"
        borderBottomRightRadius="50px"
        _hover={{
          h: "300px",
        }}
      >
        <Box
          bg="white"
          p={6}
          rounded="lg"
          shadow="md"
          h="350px"
          position="relative"
        >
          <Text fontSize="2xl" fontWeight="bold" mb={2}>
            {title}
          </Text>
          {limitedFeatures && limitedFeatures.length > 0 && (
            <VStack align="start" spacing={2} my={2}>
              <UnorderedList pl={5}>
                {limitedFeatures.map((feature, index) => (
                  <ListItem key={index} mt={2}>
                    {feature}
                  </ListItem>
                ))}
              </UnorderedList>
            </VStack>
          )}
          <Text textAlign="justify">{description}</Text>
          <Button
            onClick={() =>
              (window.location.href = `/ferramentas/${serviceName}`)
            }
            bg="#735EF3"
            color="white"
            py={2}
            px={12}
            rounded="full"
            position="absolute"
            bottom={4}
            left={4}
            transition="transform 0.3s, brightness 0.3s"
            _hover={{
              transform: "scale(1.05)",
              brightness: "0.8",
            }}
          >
            Adquirir
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ServiceCard;
