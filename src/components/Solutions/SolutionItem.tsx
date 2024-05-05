"use client";

import React, { ReactNode } from "react";

type IconWithTextProps = {
  icon: ReactNode;
  borderColor: string;
  title: string;
  text: string;
};

const IconWithText: React.FC<IconWithTextProps> = ({
  icon,
  borderColor,
  title,
  text,
}) => {
  return (
    <div className="text-center mt-4">
      <div
        className="inline-block p-8 border-8 rounded-full border-dotted"
        style={{ borderColor: borderColor }}
      >
        {icon}
      </div>
      <div className="mt-4">
        <h3 className="text-4xl font-semibold text-dark">{title}</h3>
        <p className="mt-2 text-gray-600">{text}</p>
      </div>
    </div>
  );
};

export default IconWithText;
