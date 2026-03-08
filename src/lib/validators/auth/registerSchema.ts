import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(4, "Nazwa użytkownika jest wymagana")
      .max(20, "Maksymalnie 16 znaków")
      .regex(/^[a-zA-Z0-9_ ]+$/, "Tylko litery, cyfry, spacje i _"),

    email: z.string().email("Nieprawidłowy e-mail"),

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
