import { registerSchema } from "@/lib/validators/auth/registerSchema";
import { z } from "zod";
import { useState } from "react";

type RegisterData = z.infer<typeof registerSchema>;

export const useRegisterValidation = () => {
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterData, string>>
  >({});

  const validate = (data: RegisterData): boolean => {
    const result = registerSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      for (const err of result.error.errors) {
        const field = err.path[0] as keyof RegisterData;
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
