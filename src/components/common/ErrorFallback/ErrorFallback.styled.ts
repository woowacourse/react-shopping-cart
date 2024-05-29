import { css } from '@emotion/react';

import { THEME } from '@/constants/theme';

export const container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 24px;
`;

export const homeButton = css`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 8px 16px;

  background-color: ${THEME.BLACK};
`;
