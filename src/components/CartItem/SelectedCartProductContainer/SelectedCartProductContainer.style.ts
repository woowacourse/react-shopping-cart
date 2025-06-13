import { css } from '@emotion/react';

const CartProductContainerLayout = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-y: auto;
`;

const CartProductList = css`
  display: flex;
  flex-direction: column;
  max-height: 400px;
  overflow: auto;
  gap: 24px;
`;

const CartItemBox = css`
  display: flex;
  gap: 12px;
  flex-direction: column;
`;

export { CartProductContainerLayout, CartProductList, CartItemBox };
