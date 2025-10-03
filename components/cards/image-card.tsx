import { ImageType } from "@/lib/types";
import { Card, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function ImageCard({ image }: { image: ImageType }) {
  return (
    <Card className="w-full max-w-lg mx-10 transform transition duration-300 hover:scale-105 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center space-x-4 p-2">
        <div className="w-16 h-16 relative overflow-hidden">
          {image.url && (
            <Image
              src={image.url}
              alt={image.prompt || "AI Generated Image"}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <CardTitle className="text-lg line-clamp-1">
            {image.prompt || "No Prompt"}
          </CardTitle>
          <p className=" text-sm text-muted-foreground">
            {dayjs(image.createdAt).fromNow()}
          </p>
          <p className=" text-[12px] text-muted-foreground">
            {image.user.name || "Anonymous"}
          </p>
        </div>
      </CardHeader>
    </Card>
  );
}
