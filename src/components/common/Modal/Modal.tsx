import { useRef, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { ModalContext } from "@/contexts/ModalContext";
import { useFocusTrap } from "@/hooks/Modal/useFocusTrap";
import { useEscapeClose } from "@/hooks/Modal/useEscapeClose";
import Background from "./parts/Background";
import Container from "./parts/Container";
import Header from "./parts/Header";
import Content from "./parts/Content";

export interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  position: "bottom" | "center";
}

function Modal({ isOpen, onClose, position = "center", children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef, isOpen);
  useEscapeClose(isOpen, onClose);

  if (!isOpen) return null;

  return createPortal(
    <div ref={modalRef}>
      <ModalContext.Provider value={{ onClose, position }}>
        {children}
      </ModalContext.Provider>
    </div>,
    document.body
  );
}

Modal.Background = Background;
Modal.Container = Container;
Modal.Header = Header;
Modal.Content = Content;

export default Modal;
