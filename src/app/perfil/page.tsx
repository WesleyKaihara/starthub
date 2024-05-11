"use client";

import CardProjeto from '@/components/CardProjeto';
import Title from '@/components/Title';
import { ProjectService } from "@/services/ProjectService";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Projeto } from "@/types/Projeto";

export default function PerfilPage() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login?callbackUrl=/perfil");
    },
  });

  const fetchProjects = useCallback(async (userId: number) => {
    try {
      const { data } = await ProjectService.buscarProjetosUsuario(
        Number(userId)
      );
      setProjetos(data);
    } catch (error) {
      console.error("Erro ao buscar projetos do usuário:", error);
    }
  }, []);

  useEffect(() => {
    fetchProjects(Number(session?.user.id));
  }, [fetchProjects, session?.user.id]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.href = "/";
  };

  const handleButtonClick = (projetoId: number) => {
    window.location.href = `/startups/${projetoId}`;
  };

  return (
    <>
      <section className="container mx-auto mt-24">
        <h1 className="text-5xl">Perfil - {session?.user?.name}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Sair
        </button>
      </section>
      <section className="container mx-auto mt-24">
        <Title> Meus Projetos</Title>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {projetos.length > 0 ? (
            projetos.map((projeto) => (
              <CardProjeto
                key={projeto.id}
                imageSrc={projeto.image}
                title={projeto.name}
                buttonText="Mais detalhes"
                buttonOnClick={() => handleButtonClick(projeto.id)}
              />
            ))
          ) : (
            <p>Nenhum projeto encontrado.</p>
          )}
        </div>
      </section>
    </>
  );
}
