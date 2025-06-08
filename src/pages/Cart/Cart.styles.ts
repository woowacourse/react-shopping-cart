import { css } from "@emotion/react";

export const Container = css`
  flex: 1 1 auto;
  padding: 36px 24px;

  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Wrap = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
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
