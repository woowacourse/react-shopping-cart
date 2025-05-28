import { css } from '@emotion/react';

export const CartListContainerStyle = css`
  display: flex;
  flex-direction: column;
  margin: 3.6rem 0 5.2rem 0;
`;

export const CartListHeaderStyle = css`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 2rem;
`;

export const CartListCheckboxStyle = css`
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
`;

export const CartListStyle = css`
  display: flex;
  flex-direction: column;
  max-height: 39rem;
  overflow-y: auto;
  gap: 2rem;
`;
