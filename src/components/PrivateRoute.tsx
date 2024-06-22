"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Spinner, Flex } from "@chakra-ui/react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      window.location.href = "/login";
    }
  }, [session, status]);

  if (status === "loading") {
    return (
      <Flex justifyContent="center" alignItems="center" h="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return <>{children}</>;
}
