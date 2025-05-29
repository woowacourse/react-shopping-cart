import { css } from "@emotion/react";

export const Container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const Button = css`
  width: 24px;
  height: 24px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
`;

export const Text = css`
  font-size: var(--font-size-small);
  width: 15px;
  text-align: center;
`;
