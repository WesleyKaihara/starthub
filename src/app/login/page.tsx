import React from "react";

const LoginPage = () => {
  const handleCadastroClick = () => {
    window.location.href = `/cadastro`;
  };

  return (
    <div
      className="flex flex-col lg:flex-row h-screen"
      style={{
        backgroundImage: 'url("/auth-background.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
      }}
    >
      <div className="lg:w-1/2 text-white flex justify-center items-center">
        <h1 className="text-5xl lg:text-7xl text-center">STARTHUB</h1>
      </div>

      <div className="lg:w-1/2 bg-gray-100 flex justify-center items-center">
        <div className="max-w-md w-full px-4">
          <h2 className="text-4xl font-bold mb-4">Login</h2>
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
              placeholder="informe seu e-mail"
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
              placeholder="informe sua senha"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="bg-primary transition duration-300 ease-in-out hover:filter hover:brightness-90 text-white font-bold py-2 px-4 rounded w-full mb-4"
          >
            Acessar a plataforma
          </button>
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded w-full"
          >
            Cadastre-se
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
