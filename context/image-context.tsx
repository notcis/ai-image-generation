"use client";

import { generateImageAi } from "@/actions/image.action";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

interface ImageContextType {
  imagePrompt: string;
  setImagePrompt: (prompt: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  generateImage: () => Promise<void>;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [imagePrompt, setImagePrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    const res = await generateImageAi();
    if (!res?.success) {
      toast.error(res?.message || "Failed to generate image");
      return;
    }
    toast.success("Image generated successfully");
  };

  return (
    <ImageContext.Provider
      value={{
        imagePrompt,
        setImagePrompt,
        loading,
        setLoading,
        generateImage,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImageContext must be used within an ImageProvider");
  }
  return context;
};
