import { keyframes, css } from "@emotion/react";
import styled from "@emotion/styled";

const slideIn = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  20% {
    transform: translateY(-25%);
  }

  40% {
    transform: translateY(-50%);
  }

  60% {
    transform: translateY(-25%);
  }

  80% {
    transform: translateY(0%);
  }

  100% {
    transform: translateY(100%);
  }
`;

export const Container = styled.div<{ isUnmountDelayed: boolean }>`
  width: 21.875rem;
  height: 5rem;
  position: relative;
  padding: 1rem 1.25rem;
  border-radius: 4px;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 15px 0 rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
  color: #757575;
  background-color: #fff;
  animation: ${({ isUnmountDelayed }) =>
    isUnmountDelayed
      ? css`
          ${slideOut} 0.5s ease forwards;
        `
      : css`
          ${slideIn} 0.5s ease forwards;
        `};
`;

export const CloseButton = styled.button`
  top: 10%;
  right: 2%;
  position: absolute;
  height: 1.5rem;
  opacity: 0.3;
  transition: transform 0.75s ease, opacity 0.75s ease;

  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }
`;

export const CloseIcon = styled.img`
  width: 0.875rem;
  height: 1rem;
`;

export const ToastTypeIcon = styled.img`
  width: 1.375rem;
  height: 1.375rem;
`;

export const ContentBox = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 1rem;
`;

export const ToastContentMessage = styled.span`
  font-size: 0.875rem;
  color: #000;
  word-break: keep-all;
  line-height: 1.25rem;
`;

export const Progress = styled.div`
  position: absolute;
  bottom: -1.93rem;
  left: 0;
`;

export const ProgressBox = styled.div<{ toastColor: string }>`
  background-color: ${(props) => props.toastColor};
  border-radius: 2px;
  box-shadow: inset 0 0.5em 0.5em rgba(0, 0, 0, 0.05);
  height: 0.3125rem;
  margin: 2rem 0 2rem 0;
  overflow: hidden;
  position: relative;
  width: 21.875rem;
`;

const progressAnimation = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

export const ProgressBar = styled.div<{ animationDuration: number }>`
  background-color: #ececec;
  box-shadow: inset 0 0.5em 0.5em rgba(94, 49, 49, 0.05);
  inset: 0 0 0 0;
  position: absolute;
  animation: ${progressAnimation} linear ${(props) => props.animationDuration}ms
    forwards;
`;
