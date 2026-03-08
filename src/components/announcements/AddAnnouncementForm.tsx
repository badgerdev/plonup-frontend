"use client";

import { useAnnouncementStore } from "@/store/announcement";
import StepOne from "./addingSteps/StepOne";
import StepTwoPrivate from "./addingSteps/StepTwoPrivate";
import StepTwoBusiness from "./addingSteps/StepTwoBusiness";
import StepThree from "./addingSteps/StepThree";
import StepFour from "./addingSteps/StepFour";
import StepFive from "./addingSteps/StepFive";

const AddAnnouncementForm = () => {
  const { step, userType } = useAnnouncementStore();

  switch (step) {
    case 1:
      return <StepOne />;
    case 2:
      if (userType === "private") return <StepTwoPrivate />;
      if (userType === "business") return <StepTwoBusiness />;
      return null;
    case 3:
      return <StepThree />;
    case 4:
      return <StepFour />;
    case 5:
      return <StepFive />;
    default:
      return null;
  }
};

export default AddAnnouncementForm;
