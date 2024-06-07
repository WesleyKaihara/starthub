"use client";

import HorizontalCard from "@/components/Cards/HorizontalCard";
import OfferCard from "@/components/Cards/OfferCard";
import PulseCards from "@/components/Loading/PulseCards";
import Title from "@/components/Title";
import { DiscussionService } from "@/services/DiscussaoService";
import { ProjectService } from "@/services/ProjectService";
import { Container, Divider, Flex } from "@chakra-ui/react";
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
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [visibleDiscussions, setVisibleDiscussions] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    title: "",
    context: "",
  });

  const fetchProjeto = useCallback(async () => {
    try {
      const { data } = await ProjectService.buscarProjetoPorId(
        +params.projetoId
      );
      setProjeto(data);
    } catch (error) {
      console.error("Erro ao buscar o projeto:", error);
    }
  }, [params.projetoId]);

  const fetchDiscussions = useCallback(async () => {
    try {
      const { data } = await DiscussionService.buscarDiscussoesProjeto(
        +params.projetoId
      );
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
    const errors: { [key: string]: string } = {};

    if (formData.title.length < 10) {
      errors.title = "O título deve ter pelo menos 10 caracteres.";
    }

    if (formData.context.length < 40) {
      errors.context = "O contexto deve ter pelo menos 40 caracteres.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const { data } = await DiscussionService.iniciarDiscussao(
        formData.title,
        formData.context,
        Number(params.projetoId)
      );
      setDiscussions([...discussions, data]);
      setFormData({ title: "", context: "" });
      fetchDiscussions();
    } catch (error) {
      console.error("Erro ao buscar discussões para o projeto:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreDiscussions = () => {
    setVisibleDiscussions((prev) => prev + 3);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container maxW="6xl" px={{ base: 6 }} py={10}>
      <OfferCard
        title="Ferramentas StartHub"
        subTitle="Utilize as ferramentas da plataforma para melhorar os resultados de sua startup"
        features={[
          "Inteligência Artificial",
          "Sugestões para seu projeto",
          "Realização de análises",
        ]}
        buttonTxt="Saiba Mais"
        link="/ferramentas"
      />
      {projeto ? (
        <div className="mt-10">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <img
              src={projeto.image}
              alt={projeto.name}
              className="w-32 h-32 md:w-16 md:h-16 mb-4 md:mb-0 rounded-full"
            />
            <div className="md:ml-4">
              <Title>{projeto.name}</Title>
              <p>{projeto.description}</p>
            </div>
          </div>

          <section className="mt-10">
            <Title>Discussões</Title>
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Título:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Digite o título (mínimo de 10 caracteres)"
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-400"
                  required
                />
                {formErrors.title && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.title}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="context"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Contexto:
                </label>
                <textarea
                  id="context"
                  name="context"
                  value={formData.context}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Descreva o contexto (mínimo de 40 caracteres)"
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-400"
                  required
                ></textarea>
                {formErrors.context && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.context}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Iniciar Discussão
                </button>
              </div>
            </form>

            <Divider className="my-8" />
            <Flex direction="column" flexGrow={1}>
              {loading ? (
                <PulseCards />
              ) : discussions.length > 0 ? (
                discussions
                  .slice(0, visibleDiscussions)
                  .map((discussion: any) => (
                    <HorizontalCard
                      key={discussion.id}
                      id={discussion.id}
                      title={discussion.title}
                      description={discussion.context}
                      image="/logo-starthub.png"
                      link={`/forum/discussao/${discussion.id}`}
                    />
                  ))
              ) : null}
            </Flex>

            {visibleDiscussions < discussions.length && (
              <button
                onClick={loadMoreDiscussions}
                className="bg-primary text-white font-bold py-2 px-4 rounded-full mt-4"
              >
                Carregar Mais
              </button>
            )}
          </section>
        </div>
      ) : (
        <PulseCards bigCard={true} />
      )}
    </Container>
  );
}
