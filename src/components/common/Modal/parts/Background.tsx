import { ComponentProps, useContext, PropsWithChildren } from "react";
import { ModalBackground } from "../styles/ModalBackground.style";
import { ModalContext } from "@/contexts/ModalContext";

interface ModalBackgroundProps
  extends PropsWithChildren,
    ComponentProps<"div"> {}

function Background({ children, ...props }: ModalBackgroundProps) {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("ModalContext는 ModalProvider 안에 있어야 합니다.");
  }
  return (
    <ModalBackground
      {...props}
      id="modal-background"
      position={ctx.position}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          ctx.onClose();
        }
      }}
    >
      {children}
    </ModalBackground>
  );
}

export default Background;
