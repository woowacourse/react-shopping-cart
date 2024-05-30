import styled from "styled-components";

interface CouponContentProps {
  $isCouponSelectable: boolean;
}

export const CouponWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const CouponContent = styled.li<CouponContentProps>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  color: ${({ $isCouponSelectable }) =>
    $isCouponSelectable ? "black" : "rgba(0, 0, 0, 0.1)"};
`;

export const CouponHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
`;

export const CouponBody = styled.div`
  line-height: 15px;
`;
