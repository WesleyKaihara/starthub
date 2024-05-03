"use client";

import React from "react";

type TitleWithSubtitleProps = {
  subtitle: string;
  title: string;
};

const TitleWithSubtitle: React.FC<TitleWithSubtitleProps> = ({
  subtitle,
  title,
}) => {
  return (
    <div className="text-center">
      <h2 className="text-primary text-2xl font-light">{subtitle}</h2>
      <h1 className="text-dark text-4xl">{title}</h1>
    </div>
  );
};

export default TitleWithSubtitle;
