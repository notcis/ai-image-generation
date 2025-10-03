import Link from "next/link";
import { Button } from "../ui/button";

export default function Pagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  return (
    <nav className=" flex justify-center fixed-bottom opacity-75 mb-10">
      <ul className=" flex justify-center items-center space-x-2 mt-5">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <li key={p}>
            <Link href={`?page=${p}`}>
              <Button variant={p === page ? "secondary" : "ghost"}>{p}</Button>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
