"use client";

import { useState, ReactNode, useCallback, useEffect, useRef } from "react";
import Banner from "@/components/Banner";
import Title from "@/components/Title";
import { DiscussionService } from "@/services/DiscussaoService";
import Link from "next/link";

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
      <div ref={modalRef} className="bg-white p-6 rounded shadow-lg w-1/2">
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
  const [visibleDiscussions, setVisibleDiscussions] = useState<number>(3);

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
  };

  const fetchInteractions = useCallback(async () => {
    try {
      const { data } = await DiscussionService.listarDiscussoes();
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
    <section className="px-4">
      <section className="container mx-auto mt-24 mb-12">
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
            Compartilhe seu e-mail para receber mais informações sobre
            estratégias de marketing.
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
    </section>
  );
}
