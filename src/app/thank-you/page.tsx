import { PRODUCT_CATEGORIES } from "@/config";
import { getPayloadClient } from "@/get-payload";
import { formatPrice, getServerSideUser } from "@/lib/utils";
import { Product, ProductFile, User } from "@/payload-types";
import { NextPage } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PaymentStatus } from "../_components/payment-status";

interface ThankYouPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const ThankYouPage: NextPage<ThankYouPageProps> = async ({ searchParams }) => {
  const orderId = searchParams.orderId;
  const nextCookie = cookies();
  const { user } = await getServerSideUser(nextCookie);
  const payload = await getPayloadClient();
  const { docs: orders } = await payload.find({
    collection: "orders",
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  });

  const [order] = orders;

  if (!order) notFound();

  const orderUserId =
    typeof order.user === "string" ? order.user : order.user.id;

  if (orderUserId !== user?.id) {
    redirect(`/sign-in?origin=thank-you?orderId=${order.id}`);
  }

  const fee = 1;
  const orderTotal = (order.products as Product[]).reduce((acc, curr) => {
    return (acc += curr.price);
  }, 0);

  return (
    <main className="relative lg:min-h-full">
      <div className="hidden h-80 overflow-hidden lg:absolute lg:block lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
        <Image
          priority
          sizes="100%"
          src="/checkout-thank-you.jpg"
          alt="thank-you-image"
          fill
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
          <div className="lg:col-start-2">
            <p className="text-sm font-medium text-blue-600">
              Commande réussie
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Merci de votre commande
            </h1>
            {order._isPaid ? (
              <p className="mt-2 text-base text-muted-foreground">
                Votre commande a été traitée et vos actifs peuvent être
                téléchargés ci-dessous.Nous avons envoyé votre reçu et les
                détails de votre commande à{" "}
                {typeof order.user !== "string" ? (
                  <span className="font-medium text-gray-900">
                    {order.user.email}
                  </span>
                ) : null}
                .
              </p>
            ) : (
              <p className="mt-2 text-base text-muted-foreground">
                Nous apprécions votre commande et nous sommes en train de la
                traiter. Nous vous enverrons une confirmation très bientôt !
              </p>
            )}

            <div className="mt-16 text-sm font-medium">
              <div className="text-muted-foreground">Order nr.</div>
              <div className="mt-2 text-gray-900">{order.id}</div>
            </div>

            <ul className="border-gary-200 mt-6 divide-y divide-gray-200 border-t text-sm text-muted-foreground">
              {(order.products as Product[]).map((product) => {
                const label = PRODUCT_CATEGORIES.find(
                  ({ value }) => value === product.category,
                )?.label;

                const downloadUrl = (product.product_files as ProductFile)
                  .url as string;

                const { image } = product.images[0];
                return (
                  <li key={product.id} className="flex space-x-6 py-6">
                    <div className="relative size-24">
                      {typeof image !== "string" && image.url && (
                        <Image
                          className="flex-none rounded-md bg-gray-100 object-cover object-center"
                          src={image.url}
                          alt={`${image.url} image`}
                          fill
                        />
                      )}
                    </div>

                    <div className="flex flex-auto flex-col justify-between">
                      <div className="space-y-1">
                        <h3 className="text-gray-900">{product.name}</h3>

                        <p className="my-1">Catégorie: {label}</p>
                      </div>

                      {order._isPaid && (
                        <a
                          href={downloadUrl}
                          download={product.name}
                          className=" text-blue-600 underline-offset-2 transition hover:underline"
                        >
                          Télécharger
                        </a>
                      )}
                    </div>

                    <p className="flex-none font-medium text-gray-900">
                      {formatPrice(product.price)}
                    </p>
                  </li>
                );
              })}
            </ul>

            <div className="space-y-6 border-t border-gray-200 pt-8 text-sm font-medium text-muted-foreground">
              <div className="flex justify-between">
                <p>Sous-total :</p>
                <p className="text-gray-900">{formatPrice(orderTotal)}</p>
              </div>

              <div className="flex justify-between">
                <p>Frais de transaction :</p>
                <p className="text-gray-900">{formatPrice(fee)}</p>
              </div>
            </div>

            <div className="text-gray flex items-center justify-between border-t border-gray-200 pt-6">
              <p className="text-base">Total :</p>
              <p className="text-base">{formatPrice(orderTotal + fee)}</p>
            </div>
          </div>

          <PaymentStatus
            orderEmail={(order.user as User).email}
            orderId={order.id}
            isPaid={order._isPaid}
          />

          <div className="mt-16 border-t border-gray-200 py-6 text-right">
            <Link
              href={"/products"}
              className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
            >
              Continuer les achats &rarr;
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ThankYouPage;
