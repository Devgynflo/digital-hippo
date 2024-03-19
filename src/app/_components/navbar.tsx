import { Cart } from "@/app/_components/cart";
import { Icons } from "@/app/_components/icons";
import { MaxWidthWrapper } from "@/app/_components/max-witdh-wrapper";
import { NavItems } from "@/app/_components/nav-items";
import { buttonVariants } from "@/app/_components/ui/button";
import { getServerSideUser } from "@/lib/utils";

import { NextPage } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { UserAccountNav } from "./user-account-nav";
import { MobileNav } from "./mobile-nav";

interface NavbarProps {}

export const Navbar: NextPage<NavbarProps> = async ({}) => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <div className="sticky inset-x-0 top-0 z-50 h-16 bg-white">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <MobileNav />
              <div className="ml-4 flex lg:ml-0">
                <Link href={"/"}>
                  <Icons.logo className="size-10" />
                </Link>
              </div>

              <div className="z-50 hidden lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link
                      href={"/sign-in"}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Sign in
                    </Link>
                  )}

                  {user ? null : (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  )}

                  {user ? (
                    <UserAccountNav user={user} />
                  ) : (
                    <Link
                      href={"/sign-up"}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Create account
                    </Link>
                  )}

                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                    </div>
                  )}

                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};
