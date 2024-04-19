import React from "react";
import Link from "next/link";

interface NewsItemProps {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

const NewsItem: React.FC<NewsItemProps> = ({
  title,
  description,
  url,
  urlToImage,
}) => {
  return (
    <Link href={url} target='_blank'>
      <div className="block mx-auto bg-white shadow-md rounded-md overflow-hidden my-4 pb-8">
        <img
          src={urlToImage}
          alt={title}
          className="w-full h-96 object-cover object-center"
        />
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-600">{description}</p>
          <span className="text-blue-500 font-semibold mt-2 block">
            Leia mais
          </span>
        </div>
      </div>
    </Link>
  );
};

export default NewsItem;
