import {
  chakra,
  Stack,
  Flex,
  useColorModeValue,
  Link,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { BsCheck } from "react-icons/bs";

interface OfferCardProps {
  title: string;
  subTitle: string;
  features: string[];
  buttonTxt: string;
  link: string;
}

const OfferCard: React.FC<OfferCardProps> = ({
  title,
  subTitle,
  features,
  buttonTxt,
  link,
}) => {
  return (
    <Flex
      boxShadow={useColorModeValue("0 4px 6px gray", "0 4px 6px #B5AEF2")}
      backgroundSize="cover"
      bgGradient="linear(to-br, #735EF3, #D1CDF7)"
      color="white"
      p={{ base: 4, sm: 8 }}
      rounded="lg"
    >
      <Stack direction="column" spacing={5} textAlign="left" flexGrow={3}>
        <chakra.h1 fontSize="4xl" lineHeight={1.2} fontWeight="bold">
          {title}
        </chakra.h1>
        <chakra.h1 fontSize="xl" lineHeight={1.2} fontWeight="bold">
          {subTitle}
        </chakra.h1>
        <List spacing={3}>
          {features.map((feature, index) => (
            <ListItem key={index}>
              <ListIcon as={BsCheck} color="green.700" />
              {feature}
            </ListItem>
          ))}
        </List>
        <Link
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          fontSize="md"
          fontWeight="500"
          p={3}
          lineHeight={1.2}
          h={10}
          w="max-content"
          rounded="md"
          textDecoration="none"
          color="white"
          bg="blackAlpha.400"
          shadow="lg"
          href={link}
        >
          {buttonTxt}
        </Link>
      </Stack>
    </Flex>
  );
};

export default OfferCard;
