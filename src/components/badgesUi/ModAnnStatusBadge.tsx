import {
  MODERATION_STATUS_COLORS,
  MODERATION_STATUS_LABELS,
  MODERATION_STATUS_TOOLTIPS,
} from "@/lib/constants/modAnnouncementStatus";
import { ModerationStatus } from "@/lib/helpers/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  status: ModerationStatus;
  className?: string;
};

export function ModAnnStatusBadge({ status, className = "" }: Props) {
  const isAnimated = status === "pending" || status === "script_check_approved";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`flex items-center gap-2 cursor-help ${className}`}>
            {/* 🔹 Kropka */}
            <div className="relative flex items-center justify-center">
              <div
                className={`w-2.5 h-2.5 rounded-full border ${MODERATION_STATUS_COLORS[status]}`}
              />
              {isAnimated && (
                <span
                  className={`
                    absolute inline-flex h-2.5 w-2.5 rounded-full opacity-75
                    ${MODERATION_STATUS_COLORS[status]}
                    animate-ping
                  `}
                />
              )}
            </div>
            <span className="text-xs text-gray-700 font-medium">
              {MODERATION_STATUS_LABELS[status]}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-[220px] text-xs text-gray-200"
        >
          {MODERATION_STATUS_TOOLTIPS[status]}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
