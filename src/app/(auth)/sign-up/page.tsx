"use client";

import { Icons } from "@/app/_components/icons";
import { Button, buttonVariants } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { cn } from "@/lib/utils";

import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodError } from "zod";

interface SignUpPageProps {}

const SignUpPage: NextPage<SignUpPageProps> = ({}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate: signUp, isLoading } =
    trpc.authRouter.createPayloadUser.useMutation({
      onError: (err) => {
        if (err.data?.code === "CONFLICT") {
          toast.error("Cet email est déjà utilisé ! Se connecter");
          return;
        }

        if (err instanceof ZodError) {
          toast.error(err.issues[0].message);
          return;
        }

        toast.error("Un problème s'est produit. Veuillez réessayer.");
      },
      onSuccess: ({ sentToEmail }) => {
        toast.success(`E-mail de vérification envoyé à ${sentToEmail}.`);
        router.push(`/verify-email?to=${sentToEmail}`);
      },
    });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    signUp({ email, password });
  };

  return (
    <div className="container relative flex flex-col items-center justify-center pt-20 lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo className="size-20" />
          <h1 className="text-2xl font-bold">Créer un compte</h1>

          <Link
            className={buttonVariants({
              variant: "link",
              className: "gap-1.5",
            })}
            href={"/sign-in"}
          >
            Vous avez déjà un compte ? S&apos;identifier
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-1 py-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  {...register("email")}
                  className={cn(errors.email && "focus-visible:ring-red-500")}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-1 py-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register("password")}
                  type="password"
                  className={cn(
                    errors.password && "focus-visible:ring-red-500",
                  )}
                  placeholder="******"
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button disabled={isLoading}>S&apos;inscrire</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
