import { getUserImagesFromDb } from "@/actions/image.action";

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
      <div></div>
    </div>
  );
}
