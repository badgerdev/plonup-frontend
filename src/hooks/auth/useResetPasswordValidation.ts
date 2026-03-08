import { resetPasswordSchema } from "@/lib/validators/auth/resetPasswordSchema";
import { z } from "zod";
import { useState } from "react";

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export const useResetPasswordValidation = () => {
  const [errors, setErrors] = useState<
    Partial<Record<keyof ResetPasswordData, string>>
  >({});

  const validate = (data: ResetPasswordData): boolean => {
    const result = resetPasswordSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: typeof errors = {};
      for (const err of result.error.errors) {
        const field = err.path[0] as keyof ResetPasswordData;
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
