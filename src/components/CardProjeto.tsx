import React from "react";

interface CardProps {
  imageSrc: string;
  title: string;
  description?: string;
  buttonText: string;
  buttonOnClick: () => void;
  cardOnClick: () => void;
}

const CardProjeto: React.FC<CardProps> = ({
  imageSrc,
  title,
  description,
  buttonText,
  buttonOnClick,
}) => {
  const limitedDescription = description
    ? `${description.slice(0, 100)}...`
    : "";

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg transform transition duration-300 ease-in-out hover:scale-105 relative cursor-pointer"
      onClick={buttonOnClick}
    >
      <img className="w-full h-48 object-cover" src={imageSrc} alt={title} />
      <div className="px-6 pt-6 pb-16">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base text-justify">
          {limitedDescription}
        </p>
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <div className="px-6 py-4">
          <button
            className="bg-primary text-white font-bold py-2 px-4 rounded-md w-full transition duration-300 ease-in-out hover:filter hover:brightness-90"
            onClick={buttonOnClick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProjeto;
