"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { IoCloseOutline, IoMenu } from "react-icons/io5";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="bg-secondary text-gray-800 py-4 fixed top-0 left-0 right-0 z-50 px-4 border-b-2 border-gray-150">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        <div className="flex items-center">
          <Link href="/">
            <span className="text-4xl font-bold cursor-pointer text-primary transition transform duration-300 hover:scale-105">
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
            {menuOpen ? <IoCloseOutline size={40} /> : <IoMenu size={40} />}
          </button>
        </div>
        <nav
          className={`md:flex md:space-x-4 ${
            menuOpen ? "block" : "hidden"
          } mt-4 md:mt-0 md:ml-4 w-full md:w-auto`}
        >
          <ul className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <li>
              <Link href="/destaque">
                <span className="text-xl text-primary cursor-pointer transition transform duration-300 hover:scale-105 hover:text-gray-600">
                  Quero me destacar
                </span>
              </Link>
            </li>
            <li>
              <Link href="/forum">
                <span className="text-xl text-dark cursor-pointer transition transform duration-300 hover:scale-105 hover:text-gray-600">
                  Fórum
                </span>
              </Link>
            </li>
            <li>
              <Link href="/startups">
                <span className="text-xl text-dark cursor-pointer transition transform duration-300 hover:scale-105 hover:text-gray-600">
                  Startups
                </span>
              </Link>
            </li>
            <li className="relative">
              <span className="hidden md:block absolute top-1/2 right-full transform -translate-y-1/2 h-6 w-1 bg-primary mx-1"></span>
              {session ? (
                <span
                  className="lg:mx-1 text-xl cursor-pointer text-dark transition transform duration-300 hover:scale-105 hover:text-gray-600"
                  onClick={() => signOut()}
                >
                  Sair
                </span>
              ) : (
                <Link href="/login">
                  <span className="text-xl cursor-pointer text-primary transition transform duration-300 hover:scale-105 hover:text-gray-600">
                    Acessar
                  </span>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
