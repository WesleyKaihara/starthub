import Header from "@/components/Header";
import "../../styles/globals.css";

export default function DestaqueLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  console.log(children)
  return (
    <>
      <Header />
      <section className="container mx-auto mt-24">{children}</section>
    </>
  );
}
