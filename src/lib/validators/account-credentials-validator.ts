import { z } from "zod";

export const AuthCredentialsValidator = z.object({
  email: z.string().email({ message: "Vous devez indiquer un email valide" }),
  password: z.string().min(8, {
    message: "Le mot de passe doit comporter au moins 8 caractères",
  }),
});

export const TokenValidator = z.object({
  token: z.string(),
});

export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>;
