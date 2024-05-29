import { css } from '@emotion/react';

import { THEME } from '@/constants/theme';

export const orderConfirmButton = (isDisabled: boolean) => css`
  width: 100%;
  height: 64px;

  background-color: ${isDisabled ? THEME.DISABLED : THEME.BLACK};

  font-size: 16px;
  font-weight: 700;
  color: ${THEME.WHITE};
`;
