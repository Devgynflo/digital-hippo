import { clsx, type ClassValue } from "clsx";
import { Metadata } from "next";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextRequest } from "next/server";
import { twMerge } from "tailwind-merge";
import { User } from "../payload-types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "GPB" | "BDT";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {},
) {
  const { currency = "EUR", notation = "compact" } = options;

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}

export const getServerSideUser = async (
  cookies: NextRequest["cookies"] | ReadonlyRequestCookies,
) => {
  const token = cookies.get("payload-token")?.value;

  const meRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
    {
      headers: {
        Authorization: `JWT ${token}`,
      },
    },
  );

  const { user } = (await meRes.json()) as { user: User | null };

  return { user };
};

export function constructMetadata({
  title = "DigitalHippo - the marketplace for digital assets",
  description = "DigitalHippo is an open-source marketplace for high-quality digital goods.",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@joshtriedcoding",
    },
    icons,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL!),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
