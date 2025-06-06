import { css } from "@emotion/react";

export const modalBackground = css`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  max-width: var(--layout-width);
  width: 100%;
  height: 100vh;
  z-index: var(--z-index-modal-background);
`;

export const modalContainer = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-white);
  padding: 3.2rem 3.2rem;
  border-radius: 4px;
  color: var(--color-black);
  z-index: var(--z-index-modal-content);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.2rem;
  max-width: 38.2rem;
  width: 100%;
`;

export const modalHeaderContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const modalCloseButton = css`
  width: 2.4rem;
`;
