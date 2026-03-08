"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, ClipboardList, MessageCircleHeart } from "lucide-react";
import { NotificationBadge } from "@/components/shared/NotificationBadge";

/**
 * 💡 Mobilna lista zakładek w Panelu Użytkownika
 * Zunifikowana z globalnym NotificationBadge
 */
export const PanelMobileTabsList = () => {
  return (
    <TabsList
      className="
        sticky top-22 bg-white z-10
        grid grid-cols-3 space-x-1 w-full mb-4 rounded-xl
        p-1 h-fit shadow-sm border border-zinc-200
      "
    >
      {/* 📋 OGŁOSZENIA */}
      <TabsTrigger
        value="announcements"
        className="
          flex items-center justify-center gap-1
          h-10 rounded-lg text-[10px] sm:text-[12px] font-medium
          text-zinc-600 hover:text-zinc-900 hover:bg-[var(--accent-light)]
          data-[state=active]:bg-[var(--accent-light)]
          data-[state=active]:border data-[state=active]:border-[var(--accent-light-green)]
          data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm
          transition
        "
      >
        <ClipboardList className="w-4 h-4" />
        <span className="hidden sm:inline">Ogłoszenia</span>
      </TabsTrigger>

      {/* 💬 OPINIE */}
      <TabsTrigger
        value="reviews"
        className="
          flex items-center justify-center gap-1
          h-10 rounded-lg text-[10px] sm:text-[12px] font-medium
          text-zinc-600 hover:text-zinc-900 hover:bg-[var(--accent-light)]
          data-[state=active]:bg-[var(--accent-light)]
          data-[state=active]:border data-[state=active]:border-[var(--accent-light-green)]
          data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm
          transition
        "
      >
        <MessageCircleHeart className="w-4 h-4" />
        <span className="hidden sm:inline">Opinie</span>
      </TabsTrigger>

      {/* 🔔 POWIADOMIENIA */}
      <TabsTrigger
        value="notifications"
        className="
          relative flex items-center justify-center gap-1
          h-10 rounded-lg text-[10px] sm:text-[12px] font-medium
          text-zinc-600 hover:text-zinc-900 hover:bg-[var(--accent-light)]
          data-[state=active]:bg-[var(--accent-light)]
          data-[state=active]:border data-[state=active]:border-[var(--accent-light-green)]
          data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm
          transition
        "
      >
        {/* Dzwonek z animacją */}
        <div className="relative flex items-center justify-center">
          <Bell className="w-4 h-4 text-zinc-600 transition-all duration-200 group-data-[state=active]:text-[var(--accent-main)]" />
          <NotificationBadge variant="pulse" />
        </div>

        <span className="hidden sm:inline">Powiadomienia</span>

        <NotificationBadge
          variant="count"
          className="absolute top-0.5 right-1"
        />
      </TabsTrigger>
    </TabsList>
  );
};
