import styled from "@emotion/styled";

export const CouponItem = styled.li<{ isDisabled: boolean }>`
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid #e5e5e5;
  ${({ isDisabled }) =>
    isDisabled &&
    `
      opacity: 0.25;
      pointer-events: none;
    `}
`;

export const CouponTitle = styled.p`
  color: #000;
  font-size: 16px;
  font-weight: 700;
`;

export const CouponInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const CouponInfoText = styled.p`
  color: #0a0d13;
  font-size: 12px;
  font-weight: 500;
`;
