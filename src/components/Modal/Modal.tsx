import { ReactNode, useEffect, MouseEvent } from "react";
import { ModalContent, ModalWrapper } from "./Modal.style";

const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const handleModalContentClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={handleModalContentClick}>{children}</ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
