import { NextPage } from "next";
import Image from "next/image";
import { VerifyEmail } from "../_components/verify-email";

interface VerifyEmailPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const VerifyEmailPage: NextPage<VerifyEmailPageProps> = ({ searchParams }) => {
  const token = searchParams.token;
  const toEmail = searchParams.to;

  return (
    <div className="container relative flex flex-col items-center justify-center pt-20 lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {token && typeof token === "string" ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 size-60 text-muted-foreground">
              <Image
                priority
                src="/hippo-email-sent.png"
                alt="hippo email sent image"
                fill
                sizes="100%"
              />
            </div>
            <h3 className="text-2xl font-semibold">
              Consultez votre boite de réception
            </h3>
            {toEmail ? (
              <p className="text-center text-muted-foreground">
                Nous avons envoyé un lien de vérification à{" "}
                <span className="font-semibold">{toEmail}</span>
              </p>
            ) : (
              <p className="text-center text-muted-foreground">
                Nous avons envoyé un lien de vérification
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
