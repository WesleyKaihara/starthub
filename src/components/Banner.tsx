import React from "react";
import { useEffect, useState } from "react";

type TargetOptions = "_self" | "_blank" | "_parent" | "_top";

interface BannerProps {
  imageUrl: string;
  link?: string;
  alt: string;
  target?: TargetOptions;
}

const Banner: React.FC<BannerProps> = ({ imageUrl, link, alt, target }) => {
  const [bannerHeight, setBannerHeight] = useState<number>(0);

  useEffect(() => {
    const setHeight = () => {
      const windowHeight = window.innerHeight;
      const quarterHeight = windowHeight / 4;
      setBannerHeight(quarterHeight);
    };

    setHeight();
    window.addEventListener("resize", setHeight);
    return () => {
      window.removeEventListener("resize", setHeight);
    };
  }, []);

  return (
    <a
      className="mb-12"
      href={link}
      target={target}
      rel="noopener noreferrer"
      style={{ width: "100%", height: bannerHeight, display: "block" }}
    >
      <img
        src={imageUrl}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </a>
  );
};

export default Banner;
