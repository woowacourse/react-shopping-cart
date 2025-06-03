import { keyframes } from "@emotion/react";

export const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;

  }
`;

export const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;
