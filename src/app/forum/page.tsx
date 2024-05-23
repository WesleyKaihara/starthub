"use client";

import { useState, ReactNode, useCallback, useEffect } from "react";
import Banner from "@/components/Banner";
import Title from "@/components/Title";
import { DiscussionService } from "@/services/DiscussaoService";
import Link from 'next/link';

type ModalProps = {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
};

function Modal({ show, onClose, children }: ModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
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
  const [discussions, setDiscussions] = useState<any>([]);
  const [visibleDiscussions, setVisibleDiscussions] = useState<number>(3);

  const handleOpenModal = (modalId: number) => {
    setActiveModal(modalId);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const fetchInteractions = useCallback(async () => {
    try {
      const { data } = await DiscussionService.listarDiscussoes();
      console.log(data);
      setDiscussions(data);
    } catch (error) {
      console.error("Erro ao buscar as interações da discussão:", error);
    }
  }, []);

  const loadMoreDiscussions = () => {
    setVisibleDiscussions((prev) => prev + 3);
  };

  useEffect(() => {
    fetchInteractions();
  }, [fetchInteractions]);

  return (
    <>
      <section className="container mx-auto mt-24 mb-12">
        <Banner imageUrl="/startup_banner.jpg" alt="Cadastrar nova Startup" />
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
          <h2 className="text-xl font-bold mb-4">Modal 1</h2>
          <p>Conteúdo do Modal 1.</p>
        </Modal>
        <Modal show={activeModal === 2} onClose={handleCloseModal}>
          <h2 className="text-xl font-bold mb-4">Modal 2</h2>
          <p>Conteúdo do Modal 2.</p>
        </Modal>
        <Modal show={activeModal === 3} onClose={handleCloseModal}>
          <h2 className="text-xl font-bold mb-4">Modal 3</h2>
          <p>Conteúdo do Modal 3.</p>
        </Modal>
        <Modal show={activeModal === 4} onClose={handleCloseModal}>
          <h2 className="text-xl font-bold mb-4">Modal 4</h2>
          <p>Conteúdo do Modal 4.</p>
        </Modal>
      </section>
      <Title>Discussões</Title>
      <div className="container mx-auto">
        {discussions
          .slice(0, visibleDiscussions)
          .map((discussion: any, index: number) => (
            <Link href={`/forum/discussao/${discussion.id}`} key={index}>
              <div className="cursor-pointer flex bg-white p-4 rounded-lg shadow-md mb-4 transition-transform transform hover-scale-101 hover:shadow-md">
                <img
                  src="/logo-starthub.png"
                  alt="logo da starthub"
                  className="w-20 h-20 object-cover rounded-lg mr-4 aspect-square"
                />
                <div className="w-full">
                  <h3 className="text-lg font-bold mb-2">{discussion.title}</h3>
                  <p className="text-gray-700">
                    {discussion.context.substring(0, 250)}...
                  </p>
                </div>
              </div>
            </Link>
          ))}
        {visibleDiscussions < discussions.length && (
          <button
            onClick={loadMoreDiscussions}
            className="bg-primary text-white font-bold py-2 px-4 rounded-full mt-4"
          >
            Carregar Mais
          </button>
        )}
      </div>
    </>
  );
}
