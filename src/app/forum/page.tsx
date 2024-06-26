"use client";

import { useState, ReactNode, useCallback, useEffect, useRef } from "react";
import Title from "@/components/Title";
import { DiscussionService } from "@/services/DiscussaoService";
import { Container, Divider, Text } from "@chakra-ui/react";
import HorizontalCard from "@/components/Cards/HorizontalCard";
import PulseCards from "@/components/Loading/PulseCards";

type ModalProps = {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
};

function Modal({ show, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded shadow-lg w-full max-w-lg mx-4 md:w-1/2"
      >
        <button onClick={onClose} className="float-right text-black font-bold">
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [email, setEmail] = useState<string>("");
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(true);

  const handleOpenModal = (modalId: number) => {
    setActiveModal(modalId);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
    handleCloseModal();
  };

  const fetchInteractions = useCallback(async (page: number, limit: number) => {
    setLoading(true);
    try {
      const { data } = await DiscussionService.listarDiscussoes(page, limit);
      setHasNextPage(data.hasNextPage);
      setDiscussions((prevDiscussions) => [...prevDiscussions, ...data.itens]);
    } catch (error) {
      console.error("Erro ao buscar as interações da discussão:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMoreDiscussions = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    fetchInteractions(page, limit);
  }, [fetchInteractions, page, limit]);

  return (
    <Container maxW="6xl" px={{ base: 6 }} py={5}>
      <Title>Quais suas maiores dores atualmente?</Title>

      <div className="flex flex-col md:flex-row justify-center mt-8 space-y-4 md:space-y-0 md:space-x-4">
        <button
          onClick={() => handleOpenModal(1)}
          className="bg-primary text-white font-bold py-3 px-6 rounded text-lg w-full md:w-1/4 transition-transform transform hover-scale-101 hover:brightness-90"
        >
          Gerar mais vendas
        </button>
        <button
          onClick={() => handleOpenModal(2)}
          className="bg-primary text-white font-bold py-3 px-6 rounded text-lg w-full md:w-1/4 transition-transform transform hover-scale-101 duration-300 hover:brightness-90"
        >
          Gestão de pessoas
        </button>
        <button
          onClick={() => handleOpenModal(3)}
          className="bg-primary text-white font-bold py-3 px-6 rounded text-lg w-full md:w-1/4 transition-transform transform hover-scale-101 duration-300 hover:brightness-90"
        >
          Financeiro
        </button>
        <button
          onClick={() => handleOpenModal(4)}
          className="bg-primary text-white font-bold py-3 px-6 rounded text-lg w-full md:w-1/4 transition-transform transform hover-scale-101 duration-300 over:brightness-90"
        >
          Marketing
        </button>
      </div>

      <Modal show={activeModal === 1} onClose={handleCloseModal}>
        <h2 className="text-xl font-bold mb-4">Gerar mais vendas</h2>
        <p>
          Compartilhe seu e-mail para receber mais informações sobre como
          aumentar suas vendas.
        </p>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="border p-2 w-full rounded mb-4"
            placeholder="Seu e-mail"
            required
          />
          <button
            type="submit"
            className="bg-primary text-white font-bold py-2 px-4 rounded"
          >
            Enviar
          </button>
        </form>
      </Modal>
      <Modal show={activeModal === 2} onClose={handleCloseModal}>
        <h2 className="text-xl font-bold mb-4">Gestão de pessoas</h2>
        <p>
          Compartilhe seu e-mail para receber mais informações sobre gestão de
          pessoas.
        </p>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="border p-2 w-full rounded mb-4"
            placeholder="Seu e-mail"
            required
          />
          <button
            type="submit"
            className="bg-primary text-white font-bold py-2 px-4 rounded"
          >
            Enviar
          </button>
        </form>
      </Modal>
      <Modal show={activeModal === 3} onClose={handleCloseModal}>
        <h2 className="text-xl font-bold mb-4">Financeiro</h2>
        <p>
          Compartilhe seu e-mail para receber mais informações sobre gestão
          financeira.
        </p>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="border p-2 w-full rounded mb-4"
            placeholder="Seu e-mail"
            required
          />
          <button
            type="submit"
            className="bg-primary text-white font-bold py-2 px-4 rounded"
          >
            Enviar
          </button>
        </form>
      </Modal>
      <Modal show={activeModal === 4} onClose={handleCloseModal}>
        <h2 className="text-xl font-bold mb-4">Marketing</h2>
        <p>
          Compartilhe seu e-mail para receber mais informações sobre estratégias
          de marketing.
        </p>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="border p-2 w-full rounded mb-4"
            placeholder="Seu e-mail"
            required
          />
          <button
            type="submit"
            className="bg-primary text-white font-bold py-2 px-4 rounded"
          >
            Enviar
          </button>
        </form>
      </Modal>
      <Divider className="my-8" />
      <Title>Discussões</Title>
      {discussions.length === 0 && !loading && (
        <Text fontSize="xl" color="gray.500" textAlign="center" mt={10}>
          Nenhuma discussão encontrada.
        </Text>
      )}
      <div className="container mx-auto">
        {discussions.length === 0 && loading ? (
          <PulseCards />
        ) : (
          discussions.map((discussion: any) => (
            <HorizontalCard
              key={discussion.id}
              id={discussion.id}
              title={discussion.title}
              description={discussion.context}
              image="/logo-starthub.png"
              link={`/forum/discussao/${discussion.id}`}
            />
          ))
        )}

        {loading && <PulseCards />}

        {discussions.length > 0 && !loading && hasNextPage && (
          <button
            onClick={loadMoreDiscussions}
            className="bg-primary text-white font-bold py-2 px-4 rounded-full mt-4"
          >
            Carregar Mais
          </button>
        )}
      </div>
    </Container>
  );
}
