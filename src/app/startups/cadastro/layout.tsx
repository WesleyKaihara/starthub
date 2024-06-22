import PrivateRoute from '@/components/PrivateRoute';
import "../../../styles/globals.css";

export const metadata = {
  title: "StartHub - Startups",
  description:
    "Plataforma para auxiliar na idealização e desenvolvimento de startups",
};

export default function CadastroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateRoute>
      {children}
    </PrivateRoute>
  );
}
