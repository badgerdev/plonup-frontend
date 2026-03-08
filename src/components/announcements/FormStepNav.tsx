"use client";

import { useAnnouncementStore } from "@/store/announcement";

type FormStepNavProps = {
  onNext?: () => void;
  nextDisabled?: boolean;
};

const FormStepNav = ({ onNext, nextDisabled = false }: FormStepNavProps) => {
  const { prevStep, nextStep, step } = useAnnouncementStore();

  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
    // 2) iOS/Safari – poprawia wydajnosc smooth scroll.
    requestAnimationFrame(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 120);
    });
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      nextStep();
    }
    scrollToTop();
  };

  const handlePrev = () => {
    prevStep();
    scrollToTop();
  };

  return (
    <div
      className="
      sticky lg:static top-22 md:top-20 z-40 
      flex justify-between items-center 
      py-3 px-4
      rounded-full backdrop-blur-md 
      border border-zinc-400 mb-4 bg-gray-100
    "
    >
      <button
        onClick={handlePrev}
        className="text-sm text-zinc-700 font-semibold hover:underline disabled:opacity-40 disabled:hover:cursor-not-allowed hover:cursor-pointer"
        type="button"
        disabled={step === 1}
      >
        ← Wróć
      </button>

      <button
        onClick={handleNext}
        className="bg-[var(--accent-main)] hover:bg-[var(--accent-main-hover)] text-white px-6 py-2 rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:cursor-pointer"
        type="button"
        disabled={nextDisabled}
      >
        Dalej →
      </button>
    </div>
  );
};

export default FormStepNav;
