import { forgotPasswordSchema } from "@/lib/validators/auth/forgotPasswordSchema";
import { z } from "zod";
import { useState } from "react";

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export const useForgotPasswordValidation = () => {
  const [errors, setErrors] = useState<
    Partial<Record<keyof ForgotPasswordData, string>>
  >({});

  const validate = (data: ForgotPasswordData): boolean => {
    const result = forgotPasswordSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: typeof errors = {};
      for (const err of result.error.errors) {
        const field = err.path[0] as keyof ForgotPasswordData;
        fieldErrors[field] = err.message;
      }
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  return { validate, errors };
};
