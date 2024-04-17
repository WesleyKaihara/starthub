import React from "react";

const LoginPage = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Parte esquerda (Placeholder para logo, imagem, etc.) */}
      <div className="hidden md:block md:w-1/2 bg-gray-200"></div>

      {/* Parte direita (Formulário de login) */}
      <div className="w-full md:w-1/2 bg-white flex justify-center items-center">
        <form className="max-w-md w-full px-4">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-2"
            >
              E-mail
            </label>
            <input
              type="text"
              id="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Acessar a plataforma
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
