import "../styles/globals.css";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import AuthProvider from "../contexts/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "StartHub",
  description:
    "Plataforma para auxiliar na idealização e desenvolvimento de startups",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AuthProvider>
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
