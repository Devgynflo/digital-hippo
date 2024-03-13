import { z } from "zod";

export const AuthCredentialsValidator = z.object({
  email: z.string().email({ message: "You must put a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const TokenValidator = z.object({
  token: z.string(),
});

export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>;
