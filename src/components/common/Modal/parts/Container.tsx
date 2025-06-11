import { ComponentProps, useContext, PropsWithChildren } from "react";

import { ModalContainer, CloseButton } from "../styles/ModalContainer.style";
import { ModalContext } from "@/contexts/ModalContext";
import closeIcon from "/closeIcon.png";

interface ModalContainerProps extends PropsWithChildren, ComponentProps<"div"> {
  size?: "small" | "medium" | "large";
  position?: "center" | "bottom";
}

function Container({
  children,
  size = "medium",
  ...props
}: ModalContainerProps) {
  const ctx = useContext(ModalContext);

  const modalSize = ctx?.position === "bottom" ? "full" : size;

  return (
    <ModalContainer
      {...props}
      id="modal-container"
      size={modalSize}
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
    >
      <CloseButton
        id="modal-close-button"
        src={closeIcon}
        alt="닫기"
        onClick={ctx?.onClose}
      />

      {children}
    </ModalContainer>
  );
}
export default Container;
