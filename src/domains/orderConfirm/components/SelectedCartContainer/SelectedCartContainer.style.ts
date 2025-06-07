import { css } from "@emotion/react";

const selectedCartContainerLayout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  width: 100%;

  font-weight: 500;
  font-size: 12px;
`;

const selectedDeliveryInfo = css`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 16px;
  width: 100%;
`;

const deliveryInfoText = css`
  font-weight: 700;
  font-size: 16px;
`;

const extraDetailLayout = css`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export {
  selectedCartContainerLayout,
  selectedDeliveryInfo,
  deliveryInfoText,
  extraDetailLayout,
};
