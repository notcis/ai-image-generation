import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";

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
        {page > 1 && (
          <li>
            <Link href={`?page=${page - 1}`}>
              <Button variant="ghost">
                <ChevronsLeftIcon />
              </Button>
            </Link>
          </li>
        )}

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <li key={p}>
            <Link href={`?page=${p}`}>
              <Button variant={p === page ? "secondary" : "ghost"}>{p}</Button>
            </Link>
          </li>
        ))}
        {page < totalPages && (
          <li>
            <Link href={`?page=${page + 1}`}>
              <Button variant="ghost">
                <ChevronsRightIcon />
              </Button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
