"use client";

import { Loader2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useImageContext } from "@/context/image-context";

export default function GenerateImageInput() {
  const { generateImage, imagePrompt, setImagePrompt, loading } =
    useImageContext();
  return (
    <form onSubmit={generateImage}>
      <div className="mb-5 flex space-x-2">
        <Input
          placeholder="cat in a suit riding a bike on mars"
          className="p-6 lg:p-8 text-lg lg:text-2xl"
          value={imagePrompt}
          onChange={(e) => setImagePrompt(e.target.value)}
        />
        <Button disabled={loading} className="p-6 lg:p-8 text-lg lg:text-2xl">
          {loading ? (
            <>
              <Loader2Icon className="animate-spin mr-2" /> กำลังสร้าง...
            </>
          ) : (
            "สร้างรูปภาพด้วย AI"
          )}
        </Button>
      </div>
    </form>
  );
}
