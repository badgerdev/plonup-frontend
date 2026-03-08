import { changePasswordSchema } from "@/lib/validators/auth/changePasswordSchema";
import { z } from "zod";
import { useState } from "react";

type ChangePasswordData = z.infer<typeof changePasswordSchema>;

export const useChangePasswordValidation = () => {
  const [errors, setErrors] = useState<
    Partial<Record<keyof ChangePasswordData, string>>
  >({});

  const validate = (data: ChangePasswordData): boolean => {
    const result = changePasswordSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      for (const err of result.error.errors) {
        const field = err.path[0] as keyof ChangePasswordData;
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
