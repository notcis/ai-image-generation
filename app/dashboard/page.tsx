import { getUserImagesFromDb } from "@/actions/image.action";
import ImageCard from "@/components/cards/image-card";
import Pagination from "@/components/nav/pagination";
import { ImageType } from "@/lib/types";
import Link from "next/link";

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
      <div className=" flex justify-center m-20">
        <Pagination page={page} totalPages={pagination.totalPages} />
      </div>
    </div>
  );
}
