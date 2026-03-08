import { create } from "zustand";

export type UserType = "private" | "business";
export type ListingType = "sale_or_exchange" | "free";

type AnnouncementState = {
  // wspólne
  userType: UserType | null;
  title: string;
  description: string;
  category: string;
  listingType: ListingType | null;
  images: File[];
  location: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;

  // firmowe
  businessName: string;
  nip: string;
  openingHours: string;

  step: number;

  setField: <K extends keyof AnnouncementState>(
    field: K,
    value: AnnouncementState[K]
  ) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
};

export const useAnnouncementStore = create<AnnouncementState>((set) => ({
  userType: null,
  title: "",
  description: "",
  category: "",
  listingType: null,
  images: [],
  location: "",
  email: "",
  phone: "",
  businessName: "",
  nip: "",
  openingHours: "",
  address: "",
  city: "",
  postalCode: "",
  step: 1,

  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () =>
    set((state) => ({ step: state.step > 1 ? state.step - 1 : 1 })),
  reset: () =>
    set({
      userType: null,
      title: "",
      description: "",
      category: "",
      listingType: null,
      images: [],
      location: "",
      email: "",
      phone: "",
      businessName: "",
      nip: "",
      openingHours: "",
      address: "",
      city: "",
      postalCode: "",
      step: 1,
    }),
}));
