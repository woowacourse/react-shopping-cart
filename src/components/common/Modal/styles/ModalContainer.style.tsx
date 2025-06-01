import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { colors, radius } from "../../../../styles/theme";

const slideIn = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const zoomIn = keyframes`
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const getSizeStyles = (size?: "small" | "medium" | "large" | "full") => {
  switch (size) {
    case "full":
      return `
        width: 100%;
        animation: ${zoomIn} 0.3s ease-in-out;
      `;
    case "small":
      return `
        min-width: min(430px, 95vw);
        animation: ${zoomIn} 0.3s ease-in-out;
      `;
    case "medium":
      return `
        min-width: min(550px, 95vw);
        animation: ${zoomIn} 0.3s ease-in-out;
      `;
    case "large":
      return `
        min-width: min(800px, 95vw);
        animation: ${zoomIn} 0.3s ease-in-out;
      `;
    default:
      return "";
  }
};

export const ModalContainer = styled.div<{
  size?: "small" | "medium" | "large" | "full";
}>`
  padding: 32px 32px;
  background: ${colors.white};
  color: ${colors.black};
  border-radius: ${radius.md};
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  animation: ${zoomIn} 0.3s ease-in-out;
  ${(props) => getSizeStyles(props.size)}
`;
export const CloseButton = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 16px;
  height: 16px;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
`;
