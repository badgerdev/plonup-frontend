// components/navbar/UserMenu.tsx
"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/auth/useAuth";
import { useLogout } from "@/hooks/auth/useLogout";
import { NotificationBadge } from "@/components/shared/NotificationBadge";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  LogOut,
  LayoutDashboard,
  Star,
  Bell,
  ChevronDown,
  User,
} from "lucide-react";

export function UserMenu() {
  const { user } = useAuth();
  const { handleLogout } = useLogout();

  if (!user) return null;

  return (
    <DropdownMenu>
      {/* Trigger bez komponentu Button */}
      <DropdownMenuTrigger className="flex items-center rounded-md gap-2 pl-4 cursor-pointer text-gray-700 transition-colors hover:bg-gray-100 py-2 px-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-gray-200 text-gray-600 font-medium text-sm">
            {user.username?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">{user.username}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 text-sm text-gray-700 p-1"
      >
        <DropdownMenuItem asChild>
          <Link
            href="/konto"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <User className="w-4 h-4 text-gray-500" />
            Twoje konto
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href="/panel"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 text-gray-500" />
            Panel
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/panel/powiadomienia"
            className="relative flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Bell className="w-4 h-4 text-gray-500" />
            Powiadomienia
            <NotificationBadge
              variant="pulse"
              className="absolute top-0.5 left-4"
            />
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/panel/twoje-opinie"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Star className="w-4 h-4 text-gray-500" />
            Opinie
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center justify-center h-10 w-full hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
        >
          <LogOut className="w-5 h-5 text-[var(--destructive)]" />
          <span>Wyloguj się</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
