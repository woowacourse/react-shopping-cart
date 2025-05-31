import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { colors, radius, zIndex } from "../../styles/theme";

// keyframes
const slideInDown = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
`;

// toast container
export const Toast = styled.div`
  background: ${colors.errorBg};
  width: 400px;
  padding: 12px 20px;
  margin: 0 auto;
  margin-top: 32px;
  border-radius: ${radius.md};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: ${zIndex.toast};
  display: flex;
  align-items: center;
  justify-content: space-between;
  opacity: 1;
  transition: all 0.3s ease-in-out;
  animation: ${slideInDown} 0.3s ease-out;
`;

// fade-out (quick)
export const FadeOut = styled.div`
  opacity: 0;
  transform: translateX(-50%) translateY(-20px) scale(0.95);
  transition: all 0.3s ease-in-out;
`;

// fade-out (smooth & blurred)
export const FadeOutSmooth = styled.div`
  opacity: 0;
  transform: translateX(-50%) translateY(-30px);
  filter: blur(1px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const Message = styled.div`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: ${colors.error};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${colors.error};
  cursor: pointer;
  font-size: 18px;
  padding: 0 0 0 10px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;
