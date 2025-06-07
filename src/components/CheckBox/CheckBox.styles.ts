import { css } from "@emotion/react";

export const Container = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SmallText = css`
  font-size: var(--font-size-small);
`;

export const Button = css`
  background: none;
  border: none;
  cursor: pointer;
`;

export const BigText = css`
  font-size: var(--font-size-normal);
  font-weight: var(--font-weight-bold);
`;
