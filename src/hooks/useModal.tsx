import { useState } from "react";

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const modalOpen = () => setIsOpen(true);
  const modalClose = () => setIsOpen(false);

  return { isOpen, modalOpen, modalClose };
}
