"use client";
import React, { useState } from "react";
import news from "../../../news.json";
import NewsItem from "./components/Noticia";
import Title from "@/components/Title";

const NoticiasPage: React.FC = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(news.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  const currentNews = news.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const displayPages = [];
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);

  for (let i = startPage; i <= endPage; i++) {
    displayPages.push(i);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Title>Últimas Notícias</Title>
      {currentNews.map((item, index) => (
        <NewsItem
          key={index}
          title={item.title ?? ""}
          description={item.description}
          url={item.url}
          urlToImage={item.urlToImage ?? ""}
        />
      ))}
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`${
            currentPage === 1 ? "hidden md:block" : "" // Oculta a seta "Anterior" em dispositivos móveis
          } bg-primary transition duration-300 ease-in-out hover:filter hover:brightness-90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
        >
          {"<"}
        </button>
        <div>
          {displayPages.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => goToPage(pageNumber)}
              className={`mx-1 py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                currentPage === pageNumber
                  ? "bg-primary text-white"
                  : "bg-white text-primary"
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`${
            currentPage === totalPages ? "hidden md:block" : "" // Oculta a seta "Próxima" em dispositivos móveis
          } bg-primary transition duration-300 ease-in-out hover:filter hover:brightness-90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default NoticiasPage;
