"use client";

import { useCart } from "@/hooks/use-cart";
import { Product } from "@/payload-types";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface AddToCartButtonProps {
  product: Product;
}

export const AddToCartButton: NextPage<AddToCartButtonProps> = ({
  product,
}) => {
  const { addItem } = useCart();
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
      onClick={() => {
        addItem(product);
        setIsSuccess(true);
      }}
      disabled={isSuccess}
    >
      {isSuccess ? "Ajouté !" : "Ajouter au panier"}
    </Button>
  );
};
