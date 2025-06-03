import { css } from '@emotion/react';

export const countButtonContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.4rem;
`;

export const countButtonButtonStyle = css`
  width: 3rem;
  height: 3rem;
  border: 1px solid var(--color-light-grey);
  border-radius: 5px;

  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
