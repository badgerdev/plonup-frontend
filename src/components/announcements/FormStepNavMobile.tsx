"use client";

import FormStepNav from "./FormStepNav";

type Props = {
  nextDisabled?: boolean;
  onNext?: () => void;
};

/**
 * Sticky pasek z przyciskami "← Wróć" i "Dalej →"
 * widoczny tylko na mobile. Obsługuje też onNext.
 */
export const FormStepNavMobile = ({ nextDisabled, onNext }: Props) => {
  return (
    <div
      className="
        fixed bottom-0 left-0 right-0 z-50
        border-t bg-white/95 backdrop-blur-md shadow-md
        lg:hidden safe-bottom
      "
    >
      <div className="px-4 py-3">
        <FormStepNav onNext={onNext} nextDisabled={nextDisabled} />
      </div>
    </div>
  );
};
