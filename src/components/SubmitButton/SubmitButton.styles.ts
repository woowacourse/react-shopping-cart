import { css } from "@emotion/react";

export const Button = css`
  width: 100%;
  height: 64px;

  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-bold);

  padding: 24px 0;
  color: white;

  border: none;
  cursor: pointer;
`;

export const enabledButton = css`
  background-color: var(--color-black);
`;

export const disabledButton = css`
  background-color: var(--color-gray);
  cursor: not-allowed;
`;
