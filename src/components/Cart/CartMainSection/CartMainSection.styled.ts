import { css } from '@emotion/react';

export const main = css`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;

  padding: 0 24px;

  overflow-y: scroll;
`;

export const cartMainSection = css`
  padding-bottom: 42px;
`;

export const allCheckboxWrapper = css`
  margin-bottom: 10px;
`;

export const cartEmptyContainer = css`
  display: flex;
  justify-content: center;
  flex: 1;
  align-items: center;

  width: 100%;
  height: 100%;
`;

export const cartEmptyText = css`
  font-size: 16px;
  font-weight: 400;
`;
