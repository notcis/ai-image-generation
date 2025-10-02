import { getUserImagesFromDb } from "@/actions/image.action";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: number }>;
}) {
  const page = (await searchParams)?.page || 1;

  const limit = 12;

  const { images, total, pagination } = await getUserImagesFromDb(page, limit);

  return (
    <div>
      <div className=" p-5 text-center">
        <h1 className=" text-2xl font-bold text-center">รูปภาพของฉัน</h1>
        <p>รูปภาพที่สร้างขึ้นโดย AI</p>
      </div>
      <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {images.map((image) => (
          <Link key={image.id} href={`/dashboard/image/${image.id}`}>
            <ImageCard image={image as ImageType} />
          </Link>
        ))}
      </div>
    </div>
  );
}

function ImageCard({ image }: { image: ImageType }) {
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
