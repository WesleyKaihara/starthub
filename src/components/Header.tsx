"use client";

import {
  Box,
  Flex,
  HStack,
  Button,
  Text,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Icon,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Container,
  Image,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { useSession, signOut } from "next-auth/react";

const navLinks = [{ name: "Ferramentas", path: "/ferramentas" }];

const dropdownLinks = [
  {
    name: "Fórum",
    path: "/forum",
  },
  {
    name: "Startups",
    path: "/startups",
  },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <Box bg={useColorModeValue("white", "gray.800")} py={4}>
      <Container maxW="6xl">
        <Flex
          h={16}
          alignItems="center"
          justifyContent="space-between"
          mx="auto"
        >
          <Image
            src="/fullname-logo.png"
            h={100}
            alt="Logo"
            onClick={() => (window.location.href = "/")}
            _hover={{ opacity: 0.8, cursor: "pointer" }}
          />

          <HStack spacing={8} alignItems="center">
            <HStack
              as="nav"
              spacing={6}
              display={{ base: "none", md: "flex" }}
              alignItems="center"
            >
              {navLinks.map((link, index) => (
                <NavLink key={index} {...link} onClose={onClose} />
              ))}

              <Menu autoSelect={false} isLazy>
                {({ isOpen, onClose }) => (
                  <>
                    <MenuButton
                      _hover={{ color: "#5B47D1", textDecoration: "underline" }}
                    >
                      <Flex alignItems="center">
                        <Text>Comunidade</Text>
                        <Icon
                          as={BiChevronDown}
                          h={5}
                          w={5}
                          ml={1}
                          transition="all .25s ease-in-out"
                          transform={isOpen ? "rotate(180deg)" : ""}
                        />
                      </Flex>
                    </MenuButton>
                    <MenuList zIndex={5} border="none">
                      {dropdownLinks.map((link, index) => (
                        <MenuLink
                          key={index}
                          name={link.name}
                          path={link.path}
                          onClose={onClose}
                        />
                      ))}
                    </MenuList>
                  </>
                )}
              </Menu>
            </HStack>
          </HStack>

          {session?.user?.id ? (
            window.location.pathname === "/perfil" ? (
              <Button
                bgGradient="linear(to-br, #735EF3, #998FF0)"
                color="white"
                _hover={{ bgGradient: "linear(to-br, #4432B0, #998FF0)" }}
                size="md"
                rounded="md"
                onClick={handleSignOut}
              >
                Sair
              </Button>
            ) : (
              <Link
                href="/perfil"
                _hover={{ textDecoration: "none" }}
                display={{ base: "none", md: "block" }}
              >
                <Button
                  bgGradient="linear(to-br, #735EF3, #998FF0)"
                  color="white"
                  _hover={{ bgGradient: "linear(to-br, #4432B0, #998FF0)" }}
                  size="md"
                  rounded="md"
                >
                  Perfil
                </Button>
              </Link>
            )
          ) : (
            <Button
              bgGradient="linear(to-br, #735EF3, #998FF0)"
              color="white"
              _hover={{ bgGradient: "linear(to-br, #4432B0, #998FF0)" }}
              size="md"
              rounded="md"
              display={{ base: "none", md: "block" }}
              onClick={() => (window.location.href = "/login")}
            >
              Acessar
            </Button>
          )}

          <IconButton
            size="md"
            icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
            aria-label="Open Menu"
            display={{ base: "inherit", md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ base: "inherit", md: "none" }}>
            <Stack as="nav" spacing={2}>
              <NavLink name="Perfil" path="/perfil" onClose={onClose} />
              {navLinks.map((link, index) => (
                <NavLink key={index} {...link} onClose={onClose} />
              ))}
              <Text fontWeight="semibold" color="gray.500">
                Comunidade
              </Text>
              <Stack pl={2} spacing={1} mt={"0 !important"}>
                {dropdownLinks.map((link, index) => (
                  <NavLink key={index} {...link} onClose={onClose} />
                ))}
              </Stack>
            </Stack>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
}

interface NavLinkProps {
  name: string;
  path: string;
  onClose: () => void;
}

const NavLink = ({ name, path, onClose }: NavLinkProps) => {
  return (
    <Link
      href={path}
      lineHeight="inherit"
      _hover={{
        textDecoration: "underline",
        color: useColorModeValue("#735EF3", "#735EF3"),
      }}
      onClick={() => onClose()}
    >
      {name}
    </Link>
  );
};

interface MenuLinkProps {
  name: string;
  path: string;
  onClose: () => void;
}

const MenuLink = ({ name, path, onClose }: MenuLinkProps) => {
  return (
    <Link href={path} onClick={() => onClose()}>
      <MenuItem
        _hover={{
          color: "#5B47D1",
          bg: useColorModeValue("gray.200", "gray.700"),
        }}
      >
        <Text>{name}</Text>
      </MenuItem>
    </Link>
  );
};
