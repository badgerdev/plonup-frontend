import { useState } from "react";
import {
  stepTwoPrivateSchema,
  stepTwoBusinessSchema,
} from "@/lib/validators/announcements/stepTwoSchemas";

export const useStepTwoPrivateValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: {
    title: string;
    description: string;
    category: string;
    listingType: string;
  }) => {
    const result = stepTwoPrivateSchema.safeParse(data);

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((e) => {
        const field = e.path[0] as string;
        newErrors[field] = e.message;
      });
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  return { validate, errors };
};

export const useStepTwoBusinessValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: {
    title: string;
    description: string;
    businessName: string;
    category: string;
    listingType: string | null;
  }) => {
    const result = stepTwoBusinessSchema.safeParse({
      ...data,
      listingType: data.listingType ?? "",
    });

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((e) => {
        const field = e.path[0] as string;
        newErrors[field] = e.message;
      });
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  return { validate, errors };
};
