import { PropsWithChildren } from "react";
import * as S from "./Modal.styled";
import CloseIcon from "@assets/icons/close.svg";
import useKeyDown from "@/shared/hooks/useKeyDown";
import useClickOutsideRef from "@/shared/hooks/useClickOutsideRef";
import { createPortal } from "react-dom";

type ModalProps = {
  isOpen: boolean;
  title: string;
  onRequestClose: () => void;
  container?: HTMLElement;
};

function Modal({
  isOpen,
  title,
  onRequestClose,
  container = document.body,
  children,
}: PropsWithChildren<ModalProps>) {
  useKeyDown({ keys: ["Escape"], callback: onRequestClose });
  const ref = useClickOutsideRef<HTMLDivElement>(onRequestClose);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <S.Backdrop>
      <S.Modal role="dialog" aria-modal ref={ref}>
        <S.ModalHeader>
          <S.Title>{title}</S.Title>

          <S.CloseButton
            autoFocus
            type="button"
            onClick={onRequestClose}
            aria-label="닫기"
          >
            <S.CloseIcon src={CloseIcon} alt="닫기 버튼" />
          </S.CloseButton>
        </S.ModalHeader>
        {children}
      </S.Modal>
    </S.Backdrop>,
    container
  );
}

export default Modal;
