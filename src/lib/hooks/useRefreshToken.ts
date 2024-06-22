"use client";

import axios from "../axios";
import { signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await axios.post("/auth/refresh", {
      refreshToken: session?.user.refreshToken,
    });
  
    if (session) session.user.accessToken = res.data.access_token;
    else signIn();
  };
  return refreshToken;
};
