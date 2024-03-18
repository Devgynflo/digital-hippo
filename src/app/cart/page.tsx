"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useCart } from "@/hooks/use-cart";
import { cn, formatPrice } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { Check, Loader2, X } from "lucide-react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../_components/ui/button";

interface CartPageProps {}

const CartPage: NextPage<CartPageProps> = ({}) => {
  const fee = 1;
  const router = useRouter();
  const { items, removeItem } = useCart();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const cartTotal = items.reduce((acc, curr) => {
    return (acc += Number(curr.product.price));
  }, 0);
  const productIds = items.map(({ product }) => product.id);

  const { mutate: createCheckoutSession, isLoading } =
    trpc.paymentRouter.createSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) router.push(url);
      },
    });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-gray-9000 text-3xl font-bold tracking-tight sm:text-4xl">
          Shopping Cart
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div
            className={cn(
              "lg:col-span-7",
              !items.length &&
                "rounded-lg border-2 border-dashed border-zinc-200 p-12",
            )}
          >
            <h2 className="sr-only">Items in your shopping cart</h2>
            {!items.length && (
              <div className="flex h-full flex-col items-center justify-center space-y-1">
                <div
                  className="relative mb-4 size-40 text-muted-foreground"
                  aria-hidden={"true"}
                >
                  <Image
                    src={"/hippo-empty-cart.png"}
                    loading="eager"
                    fill
                    priority
                    sizes="100%"
                    alt="empty cart"
                  />
                </div>
                <h3 className="text-2xl font-semibold">Your cart is empty</h3>
                <p className="text-center text-muted-foreground">
                  Whoops ! Nothing to show here yet
                </p>
              </div>
            )}

            <ul
              className={cn(
                items.length &&
                  "divide-y divide-gray-200 border-b border-t border-gray-200",
              )}
            >
              {items.map(({ product }) => {
                const label = PRODUCT_CATEGORIES.find(
                  (c) => c.value === product.category,
                )?.label;
                const { image } = product.images[0];

                return (
                  <li key={product.id} className="flex py-6 sm:px-10">
                    <div className="flex-shrink-0">
                      <div className="relative size-24 sm:size-32">
                        {typeof image !== "string" && image.url && (
                          <Image
                            fill
                            sizes="100%"
                            alt="product image"
                            src={image.url}
                            className="h-full w-full rounded-md object-cover object-center "
                          />
                        )}
                      </div>
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <Link
                                href={`/product/${product.id}`}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {product.name}
                              </Link>
                            </h3>
                          </div>

                          <div className="mt-1 flex text-sm">
                            <p className="text-muted-foreground">
                              Category: {label}
                            </p>
                          </div>

                          <p className="mt-1 text-sm font-medium text-gray-900">
                            {formatPrice(product.price)}
                          </p>
                        </div>

                        <div className="mt-4 w-20 sm:mt-0 sm:pr-9">
                          <div className="absolute right-0 top-0">
                            <Button
                              onClick={() => removeItem(product.id)}
                              aria-label="remove product"
                              variant={"ghost"}
                            >
                              <X className="size-5" aria-hidden="true" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                        <Check className="size-5 flex-shrink-0 text-green-500" />
                        <span>Eligible for instant delivery</span>
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

            <div className="mt-6 space-y-4">
              <div className="items-cneter flex justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm text-gray-900">
                  {isMounted ? (
                    formatPrice(cartTotal)
                  ) : (
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                  )}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Flat Transaction fee</span>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {isMounted ? (
                    formatPrice(fee)
                  ) : (
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="text-base font-medium text-gray-900">
                  Order Total
                </div>
                <div className="text-base font-medium text-gray-900">
                  {isMounted ? (
                    formatPrice(cartTotal + fee)
                  ) : (
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button
                disabled={!items.length || isLoading}
                className="w-full"
                size={"lg"}
                onClick={() => createCheckoutSession({ productIds })}
              >
                {isLoading && (
                  <Loader2 className="ml-1.5 size-4 animate-spin" />
                )}
                Checkout
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
