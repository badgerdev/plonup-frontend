import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Aktualne hasło jest wymagane"),

    newPassword: z
      .string()
      .min(8, "Min. 8 znaków")
      .max(40, "Maks. 40 znaków")
      .regex(/[a-z]/, "Mała litera")
      .regex(/[A-Z]/, "Duża litera")
      .regex(/\d/, "Cyfra")
      .regex(/[\W_]/, "Znak specjalny"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Hasła muszą się zgadzać",
  });
