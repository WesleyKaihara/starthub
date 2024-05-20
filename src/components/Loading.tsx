"use client";

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  const [display, setDisplay] = useState("flex");

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setDisplay("none");
      }, 1000);
    } else {
      setDisplay("flex");
    }
  }, [isLoading]);

  return (
    <div
      style={{
        display: display,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 9999,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="loader"></div>
    </div>
  );
};