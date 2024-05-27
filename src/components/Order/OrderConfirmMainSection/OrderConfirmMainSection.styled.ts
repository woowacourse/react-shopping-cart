import { css } from '@emotion/react';

import { THEME } from '@/constants/theme';

export const container = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 12px;

  padding: 0 24px;

  overflow-y: scroll;
`;

export const additionalDeliveryWrapper = css`
  display: flex;
  flex-direction: column;
  margin: 16px 0;
  gap: 12px;
`;

export const additionalDeliveryText = css`
  font-weight: 700;
  font-size: 16px;
`;

export const couponButton = css`
  border: 1px solid #33333340;
  border-radius: 10px;
  padding: 16px 0;

  background-color: ${THEME.WHITE};

  font-weight: 700;
  font-size: 15px;
  color: #333333bf;
`;
