import { createContext, HTMLAttributes, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import * as S from "./Modal.styles";
import { StrictPropsWithChildren } from "@/types/strict";
import Button, { ButtonProps } from "@/components/Button/Button";
import { useAutoFocus, useDevice } from "@/hooks";
import { CloseIcon } from "@/components/icons";

type ModalContext = {
  isOpen: boolean;
  close: () => void;
  open: () => void;
};

const ModalContext = createContext<ModalContext>({
  isOpen: false,
  close: () => {},
  open: () => {},
});

interface WrapperProps {
  initialOpen?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

function Wrapper({
  children,
  initialOpen = false,
  isOpen: controlledIsOpen,
  onClose,
  onOpen,
}: StrictPropsWithChildren<WrapperProps>) {
  const isControlled = controlledIsOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);

  const isOpen = isControlled ? controlledIsOpen : uncontrolledOpen;
  const close = isControlled ? onClose ?? (() => {}) : () => setUncontrolledOpen(false);
  const open = isControlled ? onOpen ?? (() => {}) : () => setUncontrolledOpen(true);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return <ModalContext.Provider value={{ isOpen, close, open }}>{children}</ModalContext.Provider>;
}
Wrapper.displayName = "ModalWrapper";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  /** 모달의 위치 (center | bottom) */
  position?: "center" | "bottom";
  /** 모달의 z-index 값 */
  zIndex?: number;
  /** 모달의 크기 (small | medium | large) */
  size?: "small" | "medium" | "large";
  /** 배경 클릭 시 모달 닫기 여부 */
  isBackdropClose?: boolean;
  /** 배경의 z-index 값 */
  backdropZIndex?: number;
  /** 모달의 내용 */
  children: React.ReactNode;
}

function ModalMain({
  children,
  position = "center",
  zIndex = 10,
  backdropZIndex = 9,
  size = "medium",
  isBackdropClose = false,
  ...props
}: ModalProps) {
  const { isOpen, close } = useContext(ModalContext);
  const device = useDevice();
  const { modalRef } = useAutoFocus(isOpen);

  return (
    <>
      {isOpen &&
        createPortal(
          <>
            <S.ModalContainer position={position} zIndex={zIndex} size={size} ref={modalRef} device={device} {...props}>
              {children}
            </S.ModalContainer>
            <S.ModalBackdrop onClick={isBackdropClose ? close : undefined} zIndex={backdropZIndex} />
          </>,
          document.body,
        )}
    </>
  );
}
ModalMain.displayName = "ModalMain";

/**
 * Outside
 */

interface TriggerProps extends HTMLAttributes<HTMLButtonElement> {}
function Trigger({ children, ...props }: TriggerProps) {
  const { open } = useContext(ModalContext);
  return (
    <S.TransparentButton onClick={open} {...props}>
      {children}
    </S.TransparentButton>
  );
}
Trigger.displayName = "ModalTrigger";

/**
 * Top
 */

function Top({ children }: StrictPropsWithChildren) {
  return <S.ModalTop>{children}</S.ModalTop>;
}
Top.displayName = "ModalTop";

function Title({ children }: StrictPropsWithChildren) {
  return <S.Title>{children}</S.Title>;
}
Title.displayName = "ModalTitle";

function Close({ children, ...props }: StrictPropsWithChildren & HTMLAttributes<HTMLButtonElement>) {
  const { close } = useContext(ModalContext);

  const handleCloseButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    props.onClick?.(event);
    close();
  };

  return (
    <S.TransparentButton onClick={handleCloseButtonClick} {...props}>
      {children}
    </S.TransparentButton>
  );
}
Close.displayName = "ModalClose";

/**
 * Middle
 */
function Content({ children }: StrictPropsWithChildren) {
  return <S.ModalContent>{children}</S.ModalContent>;
}
Content.displayName = "ModalContent";

/**
 * Bottom
 */

function Bottom({ children }: StrictPropsWithChildren) {
  return <S.ModalBottom>{children}</S.ModalBottom>;
}
Bottom.displayName = "ModalBottom";

function ButtonContainer({ children }: StrictPropsWithChildren) {
  return <S.ButtonContainer>{children}</S.ButtonContainer>;
}
ButtonContainer.displayName = "ModalButtonContainer";

interface CancelButtonProps extends ButtonProps {}

function CancelButton({ children, ...props }: StrictPropsWithChildren<CancelButtonProps>) {
  const { close } = useContext(ModalContext);

  return (
    <Button onClick={close} {...props}>
      {children}
    </Button>
  );
}
CancelButton.displayName = "ModalCancelButton";

function ConfirmButton({ ...props }: ButtonProps) {
  const { close } = useContext(ModalContext);
  const handleConfirmButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(event);
    close();
  };
  return <Button onClick={handleConfirmButtonClick} {...props} />;
}
ConfirmButton.displayName = "ModalConfirmButton";

const Modal = Object.assign(ModalMain, {
  Wrapper,
  Top,
  Title,
  Close,
  Trigger,
  CloseIcon,
  Content,
  Bottom,
  CancelButton,
  ConfirmButton,
  ButtonContainer,
});

export default Modal;
