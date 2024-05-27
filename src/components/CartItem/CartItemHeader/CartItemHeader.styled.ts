import { css } from '@emotion/react';

import { THEME } from '@/constants/theme';

export const cartItemHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 10px;
`;

export const deleteButton = css`
  width: 40px;
  height: 24px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid ${THEME.LIGHT_BLACK};
  border-radius: 4px;
  padding: 4px 8px;

  background-color: ${THEME.WHITE};

  font-size: 12px;
`;
