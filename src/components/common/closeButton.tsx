// CloseButton.tsx

import { X } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/utils/utils";

export function CloseButton({ onClick, className }: {className?: string, onClick: () => void }) {
  return (
    <Button
      className={cn("rounded-full cursor-pointer p-1.5", className)}
      variant="default"
      size="icon"
      aria-label="Close"
      onClick={onClick}>
      <X size={24} />
    </Button>
  );
}
