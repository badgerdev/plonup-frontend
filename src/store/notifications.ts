import { create } from "zustand";

type NotificationsState = {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  clearUnread: () => void;
};

export const useNotificationsStore = create<NotificationsState>((set) => ({
  unreadCount: 0,
  setUnreadCount: (count) => set({ unreadCount: count }),
  clearUnread: () => set({ unreadCount: 0 }),
}));
