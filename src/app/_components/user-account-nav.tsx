"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { User } from "@/payload-types";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { NextPage } from "next";
import Link from "next/link";
import { Button } from "./ui/button";

interface UserAccountNavProps {
  user: User;
}

export const UserAccountNav: NextPage<UserAccountNavProps> = ({ user }) => {
  const { signOut } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button variant={"ghost"} size={"sm"} className="relative">
          My account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="text-sm font-medium text-black">{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={"/sell"}>Seller Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={signOut}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
