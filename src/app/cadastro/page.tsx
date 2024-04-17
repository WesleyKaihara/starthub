"use client";

import Link from "next/link";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

const CadastroPage: React.FC = () => {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

  };

  const handleNomeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
      <div className="lg:w-1/2 hidden lg:flex text-white justify-center items-center">
        <h1 className="text-5xl lg:text-7xl text-center">STARTHUB</h1>
      </div>

      <div className="lg:w-1/2 bg-gray-100 flex justify-center items-center w-full h-full">
        <div className="max-w-md w-full px-4">
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="text-primary text-6xl font-bold">
              StartHub
            </Link>
          </div>
          <h2 className="text-4xl font-bold mb-4">Cadastro</h2>
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label
                htmlFor="nome"
                className="block text-gray-700 font-bold mb-2"
              >
                Nome
              </label>
              <input
                type="text"
                id="nome"
                placeholder="Informe seu nome"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={nome}
                onChange={handleNomeChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                placeholder="Informe seu e-mail"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Senha
              </label>
              <div className="flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Informe sua senha"
                  className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="absolute right-0 pr-3 flex items-center focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <HiEyeOff className="h-6 w-6 text-gray-500" />
                  ) : (
                    <HiEye className="h-6 w-6 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="confirm-password"
                className="block text-gray-700 font-bold mb-2"
              >
                Confirme a Senha
              </label>
              <div className="flex items-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  placeholder="Confirme sua senha"
                  className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <button
                  type="button"
                  className="absolute right-0 pr-3 flex items-center focus:outline-none"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <HiEyeOff className="h-6 w-6 text-gray-500" />
                  ) : (
                    <HiEye className="h-6 w-6 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            {errorMessage && (
              <p className="text-red-500 mb-4">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="bg-primary transition duration-300 ease-in-out hover:filter hover:brightness-90 text-white font-bold py-2 px-4 rounded w-full mb-4"
            >
              Cadastrar
            </button>
          </form>
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded w-full"
            onClick={() => (window.location.href = "/login")}
          >
            Já tenho uma conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default CadastroPage;
