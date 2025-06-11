import { ReactNode, useRef } from "react";
import * as S from "./Modal.styles";

interface ModalProps {
  size?: "small" | "medium" | "large";
  position: "center" | "bottom";
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ isOpen, children, position, size = "medium" }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  return isOpen ? (
    <S.ModalBackDrop $position={position}>
      <S.ModalContainer ref={modalRef} $size={size} $position={position}>
        {children}
      </S.ModalContainer>
    </S.ModalBackDrop>
  ) : null;
};

const Title = ({ children }: { children: ReactNode }) => (
  <S.StyledTitle>{children}</S.StyledTitle>
);

const Description = ({ children }: { children: ReactNode }) => (
  <S.StyledDescription>{children}</S.StyledDescription>
);

const Input = ({ ...props }) => <S.StyledInput {...props} />;
const Actions = ({ children }: { children: ReactNode }) => (
  <S.ButtonWrap>{children}</S.ButtonWrap>
);

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

const ConfirmButton = ({ children, onClick }: ButtonProps) => (
  <S.StyledConfirmButton onClick={onClick}>{children}</S.StyledConfirmButton>
);

const CloseButton = ({ children, onClick }: ButtonProps) => (
  <S.StyledCloseButton onClick={onClick}>{children}</S.StyledCloseButton>
);

Modal.Title = Title;
Modal.Description = Description;
Modal.Input = Input;
Modal.Actions = Actions;
Modal.ConfirmButton = ConfirmButton;
Modal.CloseButton = CloseButton;

export default Modal;
