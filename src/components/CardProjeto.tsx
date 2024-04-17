import React from "react";

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
  buttonText: string;
  buttonOnClick: () => void;
}

const CardProjeto: React.FC<CardProps> = ({
  imageSrc,
  title,
  description,
  buttonText,
  buttonOnClick,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full h-48 object-cover" src={imageSrc} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
          onClick={buttonOnClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default CardProjeto;