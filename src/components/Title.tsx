import React from "react";
import { Box, Flex } from "@chakra-ui/react";

interface TitleProps {
  children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <Flex alignItems="center" mt="2" mb="5">
      <Box h="8" w="2" bg="purple" mr="2"></Box>
      <Box
        fontSize={{ base: "2xl", md: "3xl" }}
        fontWeight="bold"
        color="#333"
        textAlign="justify"
      >
        {children}
      </Box>
    </Flex>
  );
};

export default Title;
