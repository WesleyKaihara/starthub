"use client";

import HorizontalCard from "@/components/Cards/HorizontalCard";
import OfferCard from "@/components/Cards/OfferCard";
import PulseCards from "@/components/Loading/PulseCards";
import Title from "@/components/Title";
import { DiscussionService } from "@/services/DiscussaoService";
import { ProjectService } from "@/services/ProjectService";
import {
  Container,
  Divider,
  Flex,
  Button,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
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
  const [editData, setEditData] = useState({
    name: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();

  const fetchProjeto = useCallback(async () => {
    try {
      const { data } = await ProjectService.buscarProjetoPorId(
        +params.projetoId
      );
      setProjeto(data);
      setEditData({ name: data.name, description: data.description });
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

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const updatedProjeto = {
        ...editData,
        userId: projeto.userId,
        private: false,
      };
      await ProjectService.atualizarProjeto(
        Number(params.projetoId),
        updatedProjeto
      );
      setProjeto({ ...projeto, ...editData });
      setIsEditing(false);
      toast({
        title: "Sucesso",
        description: "Projeto atualizado com sucesso",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar o projeto",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Erro ao atualizar o projeto:", error);
    } finally {
      setLoading(false);
    }
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
              {isEditing ? (
                <>
                  <Input
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                    placeholder="Nome da Startup"
                    mb={2}
                  />
                  <Textarea
                    name="description"
                    value={editData.description}
                    onChange={handleEditChange}
                    placeholder="Descrição da Startup"
                    mb={2}
                  />
                  <Button
                    colorScheme="purple"
                    onClick={handleSaveChanges}
                    isLoading={loading}
                    mb={2}
                  >
                    Salvar Alterações
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => setIsEditing(false)}
                    mb={2}
                    mx={2}
                  >
                    Cancelar
                  </Button>
                </>
              ) : (
                <>
                  <Title>{projeto.name}</Title>
                  <p>{projeto.description}</p>
                  <Button
                    colorScheme="purple"
                    onClick={() => setIsEditing(true)}
                    mt={2}
                  >
                    Editar
                  </Button>
                </>
              )}
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
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Digite o título (mínimo de 10 caracteres)"
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
                <Textarea
                  id="context"
                  name="context"
                  value={formData.context}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Descreva o contexto (mínimo de 40 caracteres)"
                  required
                ></Textarea>
                {formErrors.context && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.context}
                  </p>
                )}
              </div>

              <div>
                <Button type="submit" colorScheme="purple" isLoading={loading}>
                  Iniciar Discussão
                </Button>
              </div>
            </form>

            <Divider my={8} />
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
              <Button
                onClick={loadMoreDiscussions}
                colorScheme="purple"
                mt={4}
                alignSelf="center"
              >
                Carregar Mais
              </Button>
            )}
          </section>
        </div>
      ) : (
        <PulseCards bigCard={true} />
      )}
    </Container>
  );
}
