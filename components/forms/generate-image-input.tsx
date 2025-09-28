"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useImageContext } from "@/context/image-context";

export default function GenerateImageInput() {
  const { generateImage } = useImageContext();
  return (
    <div className="mb-5 flex space-x-2">
      <Input placeholder="cat flying" className="p-6" />
      <Button onClick={generateImage} className="p-6">
        สร้างรูปภาพ
      </Button>
    </div>
  );
}
