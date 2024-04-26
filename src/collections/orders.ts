import { Access, CollectionConfig } from "payload/types";

const yourOwnOrAdmin: Access = ({ req: { user } }) => {
  if (user.role === "admin") return true;

  return {
    user: {
      equals: user.id,
    },
  };
};

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "Vos commandes",
    description: "Un récapitulatif de toutes vos commandes sur DigitalHippo",
  },
  access: {
    create: ({ req }) => req.user.role === "admin",
    read: yourOwnOrAdmin,
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
  },
  fields: [
    {
      name: "_isPaid",
      type: "checkbox",
      access: {
        read: ({ req }) => req.user.role === "admin",
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      admin: {
        hidden: true,
      },
      relationTo: "users",
      required: true,
    },
    {
      name: "products",
      type: "relationship",
      hasMany: true,
      relationTo: "products",
      required: true,
    },
  ],
};
