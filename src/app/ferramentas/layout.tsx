import Header from "@/components/Header";
import "../../styles/globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "StartHub - Ferramentas",
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
      {children}
      <Footer />
    </>
  );
}
