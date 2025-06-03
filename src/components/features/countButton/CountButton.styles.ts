import { css } from "@emotion/react";

export const countButtonContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 1rem;
`;

export const countButtonButtonStyle = css`
  width: 2.4rem;
  height: 2.4rem;
  border: 1px solid var(--color-light-grey);
  border-radius: 5px;

  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
