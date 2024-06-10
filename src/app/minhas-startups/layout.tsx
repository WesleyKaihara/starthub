import Header from "@/components/Header";
import "../../styles/globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "StartHub - Minhas Startups",
  description:
    "Plataforma para auxiliar na idealização e desenvolvimento de startups",
};

export default function MinhasStartupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
