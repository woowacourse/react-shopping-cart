import { useState } from "react";

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  function modalOpen() {
    setIsOpen(true);
  }

  function modalClose() {
    setIsOpen(false);
  }

  return { isOpen, modalClose, modalOpen };
}
