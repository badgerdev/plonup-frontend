"use client";

import useSWR from "swr";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type LikeUser = {
  id: number;
  username: string;
  avatar_url?: string | null;
};

type LikesResponse = {
  results: LikeUser[];
  count: number;
  total_pages: number;
  current_page: number;
};

const LIMIT_OF_USERS_TO_DISPLAY = 12;

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Błąd pobierania polubień");
    return res.json();
  });

export function AnnouncementLikesModal({
  open,
  onClose,
  announcementId,
}: {
  open: boolean;
  onClose: () => void;
  announcementId: number;
}) {
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useSWR<LikesResponse>(
    open
      ? `/api/announcements/${announcementId}/likes/users?page=${page}&limit=${LIMIT_OF_USERS_TO_DISPLAY}`
      : null,
    fetcher
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full h-[100vh] md:h-auto md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Polubili to ogłoszenie</DialogTitle>
        </DialogHeader>

        {isLoading && (
          <p className="text-sm text-muted-foreground">Ładowanie...</p>
        )}
        {error && (
          <p className="text-sm text-destructive">
            Błąd pobierania listy lajków.
          </p>
        )}

        {data && data.results.length > 0 ? (
          <>
            <ul className="divide-y divide-border">
              {data.results.map((user) => (
                <li key={user.id}>
                  <Link
                    href={`/uzytkownicy/${user.id}`}
                    className="flex items-center gap-3 py-3 hover:bg-muted/40 rounded-md px-2 transition"
                  >
                    <Avatar>
                      <AvatarImage
                        src={user.avatar_url || ""}
                        alt={user.username}
                      />
                      <AvatarFallback>
                        {user.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground">
                      {user.username}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* PAGINATION */}
            <div className="mt-4">
              <Pagination>
                <PaginationContent className="flex justify-between w-full">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className={
                        page === 1 ? "pointer-events-none opacity-50" : ""
                      }
                    />
                  </PaginationItem>

                  <span className="text-sm text-muted-foreground self-center">
                    Strona {data.current_page} z {data.total_pages}
                  </span>

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setPage((p) =>
                          data.current_page < data.total_pages ? p + 1 : p
                        )
                      }
                      className={
                        data.current_page === data.total_pages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        ) : (
          !isLoading && (
            <p className="text-sm text-muted-foreground">
              Nikt jeszcze nie polubił.
            </p>
          )
        )}
      </DialogContent>
    </Dialog>
  );
}
