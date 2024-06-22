import Header from "@/components/Header";
import "../../styles/globals.css";
import Footer from "@/components/Footer";
import PrivateRoute from '@/components/PrivateRoute';

export const metadata = {
  title: "StartHub - Perfil",
  description:
    "Plataforma para auxiliar na idealização e desenvolvimento de startups",
};

export default function MeuPerfil({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateRoute>
      <Header />
      {children}
      <Footer />
    </PrivateRoute>
  );
}
