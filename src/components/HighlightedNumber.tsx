import React, { useEffect, useState } from "react";

interface HighlightedNumberProps {
  title: string;
  description: string;
  targetNumber: number;
}

const HighlightedNumber: React.FC<HighlightedNumberProps> = ({
  title,
  description,
  targetNumber,
}) => {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentNumber < targetNumber) {
        setCurrentNumber((prevNumber) => prevNumber + 1);
      }
    }, 25);

    return () => {
      clearInterval(timer);
    };
  }, [currentNumber, targetNumber]);

  return (
    <div className="mx-auto w-70 md:w-2/3 lg:w-1/2 bg-gray-150 p-4 border-2 rounded-lg text-center my-8">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="text-8xl font-bold text-primary">{currentNumber}%</div>
      <p className="text-lg mb-4">{description}</p>
    </div>
  );
};

export default HighlightedNumber;
