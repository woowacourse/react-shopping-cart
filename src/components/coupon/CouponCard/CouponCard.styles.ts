import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const CouponCard = styled.div<{ $disabled: boolean }>`
  width: 100%;
  height: 83px;
  padding-top: 12px;
  border-top: 1px solid #0000001a;
  display: flex;
  flex-direction: column;
  gap: 14px;

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.3;
    `}
`;

export const CouponCardHeader = styled.div`
  display: flex;
  gap: 8px;
  line-height: 27px;
`;

export const Title = styled.p`
  font-weight: 700;
  font-size: 18px;
`;

export const CouponInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: 500;
  font-size: 14px;
`;
