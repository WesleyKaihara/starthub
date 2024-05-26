"use client";

import LoadingScreen from '@/components/Loading';
import Title from "@/components/Title";
import { DiscussionService } from "@/services/DiscussaoService";
import { ProjectService } from "@/services/ProjectService";
import Link from "next/link";
import { ReactNode, useCallback, useEffect, useState } from "react";

type Params = {
  projetoId: string;
};

type PageProps = {
  params: Params;
};

export default function Page({ params }: PageProps): ReactNode {
  const [projeto, setProjeto] = useState<any>(null);
  const [discussions, setDiscussions] = useState<any>([]);
  const [formData, setFormData] = useState({
    title: "",
    context: "",
  });

  const fetchProjeto = useCallback(async () => {
    try {
      const { data } = await ProjectService.buscarProjetoPorId(+params.projetoId);
      setProjeto(data);
    } catch (error) {
      console.error("Erro ao buscar o projeto:", error);
    }
  }, [params.projetoId]);

  const fetchDiscussions = useCallback(async () => {
    try {
      const { data } = await DiscussionService.buscarDiscussoesProjeto(+params.projetoId);
      setDiscussions(data);
    } catch (error) {
      console.error("Erro ao buscar discussões para o projeto:", error);
    }
  }, [params.projetoId]);

  useEffect(() => {
    fetchProjeto();
    fetchDiscussions();
  }, [fetchProjeto, fetchDiscussions]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await DiscussionService.iniciarDiscussao(
        formData.title,
        formData.context,
        Number(params.projetoId)
      );
      setDiscussions([...discussions, data]);
      setFormData({ title: "", context: "" });
      fetchDiscussions()
    } catch (error) {
      console.error("Erro ao buscar discussões para o projeto:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="px-4">
      {projeto ? (
        <div>
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <img src={projeto.image} alt={projeto.name} className="w-32 h-32 md:w-16 md:h-16 mb-4 md:mb-0 rounded-full" />
            <div className="md:ml-4">
              <Title>{projeto.name}</Title>
              <p>{projeto.description}</p>
            </div>
          </div>

          <section className="mt-10">
            <Title>Discussões</Title>
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                  Título:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="context" className="block text-gray-700 text-sm font-bold mb-2">
                  Contexto:
                </label>
                <textarea
                  id="context"
                  name="context"
                  value={formData.context}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-400"
                  required
                ></textarea>
              </div>
              <div>
                <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Iniciar Discussão
                </button>
              </div>
            </form>

            {discussions.length > 0 && (
              <div className="mt-6 border-t pt-6">
                <ul>
                  {discussions.map((discussion: any) => (
                    <li className="mt-4" key={discussion.id}>
                      <Link href={`/forum/discussao/${discussion.id}`}>
                        <div className="border rounded-md p-4 transition duration-300 ease-in-out hover:bg-gray-200 hover:text-gray-900 cursor-pointer">
                          <h3 className="text-lg font-semibold">{discussion.title}</h3>
                          <p>{discussion.context}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </main>
  );
}
