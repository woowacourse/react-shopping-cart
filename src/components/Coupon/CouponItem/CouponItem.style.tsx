import styled from "@emotion/styled";

export const Container = styled.div<{ disabled?: boolean }>`
  width: 100%;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px solid #0000001a;

  /* disabled prop이 true일 때 필터 적용 */
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.4;
    pointer-events: none;
  `}
`;

export const CouponHeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  height: 24px;
  line-height: 1;
`;

export const CouponCode = styled.p`
  font-size: 1.25rem;
  margin: 0;
  line-height: 1;
`;

export const CouponDescription = styled.p`
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
  line-height: 1;
`;
export const CouponDetails = styled.p`
  font-size: 0.7rem;
  span {
    display: block;
  }
`;
