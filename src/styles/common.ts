import { css } from "styled-components";

export const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Skeleton = `
  background: linear-gradient(-90deg, #aaa, #f0f0f0, #aaa, #f0f0f0);
  background-size: 400%;
  animation: skeleton-animation 5s infinite ease-out;
  border-radius: 8px;

  @keyframes skeleton-animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;
