"use client";

import React from "react";

interface FullWidthContainerProps {
  title: string;
  description: string;
}

const FullWidthContainer: React.FC<FullWidthContainerProps> = ({
  title,
  description,
}) => {
  const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "40vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px"
  };

  const descriptionStyle: React.CSSProperties = {
    maxWidth: "75%",
    textAlign: "center",
    margin: "0 auto",
  };

  return (
    <div className='bg-primary' style={containerStyle}>
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 text-white">{title}</h1>
        <p className="text-xl text-white" style={descriptionStyle}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default FullWidthContainer;
