import { css } from "@emotion/react";

const CartProductContainerLayout = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-y: auto;
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
  CartProductContainerLayout,
  PaymentsLayout,
  PaymentsLabel,
  PaymentsValue,
};
