"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/payload-types";
import { ImageIcon, X } from "lucide-react";
import { NextPage } from "next";
import Image from "next/image";

interface CartItemProps {
  product: Product;
}

export const CartItem: NextPage<CartItemProps> = ({ product }) => {
  const { image } = product.images[0];
  const { removeItem } = useCart();
  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category,
  )?.label;

  return (
    <div className="space-y-3 py-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          {/* Image */}
          <div className="relative aspect-square size-16 min-w-fit overflow-hidden rounded">
            {typeof image !== "string" && image.url ? (
              <Image
                src={image.url}
                alt={product.name}
                fill
                className="absolute object-cover"
                sizes="100%"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                <ImageIcon
                  aria-hidden="true"
                  className="size-4 text-muted-foreground"
                />
              </div>
            )}
          </div>
          {/* Details */}
          <div className="flex flex-col self-start">
            <span className="mb-1 line-clamp-1 text-sm font-medium">
              {product.name}
            </span>
            <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
              {label}
            </span>

            <div className="mt-4 text-xs text-muted-foreground">
              <button
                onClick={() => removeItem(product.id)}
                className="gap.0.5 flex items-center"
              >
                <X className="h-4 w-3" />
                Supprimer
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-1 font-medium">
          <span className="ml-auto line-clamp-1 text-sm">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
};
