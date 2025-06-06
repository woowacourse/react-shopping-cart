import { css } from "@emotion/react";

const paymentSummaryLayout = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const summaryRowBox = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const imgLayout = css`
  width: 16px;
  height: 16px;
`;

const deliveryInfo = css`
  font-weight: 500;
  font-size: 12px;
`;

const deliveryInfoBox = css`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export {
  paymentSummaryLayout,
  summaryRowBox,
  imgLayout,
  deliveryInfo,
  deliveryInfoBox,
};
