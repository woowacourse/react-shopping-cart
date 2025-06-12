import { css } from '@emotion/react';

const SelectAllLayout = css`
  display: flex;
  align-items: center;
  gap: 8px;
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
  SelectAllLayout,
  CartItemHeader,
  PaymentsLayout,
  PaymentsLabel,
  PaymentsValue,
};
