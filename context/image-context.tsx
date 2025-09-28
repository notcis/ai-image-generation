"use client";

import { generateImageAi } from "@/actions/image.action";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

interface ImageContextType {
  imagePrompt: string;
  setImagePrompt: (prompt: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  generateImage: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [imagePrompt, setImagePrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const generateImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!imagePrompt) {
      toast.error("Please enter a prompt");
      setLoading(false);
      return;
    }
    const res = await generateImageAi({ imagePrompt });
    if (!res?.success) {
      toast.error(res?.message || "Failed to generate image");
      return;
    }
    toast.success("Image generated successfully");
    setImagePrompt("");
    setLoading(false);
    router.push(`/dashboard/image/${res.id}`);
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
