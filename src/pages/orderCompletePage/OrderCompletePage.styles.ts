import { css } from '@emotion/react';

export const OrderCompleteWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
  justify-content: center;
`;

export const OrderCompleteTitle = css`
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-title);
`;

export const OrderCompleteDescription = css`
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-body);
`;

export const OrderCompleteSubtitle = css`
  font-size: var(--font-size-subtitle);
  font-weight: var(--font-weight-subtitle);
`;

export const OrderCompletePriceContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: center;
`;

export const OrderCompleteTotalPrice = css`
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-title);
`;

export const CartTitleContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  width: 100%;
  gap: 1.2rem;
`;

export const CartPageWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  gap: 3.6rem;
`;

export const CartCheckboxContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;

  width: 100%;
  gap: 0.45rem;
`;

export const DeliveryInfoContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  gap: 1.6rem;
  margin-top: 3.2rem;
`;

export const DeliveryInfoTitle = css`
  font-size: var(--font-size-subtitle);
  font-weight: var(--font-weight-subtitle);
`;

export const DeliveryDifficultArea = css`
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-body);
`;

export const DeliveryInfoCheckboxContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;

  gap: 0.8rem;
`;

export const InfoMessageContainer = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.4rem;

  width: 100%;
`;

export const CartPriceInfoContainer = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CartPriceSubtitle = css`
  font-size: var(--font-size-subtitle);
  font-weight: var(--font-weight-subtitle);
`;

export const SelectedCouponContainer = css`
  padding: 16px;
  background-color: var(--color-light-grey, #f8f9fa);
  border-radius: 8px;
  border: 1px solid var(--color-grey, #dee2e6);
  margin: 16px 0;
`;

export const SelectedCouponTitle = css`
  font-size: 14px;
  font-weight: bold;
  color: var(--color-black);
  margin: 0 0 8px 0;
`;

export const SelectedCouponInfo = css`
  font-size: 14px;
  color: var(--color-black);
  margin: 0;

  strong {
    color: var(--color-primary, #007bff);
  }
`;

export const DialogHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--color-light-grey);
  width: 100%;

  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
    color: var(--color-black);
  }
`;

export const CloseButton = css`
  font-size: 20px;
  color: var(--color-grey);
  cursor: pointer;

  &:hover {
    color: var(--color-black);
  }
`;

export const DialogContent = css`
  padding: 20px;
  max-height: 70vh;
  overflow-y: auto;
`;

export const DialogActions = css`
  padding: 16px;
  border-top: 1px solid var(--color-light-grey);
  margin-top: 20px;
`;

export const TriggerButton = css`
  width: 100%;
  padding: 12px 0;
  color: var(--color-white);
  border-radius: 5px;
  border: 1px solid rgba(51, 51, 51, 0.25);
  color: var(--color-black);
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: var(--color-dark-grey);
  }

  &:disabled {
    background-color: var(--color-grey);
    color: var(--color-white);
    cursor: not-allowed;
  }
`;

export const DiscountAmount = css`
  color: var(--color-red, #dc3545);
  font-weight: bold;
  margin-left: 8px;
`;

export const OptimizationInfo = css`
  padding: 16px;
  background-color: var(--color-light-grey, #f8f9fa);
  border-radius: 8px;
  margin-bottom: 20px;

  h3 {
    margin: 0 0 8px 0;
    font-size: 16px;
    font-weight: bold;
    color: var(--color-black);
  }

  p {
    margin: 0 0 16px 0;
    font-size: 14px;
    color: var(--color-grey);
  }
`;

export const OptimalResult = css`
  background-color: var(--color-white);
  padding: 12px;
  border-radius: 6px;
  border: 1px solid var(--color-grey);

  h4 {
    margin: 0 0 8px 0;
    font-size: 14px;
    font-weight: bold;
    color: var(--color-black);
  }
`;

export const CouponBreakdown = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  font-size: 13px;

  span:first-of-type {
    color: var(--color-black);
    font-weight: 500;
  }

  span:last-of-type {
    color: var(--color-red, #dc3545);
    font-weight: bold;
  }
`;

export const TotalSavings = css`
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--color-light-grey);
  font-size: 14px;
  font-weight: bold;
  color: var(--color-primary, #007bff);
  text-align: right;
`;

export const NoOptimization = css`
  font-size: 14px;
  color: var(--color-grey);
  text-align: center;
  padding: 16px;
  background-color: var(--color-white);
  border-radius: 6px;
  border: 1px solid var(--color-light-grey);
`;

export const AutoOptimizeButton = css`
  margin-top: 12px;
  width: 100%;
`;

export const ManualSelectSection = css`
  margin: 20px 0;
  padding: 16px;
  background-color: var(--color-light-grey, #f8f9fa);
  border-radius: 8px;

  h3 {
    margin: 0 0 8px 0;
    font-size: 16px;
    font-weight: bold;
    color: var(--color-black);
  }

  p {
    margin: 0;
    font-size: 14px;
    color: var(--color-grey);
  }
`;

export const SelectedCouponsPreview = css`
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const SelectedCouponPreview = css`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background-color: var(--color-primary, #007bff);
  color: var(--color-white);
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;

  span {
    color: var(--color-white);
  }
`;

export const RemoveCouponButton = css`
  background: none;
  border: none;
  color: var(--color-white);
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  margin: 0;
  line-height: 1;

  &:hover {
    opacity: 0.8;
  }
`;

export const DialogTitle = css`
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-title);

  width: 100%;
`;
