"use client";
import { useSession } from "next-auth/react";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { ProjectService } from "@/services/ProjectService";
import { Projeto } from "@/types/Projeto";
import { AnalysisService } from "@/services/AnalysisService";

interface TopicoRelevante {
  title: string;
  description: string;
}

const steps = [
  { step: 1, label: "Introdução" },
  { step: 2, label: "Descrição do Projeto" },
  { step: 3, label: "Tópicos Relevantes" },
];

export default function Page(): ReactNode {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [topicosRelevantes, setTopicosRelevantes] = useState<TopicoRelevante[]>(
    []
  );
  const [currentStep, setCurrentStep] = useState<number>(1);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login?callbackUrl=/ferramentas/gerar-nomes");
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
    if (session?.user.id) {
      fetchProjects(Number(session?.user.id));
    }
  }, [fetchProjects, session?.user.id]);

  const handleSelectProject = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProject(event.target.value);
  };

  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedProject.trim()) {
      setError("Por favor, preencha a descrição do projeto.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await AnalysisService.listarTopicosEstudo(
        selectedProject
      );
      console.log(data);
      setTopicosRelevantes(data.importanceData);
      setCurrentStep(3);
    } catch (error) {
      console.error("Erro ao gerar sugestões de nomes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStart = () => {
    setCurrentStep(2);
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-full md:w-3/4 mx-auto mb-4">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-600 bg-primary-200">
                Passo {currentStep}/{steps.length}
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200">
            <div
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500 transition-width duration-500"
            ></div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-3/4 bg-gray-100 p-4 rounded-md min-h-[500px] flex flex-col justify-center items-center">
        {currentStep === 1 && (
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-4">
              Bem-vindo ao nosso serviço de sugestões de tópicos para pesquisas!
            </h2>
            <p className="text-gray-700 mb-6">
              Nosso serviço utiliza inteligência artificial para ajudar você a
              encontrar os melhores nomes para o seu projeto. Siga os passos
              para selecionar seu projeto, descrever sua ideia e obter sugestões
              de nomes criativas e relevantes.
            </p>
            <button
              onClick={handleStart}
              className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
            >
              Iniciar
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="select"
              >
                Selecione uma opção (opcional):
              </label>
              <select
                id="select"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-primary-400"
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
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="message"
              >
                Descrição do projeto:
              </label>
              <textarea
                id="message"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-primary-400"
                rows={8}
                value={selectedProject}
                onChange={(event) => setSelectedProject(event.target.value)}
              ></textarea>
            </div>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <div className="flex justify-end">
              <button
                type="submit"
                className={`bg-primary-500 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline ${
                  loading || selectedProject.trim().length < 15
                    ? "bg-gray-400 cursor-not-allowed"
                    : ""
                }`}
                disabled={loading || selectedProject.trim().length < 15}
              >
                {loading ? "Processando..." : "Enviar"}
              </button>
            </div>
          </form>
        )}

        {currentStep === 3 && (
          <>
            <h2 className="text-2xl font-semibold my-2">
              Dados relevantes e tópicos para pesquisas
            </h2>
            <div className="w-full">
              {topicosRelevantes.map((topico, index) => (
                <div
                  key={index}
                  className="border border-primary-300 rounded-md p-6 mb-4"
                >
                  <p>
                    <strong>Nome:</strong> {topico.title}
                  </p>
                  <p>
                    <strong>Descrição:</strong> {topico.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
