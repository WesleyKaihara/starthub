import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

type User = {
  id: string;
  name: string;
  email: string;
};

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const tokens = await res.json();

        const decodedToken = jwt.decode(tokens.access_token) as {
          username: string;
          sub: string;
          email: string;
        } | null;

        if (decodedToken) {
          const user: User = {
            id: decodedToken.sub,
            name: decodedToken.username,
            email: decodedToken.email,
          };
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, user, token }) {
      session.user.id = Number(token.sub);
      return session;
    },
  },
};
