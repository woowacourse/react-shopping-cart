import styled from "@emotion/styled";
import { PropsWithChildren } from "react";
import { css } from "@emotion/react";

const ModalContainer = styled.div<{
  position: "center" | "bottom";
  size: "small" | "medium" | "large";
}>`
  ${({ size }) => sizeStyles[size]}

  @media (max-width: 768px) {
    width: 80%;
  }

  height: fit-content;

  background-color: white;
  padding: 24px 32px;

  border-radius: ${(props) =>
    props.position === "center" ? "8px" : "8px 8px 0 0"};

  position: fixed;

  left: 0;
  right: 0;
  margin: 0 auto;

  top: ${(props) => (props.position === "center" ? "50%" : "auto")};
  transform: ${(props) =>
    props.position === "center" ? "translateY(-50%)" : "none"};

  bottom: 0;

  z-index: 2;

  font-size: 12px;
  font-weight: 500;
  color: #0a0d13;

  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ModalTop = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-right: auto;
`;

const ModalBackdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.35);

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
`;

interface ModalInterface {
  position?: "center" | "bottom";
  onClose: () => void;
  isOpen: boolean;
  size: "small" | "medium" | "large";
  title?: string;
  closeButton?: boolean;
  closeOnBackdropClick?: boolean;
}

export default function Modal({
  position = "center",
  onClose,
  children,
  isOpen,
  size = "medium",
  title,
  closeOnBackdropClick = true,
}: PropsWithChildren<ModalInterface>) {
  if (!isOpen) return;

  return (
    <>
      <ModalContainer position={position} size={size}>
        <ModalTop>{title && <Title>{title}</Title>}</ModalTop>
        {children}
      </ModalContainer>
      <ModalBackdrop onClick={closeOnBackdropClick ? onClose : () => {}} />
    </>
  );
}

const sizeStyles = {
  small: css`
    width: 320px;
  `,
  medium: css`
    width: 480px;
  `,
  large: css`
    width: 600px;
  `,
};
