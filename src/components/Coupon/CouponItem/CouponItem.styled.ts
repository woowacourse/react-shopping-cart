import { css } from '@emotion/react';

export const couponItemContainer = (isCouponValid: boolean) => css`
  display: flex;
  flex-direction: column;
  gap: 16px;

  border-top: 1px solid #0000001a;
  padding: 16px 0;

  background-color: white;
  opacity: ${isCouponValid ? 1 : 0.3};
`;

export const title = css`
  font-weight: 700;
  font-size: 16px;
`;

export const couponDescriptionWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const couponDescription = css`
  font-weight: 500;
  font-size: 12px;
`;
