import { css, keyframes } from '@emotion/react';

const slideIn = keyframes`
  0% {
    transform: translateX(-50%) translateY(-100%);
    opacity: 0;
  }
  10% {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
  90% {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-50%) translateY(-100%);
    opacity: 0;
  }
`;

export const ToastContainer = css`
  width: 100%;
  max-width: 43rem;
  height: 40px;
  padding: 12px 77px 12px 77px;
  background-color: #ffc9c9;
  text-align: center;

  position: fixed;

  top: 6.4rem;
  left: 50%;

  z-index: 9999;
  animation: ${slideIn} 3s ease-in-out forwards;
`;

export const Message = css`
  font-weight: 500;
  font-size: 12px;
  color: #0a0d13;
`;
