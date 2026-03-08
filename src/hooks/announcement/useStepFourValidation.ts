import { useState } from "react";
import {
  stepFourPrivateSchema,
  stepFourBusinessSchema,
  StepFourPrivateData,
  StepFourBusinessData,
} from "@/lib/validators/announcements/stepFourSchemas";

export const useStepFourValidation = (userType: "private" | "business") => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: StepFourPrivateData | StepFourBusinessData) => {
    const schema =
      userType === "private" ? stepFourPrivateSchema : stepFourBusinessSchema;
    const result = schema.safeParse(data);

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
