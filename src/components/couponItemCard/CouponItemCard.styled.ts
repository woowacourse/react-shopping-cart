import styled from "styled-components";

export const StyledCouponItemCard = styled.div<{ disabled: boolean }>`
  width: 100%;
  height: 82px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 12px;

  ${({ disabled }) =>
    disabled &&
    `
      opacity: 0.5;
      pointer-events: none;
    `}
`;

export const StyledCouponItemCardHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledCouponItemCardTitle = styled.span`
  font-family: Noto Sans KR;
  font-size: 16px;
  font-weight: 700;
  line-height: 23.17px;
  color: rgba(0, 0, 0, 1);
`;

export const StyledCouponItemCardContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 34px;
  justify-content: space-between;
`;
export const StyledCouponItemCardContent = styled.span`
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
  color: rgba(10, 13, 19, 1);
`;
