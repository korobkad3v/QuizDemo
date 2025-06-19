// CloseButton.tsx

import { X } from "lucide-react";
import { Button } from "./Button";

export function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      className="rounded-full cursor-pointer p-1.5"
      variant="default"
      size="icon"
      aria-label="Close"
      onClick={onClick}>
      <X size={24} />
    </Button>
  );
}
