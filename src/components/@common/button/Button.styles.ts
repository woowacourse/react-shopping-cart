import { css } from "@emotion/react";

export const buttonSize = {
  small: css`
    max-width: 6.5rem;
    padding: 0.4rem 0.8rem;
  `,
  large: css`
    width: 100%;
    padding: 1.8rem 0;
  `,
};

export const buttonColor = {
  black: css`
    background-color: var(--color-black);
    color: var(--color-white);
    &:disabled {
      background-color: var(--color-grey);
      color: var(--color-white);
      cursor: not-allowed;
    }
  `,
  white: css`
    background-color: var(--color-white);
    color: var(--color-black);
    border: 1px solid var(--color-grey);
    &:hover {
      border: 1px solid var(--color-dark-grey);
    }
  `,
};

export const buttonDefaultStyle = css`
  border: none;
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-body);
  display: flex;
  justify-content: center;
  align-items: center;
`;
