import { css } from "@emotion/react";

export const Wrap = css`
  height: 80%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const NoCartItemText = css`
  height: 100%;
  min-height: var(--min-height);

  display: flex;
  justify-content: center;
  align-items: center;

  color: var(--color-gray);
  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-light);
`;
