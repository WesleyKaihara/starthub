import React from "react";

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
}

const CardService: React.FC<CardProps> = ({ imageUrl, title, description }) => {
  const truncatedDescription =
    description.length > 70
      ? description.substring(0, 70) + "..."
      : description;

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transition-transform transform hover-scale-101 duration-300 cursor-pointer">
      <div className="h-64 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={imageUrl}
          alt={title}
        />
      </div>
      <div className="px-6 py-6">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base mb-4">{truncatedDescription}</p>
        <button className="bg-primary text-white font-bold py-2 px-4 w-full rounded-lg transition-transform transform hover:scale-105 duration-300 over:brightness-90">
          Adquirir
        </button>
      </div>
    </div>
  );
};

export default CardService;