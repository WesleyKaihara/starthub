"use client";

import React, { ReactNode } from "react";

type FullScreenBannerProps = {
  children: ReactNode;
  backgroundImage: string;
};

const FullScreenBanner: React.FC<FullScreenBannerProps> = ({
  children,
  backgroundImage,
}) => {
  return (
    <div
      className="relative w-screen text-white font-semibold"
      style={{
        height: "90vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">{children}</div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 w-full h-8 bg-primar overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-solid border-transparent border-t-8 border-blue-500"></div>
      </div>
    </div>
  );
};

export default FullScreenBanner;
