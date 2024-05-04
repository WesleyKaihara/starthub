"use client";

import Banner from "@/components/Banner";
import Title from "@/components/Title";
import { ProjectService } from "@/services/ProjectService";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface StartupData {
  name: string;
  description: string;
  image: File | null;
  previewImage: string | null;
  private: boolean;
}

const StartupForm: React.FC = () => {
  const [startupData, setStartupData] = useState<StartupData>({
    name: "",
    description: "",
    image: null,
    previewImage: null,
    private: false,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStartupData({
      ...startupData,
      [name]: value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStartupData({
          ...startupData,
          image: file,
          previewImage: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!startupData.image) {
      alert("Por favor, selecione uma imagem");
      return;
    }

    const formData = new FormData();
    formData.append("name", startupData.name);
    formData.append("description", startupData.description);
    formData.append("file", startupData.image);
    formData.append("private", "false");

    try {
      const response = await ProjectService.cadastrarProjeto(formData);
      console.log("Resposta da API:", response.data);

      setStartupData({
        name: "",
        description: "",
        image: null,
        previewImage: null,
        private: false,
      });
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };

  return (
    <div className="mx-4 md:mx-auto my-4 md:my-10">
      <Banner
        imageUrl="/destaque_banner.jpeg"
        link="/destaque"
        alt="Aprimorar projeto"
        target="_self"
      />
      <section className="my-10">
        <Title>Cadastrar uma Startup</Title>
        <form
          onSubmit={handleSubmit}
          className="max-w mx-auto px-6 py-10 bg-gray-100 shadow-lg rounded-lg"
        >
          <div className="mb-6">
            <label
              htmlFor="name"
              className="text-3xl block text-dark font-bold mb-2"
            >
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={startupData.name}
              placeholder="Informe o nome do seu produto (Pode ser alterado posteriormente)"
              onChange={handleInputChange}
              className="w-full px-3 py-3 border rounded-lg text-dark focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="text-3xl block text-dark font-bold mb-2"
            >
              Descrição:
            </label>
            <textarea
              id="description"
              name="description"
              value={startupData.description}
              onChange={handleInputChange}
              placeholder="Escreva uma descrição sobre seu produto, quais problemas ele busca resolver, pesquisas realizadas no mercado, empresas parceiras e outros tópicos importantes para chamar a atenção de possíveis clientes e colaboradores"
              className="w-full px-3 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              rows={4}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="text-3xl block text-gray-700 font-bold mb-2"
            >
              Imagem:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
              required
            />
            <span className="text-gray-500 text-sm">
              Selecione uma imagem para a sua startup
            </span>
          </div>

          {startupData.previewImage && (
            <div className="mb-4">
              <img
                src={startupData.previewImage}
                alt="Imagem da Startup"
                className="w-full h-auto"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-64 mt-3 bg-primary transition duration-300 ease-in-out hover:filter hover:brightness-110 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Salvar
          </button>
        </form>
      </section>
    </div>
  );
};

export default StartupForm;
