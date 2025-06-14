import { css } from "@emotion/react";

export const Container = css`
  position: sticky;
  top: 0;
  width: var(--max-width);
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
