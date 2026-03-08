import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Min. 8 znaków")
      .max(40, "Maks. 40 znaków")
      .regex(/[a-z]/, "Mała litera")
      .regex(/[A-Z]/, "Duża litera")
      .regex(/\d/, "Cyfra")
      .regex(/[\W_]/, "Znak specjalny"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Hasła muszą się zgadzać",
  });
