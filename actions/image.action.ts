"use server";

import { auth } from "@/auth";
import { OpenAI } from "openai";
import fs from "fs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateImageAi() {
  const user = await auth();
  if (!user) {
    return {
      success: false,
      message: "User not authenticated",
    };
  }

  try {
    const response = await openai.images.generate({
      prompt: "orange cat on a skateboard",
      model: "dall-e-2",
      n: 1,
      size: "512x512",
      quality: "standard",
      response_format: "b64_json",
    });

    if (!response?.data?.length) {
      return {
        success: false,
        message: "No image generated",
      };
    }
    const image_base64 = response.data[0].b64_json;

    if (!image_base64) {
      return {
        success: false,
        message: "No image generated",
      };
    }
    const image_bytes = Buffer.from(image_base64, "base64");
    fs.writeFileSync("test.png", image_bytes);

    return {
      success: true,
      message: "Image generated successfully",
    };
  } catch (error) {
    console.log("Error generating image:", error);
    return {
      success: false,
      message: "Error generating image",
    };
  }
}
