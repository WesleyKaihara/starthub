"use client";
import { useSession } from "next-auth/react";
import { Spinner, Flex } from "@chakra-ui/react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Flex justifyContent="center" alignItems="center" h="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!session) {
    window.location.href = "/login";
  }

  return <>{children}</>;
}
