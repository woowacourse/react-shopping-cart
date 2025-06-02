import styled from "@emotion/styled";

export const Container = styled.li`
  display: flex;
  flex-direction: column;
  min-height: 82px;
  gap: 6px;
  border-bottom: 1px solid #0000001a;
  &:last-of-type {
    border-bottom: none;
  }
  &:first-of-type {
    margin-top: 16px;
  }
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
