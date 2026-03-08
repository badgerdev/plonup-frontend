import { z } from "zod";

const postalCodeRegex = /^\d{2}-\d{3}$/;
const phoneRegex = /^\+48\s\d{3}\s\d{3}\s\d{3}$/;

export const stepFourPrivateSchema = z
  .object({
    location: z
      .string()
      .min(1, "Miasto jest wymagane")
      .max(80, "Maksymalna Ilośc znaków w Adresie to 80"),
    postalCode: z
      .string()
      .regex(postalCodeRegex, "Kod pocztowy musi być w formacie XX-XXX"),
    email: z
      .string()
      .email("Nieprawidłowy e-mail")
      .optional()
      .or(z.literal("")),
    phone: z
      .string()
      .regex(phoneRegex, "Numer telefonu musi być w formacie +48 123 456 789")
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.email || data.phone, {
    message: "Podaj e-mail lub numer telefonu",
    path: ["email"],
  });

export const stepFourBusinessSchema = z
  .object({
    location: z
      .string()
      .min(1, "Miasto jest wymagane")
      .max(30, "Maksymalna Ilośc znaków to 30"),
    address: z
      .string()
      .min(1, "Adres jest wymagany")
      .max(80, "Maksymalna Ilośc znaków w Adresie to 80"),
    postalCode: z
      .string()
      .regex(postalCodeRegex, "Kod pocztowy musi być w formacie XX-XXX"),
    openingHours: z.string().min(1, "Godziny otwarcia są wymagane"),
    email: z
      .string()
      .email("Nieprawidłowy e-mail")
      .optional()
      .or(z.literal("")),
    phone: z
      .string()
      .regex(phoneRegex, "Numer telefonu musi być w formacie +48 123 456 789")
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.email || data.phone, {
    message: "Podaj e-mail lub numer telefonu",
    path: ["email"],
  });

export type StepFourPrivateData = z.infer<typeof stepFourPrivateSchema>;
export type StepFourBusinessData = z.infer<typeof stepFourBusinessSchema>;
