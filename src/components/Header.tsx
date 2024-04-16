"use client";

import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white text-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        <div className="flex items-center">
          <Link href="/">
            <span className="text-2xl font-bold cursor-pointer text-primary">
              StartHub
            </span>
          </Link>
        </div>
        <div className="flex items-center md:hidden">
          <button
            className="text-2xl ml-auto"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar Menu" : "Abrir Menu"}
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 fill-current"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 fill-current"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
              </svg>
            )}
          </button>
        </div>
        <nav
          className={`md:flex md:space-x-4 ${
            menuOpen ? "block" : "hidden"
          } mt-4 md:mt-0 md:ml-4 w-full md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-4 md:space-y-0">
            <li>
              <Link href="/destaque">
                <span className="text-primary cursor-pointer hover:text-gray-600">
                  Quero me destacar
                </span>
              </Link>
            </li>
            <li>
              <Link href="/startups">
                <span className="cursor-pointer hover:text-gray-600">
                  Startups
                </span>
              </Link>
            </li>
            <li>
              <Link href="/noticias">
                <span className="cursor-pointer hover:text-gray-600">
                  Notícias
                </span>
              </Link>
            </li>
            <li className="relative">
              <span className="hidden md:block absolute top-1/2 right-full transform -translate-y-1/2 h-6 w-1 bg-primary mx-1"></span>
              <Link href="/perfil">
                <span className="cursor-pointer hover:text-gray-600">
                  Meu Perfil
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
