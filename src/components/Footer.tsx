"use client";
import { useState } from "react";

const Footer = () => {
  const [accordions, setAccordions] = useState([
    {
      id: 1,
      question: "O que é a StartHub?",
      answer:
        "A StartHub é uma plataforma que visa auxiliar empreendedores durante o desenvolvimento de suas ideias, principalmente as etapas iniciais do projeto como a etapa de idealização e a validação da ideia",
      isOpen: false,
    },
    {
      id: 2,
      question: "Como a StartHub pode te ajudar?",
      answer: "A StartHub possui algum serviços que utilizam de inteligencia artificial para realizar análise e criar feedbacks sobre sua ideia.",
      isOpen: false,
    },
    {
      id: 3,
      question: "Tem algum pré-requisito para utilizar a Plataforma?",
      answer: "A StartHub somente deseja que o empreendedor tenha interesse em evoluir sua ideia e consigo apresentar de forma clara sobre o seu projeto",
      isOpen: false,
    },
  ]);

  const toggleAccordion = (id: number) => {
    setAccordions((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  const breakText = (text, maxLength) => {
    const parts = [];
    while (text.length > maxLength) {
      parts.push(text.slice(0, maxLength));
      text = text.slice(maxLength);
    }
    parts.push(text);
    return parts;
  };

  return (
    <footer className="bg-primary text-white mt-20 py-24 border-t-2 border-gray-300 left-0 w-full z-50 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-6xl font-bold mb-1 md:mb-0">STARTHUB</h1>
          <p className="text-2xl mb-4">Perguntas Frequentes</p>
        </div>
        <div className="w-full md:w-auto">
          {accordions.map((accordion) => (
            <div
              key={accordion.id}
              className={`w-full text-dark mb-6 pb-4 bg-white border border-gray-300 shadow-lg rounded-md p-6 h-auto transition-all duration-300 overflow-hidden`}
              style={{ width: accordion.isOpen ? "100%" : "auto" }}
              onClick={() => toggleAccordion(accordion.id)}
            >
              <button className="text-xl font-bold cursor-pointer focus:outline-none mb-2">
                {accordion.question}
              </button>
              <div className={accordion.isOpen ? "block text-justify" : "hidden"}>
                {breakText(accordion.answer, 90).map((part, index) => (
                  <div key={index}>{part}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
