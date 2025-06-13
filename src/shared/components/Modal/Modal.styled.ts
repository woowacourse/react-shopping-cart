import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Backdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  animation: ${fadeIn} 0.3s ease;
`;

export const Modal = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 24px 32px;
  min-height: 180px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  animation: ${fadeIn} 0.3s ease;
  width: 450px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
`;

export const CloseButton = styled.button`
  width: 24px;
  height: 24px;
`;

export const CloseIcon = styled.img`
  width: 100%;
  height: 100%;
`;
