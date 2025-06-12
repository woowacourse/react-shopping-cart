import { css } from "@emotion/react";

export const dimmedStyle = css`
  opacity: 0.5;
  pointer-events: none;
  transition: opacity 0.3s ease;
`;

export const cartPageWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  gap: 3.6rem;
  padding-bottom: 7rem;
`;

export const cartTitleContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  width: 100%;
  gap: 1.2rem;
`;

export const cartList = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;
