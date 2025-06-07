import { useCallback, useEffect } from "react";

interface UseModalProps {
  closeModal: () => void;
}

export function useModalClose({ closeModal }: UseModalProps) {
  function onClickOverlay(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if ((e.target as HTMLElement).id === "modal-overlay") closeModal();
  }

  const escapeModal = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    window.addEventListener("keydown", escapeModal);

    return () => {
      window.removeEventListener("keydown", escapeModal);
    };
  }, [escapeModal]);

  return { onClickOverlay };
}
