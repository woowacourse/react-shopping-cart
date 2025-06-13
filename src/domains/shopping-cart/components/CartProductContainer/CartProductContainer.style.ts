import { css } from "@emotion/react";

const CartProductList = css`
  display: flex;
  flex-direction: column;
  height: 400px;
  overflow: auto;
  gap: 24px;
`;

const CartItemBox = css`
  display: flex;
  gap: 12px;
  flex-direction: column;
`;
const CartItemHeader = css`
  display: flex;
  justify-content: space-between;
`;

const PaymentsLayout = css`
  display: flex;
  justify-content: space-between;
`;

const PaymentsLabel = css`
  font-weight: 700;
  font-size: 16px;
`;

const PaymentsValue = css`
  font-weight: 700;
  font-size: 24px;
`;

export {
  CartProductList,
  CartItemBox,
  CartItemHeader,
  PaymentsLayout,
  PaymentsLabel,
  PaymentsValue,
};
