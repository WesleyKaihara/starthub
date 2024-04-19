import React from "react";

interface TitleProps {
  children: React.ReactNode;
}
const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <div className="flex items-center mt-2 mb-5">
      <div className="h-8 w-2 bg-primary mr-2"></div>
      <div className="text-3xl md:text-4xl text-dark font-bold">{children}</div>
    </div>
  );
};

export default Title;
