"use server";

import { auth } from "@/auth";
import { OpenAI } from "openai";
import cloudinary from "cloudinary";
import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma";

// Initialize OpenAI and Cloudinary with environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to generate an image using OpenAI and upload it to Cloudinary
export async function generateImageAi({
  imagePrompt,
}: {
  imagePrompt: string;
}) {
  // Authenticate the user
  const session = await auth();
  if (!session?.user.id) {
    return {
      success: false,
      message: "User not authenticated",
    };
  }

  try {
    // Generate an image using OpenAI's DALL-E model
    const response = await openai.images.generate({
      prompt: imagePrompt,
      model: "dall-e-2",
      n: 1,
      size: "512x512",
      response_format: "b64_json",
    });

    // Check if the response contains image data
    if (!response?.data?.length) {
      return {
        success: false,
        message: "No image generated",
      };
    }
    // Extract the base64 image data
    const image_data = response.data[0].b64_json;

    // Convert the base64 string to a buffer
    if (!image_data) {
      return {
        success: false,
        message: "No image generated",
      };
    }

    const buffer = Buffer.from(image_data, "base64");

    // Upload the image buffer to Cloudinary
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uploadResponse: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          folder: "ai-images",
          public_id: nanoid(),
        },
        (error, result) => {
          if (error || !result) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });

    // Get the Cloudinary URL
    const cloudinaryUrl = uploadResponse.secure_url;
    if (!cloudinaryUrl) {
      return {
        success: false,
        message: "Error uploading image",
      };
    }

    // Save the image data to the database
    const image = await prisma.image.create({
      data: {
        url: cloudinaryUrl,
        prompt: imagePrompt,
        userId: session.user.id,
      },
    });

    return {
      success: true,
      message: "Image generated successfully",
      id: image.id,
    };
  } catch (error) {
    console.log("Error generating image:", error);
    return {
      success: false,
      message: "Error generating image",
    };
  }
}
