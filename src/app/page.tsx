import { MaxWidthWrapper } from "@/app/_components/max-witdh-wrapper";
import { ProductReel } from "@/app/_components/product-reel";
import { Button, buttonVariants } from "@/app/_components/ui/button";
import { ArrowDownToLineIcon, CheckCircle, Leaf } from "lucide-react";
import Link from "next/link";

const perks = [
  {
    name: "Livraison immédiate",
    Icon: ArrowDownToLineIcon,
    description:
      "Recevez vos actifs par courrier électronique en quelques secondes et téléchargez-les immédiatement.",
  },
  {
    name: "Qualité garantie",
    Icon: CheckCircle,
    description:
      "Chaque actif sur notre plateforme est vérifié par notre équipe afin de garantir les normes de qualité les plus élevées.",
  },
  {
    name: "Pour la planète",
    Icon: Leaf,
    description:
      "Nous nous engageons à consacrer 1% des ventes à la préservation et à la restauration de l'environnement naturel.",
  },
];

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="mx-auto flex max-w-3xl flex-col items-center py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Votre market pour des produits de qualité{" "}
            <span className="text-blue-600">biens numériques</span>
          </h1>

          <p className="mt-6 max-w-prose text-lg text-muted-foreground">
            Bienvenue sur DigitalHippo. Chaque actif sur notre plateforme est
            vérifié par notre équipe afin de garantir les plus hauts standards
            de qualité.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link href="/products" className={buttonVariants()}>
              Explorer les tendances
            </Link>
            <Button variant={"ghost"}>Notre promesse de qualité &rarr;</Button>
          </div>
        </div>

        <ProductReel
          title="Derniers Arrivages"
          href="/products"
          query={{ sort: "desc", limit: 2 }}
        />
      </MaxWidthWrapper>
      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="flex justify-center md:flex-shrink-0">
                  <div className="flex size-16 items-center justify-center rounded-full bg-blue-100 text-blue-900">
                    {<perk.Icon className="size-1/3" />}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
