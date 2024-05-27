import { css } from '@emotion/react';

export const headerWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;

  padding: 36px 0;
`;

export const titleWrapper = css`
  display: flex;
  align-items: center;

  height: 35px;
`;

export const titleText = css`
  font-size: 24px;
  font-weight: 700;
`;

export const descriptionWrapper = css`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const descriptionText = css`
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: #0a0d13;
`;
