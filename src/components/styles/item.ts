import { css } from '@emotion/react';

import { THEME } from '@/constants/theme';

export const itemWrapper = css`
  border-top: 1px solid ${THEME.LIGHT_BLACK};
  padding: 10px 0;
`;

export const itemBody = css`
  display: flex;
  gap: 20px;
`;

export const image = css`
  border-radius: 8px;
`;

export const itemContentWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const price = css`
  font-weight: 700;
  font-size: 24px;
`;
