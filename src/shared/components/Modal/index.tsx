import { PropsWithChildren } from "react";
import * as S from "./Modal.styled";
import CloseIcon from "@assets/icons/close.svg";
import useKeyDown from "@/shared/hooks/useKeyDown";
import useClickOutsideRef from "@/shared/hooks/useClickOutsideRef";

type ModalProps = {
  title: string;
  onRequestClose: () => void;
};

function Modal({
  title,
  onRequestClose,
  children,
}: PropsWithChildren<ModalProps>) {
  useKeyDown({ keys: ["Escape"], callback: onRequestClose });
  const ref = useClickOutsideRef<HTMLDivElement>(onRequestClose);

  return (
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
    </S.Backdrop>
  );
}

export default Modal;
