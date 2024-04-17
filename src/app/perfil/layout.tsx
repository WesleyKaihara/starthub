import Header from "@/components/Header";
import "../../styles/globals.css";

export const metadata = {
  title: "StartHub - Meu Perfil",
  description:
    "Plataforma para auxiliar na idealização e desenvolvimento de startups",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <section className="container mx-auto mt-24">{children}</section>
    </>
  );
}
