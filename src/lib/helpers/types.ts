// --------------------------------------
// 🔹 Typy ogólne
// --------------------------------------

export type User = {
  id: number;
  username: string;
  email: string;
  is_verified: boolean;
  is_deleted: boolean;
  delete_scheduled_for?: string | null;
};

export type ValidationError = {
  loc?: (string | number)[];
  msg: string;
  type?: string;
};

export type ContactMethod = "email" | "phone" | "both";

// --------------------------------------
// 🔹 Enum-like string typy (zgodne z backendem constants.py)
// --------------------------------------

export type AnnouncementType = "private" | "business";

export type ListingType = "sale_or_exchange" | "free";

export type AnnouncementStatus = "active" | "paused" | "archived";

export type ModerationStatus =
  | "pending"
  | "script_check_approved"
  | "script_check_rejected"
  | "approved"
  | "rejected"
  | "needs_fix"
  | "rejected_spam";

export type SubmissionSource = "new" | "edited" | "resubmitted";

export type Category =
  | "owoce"
  | "warzywa"
  | "mięso"
  | "nabiał"
  | "przetwory"
  | "słoiki"
  | "jaja"
  | "miód"
  | "zboża"
  | "zioła"
  | "oleje"
  | "pieczywo"
  | "napoje"
  | "inne";

// --------------------------------------
// 🔹 Typy modeli (zgodne z backendem schemas.py)
// --------------------------------------

export interface AnnouncementOut {
  id: number;
  title: string;
  category: string;
  location: string;
  listing_type: ListingType;
  announcement_type: AnnouncementType;
  created_at: string;
  images: {
    id: number;
    image_url: string;
  }[];
  user: string;
  user_id: number;
  status: AnnouncementStatus;
  moderation_status: ModerationStatus;
  status_display: string;
  likes_count: number;
  is_liked: boolean;
}

export type AnnouncementDetail = {
  id: number;
  user_id: number;
  user: string;
  title: string;
  description: string;
  category: string;
  location: string;
  postal_code: string;
  listing_type: ListingType;
  email: string;
  phone: string;
  announcement_type: AnnouncementType;
  first_name?: string;
  company_name?: string;
  address?: string;
  opening_hours?: string;
  notes?: string;
  status?: string;
  moderation_status: ModerationStatus;
  status_display?: string;
  created_at: string;
  images: { id: number; image_url: string }[];
  likes_count: number;
  is_liked: boolean;
};

export type Review = {
  id: number;
  author_id: number;
  author_username: string;
  target_user_id: number;
  rating: number;
  comment?: string | null;
  created_at: string;
};
// POWIADOMIENIA
export type NotificationType =
  | "welcome"
  | "moderation"
  | "review"
  | "system"
  | "staff_message";

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  link_url?: string | null;
  is_read: boolean;
  created_at: string;
  related_announcement_id?: number | null;
  is_staff_message: boolean;
}

export type ReportCategory =
  | "spam"
  | "offensive"
  | "rules_violation"
  | "inappropriate"
  | "other";

export type ReportTargetType = "user" | "review" | "announcement";
