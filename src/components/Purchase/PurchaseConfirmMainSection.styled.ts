import { css } from '@emotion/react';

export const container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 24px;
`;

export const titleWrapper = css`
  display: flex;
  align-items: center;
  height: 35px;
  gap: 24px;
`;

export const title = css`
  font-size: 24px;
  font-weight: 700;
`;

export const orderInfoContainer = css`
  display: flex;
  align-items: center;

  font-size: 12px;
  font-weight: 500;
  text-align: center;
  line-height: 18px;
`;

export const orderResultContainer = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const orderResultText = css`
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  color: #0a0d13;
`;

export const orderResult = css`
  font-size: 24px;
  font-weight: 700;
`;
