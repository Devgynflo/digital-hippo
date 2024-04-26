export const PRODUCT_CATEGORIES = [
  {
    label: "UI Kits",
    value: "ui_kits" as const,
    featured: [
      {
        name: "Choix de la rédaction",
        href: "/products?category=ui_kits",
        imageSrc: "/nav/ui-kits/mixed.jpg",
      },
      {
        name: "Nouveaux arrivages",
        href: "/products?category=ui_kits?sort=desc",
        imageSrc: "/nav/ui-kits/blue.jpg",
      },
      {
        name: "Meilleures ventes",
        href: "/products?category=ui_kits",
        imageSrc: "/nav/ui-kits/purple.jpg",
      },
    ],
  },
  {
    label: "Icons",
    value: "icons" as const,
    featured: [
      {
        name: "Choix des icônes préférées",
        href: "/products?category=icons",
        imageSrc: "/nav/icons/picks.jpg",
      },
      {
        name: "Nouveaux arrivages",
        href: "/products?category=icons?sort=desc",
        imageSrc: "/nav/icons/new.jpg",
      },
      {
        name: "Meilleures ventes Icons",
        href: "/products?category=icons",
        imageSrc: "/nav/icons/bestsellers.jpg",
      },
    ],
  },
];
