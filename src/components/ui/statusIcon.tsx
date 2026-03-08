import { CheckCircle2, XCircle, Circle } from "lucide-react";
import React from "react";

type StatusIconProps = {
  status: boolean | null;
  size?: number;
};

export const StatusIcon = ({ status, size = 18 }: StatusIconProps) => {
  const baseClass = "shrink-0";

  if (status === true) {
    return (
      <CheckCircle2
        size={size}
        className={`${baseClass} text-[var(--accent-light-green)]`}
      />
    );
  }

  if (status === false) {
    return <XCircle size={size} className={`${baseClass} text-zinc-700`} />;
  }

  return (
    <Circle size={size} className={`${baseClass} text-muted-foreground`} />
  );
};
