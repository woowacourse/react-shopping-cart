import { css } from "@emotion/react";

export const buttonStyles = {
  smallBlack: css`
    max-width: 65px;
    height: 29px;
    padding: 4px 8px;
    background-color: var(--color-black);
    color: var(--color-white);
    &:disabled {
      background-color: var(--color-grey);
      color: var(--color-white);
      cursor: not-allowed;
    }
  `,
  largeBlack: css`
    width: 100%;
    padding: 12px 0;
    background-color: var(--color-black);
    color: var(--color-white);
    &:disabled {
      background-color: var(--color-grey);
      color: var(--color-white);
      cursor: not-allowed;
    }
  `,
};
