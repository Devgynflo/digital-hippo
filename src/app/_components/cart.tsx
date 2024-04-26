"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CartItem } from "./cart-item";
import { buttonVariants } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

interface CartProps {}

export const Cart: NextPage<CartProps> = ({}) => {
  const { items } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  const itemCount = items.length;
  const fee = 1;
  const cartTotal = items.reduce((acc, curr) => {
    return (acc += curr.product.price);
  }, 0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <ShoppingCart
          aria-hidden="true"
          className="size-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {itemCount}
        </span>
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Panier ({itemCount})</SheetTitle>
        </SheetHeader>

        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              <ScrollArea>
                {items.map(({ product }, i) => (
                  <CartItem product={product} key={`product-[${i}]`} />
                ))}
              </ScrollArea>
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Frais d&apos;expédition</span>
                  <span>Gratuit</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Frais de transaction</span>
                  <span>{formatPrice(fee)}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{formatPrice(cartTotal + fee)}</span>
                </div>
              </div>
            </div>

            <SheetFooter>
              <SheetTrigger asChild>
                <Link
                  href={"/cart"}
                  className={buttonVariants({ className: "w-full" })}
                >
                  Poursuivre le paiement
                </Link>
              </SheetTrigger>
            </SheetFooter>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div
              className="relative mb-4 size-60 text-muted-foreground"
              aria-hidden="true"
            >
              <Image
                src={"/hippo-empty-cart.png"}
                alt="empty-shopping-cart"
                sizes="100%"
                fill
              />
            </div>
            <div className="text-xl font-semibold">Votre panier est vide</div>
            <SheetTrigger asChild>
              <Link
                href={"/products"}
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Ajoutez les articles à votre panier et passez au paiement.
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
