"use client";

import { NextPage } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "./icons";
import { MaxWidthWrapper } from "./max-witdh-wrapper";

interface FooterProps {}

export const Footer: NextPage<FooterProps> = ({}) => {
  const pathname = usePathname();
  const pathsToMinimize = ["/verify-email", "/sign-up", "/sign-in"];

  return (
    <footer className="flex-grow-0 bg-white">
      <MaxWidthWrapper>
        <div className="border-t border-gray-200">
          {pathsToMinimize.includes(pathname) ? null : (
            <div className="py-4">
              <div className="flex justify-center">
                <Icons.logo className="h-12 w-auto" />
              </div>
            </div>
          )}

          {pathsToMinimize.includes(pathname) ? null : (
            <div>
              <div className="relative flex items-center px-6 py-6 sm:px-8 sm:py-8 lg:mt-0">
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  <div
                    className="absolute  inset-0 bg-zinc-50 bg-opacity-90 bg-gradient-to-br"
                    aria-hidden="true"
                  />
                </div>
                <div className="relative mx-auto max-w-sm text-center">
                  <h3 className="font-semibold text-gray-900">
                    Devenez vendeur
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Si vous souhaitez vendre des produits numériques de haute
                    qualité, vous pouvez le faire en quelques minutes.
                    <Link
                      href={"/sign-in?as=seller"}
                      className="hover: block whitespace-nowrap font-medium text-black hover:text-zinc-800"
                    >
                      Commencer &rarr;
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="py-10 md:flex md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Tous droits réservés. GynfloDev
            </p>
          </div>

          <div className="mt-4 flex items-center justify-center md:mt-0">
            <div className="flex space-x-8">
              <Link
                href={"#"}
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Conditions
              </Link>
              <Link
                href={"#"}
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Politique en matière de cookies
              </Link>
              <Link
                href={"#"}
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Politique privée
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};
