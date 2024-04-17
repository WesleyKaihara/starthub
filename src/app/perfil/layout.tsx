import Header from "@/components/Header";
import "../../styles/globals.css";

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
