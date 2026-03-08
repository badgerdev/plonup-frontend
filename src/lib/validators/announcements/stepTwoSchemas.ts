import { z } from "zod";

export const stepTwoPrivateSchema = z.object({
  title: z
    .string()
    .min(5, "Tytuł musi mieć co najmniej 5 znaków")
    .max(60, "Tytuł może mieć maksymalnie 100 znaków"),
  description: z
    .string()
    .min(15, "Opis musi mieć co najmniej 10 znaków")
    .max(750, "Opis może mieć maksymalnie 750 znaków"),
  category: z.string().nonempty("Kategoria jest wymagana"),
  listingType: z.enum(["sale_or_exchange", "free"], {
    errorMap: () => ({ message: "Wybierz formę ogłoszenia" }),
  }),
});

export const stepTwoBusinessSchema = z.object({
  title: z
    .string()
    .min(5, "Tytuł musi mieć co najmniej 5 znaków")
    .max(60, "Tytuł może mieć maksymalnie 60 znaków"),
  description: z
    .string()
    .min(15, "Opis musi mieć co najmniej 15 znaków")
    .max(750, "Opis może mieć maksymalnie 750 znaków"),
  businessName: z
    .string()
    .min(2, "Nazwa firmy jest wymagana")
    .max(100, "Nazwa może mieć maksymalnie 100 znaków"),
  category: z.string().nonempty("Kategoria jest wymagana"),
  listingType: z.enum(["sale_or_exchange", "free"], {
    errorMap: () => ({ message: "Wybierz formę ogłoszenia" }),
  }),
});

export type StepTwoPrivateData = z.infer<typeof stepTwoPrivateSchema>;
export type StepTwoBusinessData = z.infer<typeof stepTwoBusinessSchema>;
