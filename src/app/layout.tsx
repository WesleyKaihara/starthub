import "../styles/globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "../contexts/AuthProvider";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "StartHub",
  description:
    "Plataforma para auxiliar na idealização e desenvolvimento de startups",
  icons: {
    icon: "/f.png",
  },
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
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
