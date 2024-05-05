"use client";

import React, { ReactNode } from "react";

interface ImageContentProps {
  imageUrl: string;
  children: ReactNode;
}

const ImageContent: React.FC<ImageContentProps> = ({ imageUrl, children }) => {
  return (
    <div className="flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 md:pr-8">{children}</div>
      <div className="md:w-1/2">
        <img src={imageUrl} alt="Imagem" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default ImageContent;
