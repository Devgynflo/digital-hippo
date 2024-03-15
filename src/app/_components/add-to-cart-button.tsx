"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface AddToCartButtonProps {}

export const AddToCartButton: NextPage<AddToCartButtonProps> = ({}) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isSuccess]);
  return (
    <Button
      size={"lg"}
      className="w-full"
      onClick={() => setIsSuccess(true)}
      disabled={isSuccess}
    >
      {isSuccess ? "Added !" : "Add to cart"}
    </Button>
  );
};
