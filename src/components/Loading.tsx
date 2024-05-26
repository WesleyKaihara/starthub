import React from "react";
import { FaSpinner } from "react-icons/fa";

const LoadingScreen = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50"
      style={{ backdropFilter: "blur(5px)" }}
    >
      <FaSpinner
        className="text-primary animate-spin"
        style={{ fontSize: "4rem" }}
      />
    </div>
  );
};

export default LoadingScreen;
