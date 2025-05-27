import { css } from "@emotion/react";

export const Wrap = css`
  height: 64px;
`;

export const Container = css`
  position: fixed;
  top: 0;
  width: var(--max-width);
  height: 64px;
  padding: 24px;

  display: flex;
  justify-content: flex-start;
  background-color: var(--color-black);
`;

export const Button = css`
  background: none;
  border: none;
  cursor: pointer;
`;
