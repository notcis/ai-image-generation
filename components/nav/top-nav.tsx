"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import UserNav from "./user-nav";
import { LogInIcon } from "lucide-react";

export default function TopNav() {
  const { data: session, status } = useSession();
  return (
    <div className="flex items-center justify-center p-5 shadow space-x-10">
      <div className="text-2xl font-bold">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="ai image generator"
            width={50}
            height={50}
          />
        </Link>
      </div>
      <div className=" flex flex-col items-center">
        {status === "loading" ? (
          "Loading..."
        ) : !session?.user ? (
          <LogInIcon
            className="h-10 w-10 cursor-pointer text-primary"
            onClick={() => signIn()}
          />
        ) : (
          <UserNav user={session.user} />
        )}
      </div>
    </div>
  );
}
