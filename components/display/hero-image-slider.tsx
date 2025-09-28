"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const thumbnails = [
  "/images/mountain.jpg",
  "/images/city.jpg",
  "/images/desert.jpg",
  "/images/sea.jpg",
];

export default function HeroImageSlider() {
  const [currentImage, setCurrentImage] = useState(thumbnails[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        const currentIndex = thumbnails.indexOf(prev);
        const nextIndex = (currentIndex + 1) % thumbnails.length;
        return thumbnails[nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[40vh] p-8 max-w-4xl mx-auto">
      <Image
        src={currentImage}
        alt="mountain Image"
        fill
        className="object-cover rounded-[20px]"
      />
      <ThumbnailRow
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
      />
    </div>
  );
}

const ThumbnailRow = ({
  currentImage,
  setCurrentImage,
}: {
  currentImage: string;
  setCurrentImage: (thumb: string) => void;
}) => {
  return (
    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex bg-slate-100/50 rounded-[20px] p-4 shadow-lg w-auto max-w-full space-x-5 overflow-x-auto">
      {thumbnails.map((src, index) => (
        <div
          key={index}
          onClick={() => setCurrentImage(src)}
          className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-[20px] overflow-hidden shadow-md transition-transform transform hover:scale-105 flex-shrink-0 cursor-pointer"
        >
          <Image
            src={src}
            alt={`Thumbnail ${index + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
};
