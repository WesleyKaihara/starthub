"use client";

import { redirect } from "next/navigation";
import React from "react";

interface CardProps {
  title: string;
  serviceName: string;
  description: string;
  features?: string[];
}

const ServiceCard: React.FC<CardProps> = ({ title, description, features, serviceName }) => {
  const limitedFeatures = features ? features.slice(0, 3) : [];
  
  return (
    <div className="mb-8" style={{ height: "400px" }}>
      <div
        className="bg-primary p-8 rounded-xl transition-all duration-300"
        style={{
          height: "200px",
          borderBottomLeftRadius: "50px",
          borderBottomRightRadius: "50px",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.height = "300px";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.height = "200px";
        }}
      >
        <div
          className="bg-white p-6 rounded-lg shadow-md relative"
          style={{ height: "350px" }}
        >
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          {limitedFeatures && limitedFeatures.length > 0 && (
            <div className="my-2">
              <ul className="list-disc pl-5">
                {limitedFeatures.map((feature, index) => (
                  <li className="mt-2" key={index}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="text-justify">{description}</p>
          <button
            onClick={() => (window.location.href = `/ferramentas/${serviceName}`)}
            className="bg-primary text-white py-2 px-12 rounded-full absolute bottom-4 left-4"
          >
            Adquirir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
