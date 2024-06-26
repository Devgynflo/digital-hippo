"use client";

import { buttonVariants } from "@/app/_components/ui/button";
import { trpc } from "@/trpc/client";
import { Loader2, XCircle } from "lucide-react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

interface VerifyEmailProps {
  token: string;
}

export const VerifyEmail: NextPage<VerifyEmailProps> = ({ token }) => {
  const { data, isLoading, isError } = trpc.authRouter.verifyEmail.useQuery({
    token,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="size-8 text-red-800" />
        <h3 className="text-xl font-semibold">Il y a eu un problème</h3>
        <p className="text-sm text-muted-foreground">
          Ce token n&apos;est pas valide ou pourrait avoir expiré. Veuillez
          réessayer
        </p>
      </div>
    );
  }

  if (data?.success) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="relative mb-4 size-60 text-muted-foreground">
          <Image
            src="/hippo-email-sent.png"
            alt="hippo email sent"
            fill
            priority
            sizes="100%"
          />
        </div>
        <h3 className="text-2xl font-semibold">You&apos;re all set</h3>
        <p className="mt-1 text-center text-muted-foreground">
          Merci de vérifier l&apos;adresse électronique.
        </p>

        <Link
          href={"/sign-in"}
          className={buttonVariants({ className: "mt-4" })}
        >
          Connexion
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="size-8 animate-spin text-blue-400" />
        <h3 className="text-xl font-semibold">Vérification...</h3>
        <p className="text-sm text-muted-foreground">
          Cela ne durera pas longtemps.
        </p>
      </div>
    );
  }
};
