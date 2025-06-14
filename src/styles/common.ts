import { css } from '@emotion/react';

export const borderRadius = css`
  border-radius: 8px;
`;

export const clickable = (isAvailable = true) => css`
  cursor: ${isAvailable ? 'pointer' : 'not-allowed'};
`;
