import { cn } from "@/lib/utils";
import { NextPage } from "next";

interface MaxWidthWrapperProps {
  className?: string;
  children: React.ReactNode;
}

export const MaxWidthWrapper: NextPage<MaxWidthWrapperProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-xl px-2.5 md:px-20",
        className,
      )}
    >
      {children}
    </div>
  );
};
