"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { UserService } from '@/services/UserService';

const SignIn: React.FC = () => {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await UserService.cadastrarUsuario({
        name: nome,
        email,
        password,
      });

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        throw new Error("Ocorreu um problema com o servidor. Tente novamente");
        
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      setErrorMessage("Ocorreu um erro ao cadastrar usuário. Tente novamente");
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignUpRedirect = () => {
    router.push("/cadastro");
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-gray-50"
      style={{
        backgroundImage: "url('/background/purple-animated-bg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-md bg-white bg-opacity-90 rounded-lg shadow-md p-6 space-y-4">
        <div className="flex flex-col items-center mb-6 text-2xl font-semibold text-gray-900">
          <img className="w-12 h-12 mb-2" src="/logo-starthub.png" alt="logo" />
          StartHub
        </div>
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
          Acessar minha conta
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nome Completo
            </label>
            <input
              type="text"
              name="nome"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Nome Sobrenome"
              value={nome}
              onChange={handleNameChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              E-mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="nome@email.com"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Senha
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
          >
            Entrar
          </button>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <p className="text-sm font-light text-gray-500">
            Não tem uma conta?{" "}
            <a
              href="#"
              className="font-medium text-primary-600 hover:underline"
              onClick={handleSignUpRedirect}
            >
              Cadastrar
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
