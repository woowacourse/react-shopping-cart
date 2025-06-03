import { css } from "@emotion/react";

export const headerContainer = css`
  display: flex;
  width: var(--layout-width);
  height: var(--header-height);
  padding: 0px 2.4rem;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  z-index: 5;
  background: var(--color-black);
`;

export const CartStyle = css`
  position: relative;

  cursor: pointer;
`;
