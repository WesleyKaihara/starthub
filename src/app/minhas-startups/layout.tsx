import Header from "@/components/Header";
import "../../styles/globals.css";
import Footer from "@/components/Footer";
import PrivateRoute from "@/components/PrivateRoute";

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
    <PrivateRoute>
      <Header />
      {children}
      <Footer />
    </PrivateRoute>
  );
}
