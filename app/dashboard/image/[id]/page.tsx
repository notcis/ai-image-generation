import { getImageFromDb } from "@/actions/image.action";
import Image from "next/image";

export default async function ImagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const image = await getImageFromDb(id);
  if (!image) {
    return <div>Image not found</div>;
  }
  return (
    <div className=" flex flex-col max-w-4xl mx-auto justify-center items-center p-4">
      <div className=" relative w-full h-[60vh] mb-8">
        {image.url && (
          <Image
            src={image.url}
            alt={image.prompt || "Generated Image"}
            fill
            className="rounded-lg object-contain"
          />
        )}
      </div>
      <div></div>
    </div>
  );
}
