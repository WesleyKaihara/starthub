"use client";
import { useSession } from "next-auth/react";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { ProjectService } from "@/services/ProjectService";
import { Projeto } from "@/types/Projeto";
import Title from "@/components/Title";
import { AnalysisService } from "@/services/AnalysisService";
import Slider from "react-slick";

interface NameSuggestion {
  name: string;
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
      redirect("/login?callbackUrl=/servicos/gerar-nomes");
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
      const { data } = await AnalysisService.gerarSugestoesNomes(
        selectedProject
      );
      setNameSuggestions(data.names);
    } catch (error) {
      console.error("Erro ao gerar sugestões de nomes:", error);
    } finally {
      setLoading(false);
    }
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    touchThreshold: 10,
  };

  return (
    <>
      <Title> Sugestões de Nomes - IA</Title>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 mx-auto md:mr-4 border rounded-md border-gray-300 p-4 mb-4 md:mb-0">
          <form onSubmit={handleSubmit}>
            {projetos.length > 0 ? (
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
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
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="message"
              >
                Descrição do projeto:
              </label>
              <textarea
                id="message"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-400"
                rows={8}
                value={selectedProject}
                onChange={(event) => setSelectedProject(event.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </form>
        </div>

        <div className="w-full md:w-1/2 bg-gray-100 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Descrição da Ideia</h2>
          <p className="text-gray-700 text-justify">
            Aqui você pode fornecer uma descrição sobre sua ideia. Pode ser
            qualquer coisa, desde detalhes adicionais sobre o que você está
            solicitando no formulário até informações sobre o contexto ou os
            objetivos do projeto.
          </p>
          <h2 className="text-lg font-semibold my-2">Sugestões de Nomes:</h2>
          <div className="slick-container">
            <Slider {...carouselSettings}>
              {nameSuggestions.map((suggestion, index) => {
                return (
                  <div key={index} className='border border-gray-300 rounded-md p-3'>
                    <div className="card">
                      <p>
                        <strong>Nome:</strong> {suggestion.name}
                      </p>
                      <p>
                        <strong>Descrição:</strong> {suggestion.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}
