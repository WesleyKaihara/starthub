import "../../styles/globals.css";
import { Viewport } from 'next/dist/lib/metadata/types/extra-types';

export const metadata = {
  title: "StartHub - Cadastro",
  description:
    "Plataforma para auxiliar na idealização e desenvolvimento de startups",
};

export const viewport: Viewport = {
  themeColor: "#00B4CD",
};

export default function CadastroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
