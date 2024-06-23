import "../../../styles/globals.css";
import PrivateRoute from '@/components/PrivateRoute';

export const metadata = {
  title: "StartHub - Startups",
  description:
    "Plataforma para auxiliar na idealização e desenvolvimento de startups",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PrivateRoute>{children}</PrivateRoute>;
}
