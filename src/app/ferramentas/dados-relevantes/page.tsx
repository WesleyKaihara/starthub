"use client";

import { useSession } from "next-auth/react";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { ProjectService } from "@/services/ProjectService";
import { Projeto } from "@/types/Projeto";
import Title from "@/components/Title";
import { AnalysisService } from "@/services/AnalysisService";
import { LoadingScreen } from "@/components/Loading";

interface NameSuggestion {
  title: string;
  description: string;
}

export default function Page(): ReactNode {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [nameSuggestions, setNameSuggestions] = useState<NameSuggestion[]>([]);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login?callbackUrl=/ferramentas/dados-relevantes");
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

  const handleSelectProject = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProject(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await AnalysisService.listarTopicosEstudo(
        selectedProject
      );
      console.log(data);
      setNameSuggestions(data.importanceData);
    } catch (error) {
      console.error("Erro ao gerar sugestões de nomes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingScreen isLoading={loading} />
      <Title> Dados Relevantes - IA</Title>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 mx-auto md:mr-4 p-4 mb-4 md:mb-0">
          <form onSubmit={handleSubmit}>
            {projetos.length > 0 ? (
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-xl font-bold mb-2"
                  htmlFor="select"
                >
                  Selecione uma opção:
                </label>
                <select
                  id="select"
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-400"
                  onChange={handleSelectProject}
                >
                  <option value="">Selecionar projeto existente</option>
                  {projetos.map((projeto) => (
                    <option key={projeto.id} value={projeto.description}>
                      {projeto.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              ""
            )}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-xl font-bold mb-2"
                htmlFor="message"
              >
                Descrição do projeto:
              </label>
              <textarea
                id="message"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-400"
                placeholder='Digite algo...'
                rows={8}
                value={selectedProject}
                onChange={(event) => setSelectedProject(event.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-primary text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Ver resultado"}
              </button>
            </div>
          </form>
        </div>

        <div className="w-full md:w-1/2 bg-white p-4 rounded-md">
          <div className="slick-container">
            {nameSuggestions.map((suggestion, index) => (
              <div key={index} className="mb-4">
                <p className="font-semibold text-xl">{suggestion.title}</p>
                <p className="text-lg text-gray-700">
                  {suggestion.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
